#!/usr/bin/env python3
"""
Deterministic Anna OS UI Bundle Builder & Schema-4 / CSP Validator (`@jeffrey-graham/accesslens-ai`).
Produces:
  1. `dist/accesslens-anna-ui-bundle.zip` (ready-to-upload static SPA archive)
  2. `dist/bundle-init-payload.json` (exact `file_map` with `byte_size`, `sha256`, `content_type`
     for `POST /api/v1/developer/apps/{app_id}/versions/{version_id}/bundle/init`)
"""

from __future__ import annotations

import hashlib
import json
import os
import re
import zipfile
from typing import Any, Dict, List


def apply_oom_guardrail() -> None:
    try:
        with open("/proc/self/oom_score_adj", "w", encoding="utf-8") as fh:
            fh.write("500")
    except OSError:
        pass


ALLOWED_TOP_KEYS = {
    "schema",
    "required_executas",
    "optional_executas",
    "storage",
    "system_prompt_addendum",
    "user_message_prefix_template",
    "tags",
    "ui",
    "dev",
}

ALLOWED_UI_KEYS = {
    "bundle",
    "views",
    "form_factors",
    "host_api",
    "browser_permissions",
    "csp_overrides",
    "state_merge",
}

ALLOWED_BUNDLE_CONTENT_TYPES = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "application/javascript",
    ".json": "application/json",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
}

BUNDLE_RELATIVE_FILES: List[str] = [
    "index.html",
    "assets/app.css",
    "assets/app.js",
    "assets/app-logo.png",
]


def validate_manifest_and_csp(root_dir: str) -> Dict[str, Any]:
    manifest_path = os.path.join(root_dir, "anna-app.manifest.json")
    with open(manifest_path, "r", encoding="utf-8") as fh:
        manifest = json.load(fh)

    unknown_top = set(manifest.keys()) - ALLOWED_TOP_KEYS
    if unknown_top:
        raise ValueError(f"AppManifest extra='forbid' violation — unknown top-level keys: {unknown_top}")

    if manifest.get("schema") != 4:
        raise ValueError("Expected schema == 4")

    addendum = manifest.get("system_prompt_addendum", "")
    if len(addendum) > 4000:
        raise ValueError("system_prompt_addendum exceeds 4000 char limit")

    ui = manifest.get("ui")
    if not isinstance(ui, dict):
        raise ValueError("Missing ui section")

    unknown_ui = set(ui.keys()) - ALLOWED_UI_KEYS
    if unknown_ui:
        raise ValueError(f"UiManifestSection extra='forbid' violation — unknown ui keys: {unknown_ui}")

    bundle = ui.get("bundle", {})
    if bundle.get("format") != "static-spa":
        raise ValueError("ui.bundle.format must be 'static-spa'")
    if bundle.get("entry") not in BUNDLE_RELATIVE_FILES:
        raise ValueError(f"ui.bundle.entry '{bundle.get('entry')}' missing from bundle file list")

    views = ui.get("views", [])
    if not (1 <= len(views) <= 16):
        raise ValueError("ui.views must contain 1..16 entries")
    defaults = [v for v in views if v.get("default") is True]
    if len(defaults) != 1:
        raise ValueError("Exactly one view must have default=True")

    for v in views:
        min_s = v.get("min_size", {})
        def_s = v.get("default_size", {})
        max_s = v.get("max_size", {})
        if min_s.get("h", 0) > 600 or min_s.get("w", 0) > 1024:
            raise ValueError(f"View '{v['name']}' exceeds Anna small-screen min_size baseline (<=1024x600)")
        if not (min_s["w"] <= def_s["w"] <= max_s["w"] and min_s["h"] <= def_s["h"] <= max_s["h"]):
            raise ValueError(f"View '{v['name']}' default_size outside [min_size, max_size]")

    # Verify strict Anna production CSP safety on index.html (`script-src 'self' <sdk-origin>`)
    with open(os.path.join(root_dir, "index.html"), "r", encoding="utf-8") as fh:
        index_html = fh.read()
    inline_scripts = re.findall(r"<script(?![^>]*\bsrc=)[^>]*>", index_html, flags=re.IGNORECASE)
    if inline_scripts:
        raise ValueError(f"CSP violation in index.html: inline <script> blocked by Anna CSP: {inline_scripts}")
    inline_handlers = re.findall(r"\bon[a-z]+\s*=", index_html, flags=re.IGNORECASE)
    if inline_handlers:
        raise ValueError(f"CSP violation in index.html: inline event handlers blocked by Anna CSP: {inline_handlers}")

    return manifest


def build_bundle(root_dir: str) -> Dict[str, Any]:
    apply_oom_guardrail()
    validate_manifest_and_csp(root_dir)

    dist_dir = os.path.join(root_dir, "dist")
    os.makedirs(dist_dir, exist_ok=True)
    zip_path = os.path.join(dist_dir, "accesslens-anna-ui-bundle.zip")
    init_json_path = os.path.join(dist_dir, "bundle-init-payload.json")

    file_map: Dict[str, Dict[str, Any]] = {}
    path_re = re.compile(r"^[A-Za-z0-9_./\-]+$")

    with zipfile.ZipFile(zip_path, "w", compression=zipfile.ZIP_DEFLATED) as zf:
        for rel_path in BUNDLE_RELATIVE_FILES:
            if not path_re.match(rel_path) or ".." in rel_path or rel_path.startswith("/"):
                raise ValueError(f"Unsafe bundle relative path: {rel_path}")
            abs_path = os.path.join(root_dir, rel_path)
            if not os.path.isfile(abs_path):
                raise FileNotFoundError(f"Missing bundle file: {abs_path}")
            with open(abs_path, "rb") as fh:
                raw = fh.read()
            ext = os.path.splitext(rel_path)[1].lower()
            ctype = ALLOWED_BUNDLE_CONTENT_TYPES[ext]
            sha256_hex = hashlib.sha256(raw).hexdigest()

            zf.writestr(rel_path, raw)
            file_map[rel_path] = {
                "byte_size": len(raw),
                "sha256": sha256_hex,
                "content_type": ctype,
            }

    init_payload = {"file_map": file_map}
    with open(init_json_path, "w", encoding="utf-8") as fh:
        json.dump(init_payload, fh, indent=2)

    total_bytes = sum(v["byte_size"] for v in file_map.values())
    summary = {
        "zip_path": zip_path,
        "zip_bytes": os.path.getsize(zip_path),
        "bundle_uncompressed_bytes": total_bytes,
        "file_count": len(file_map),
        "init_payload_path": init_json_path,
        "files": file_map,
    }
    print(
        f"[+] Built {zip_path} ({summary['zip_bytes']} bytes compressed, "
        f"{total_bytes} bytes raw across {len(file_map)} files; Schema-4 & CSP verified)"
    )
    return summary


if __name__ == "__main__":
    repo_root = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    build_bundle(repo_root)
