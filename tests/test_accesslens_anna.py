"""
Comprehensive Unit, Integration, MCP `2024-11-05` & Anna Bundle Verification Suite
for AccessLens AI (`@jeffrey-graham/accesslens-ai`).
"""

from __future__ import annotations

import hashlib
import json
import os
import subprocess
import sys
import unittest
import zipfile

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
if ROOT_DIR not in sys.path:
    sys.path.insert(0, ROOT_DIR)

from scripts.build_anna_bundle import build_bundle, validate_manifest_and_csp  # noqa: E402
from src.accesslens_engine import (  # noqa: E402
    SAMPLE_DOCUMENTS,
    analyze_full_bundle,
    apply_oom_safety_guardrail,
    audit_and_repair_html,
    build_concept_map,
    compute_readability_metrics,
    extract_checklist_and_risks,
    extract_glossary,
    generate_bionic_html,
    simplify_text,
)
from src.mcp_tools import handle_mcp_jsonrpc  # noqa: E402
from src.server import dispatch_http_request  # noqa: E402

apply_oom_safety_guardrail()


class TestAccessLensAnnaSuite(unittest.TestCase):
    # ------------------------------------------------------------------
    # 1. Plain-Language Summary, Reading-Level Modes & Glossary Tests
    # ------------------------------------------------------------------

    def test_01_grade_and_fog_reduction_across_all_four_domains(self) -> None:
        for domain_key, sample in SAMPLE_DOCUMENTS.items():
            res = simplify_text(sample["text"], reading_level="grade5", domain=domain_key)
            self.assertEqual(res["domain"], domain_key)
            before_fk = res["before_metrics"]["flesch_kincaid_grade"]
            after_fk = res["after_metrics"]["flesch_kincaid_grade"]
            before_fog = res["before_metrics"]["gunning_fog_index"]
            after_fog = res["after_metrics"]["gunning_fog_index"]

            self.assertLess(
                after_fk,
                before_fk,
                f"Expected FK grade reduction for {domain_key}: {before_fk} -> {after_fk}",
            )
            self.assertGreaterEqual(res["grade_reduction"], 2.5)
            self.assertLess(after_fog, before_fog)
            self.assertGreaterEqual(len(res["glossary"]), 3)

    def test_02_three_distinct_reading_level_modes(self) -> None:
        med_text = SAMPLE_DOCUMENTS["medical"]["text"]
        g5 = simplify_text(med_text, reading_level="grade5")
        cons = simplify_text(med_text, reading_level="consumer")
        exec_d = simplify_text(med_text, reading_level="executive")

        self.assertIn("irregular, fast heartbeat", g5["simplified_text"])
        self.assertIn("atrial fibrillation (irregular, fast heartbeat)", cons["simplified_text"].lower())
        self.assertTrue(exec_d["simplified_text"].startswith("BOTTOM LINE (MEDICAL):"))
        self.assertIn("KEY THRESHOLDS & DATES:", exec_d["simplified_text"])

    def test_03_inline_defined_term_and_lexicon_glossary(self) -> None:
        custom_contract = (
            'Under this Policy, "Covered Dependent" means any unmarried child under age 26; '
            "disputes require binding arbitration with liquidated damages."
        )
        glossary = extract_glossary(custom_contract)
        terms = {g["canonical"] for g in glossary}
        self.assertIn("covered dependent", terms)
        self.assertIn("binding arbitration", terms)
        self.assertIn("liquidated damages", terms)

    # ------------------------------------------------------------------
    # 2. Action Checklist, Red-Flag Traps & .ics / Markdown Exports
    # ------------------------------------------------------------------

    def test_04_medical_checklist_red_flags_and_ics_export(self) -> None:
        res = extract_checklist_and_risks(
            SAMPLE_DOCUMENTS["medical"]["text"],
            domain="medical",
            doc_title=SAMPLE_DOCUMENTS["medical"]["title"],
        )
        self.assertGreaterEqual(res["action_count"], 4)
        self.assertGreaterEqual(res["red_flag_count"], 3)
        self.assertEqual(res["actions"][0]["priority"], "CRITICAL")
        self.assertIn("BEGIN:VCALENDAR", res["ics_export"])
        self.assertIn("BEGIN:VEVENT", res["ics_export"])
        self.assertIn("BEGIN:VALARM", res["ics_export"])
        self.assertIn("## Prioritized Action Checklist", res["markdown_export"])

    def test_05_legal_auto_renewal_and_indemnity_red_flags(self) -> None:
        res = extract_checklist_and_risks(SAMPLE_DOCUMENTS["legal"]["text"], domain="legal")
        titles = {rf["title"] for rf in res["red_flags"]}
        self.assertIn("Evergreen Auto-Renewal Trap", titles)
        self.assertIn("Uncapped Indemnification & One-Sided Liability", titles)
        self.assertTrue(any("90 days" in a["by_when"] for a in res["actions"]))

    # ------------------------------------------------------------------
    # 3. Dyslexia-Friendly Syllable Dots & Bionic Fixation HTML
    # ------------------------------------------------------------------

    def test_06_bionic_fixation_and_syllable_segmentation(self) -> None:
        html_out = generate_bionic_html(
            "Anticoagulation improves comprehension.", ratio=0.45, syllable_dots=True
        )
        self.assertIn('<strong class="bionic-fix">', html_out)
        self.assertIn("·", html_out)

    # ------------------------------------------------------------------
    # 4. Automated WCAG 2.2 HTML Auditor & Semantic Auto-Repair Engine
    # ------------------------------------------------------------------

    def test_07_wcag_html_audit_and_auto_repair_accuracy(self) -> None:
        broken_html = (
            "<div class='card'>\n"
            "  <img src='/assets/lab-report.png'>\n"
            "  <h4>Lab Results</h4>\n"
            "  <p style='color:#94a3b8; background-color:#e2e8f0'>Fasting glucose elevated</p>\n"
            "  <input type='email' name='patient_email' placeholder='Patient Email'>\n"
            "  <div onclick='acknowledge()'>Acknowledge Report</div>\n"
            "  <a href='/clinical-guide'>click here</a>\n"
            "  <table><tr><td>Glucose</td><td>132 mg/dL</td></tr></table>\n"
            "</div>"
        )
        audit = audit_and_repair_html(broken_html)
        self.assertGreaterEqual(audit["issue_count"], 7)
        self.assertLess(audit["before_score"], 50)
        self.assertEqual(audit["after_score"], 100)

        rep = audit["repaired_html"]
        self.assertIn('alt="Lab Report"', rep)
        self.assertIn("<h1>Lab Results</h1>", rep)
        self.assertIn('color:#0f172a', rep)
        self.assertIn('<label for="a11y-field-1">Patient Email</label>', rep)
        self.assertIn('<button type="button" onclick=\'acknowledge()\'>Acknowledge Report</button>', rep)
        self.assertIn('aria-label="Open Clinical Guide"', rep)
        self.assertIn("<caption>Summary Data Table</caption>", rep)
        self.assertIn('<th scope="row">Glucose</th>', rep)
        self.assertIn('<main id="main-content"', rep)

        # Re-auditing the repaired HTML must find ZERO remaining WCAG violations!
        second_pass = audit_and_repair_html(rep)
        self.assertEqual(second_pass["issue_count"], 0)
        self.assertEqual(second_pass["before_score"], 100)

    # ------------------------------------------------------------------
    # 5. Interactive Concept Map (`<= 24` Nodes Guardrail)
    # ------------------------------------------------------------------

    def test_08_concept_map_respects_24_node_cap_and_aria(self) -> None:
        long_text = " ".join(s["text"] for s in SAMPLE_DOCUMENTS.values())
        cmap = build_concept_map(long_text, doc_title="Combined Stress Corpus", max_nodes=99)
        self.assertLessEqual(len(cmap["nodes"]), 24)
        self.assertGreaterEqual(len(cmap["nodes"]), 8)
        self.assertGreaterEqual(len(cmap["edges"]), 7)
        for node in cmap["nodes"]:
            self.assertTrue(node.get("aria_label"))
            self.assertIn(node["kind"], {"document", "party", "obligation", "deadline", "risk", "concept"})

    # ------------------------------------------------------------------
    # 6. MCP `2024-11-05` JSON-RPC Lifecycle & All 6 Tools + Stdio Mode
    # ------------------------------------------------------------------

    def test_09_mcp_jsonrpc_lifecycle_and_all_six_tools(self) -> None:
        init_res = handle_mcp_jsonrpc({"jsonrpc": "2.0", "id": 1, "method": "initialize", "params": {}})
        self.assertIsNotNone(init_res)
        self.assertEqual(init_res["result"]["protocolVersion"], "2024-11-05")

        # Pure notification without `id` returns None; with `id` returns `{}`
        notif_none = handle_mcp_jsonrpc({"jsonrpc": "2.0", "method": "notifications/initialized"})
        self.assertIsNone(notif_none)
        notif_ack = handle_mcp_jsonrpc({"jsonrpc": "2.0", "id": 2, "method": "notifications/initialized"})
        self.assertEqual(notif_ack["result"], {})

        ping_res = handle_mcp_jsonrpc({"jsonrpc": "2.0", "id": 3, "method": "ping"})
        self.assertEqual(ping_res["result"], {})

        tools_res = handle_mcp_jsonrpc({"jsonrpc": "2.0", "id": 4, "method": "tools/list"})
        tool_names = [t["name"] for t in tools_res["result"]["tools"]]
        expected_tools = [
            "accesslens_simplify_text",
            "accesslens_extract_checklist",
            "accesslens_audit_repair_html",
            "accesslens_build_concept_map",
            "accesslens_readability_metrics",
            "accesslens_glossary_extract",
        ]
        self.assertEqual(tool_names, expected_tools)

        # Call every single MCP tool
        for idx, t_name in enumerate(expected_tools, start=10):
            args = (
                {"html": SAMPLE_DOCUMENTS["legal"]["sample_html"]}
                if t_name == "accesslens_audit_repair_html"
                else {"text": SAMPLE_DOCUMENTS["legal"]["text"]}
            )
            call_res = handle_mcp_jsonrpc(
                {
                    "jsonrpc": "2.0",
                    "id": idx,
                    "method": "tools/call",
                    "params": {"name": t_name, "arguments": args},
                }
            )
            self.assertFalse(call_res["result"]["isError"], f"Tool {t_name} returned error")
            self.assertIn("structuredContent", call_res["result"])

    def test_10_mcp_stdio_transport_roundtrip(self) -> None:
        server_py = os.path.join(ROOT_DIR, "src", "server.py")
        stdin_lines = "\n".join(
            [
                json.dumps({"jsonrpc": "2.0", "id": 1, "method": "initialize"}),
                json.dumps({"jsonrpc": "2.0", "method": "notifications/initialized"}),
                json.dumps({"jsonrpc": "2.0", "id": 2, "method": "ping"}),
            ]
        ) + "\n"
        proc = subprocess.run(
            [sys.executable, server_py, "--stdio"],
            input=stdin_lines,
            text=True,
            capture_output=True,
            timeout=10,
            check=True,
        )
        out_lines = [json.loads(line) for line in proc.stdout.strip().splitlines() if line.strip()]
        self.assertEqual(len(out_lines), 2)
        self.assertEqual(out_lines[0]["result"]["protocolVersion"], "2024-11-05")
        self.assertEqual(out_lines[1]["id"], 2)

    # ------------------------------------------------------------------
    # 7. HTTP Dispatcher & Anna OS Schema-4 Bundle Integrity Verification
    # ------------------------------------------------------------------

    def test_11_http_dispatcher_routes(self) -> None:
        st_root, ctype_root, html_body = dispatch_http_request("GET", "/")
        self.assertEqual(st_root, 200)
        self.assertIn("text/html", ctype_root)
        self.assertIn("AccessLens AI", html_body)

        st_js, ctype_js, js_bytes = dispatch_http_request("GET", "/assets/app.js")
        self.assertEqual(st_js, 200)
        self.assertIn("application/javascript", ctype_js)
        self.assertGreater(len(js_bytes), 5000)

        st_an, _, an_body = dispatch_http_request(
            "POST", "/api/analyze", {"text": SAMPLE_DOCUMENTS["financial"]["text"]}
        )
        self.assertEqual(st_an, 200)
        self.assertEqual(an_body["simplification"]["domain"], "financial")

        st_mcp, _, mcp_body = dispatch_http_request(
            "POST", "/mcp", {"jsonrpc": "2.0", "id": 99, "method": "ping"}
        )
        self.assertEqual(st_mcp, 200)
        self.assertEqual(mcp_body["id"], 99)

    def test_12_anna_schema4_manifest_csp_logo_and_ui_bundle_zip(self) -> None:
        manifest = validate_manifest_and_csp(ROOT_DIR)
        self.assertEqual(manifest["schema"], 4)
        self.assertEqual(manifest["ui"]["bundle"]["entry"], "index.html")
        self.assertEqual(len(manifest["ui"]["views"]), 6)

        summary = build_bundle(ROOT_DIR)
        zip_path = summary["zip_path"]
        self.assertTrue(os.path.isfile(zip_path))

        with zipfile.ZipFile(zip_path, "r") as zf:
            names = set(zf.namelist())
            self.assertEqual(
                names,
                {"index.html", "assets/app.css", "assets/app.js", "assets/app-logo.png"},
            )
            for rel, meta in summary["files"].items():
                raw = zf.read(rel)
                self.assertEqual(len(raw), meta["byte_size"])
                self.assertEqual(hashlib.sha256(raw).hexdigest(), meta["sha256"])

        # Verify 512x512 PNG signature & header dimensions on assets/app-logo.png
        logo_path = os.path.join(ROOT_DIR, "assets", "app-logo.png")
        with open(logo_path, "rb") as fh:
            hdr = fh.read(24)
        self.assertEqual(hdr[:8], b"\x89PNG\r\n\x1a\n")
        width = int.from_bytes(hdr[16:20], "big")
        height = int.from_bytes(hdr[20:24], "big")
        self.assertEqual((width, height), (512, 512))


if __name__ == "__main__":
    unittest.main(verbosity=2)
