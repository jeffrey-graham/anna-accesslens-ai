"""
AccessLens AI — Model Context Protocol (MCP `2024-11-05`) Tool & Resource Server
Exposes all 6 flagship accessibility & plain-language tools for Anna AI OS (`anna.partners`)
and MCP-compatible clients (`POST /mcp` or `--stdio`).
"""

from __future__ import annotations

import json
from typing import Any, Dict, List, Optional

from src.accesslens_engine import (
    JARGON_LEXICON,
    SAMPLE_DOCUMENTS,
    apply_oom_safety_guardrail,
    audit_and_repair_html,
    build_concept_map,
    compute_readability_metrics,
    extract_checklist_and_risks,
    extract_glossary,
    simplify_text,
)

apply_oom_safety_guardrail()

MCP_SERVER_INFO: Dict[str, str] = {
    "name": "accesslens-ai",
    "handle": "@jeffrey-graham/accesslens-ai",
    "version": "1.0.0",
    "vendor": "Anna Founding Builder Program",
    "protocolVersion": "2024-11-05",
}

MCP_TOOLS_SCHEMA: List[Dict[str, Any]] = [
    {
        "name": "accesslens_simplify_text",
        "description": (
            "Transform dense medical, legal, financial, or technical text into plain-language summaries "
            "across 3 reading tiers (`grade5`, `consumer`, `executive`), returning before/after Flesch-Kincaid "
            "and Gunning Fog scores, inline glossary, and Bionic Reading HTML."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "text": {
                    "type": "string",
                    "description": "Dense source document text to simplify.",
                },
                "reading_level": {
                    "type": "string",
                    "enum": ["grade5", "consumer", "executive"],
                    "default": "grade5",
                    "description": "Target cognitive complexity mode.",
                },
                "domain": {
                    "type": "string",
                    "enum": ["medical", "legal", "financial", "technical"],
                    "description": "Optional domain hint (auto-detected if omitted).",
                },
            },
            "required": ["text"],
        },
    },
    {
        "name": "accesslens_extract_checklist",
        "description": (
            "Extract prioritized Who / What / By When action checklists, red-flag clauses/warnings "
            "(auto-renewal traps, contraindications, penalty APRs, CVEs), Markdown export, and RFC 5545 `.ics` calendar."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "text": {
                    "type": "string",
                    "description": "Document text containing obligations, deadlines, or risk clauses.",
                },
                "domain": {
                    "type": "string",
                    "enum": ["medical", "legal", "financial", "technical"],
                },
                "title": {
                    "type": "string",
                    "default": "AccessLens AI Action Plan",
                },
            },
            "required": ["text"],
        },
    },
    {
        "name": "accesslens_audit_repair_html",
        "description": (
            "Audit raw HTML against WCAG 2.2 Level A/AA/AAA criteria (missing alt, unlabeled inputs, "
            "skipped headings, non-semantic onclick divs, low-contrast inline styles, vague links, tables, "
            "landmarks) and generate repaired accessible semantic HTML + unified diff."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "html": {
                    "type": "string",
                    "description": "Raw HTML snippet or document to audit and auto-repair.",
                }
            },
            "required": ["html"],
        },
    },
    {
        "name": "accesslens_build_concept_map",
        "description": (
            "Generate a memory-safe (`<= 24` nodes) interactive Entity, Obligation, Deadline & Risk "
            "Concept Map graph with ARIA descriptions and cause-effect edges."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "text": {
                    "type": "string",
                    "description": "Source document text to map.",
                },
                "domain": {
                    "type": "string",
                    "enum": ["medical", "legal", "financial", "technical"],
                },
                "title": {
                    "type": "string",
                    "default": "Document Concept Map",
                },
                "max_nodes": {
                    "type": "integer",
                    "default": 20,
                    "minimum": 6,
                    "maximum": 24,
                },
            },
            "required": ["text"],
        },
    },
    {
        "name": "accesslens_readability_metrics",
        "description": (
            "Compute syllable-accurate Flesch-Kincaid Grade Level, Gunning Fog Index, Flesch Reading Ease, "
            "average sentence length, complex word count, and estimated reading duration."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "text": {
                    "type": "string",
                    "description": "Text to score for readability.",
                }
            },
            "required": ["text"],
        },
    },
    {
        "name": "accesslens_glossary_extract",
        "description": (
            "Extract medical, legal, financial, and technical jargon terms from text with everyday "
            "plain-English translations and contextual definitions."
        ),
        "inputSchema": {
            "type": "object",
            "properties": {
                "text": {
                    "type": "string",
                    "description": "Source text from which to extract jargon glossary terms.",
                }
            },
            "required": ["text"],
        },
    },
]


