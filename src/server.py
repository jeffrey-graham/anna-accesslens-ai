#!/usr/bin/env python3
"""
AccessLens AI (`@jeffrey-graham/accesslens-ai`) — Dual Web App + MCP `2024-11-05` Server.
Serves:
  - `GET /` & `GET /assets/*`: Standalone / Anna OS Bundle Preview Web App
  - `GET /api/health` & `GET /api/samples`: Status & 4 real-world domain samples
  - `POST /api/analyze` & `POST /api/html-repair`: REST Accessibility APIs
  - `POST /mcp` or `--stdio`: Standards-compliant MCP `2024-11-05` JSON-RPC 2.0 Server (6 tools)
"""

from __future__ import annotations

import argparse
import json
import mimetypes
import os
import sys
from http.server import BaseHTTPRequestHandler, HTTPServer
from typing import Any, Dict, Optional, Tuple, Union

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from src.accesslens_engine import (  # noqa: E402
    SAMPLE_DOCUMENTS,
    analyze_full_bundle,
    apply_oom_safety_guardrail,
    audit_and_repair_html,
)
from src.mcp_tools import MCP_SERVER_INFO, MCP_TOOLS_SCHEMA, handle_mcp_jsonrpc  # noqa: E402

apply_oom_safety_guardrail()

ASSETS_DIR = os.path.join(ROOT_DIR, "assets")


def dispatch_http_request(
    method: str, path: str, body: Optional[Dict[str, Any]] = None
) -> Tuple[int, str, Union[str, bytes, Dict[str, Any]]]:
    """Core single-worker HTTP & MCP request router."""
    clean_path = path.split("?", 1)[0].split("#", 1)[0]

    if method == "GET" and clean_path in ("/", "/index.html"):
        index_path = os.path.join(ROOT_DIR, "index.html")
        if os.path.exists(index_path):
            with open(index_path, "r", encoding="utf-8") as fh:
                return 200, "text/html; charset=utf-8", fh.read()
        return 404, "application/json", {"error": "index.html not found"}

    if method == "GET" and clean_path.startswith("/assets/"):
        rel = clean_path[len("/assets/") :]
        if ".." in rel or "/" in rel or "\\" in rel:
            return 403, "application/json", {"error": "Invalid asset path"}
        asset_path = os.path.join(ASSETS_DIR, rel)
        if os.path.isfile(asset_path):
            ctype, _ = mimetypes.guess_type(asset_path)
            if asset_path.endswith(".js"):
                ctype = "application/javascript; charset=utf-8"
            elif asset_path.endswith(".css"):
                ctype = "text/css; charset=utf-8"
            with open(asset_path, "rb") as fh:
                return 200, ctype or "application/octet-stream", fh.read()
        return 404, "application/json", {"error": f"Asset not found: {rel}"}

    if method == "GET" and clean_path == "/api/health":
        return (
            200,
            "application/json",
            {
                "status": "ok",
                "app": MCP_SERVER_INFO,
                "mcp_protocol": "2024-11-05",
                "mcp_tools": [t["name"] for t in MCP_TOOLS_SCHEMA],
                "sample_domains": list(SAMPLE_DOCUMENTS.keys()),
            },
        )

    if method == "GET" and clean_path == "/api/samples":
        return 200, "application/json", {"samples": SAMPLE_DOCUMENTS}

    if method == "POST" and clean_path == "/api/analyze":
        payload = body or {}
        text = str(payload.get("text") or SAMPLE_DOCUMENTS["medical"]["text"])
        level = str(payload.get("reading_level") or "grade5")
        domain = payload.get("domain")
        title = str(payload.get("title") or "AccessLens AI Document Brief")
        raw_html = payload.get("html")
        res = analyze_full_bundle(
            text=text,
            reading_level=level,
            domain=domain,
            doc_title=title,
            raw_html=raw_html,
        )
        return 200, "application/json", res

    if method == "POST" and clean_path == "/api/html-repair":
        payload = body or {}
        raw_html = str(payload.get("html") or SAMPLE_DOCUMENTS["medical"]["sample_html"])
        return 200, "application/json", audit_and_repair_html(raw_html)

    if method == "POST" and clean_path == "/mcp":
        rpc_res = handle_mcp_jsonrpc(body or {})
        if rpc_res is None:
            return 202, "application/json", {"status": "accepted"}
        return 200, "application/json", rpc_res

    return 404, "application/json", {"error": f"Route not found: {method} {clean_path}"}


class AccessLensHTTPHandler(BaseHTTPRequestHandler):
    def do_OPTIONS(self) -> None:  # noqa: N802
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type")
        self.end_headers()

    def do_GET(self) -> None:  # noqa: N802
        status, ctype, payload = dispatch_http_request("GET", self.path)
        self._send(status, ctype, payload)

    def do_POST(self) -> None:  # noqa: N802
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length).decode("utf-8") if length > 0 else "{}"
        try:
            body = json.loads(raw) if raw.strip() else {}
        except json.JSONDecodeError:
            body = {}
        status, ctype, payload = dispatch_http_request("POST", self.path, body)
        self._send(status, ctype, payload)

    def _send(self, status: int, ctype: str, payload: Union[str, bytes, Dict[str, Any]]) -> None:
        if isinstance(payload, bytes):
            raw_bytes = payload
        elif isinstance(payload, str):
            raw_bytes = payload.encode("utf-8")
        else:
            raw_bytes = json.dumps(payload, indent=2).encode("utf-8")

        self.send_response(status)
        self.send_header("Content-Type", ctype)
        self.send_header("Content-Length", str(len(raw_bytes)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.end_headers()
        self.wfile.write(raw_bytes)

    def log_message(self, format: str, *args: Any) -> None:  # noqa: A002
        return


def run_stdio_mcp_loop() -> None:
    """Run JSON-RPC 2.0 MCP server over stdin/stdout (single-worker, zero extra threads)."""
    for line in sys.stdin:
        stripped = line.strip()
        if not stripped:
            continue
        try:
            req = json.loads(stripped)
        except json.JSONDecodeError as exc:
            err = {
                "jsonrpc": "2.0",
                "id": None,
                "error": {"code": -32700, "message": f"Parse error: {exc}"},
            }
            sys.stdout.write(json.dumps(err) + "\n")
            sys.stdout.flush()
            continue
        resp = handle_mcp_jsonrpc(req)
        if resp is not None:
            sys.stdout.write(json.dumps(resp) + "\n")
            sys.stdout.flush()


def run_http_server(host: str = "127.0.0.1", port: int = 8092) -> None:
    # Single-process HTTPServer (`workers = 1`) honoring 14 GiB host RAM guardrails
    httpd = HTTPServer((host, port), AccessLensHTTPHandler)
    print(f"[+] AccessLens AI running on http://{host}:{port} (MCP POST /mcp)")
    try:
        httpd.serve_forever()
    finally:
        httpd.server_close()


def main() -> None:
    parser = argparse.ArgumentParser(description="AccessLens AI Web App & MCP 2024-11-05 Server")
    parser.add_argument("--stdio", action="store_true", help="Run MCP 2024-11-05 server over stdio")
    parser.add_argument("--host", default="127.0.0.1", help="HTTP bind host")
    parser.add_argument("--port", type=int, default=int(os.environ.get("PORT", "8092")), help="HTTP port")
    args = parser.parse_args()

    if args.stdio:
        run_stdio_mcp_loop()
    else:
        run_http_server(host=args.host, port=args.port)


if __name__ == "__main__":
    main()