def handle_mcp_jsonrpc(request: Dict[str, Any]) -> Optional[Dict[str, Any]]:
    """
    Process an MCP `2024-11-05` JSON-RPC 2.0 request or notification.
    Returns `None` only when `notifications/*` is sent as a pure JSON-RPC notification (no `id`).
    """
    has_id = "id" in request
    req_id = request.get("id", 1)
    method = request.get("method", "")
    params = request.get("params") or {}

    if method == "initialize":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "protocolVersion": "2024-11-05",
                "serverInfo": MCP_SERVER_INFO,
                "capabilities": {
                    "tools": {"listChanged": False},
                    "resources": {"subscribe": False, "listChanged": False},
                },
            },
        }

    if method in ("notifications/initialized", "initialized"):
        if not has_id:
            return None
        return {"jsonrpc": "2.0", "id": req_id, "result": {}}

    if method == "ping":
        return {"jsonrpc": "2.0", "id": req_id, "result": {}}

    if method == "tools/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {"tools": MCP_TOOLS_SCHEMA},
        }

    if method == "resources/list":
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "resources": [
                    {
                        "uri": "anna://accesslens/sample-documents",
                        "name": "AccessLens AI 4-Domain Real-World Sample Corpus",
                        "mimeType": "application/json",
                    },
                    {
                        "uri": "anna://accesslens/jargon-lexicon",
                        "name": "Multi-Domain Plain-Language Jargon Lexicon",
                        "mimeType": "application/json",
                    },
                ]
            },
        }

    if method == "resources/read":
        uri = params.get("uri", "")
        if uri == "anna://accesslens/sample-documents":
            data = SAMPLE_DOCUMENTS
        elif uri == "anna://accesslens/jargon-lexicon":
            data = JARGON_LEXICON
        else:
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "error": {"code": -32602, "message": f"Unknown resource URI: {uri}"},
            }
        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "contents": [
                    {
                        "uri": uri,
                        "mimeType": "application/json",
                        "text": json.dumps(data, indent=2),
                    }
                ]
            },
        }

    if method == "tools/call":
        tool_name = params.get("name", "")
        args = params.get("arguments") or {}
        try:
            default_sample = SAMPLE_DOCUMENTS["medical"]["text"]
            if tool_name == "accesslens_simplify_text":
                text = str(args.get("text") or default_sample)
                level = str(args.get("reading_level") or "grade5")
                domain = args.get("domain")
                payload = simplify_text(text=text, reading_level=level, domain=domain)
            elif tool_name == "accesslens_extract_checklist":
                text = str(args.get("text") or default_sample)
                domain = args.get("domain")
                title = str(args.get("title") or "AccessLens AI Action Plan")
                payload = extract_checklist_and_risks(text=text, domain=domain, doc_title=title)
            elif tool_name == "accesslens_audit_repair_html":
                raw_html = str(args.get("html") or SAMPLE_DOCUMENTS["medical"]["sample_html"])
                payload = audit_and_repair_html(raw_html=raw_html)
            elif tool_name == "accesslens_build_concept_map":
                text = str(args.get("text") or default_sample)
                domain = args.get("domain")
                title = str(args.get("title") or "Document Concept Map")
                max_nodes = int(args.get("max_nodes", 20))
                payload = build_concept_map(
                    text=text, domain=domain, doc_title=title, max_nodes=max_nodes
                )
            elif tool_name == "accesslens_readability_metrics":
                text = str(args.get("text") or default_sample)
                payload = compute_readability_metrics(text=text)
            elif tool_name == "accesslens_glossary_extract":
                text = str(args.get("text") or default_sample)
                glossary = extract_glossary(text=text)
                payload = {"count": len(glossary), "glossary": glossary}
            else:
                return {
                    "jsonrpc": "2.0",
                    "id": req_id,
                    "error": {"code": -32601, "message": f"Unknown MCP tool: {tool_name}"},
                }
        except (ValueError, TypeError, KeyError) as exc:
            return {
                "jsonrpc": "2.0",
                "id": req_id,
                "result": {
                    "content": [{"type": "text", "text": f"Tool execution error: {exc}"}],
                    "isError": True,
                },
            }

        return {
            "jsonrpc": "2.0",
            "id": req_id,
            "result": {
                "content": [{"type": "text", "text": json.dumps(payload, indent=2)}],
                "structuredContent": payload,
                "isError": False,
            },
        }

    return {
        "jsonrpc": "2.0",
        "id": req_id,
        "error": {"code": -32601, "message": f"Method not found: {method}"},
    }
