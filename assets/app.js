/**
 * AccessLens AI (`@jeffrey-graham/accesslens-ai`)
 * Complete Zero-Dependency ES Module SPA + Anna OS Host SDK Bridge (`AnnaAppRuntime`)
 *
 * Capabilities:
 *  1. Plain-Language Translator (5th-Grade, Consumer Brief, Executive Digest) + FK & Gunning Fog + Inline Glossary
 *  2. Action Checklist (Who / What / By When) + Red-Flag Trap Extractor + `.ics` & Markdown + Anna APS Memory
 *  3. Dyslexia-Friendly, ADHD Bionic-Focus, Syllable-Dot & Animated Line-Ruler Studio (WCAG 2.2 AAA)
 *  4. Automated WCAG 2.2 HTML Accessibility Auditor & Semantic Auto-Repair Engine + Diff
 *  5. Synchronized Sentence & Word Karaoke Narration (`speechSynthesis` + Anna Host `audio.speak` TTS)
 *  6. Interactive Visual Concept Map (`<= 24` crisp keyboard-navigable SVG nodes & cause-effect edges)
 */

// ---------------------------------------------------------------------------
// 1. Curated Multi-Domain Jargon Lexicon & 4 Real-World Sample Documents
// ---------------------------------------------------------------------------

const JARGON_LEXICON = {
  "atrial fibrillation": {
    domain: "medical",
    plain: "irregular, fast heartbeat",
    definition: "A heart rhythm condition where the upper chambers beat out of sync, raising stroke risk if untreated."
  },
  "anticoagulation": {
    domain: "medical",
    plain: "blood-thinning treatment",
    definition: "Medicine therapy that helps prevent dangerous blood clots from forming in blood vessels or the heart."
  },
  "contraindicated": {
    domain: "medical",
    plain: "unsafe and must NOT be taken together",
    definition: "A strong medical warning that a drug or procedure can cause serious harm in your situation."
  },
  "concomitant administration": {
    domain: "medical",
    plain: "taking at the same time",
    definition: "Using two or more medicines during the same treatment period."
  },
  "nonsteroidal anti-inflammatory drugs": {
    domain: "medical",
    plain: "common pain relievers like ibuprofen or naproxen (NSAIDs)",
    definition: "Anti-inflammatory pain medicines (such as ibuprofen, naproxen, or ketorolac) that increase bleeding risk."
  },
  "hemoptysis": {
    domain: "medical",
    plain: "coughing up blood",
    definition: "Spitting or coughing up blood or blood-stained mucus from the lungs or airway."
  },
  "melena": {
    domain: "medical",
    plain: "black, tarry stools (a sign of internal bleeding)",
    definition: "Dark, tar-like bowel movements caused by bleeding in the stomach or upper digestive tract."
  },
  "dyspnea": {
    domain: "medical",
    plain: "shortness of breath",
    definition: "Difficulty breathing or feeling winded at rest or with light activity."
  },
  "prior authorization": {
    domain: "medical",
    plain: "advance insurance approval",
    definition: "Formal approval your doctor must get from your health plan before it will pay for a medicine or test."
  },
  "explanation of benefits": {
    domain: "medical",
    plain: "insurance coverage breakdown (not a bill)",
    definition: "A statement from your insurer showing what was billed, what the plan paid, and what you may owe."
  },
  "renal function panel": {
    domain: "medical",
    plain: "kidney blood test",
    definition: "A routine blood draw that checks how well your kidneys filter waste and medicine."
  },
  "indemnify, defend, and hold harmless": {
    domain: "legal",
    plain: "pay all legal costs, lawsuits, and damages for the other side",
    definition: "A promise to cover another party's legal defense bills and settlement costs if a claim happens."
  },
  "indemnify and hold harmless": {
    domain: "legal",
    plain: "protect from legal costs and blame",
    definition: "A contract rule requiring you to pay the other side's losses or legal bills."
  },
  "automatically renew": {
    domain: "legal",
    plain: "lock you into another paid term automatically unless you cancel early",
    definition: "An evergreen clause that restarts your contract and charges you again unless cancelled before the cutoff date."
  },
  "liquidated damages": {
    domain: "legal",
    plain: "pre-set penalty fees",
    definition: "A fixed dollar penalty written into a contract that you must pay if you break rules or pay late."
  },
  "consequential or punitive damages": {
    domain: "legal",
    plain: "indirect business losses or punishment payouts",
    definition: "Damages beyond direct bills, such as lost profits, downtime costs, or court penalties."
  },
  "binding arbitration": {
    domain: "legal",
    plain: "private dispute settlement outside court (no jury trial)",
    definition: "A requirement to resolve disagreements before a private arbitrator instead of suing in public court."
  },
  "class-action waiver": {
    domain: "legal",
    plain: "giving up the right to join a group lawsuit",
    definition: "A clause that forces you to bring claims alone rather than teaming up with other customers."
  },
  "notwithstanding anything to the contrary": {
    domain: "legal",
    plain: "overriding every other rule in this document",
    definition: "Legal phrasing meaning this specific clause wins even if another section says the opposite."
  },
  "sole and absolute discretion": {
    domain: "legal",
    plain: "complete one-sided control without needing your approval",
    definition: "Gives one party the power to decide something entirely on its own."
  },
  "annual percentage rate": {
    domain: "financial",
    plain: "yearly borrowing cost (APR)",
    definition: "The total yearly interest rate and mandatory fees charged when you carry a loan or credit balance."
  },
  "trailing residual interest": {
    domain: "financial",
    plain: "extra daily interest billed even after your statement arrives",
    definition: "Interest that accrues each day between the date your bill is printed and the day your payment clears."
  },
  "debt-service coverage ratio": {
    domain: "financial",
    plain: "cash-flow cushion compared to loan payments (DSCR)",
    definition: "Operating cash flow divided by total debt payments; falling below the minimum can trigger loan default."
  },
  "yield-maintenance prepayment penalty": {
    domain: "financial",
    plain: "fee charged for paying off the loan early",
    definition: "A lump-sum fee designed to pay the lender the interest they would have earned if you had not paid early."
  },
  "cross-default": {
    domain: "financial",
    plain: "one late loan triggers default on your other loans too",
    definition: "A clause stating that missing terms on one debt lets the lender declare linked loans in default immediately."
  },
  "basis points": {
    domain: "financial",
    plain: "hundredths of a percent (100 bps = 1.00%)",
    definition: "A finance unit for interest rate changes where 1 basis point equals 0.01%."
  },
  "server-side request forgery": {
    domain: "technical",
    plain: "tricking a server into fetching private internal URLs (SSRF)",
    definition: "A security flaw where an attacker makes a server send requests to internal cloud metadata or private networks."
  },
  "asymmetric signature verification": {
    domain: "technical",
    plain: "cryptographic key check proving a login token is genuine",
    definition: "Validating digital signatures with a public/private key pair so attackers cannot forge identity tokens."
  },
  "ephemeral signing keys": {
    domain: "technical",
    plain: "short-lived security keys that rotate regularly",
    definition: "Temporary cryptographic keys replaced on a schedule so a leaked key quickly becomes useless."
  },
  "idempotent": {
    domain: "technical",
    plain: "safe to retry multiple times without duplicate side effects",
    definition: "An operation that produces the exact same result whether it runs once or is retried several times."
  },
  "exponential backoff with jitter": {
    domain: "technical",
    plain: "waiting progressively longer (plus a small random delay) between retries",
    definition: "A retry strategy that spaces out failed requests so recovering servers are not overwhelmed all at once."
  },
  "egress cidr": {
    domain: "technical",
    plain: "outbound IP address range filter",
    definition: "Network firewall rules controlling which destination IP ranges a server is allowed to contact."
  }
};

const SAMPLE_DOCUMENTS = {
  medical: {
    id: "medical",
    domain: "medical",
    title: "Cardiology Discharge Instructions & Anticoagulation Prior-Auth Notice",
    text:
      "Subsequent to hospitalization for paroxysmal atrial fibrillation, the patient must commence oral anticoagulation with apixaban 5 mg administered orally twice daily (BID) to mitigate thromboembolic stroke risk. Concomitant administration of nonsteroidal anti-inflammatory drugs (including ibuprofen, naproxen, and ketorolac) is strictly contraindicated due to severe gastrointestinal hemorrhage risk. The patient must complete a renal function panel at Quest Lab prior to November 23, 2026, and attend the Cardiology Clinic follow-up within 7 days of discharge. In the event that the patient experiences hemoptysis, melena, or acute dyspnea, the patient or caregiver must seek emergency medical care forthwith. Pursuant to the attached Explanation of Benefits, extended-release brand coverage requires prior authorization; the patient or prescribing clinician must submit the clinical appeal form within 30 days to avoid $480 monthly out-of-pocket charges.",
    sampleHtml:
      "<div class='portal-card'>\n  <img src='/static/cardiology-chart.png'>\n  <h4>Patient Discharge & Refill Portal</h4>\n  <p style='color:#94a3b8; background-color:#cbd5e1'>Refill authorization expires in 30 days.</p>\n  <input type='text' name='member_id' placeholder='Enter Insurance Member ID'>\n  <div class='btn' onclick='submitRefill()'>Submit Appeal</div>\n  <a href='/eob-pdf'>click here</a>\n</div>"
  },
  legal: {
    id: "legal",
    domain: "legal",
    title: "Enterprise SaaS Master Subscription Agreement — Renewal & Liability Addendum",
    text:
      "Notwithstanding anything to the contrary, this Subscription Term shall automatically renew for successive twenty-four (24) month periods unless Customer delivers written non-renewal notice at least ninety (90) days prior to the expiration of the current term. Upon each renewal, Vendor may, in its sole and absolute discretion, increase annual subscription fees by up to twelve percent (12%). Customer shall indemnify, defend, and hold harmless Vendor from any third-party intellectual property or data processing claims without monetary cap; however, Vendor excludes all consequential or punitive damages. Customer must remit payment within thirty (30) days of invoice receipt or incur liquidated damages equal to 1.5% monthly interest. All disputes are subject to binding arbitration in Delaware with a mandatory class-action waiver.",
    sampleHtml:
      "<div id='contract-modal'>\n  <h3>Enterprise Subscription Checkout</h3>\n  <h6>Auto-Renewal & Arbitration Consent</h6>\n  <p style='color:#a1a1aa; background:#f4f4f5'>90-day written cancellation notice required.</p>\n  <input type='checkbox' name='accept_msa'>\n  <span onclick='acceptContract()'>Accept & Bind Organization</span>\n</div>"
  },
  financial: {
    id: "financial",
    domain: "financial",
    title: "Revolving Credit Facility Truth-in-Lending & Covenant Risk Disclosure",
    text:
      "Prior to promotional expiration on December 15, 2026, the introductory annual percentage rate is 8.90%; subsequent to any payment received more than five (5) days past the due date, a penalty annual percentage rate of 29.99% (an increase of 2,109 basis points) shall apply to the entire outstanding principal balance. Even if Borrower pays the statement balance in full next cycle, trailing residual interest accrues daily until settlement clears. Borrower must maintain a minimum quarterly debt-service coverage ratio of 1.25x and submit audited financial statements within 45 days of quarter-end. Early payoff within the first eighteen months triggers a 3.0% yield-maintenance prepayment penalty, and any missed covenant triggers cross-default across affiliated equipment leases.",
    sampleHtml:
      "<div>\n  <h4>APR & Covenant Summary</h4>\n  <table><tr><td>Penalty APR</td><td>29.99%</td></tr></table>\n  <p style='color:#9ca3af; background:#ffffff'>Residual interest applies daily until cleared.</p>\n  <input type='number' placeholder='Wire payoff amount USD'>\n  <div onclick='schedulePayoff()'>Calculate Early Payoff</div>\n</div>"
  },
  technical: {
    id: "technical",
    domain: "technical",
    title: "Critical Security Advisory CVE-2026-4812 — Token Verification & SSRF Mitigation",
    text:
      "A critical vulnerability in gateway versions prior to v4.8.3 permits unauthenticated attackers to bypass asymmetric signature verification via malformed JWK headers and chain server-side request forgery against internal cloud metadata endpoints. Platform engineering teams must upgrade all edge clusters to v4.8.3 within 48 hours and rotate ephemeral signing keys forthwith. Operators must restrict outbound egress CIDR blocks to block 169.254.169.254 prior to re-enabling webhook relays. During rolling restarts, downstream workers must utilize idempotent request keys and exponential backoff with jitter so transient 503 responses do not trigger cascading retry storms.",
    sampleHtml:
      "<div class='advisory-banner'>\n  <img src='/icons/severity-critical.svg'>\n  <h5>CVE-2026-4812 Hotfix Rollout</h5>\n  <span style='color:#fbbf24; background:#fef3c7'>Patch edge nodes within 48h</span>\n  <select name='cluster_region'><option>us-east-1</option></select>\n  <div onclick='triggerKeyRotation()'>Rotate Signing Keys</div>\n</div>"
  }
};

const PLAIN_SUBSTITUTIONS = [
  [/\bsubsequent to hospitalization for\b/gi, "after your hospital stay for"],
  [/\bsubsequent to\b/gi, "after"],
  [/\bprior to\b/gi, "before"],
  [/\bpursuant to\b/gi, "under"],
  [/\bin the event that\b/gi, "if"],
  [/\bnotwithstanding anything to the contrary,?\b/gi, "above all else,"],
  [/\bnotwithstanding the foregoing,?\b/gi, "even with the rules above,"],
  [/\bconcomitant administration of\b/gi, "taking"],
  [/\badministered orally twice daily \(BID\)\b/gi, "by mouth twice a day"],
  [/\badministered orally\b/gi, "taken by mouth"],
  [/\badminister orally\b/gi, "take by mouth"],
  [/\btwice daily \(BID\)\b/gi, "twice a day"],
  [/\bBID\b/g, "twice a day"],
  [/\butilize[ds]?\b/gi, "use"],
  [/\bdemonstrate[ds]?\b/gi, "showed"],
  [/\bameliorate[ds]?\b/gi, "improved"],
  [/\bexacerbate[ds]?\b/gi, "worsened"],
  [/\bcommence[ds]?\b/gi, "start"],
  [/\bterminate[ds]?\b/gi, "end"],
  [/\bremit payment\b/gi, "pay"],
  [/\bincur(?:s|red)?\b/gi, "face"],
  [/\bforthwith\b/gi, "right away"],
  [/\bshall be deemed\b/gi, "counts as"],
  [/\bshall\b/gi, "must"],
  [/\bpermits unauthenticated attackers to\b/gi, "lets outside hackers"],
  [/\bcritical vulnerability\b/gi, "major security flaw"],
  [/\bplatform engineering teams\b/gi, "tech teams"],
  [/\bdownstream workers\b/gi, "worker servers"],
  [/\bcascading retry storms\b/gi, "server overload"],
  [/\boutbound egress CIDR blocks\b/gi, "outbound IP rules"],
  [/\bpromotional expiration\b/gi, "promo end date"],
  [/\boutstanding principal balance\b/gi, "full loan balance"],
  [/\baudited financial statements\b/gi, "checked money reports"],
  [/\baffiliated equipment leases\b/gi, "linked gear leases"],
  [/\bprescribing clinician\b/gi, "doctor"]
];

const GRADE5_COMPACT_SWAPS = {
  "atrial fibrillation": "irregular, fast heartbeat",
  "anticoagulation": "blood thinners",
  "contraindicated": "unsafe",
  "nonsteroidal anti-inflammatory drugs": "NSAID pain pills",
  "hemoptysis": "coughing blood",
  "melena": "black stools",
  "dyspnea": "shortness of breath",
  "prior authorization": "insurance pre-approval",
  "explanation of benefits": "coverage summary",
  "renal function panel": "kidney blood test",
  "indemnify, defend, and hold harmless": "pay all legal costs for",
  "indemnify and hold harmless": "pay legal costs for",
  "automatically renew": "renew on its own",
  "liquidated damages": "late penalty fees",
  "consequential or punitive damages": "indirect losses",
  "binding arbitration": "private arbitration",
  "class-action waiver": "no group lawsuits",
  "sole and absolute discretion": "full one-sided control",
  "annual percentage rate": "yearly rate (APR)",
  "trailing residual interest": "extra daily interest",
  "debt-service coverage ratio": "cash-flow ratio",
  "yield-maintenance prepayment penalty": "early payoff fee",
  "cross-default": "linked loan default",
  "basis points": "basis points",
  "asymmetric signature verification": "login key checks",
  "server-side request forgery": "fake internal web requests",
  "ephemeral signing keys": "short-lived keys",
  "idempotent": "repeat-safe",
  "exponential backoff with jitter": "spaced-out retry waits",
  "egress cidr": "IP filter"
};

const RED_FLAG_RULES = [
  {
    pattern: /\bcontraindicated\b|\bhemorrhage\b|\bbleeding\b/i,
    severity: "CRITICAL",
    title: "Dangerous Medication / Bleeding Interaction",
    explanation: "Taking restricted pain relievers (NSAIDs like ibuprofen or naproxen) alongside this blood thinner can cause severe internal bleeding."
  },
  {
    pattern: /\bhemoptysis\b|\bmelena\b|\bemergency\b/i,
    severity: "CRITICAL",
    title: "Emergency Red-Flag Symptoms",
    explanation: "Coughing up blood, black tarry stools, or sudden shortness of breath require immediate emergency medical attention."
  },
  {
    pattern: /\bautomatically renew\b|\bnon-renewal notice\b/i,
    severity: "HIGH",
    title: "Evergreen Auto-Renewal Trap",
    explanation: "Automatically locks you into a new multi-year commitment unless written cancellation is delivered before the notice cutoff."
  },
  {
    pattern: /\bindemnify\b[\s\S]*?\bwithout monetary cap\b|\bindemnify, defend, and hold harmless\b/i,
    severity: "CRITICAL",
    title: "Uncapped Indemnification & One-Sided Liability",
    explanation: "Exposes your side to unlimited legal defense bills while the vendor excludes consequential damages."
  },
  {
    pattern: /\bsole and absolute discretion\b[\s\S]*?\bincrease\b|\bincrease annual subscription fees\b/i,
    severity: "HIGH",
    title: "Unilateral Renewal Price Uplift",
    explanation: "Allows the vendor to raise recurring fees automatically upon renewal without your consent."
  },
  {
    pattern: /\bbinding arbitration\b|\bclass-action waiver\b/i,
    severity: "MEDIUM",
    title: "Jury Trial & Class-Action Rights Waived",
    explanation: "Mandates private arbitration and prevents joining group lawsuits with other affected customers."
  },
  {
    pattern: /\bpenalty annual percentage rate\b|\b29\.99%\b/i,
    severity: "CRITICAL",
    title: "Penalty APR Rate Spike Trigger",
    explanation: "A single payment more than 5 days late reprices your entire loan balance to a punitive 29.99% APR."
  },
  {
    pattern: /\btrailing residual interest\b/i,
    severity: "HIGH",
    title: "Hidden Trailing Residual Interest",
    explanation: "Daily interest keeps accruing between statement printing and payment settlement even when you pay the bill in full."
  },
  {
    pattern: /\byield-maintenance prepayment penalty\b|\bcross-default\b/i,
    severity: "HIGH",
    title: "Early Payoff Penalty & Cross-Default Risk",
    explanation: "Paying off early triggers a lump-sum fee, and missing covenants can default affiliated equipment leases."
  },
  {
    pattern: /\bprior authorization\b|\bappeal\b[\s\S]*?\bout-of-pocket\b/i,
    severity: "HIGH",
    title: "Insurance Coverage Denial / Out-of-Pocket Cliff",
    explanation: "Missing the 30-day appeal window can expose you to steep monthly out-of-pocket prescription bills."
  },
  {
    pattern: /\bunauthenticated\b[\s\S]*?\bbypass\b|\bserver-side request forgery\b|\bCVE-\d{4}-\d+\b/i,
    severity: "CRITICAL",
    title: "Active Zero-Day Auth Bypass & SSRF Exposure",
    explanation: "Unpatched gateways permit forged identity tokens and internal cloud metadata credential theft (169.254.169.254)."
  }
];

// ---------------------------------------------------------------------------
// 2. Deterministic Client-Side Engines (Mirrors `src/accesslens_engine.py`)
// ---------------------------------------------------------------------------

function escapeHtml(str) {
  return String(str || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeRegExp(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function hashText(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return "doc_" + (h >>> 0).toString(16);
}

function countSyllables(word) {
  let clean = word.toLowerCase().replace(/[^a-z]/g, "");
  if (clean.length <= 3) return 1;
  clean = clean.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, "").replace(/^y/, "");
  const vowels = clean.match(/[aeiouy]{1,2}/g);
  return Math.max(1, vowels ? vowels.length : 1);
}

function splitSyllablesVisual(word) {
  const m = word.match(/^([^A-Za-z]*)([A-Za-z]+)([^A-Za-z]*)$/);
  if (!m || m[2].length < 7) return word;
  const segmented = m[2].replace(
    /([aeiouyAEIOUY][^aeiouyAEIOUY])(?=[bcdfghjklmnpqrstvwxzBCDFGHJKLMNPQRSTVWXZ][aeiouyAEIOUY])/g,
    "$1·"
  );
  return m[1] + segmented + m[3];
}

function splitSentences(text) {
  const norm = String(text || "").replace(/\s+/g, " ").trim();
  if (!norm) return [];
  const prot = norm.replace(/\b(Dr|Mr|Ms|Mrs|Inc|Ltd|vs|e\.g|i\.e)\./gi, "$1<DOT>");
  return prot
    .split(/(?<=[.!?])\s+/)
    .map(s => s.replace(/<DOT>/g, ".").trim())
    .filter(Boolean);
}

function computeReadabilityMetrics(text) {
  const words = String(text || "").match(/[A-Za-z0-9'-]+/g) || [];
  const sentences = splitSentences(text);
  const wc = Math.max(1, words.length);
  const sc = Math.max(1, sentences.length);
  let syllables = 0;
  let complex = 0;

  for (const w of words) {
    syllables += countSyllables(w);
    const alpha = w.replace(/[^A-Za-z]/g, "");
    if (alpha.length > 4 && !w.includes("-")) {
      const stem = alpha.toLowerCase().replace(/(?:ing|ed|es)$/, "");
      if (countSyllables(stem) >= 3 && alpha[0] === alpha[0].toLowerCase()) {
        complex += 1;
      }
    }
  }

  const asl = wc / sc;
  const asw = syllables / wc;
  const complexPct = (complex / wc) * 100;
  const ease = Math.max(0, Math.min(100, +(206.835 - 1.015 * asl - 84.6 * asw).toFixed(1)));
  const fkGrade = Math.max(1.0, +(0.39 * asl + 11.8 * asw - 15.59).toFixed(1));
  const fog = Math.max(1.0, +(0.4 * (asl + complexPct)).toFixed(1));
  const seconds = Math.max(5, Math.round((words.length / 185) * 60));

  let band = "Dense Specialist / Post-Graduate Jargon";
  if (fkGrade <= 6.5) band = "Everyday Plain English (5th–6th Grade)";
  else if (fkGrade <= 9.5) band = "Clear Consumer Standard (7th–9th Grade)";
  else if (fkGrade <= 12.5) band = "High-School / Professional Brief";

  return {
    word_count: words.length,
    sentence_count: sentences.length,
    syllable_count: syllables,
    complex_word_count: complex,
    avg_words_per_sentence: +asl.toFixed(1),
    flesch_reading_ease: ease,
    flesch_kincaid_grade: fkGrade,
    gunning_fog_index: fog,
    estimated_reading_seconds: seconds,
    difficulty_band: band
  };
}

function detectDomain(text, explicitDomain) {
  if (explicitDomain && ["medical", "legal", "financial", "technical"].includes(explicitDomain)) {
    return explicitDomain;
  }
  const lower = String(text || "").toLowerCase();
  const buckets = {
    medical: ["patient", "mg", "discharge", "clinic", "contraindicated", "bleeding", "insurance", "hospital"],
    legal: ["agreement", "indemnify", "arbitration", "renew", "vendor", "customer", "damages", "waiver"],
    financial: ["apr", "interest", "borrower", "loan", "covenant", "balance", "basis points", "prepayment"],
    technical: ["cve-", "cluster", "server", "signature", "cidr", "webhook", "backoff", "upgrade", "keys"]
  };
  let best = "general";
  let bestScore = 0;
  for (const [dom, kws] of Object.entries(buckets)) {
    const score = kws.reduce((acc, k) => acc + (lower.includes(k) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      best = dom;
    }
  }
  return best;
}

function extractGlossary(text) {
  const src = String(text || "");
  const found = [];
  const seen = new Set();
  const sortedTerms = Object.keys(JARGON_LEXICON).sort((a, b) => b.length - a.length);

  for (const term of sortedTerms) {
    const re = new RegExp(escapeRegExp(term), "i");
    const m = src.match(re);
    if (m && !seen.has(term)) {
      seen.add(term);
      const info = JARGON_LEXICON[term];
      found.push({
        term: m[0],
        canonical: term,
        domain: info.domain,
        plain: info.plain,
        definition: info.definition
      });
    }
  }

  const defRegex = /"([A-Za-z][A-Za-z0-9\s-]{2,35})"\s+means\s+([^.;]+)/g;
  let dm;
  while ((dm = defRegex.exec(src)) !== null) {
    const t = dm[1].trim();
    if (!seen.has(t.toLowerCase())) {
      seen.add(t.toLowerCase());
      found.push({
        term: t,
        canonical: t.toLowerCase(),
        domain: "defined-term",
        plain: dm[2].trim().slice(0, 72),
        definition: `Document-defined term: ${dm[2].trim()}.`
      });
    }
  }
  return found;
}

function breakClausesGrade5(text) {
  let out = text
    .replace(/;\s*(?:however|nevertheless|nonetheless),?\s*/gi, ". However, ")
    .replace(/;\s*(?:furthermore|moreover|consequently|therefore),?\s*/gi, ". Also, ")
    .replace(/;\s*/g, ". ")
    .replace(/,\s*(?:whereby|wherein|inasmuch as)\s+/gi, ". This means ")
    .replace(/\s+unless\s+/gi, ". To stop this, make sure ")
    .replace(/\s+due to\s+/gi, " because of ")
    .replace(/\s+to mitigate\s+/gi, " to lower ")
    .replace(/\s+and chain\s+/gi, ". They can also run ")
    .replace(/\s+so transient\s+/gi, ". That way, brief ");

  const finalSents = [];
  for (const sent of splitSentences(out)) {
    const words = sent.split(/\s+/);
    let splitDone = false;
    if (words.length > 17) {
      const splitRules = [
        [", and ", ""],
        [" and attend ", "You must also attend "],
        [" and rotate ", "They must also rotate "],
        [" and submit ", "You must also send "],
        [" to avoid ", "This avoids "],
        [" or face ", "Otherwise you face "]
      ];
      for (const [sep, lead] of splitRules) {
        if (sent.includes(sep)) {
          const idx = sent.indexOf(sep);
          const p1 = sent.slice(0, idx).trim().replace(/\.$/, "") + ".";
          const p2Raw = (lead + sent.slice(idx + sep.length).trim()).trim();
          if (p2Raw) {
            finalSents.push(p1, p2Raw[0].toUpperCase() + p2Raw.slice(1).replace(/\.?$/, "."));
            splitDone = true;
            break;
          }
        }
      }
    }
    if (splitDone) continue;
    finalSents.push(sent[0].toUpperCase() + sent.slice(1).replace(/\.?$/, "."));
  }
  return finalSents.join(" ");
}

function simplifyDocument(text, readingLevel = "grade5", domainHint = null) {
  const src = String(text || "").trim();
  const domain = detectDomain(src, domainHint === "auto" ? null : domainHint);
  const glossary = extractGlossary(src);
  const beforeMetrics = computeReadabilityMetrics(src);

  let grade5 = src.replace(/\b[a-z-]+\s*\((\d+%?)\)/gi, "$1");
  for (const [pat, repl] of PLAIN_SUBSTITUTIONS) {
    grade5 = grade5.replace(pat, repl);
  }
  for (const term of Object.keys(JARGON_LEXICON).sort((a, b) => b.length - a.length)) {
    const swap = GRADE5_COMPACT_SWAPS[term] || JARGON_LEXICON[term].plain;
    grade5 = grade5.replace(new RegExp(escapeRegExp(term), "gi"), swap);
  }
  grade5 = grade5
    .replace(/\bparoxysmal\b\s*/gi, "")
    .replace(/\bthromboembolic\b\s*/gi, "")
    .replace(/\bgastrointestinal hemorrhage\b/gi, "stomach bleeding")
    .replace(/\bthe patient\b/gi, "you")
    .replace(/\bCustomer\b/g, "you")
    .replace(/\bBorrower\b/g, "you")
    .replace(/\byou experiences\b/gi, "you have")
    .replace(/\byou pays\b/gi, "you pay")
    .replace(/\byou delivers\b/gi, "you send")
    .replace(/\s+/g, " ")
    .trim();
  grade5 = breakClausesGrade5(grade5);

  let consumer = src.replace(/\b[a-z-]+\s*\((\d+)\)/gi, "$1");
  for (const [pat, repl] of PLAIN_SUBSTITUTIONS.slice(0, 12)) {
    consumer = consumer.replace(pat, repl);
  }
  for (const g of glossary.slice(0, 7)) {
    consumer = consumer.replace(new RegExp(escapeRegExp(g.term), "i"), `${g.term} (${g.plain})`);
  }
  consumer = consumer.replace(/;\s*/g, ". ");

  const g5Sents = splitSentences(grade5);
  const nums = Array.from(
    new Set(
      src.match(/(?:\$\d[\d,.]*|\d+(?:\.\d+)?%|\d+\s*(?:days?|hours?|months?|mg|x)\b|v\d+\.\d+\.\d+|CVE-\d{4}-\d+)/gi) || []
    )
  );
  const execLines = [
    `BOTTOM LINE (${domain.toUpperCase()}): ${g5Sents[0] || grade5}`,
    ...g5Sents.slice(1, 4).map(s => `• ${s}`)
  ];
  if (nums.length) {
    execLines.push(`KEY NUMBERS & DEADLINES: ${nums.slice(0, 6).join(" · ")}.`);
  }
  const executive = execLines.join("\n");

  const modes = { grade5, consumer, executive };
  const activeMode = modes[readingLevel] ? readingLevel : "grade5";
  const simplifiedText = modes[activeMode];
  const afterMetrics = computeReadabilityMetrics(simplifiedText);

  return {
    domain,
    reading_level: activeMode,
    original_text: src,
    simplified_text: simplifiedText,
    modes,
    before_metrics: beforeMetrics,
    after_metrics: afterMetrics,
    grade_reduction: Math.max(0, +(beforeMetrics.flesch_kincaid_grade - afterMetrics.flesch_kincaid_grade).toFixed(1)),
    fog_reduction: Math.max(0, +(beforeMetrics.gunning_fog_index - afterMetrics.gunning_fog_index).toFixed(1)),
    glossary
  };
}

function renderBionicParagraphsHtml(text, ratio = 0.45, syllableDots = false, focusedIdx = 0) {
  const sentences = splitSentences(text);
  // Group every 2 sentences into comfortable cognitive paragraphs
  const paragraphs = [];
  for (let i = 0; i < sentences.length; i += 2) {
    paragraphs.push(sentences.slice(i, i + 2).join(" "));
  }
  if (!paragraphs.length && text) paragraphs.push(text);

  return paragraphs
    .map((para, pIdx) => {
      const tokens = para.split(/(\s+)/);
      const inner = tokens
        .map(tok => {
          if (!tok || /^\s+$/.test(tok)) return tok;
          const visualTok = syllableDots ? splitSyllablesVisual(tok) : tok;
          if (ratio <= 0) return escapeHtml(visualTok);
          const alphaLen = visualTok.replace(/[^A-Za-z0-9]/g, "").length;
          let plen = 1;
          if (alphaLen > 5) plen = Math.max(2, Math.round(visualTok.length * ratio));
          else if (alphaLen > 2) plen = 2;
          return `<strong class="bionic-fix">${escapeHtml(visualTok.slice(0, plen))}</strong>${escapeHtml(visualTok.slice(plen))}`;
        })
        .join("");
      const cls = pIdx === focusedIdx ? "dyslexia-para is-focused-para" : "dyslexia-para";
      return `<p class="${cls}" data-para-idx="${pIdx}">${inner}</p>`;
    })
    .join("");
}

function inferActor(clause, domain) {
  const l = clause.toLowerCase();
  if (l.includes("patient or caregiver")) return "Patient / Caregiver";
  if (l.includes("clinician") || l.includes("prescribing")) return "Patient & Prescribing Doctor";
  if (l.includes("patient")) return "Patient";
  if (l.includes("customer")) return "Customer / Legal Ops";
  if (l.includes("borrower")) return "Borrower / Finance Team";
  if (l.includes("engineering") || l.includes("operators") || l.includes("workers")) return "Platform / Security Ops";
  return {
    medical: "Patient / Caregiver",
    legal: "Contract Owner / Legal",
    financial: "Account Holder / Finance",
    technical: "Engineering / SRE"
  }[domain] || "Document Reader";
}

function extractDeadlineInfo(clause) {
  const mDate = clause.match(
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2}),\s*(\d{4})\b/i
  );
  if (mDate) return { label: `By ${mDate[1]} ${mDate[2]}, ${mDate[3]}`, days: 7 };
  const mHrs = clause.match(/within\s+(\d+)\s+hours?/i);
  if (mHrs) return { label: `Within ${mHrs[1]} hours`, days: Math.max(1, Math.round(Number(mHrs[1]) / 24)) };
  const mPrior = clause.match(/at least\s+(?:[a-z-]+\s*\()?(\d+)\)?\s+days?\s+prior/i);
  if (mPrior) return { label: `At least ${mPrior[1]} days before term end`, days: Math.min(30, Number(mPrior[1])) };
  const mWithin = clause.match(/within\s+(?:[a-z-]+\s*\()?(\d+)\)?\s+days?/i);
  if (mWithin) return { label: `Within ${mWithin[1]} days`, days: Number(mWithin[1]) };
  if (/\bforthwith\b|\bimmediately\b|\bemergency\b/i.test(clause)) return { label: "Immediately (if triggered)", days: 0 };
  if (/\btwice daily\b|\bBID\b|\bdaily\b/i.test(clause)) return { label: "Daily recurring schedule", days: 1 };
  if (/\bprior to re-enabling\b/i.test(clause)) return { label: "Before re-enabling service", days: 1 };
  return { label: "Review before signing / acting", days: 7 };
}

function cleanActionText(clause) {
  let s = clause.trim().replace(/\.$/, "");
  for (const term of Object.keys(JARGON_LEXICON).sort((a, b) => b.length - a.length)) {
    s = s.replace(new RegExp(escapeRegExp(term), "gi"), JARGON_LEXICON[term].plain);
  }
  for (const [pat, repl] of PLAIN_SUBSTITUTIONS) {
    s = s.replace(pat, repl);
  }
  s = s.replace(/^(?:Subsequent to [^,]+,\s*|Pursuant to [^,]+,\s*|Notwithstanding [^,]+,\s*)/i, "").trim();
  return s ? s[0].toUpperCase() + s.slice(1) : s;
}

function extractChecklistAndRisks(text, domainHint = null, docTitle = "AccessLens AI Action Plan") {
  const src = String(text || "").trim();
  const domain = detectDomain(src, domainHint);
  const sentences = splitSentences(src);
  const obRegex = /\b(must|shall|requires?|required to|unless\s+.+?\s+delivers|upgrade|rotate|restrict|submit|complete|attend|maintain|remit|seek)\b/i;
  const actions = [];

  for (const sent of sentences) {
    let subclauses = [sent];
    if (sent.includes(" and attend ")) {
      const [a, b] = sent.split(" and attend ", 2);
      subclauses = [a, "The patient must attend " + b];
    } else if (sent.includes(" and submit ")) {
      const [a, b] = sent.split(" and submit ", 2);
      subclauses = [a, "Organization must submit " + b];
    } else if (sent.includes(" and rotate ")) {
      const [a, b] = sent.split(" and rotate ", 2);
      subclauses = [a, "Operators must rotate " + b];
    }

    for (const cl of subclauses) {
      if (!obRegex.test(cl) || /Vendor may, in its sole/i.test(cl)) continue;
      const who = inferActor(cl, domain);
      const dl = extractDeadlineInfo(cl);
      const what = cleanActionText(cl);
      let priority = "MEDIUM";
      if (/\bemergency\b|\b48 hours\b|\bforthwith\b|\bcontraindicated\b|\b169\.254\b/i.test(cl)) {
        priority = "CRITICAL";
      } else if (dl.days <= 14 || /\b90\b|\bninety\b|\bappeal\b|\binvoice\b|\bcovenant\b/i.test(cl)) {
        priority = "HIGH";
      }
      actions.push({
        id: `act-${actions.length + 1}`,
        who,
        what,
        by_when: dl.label,
        due_in_days: dl.days,
        priority
      });
    }
  }

  if (!actions.length && sentences.length) {
    actions.push({
      id: "act-1",
      who: inferActor(sentences[0], domain),
      what: cleanActionText(sentences[0]),
      by_when: "Review within 7 days",
      due_in_days: 7,
      priority: "MEDIUM"
    });
  }

  const rank = { CRITICAL: 0, HIGH: 1, MEDIUM: 2 };
  actions.sort((a, b) => (rank[a.priority] ?? 3) - (rank[b.priority] ?? 3) || a.due_in_days - b.due_in_days);

  const redFlags = [];
  for (const rule of RED_FLAG_RULES) {
    if (rule.pattern.test(src)) {
      redFlags.push({
        id: `risk-${redFlags.length + 1}`,
        severity: rule.severity,
        title: rule.title,
        explanation: rule.explanation
      });
    }
  }

  return { domain, title: docTitle, actions, red_flags: redFlags };
}

// ---------------------------------------------------------------------------
// 3. Automated WCAG 2.2 HTML Accessibility Auditor & Auto-Repair Engine
// ---------------------------------------------------------------------------

function parseColorRgb(raw) {
  const s = String(raw || "").trim();
  const m6 = s.match(/^#([0-9a-fA-F]{6})$/);
  if (m6) {
    const h = m6[1];
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }
  const m3 = s.match(/^#([0-9a-fA-F]{3})$/);
  if (m3) {
    const h = m3[1];
    return [parseInt(h[0] + h[0], 16), parseInt(h[1] + h[1], 16), parseInt(h[2] + h[2], 16)];
  }
  const mRgb = s.match(/^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i);
  if (mRgb) return [Number(mRgb[1]), Number(mRgb[2]), Number(mRgb[3])];
  return null;
}

function relLuminance([r, g, b]) {
  const ch = [r, g, b].map(v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
}

function calcContrast(fg, bg) {
  const l1 = relLuminance(fg);
  const l2 = relLuminance(bg);
  return +((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)).toFixed(2);
}

function humanizeId(raw) {
  const base = String(raw || "item").split("/").pop().replace(/\.[a-z0-9]+$/i, "");
  return base
    .replace(/[_-]+/g, " ")
    .trim()
    .replace(/\b\w/g, c => c.toUpperCase()) || "Form Field";
}

function auditAndRepairHtml(rawHtml) {
  const source = String(rawHtml || "").trim();
  let repaired = source;
  const issues = [];

  // 1. Missing alt on <img>
  repaired = repaired.replace(/<img\b[^>]*>/gi, tag => {
    if (/\balt\s*=/i.test(tag)) return tag;
    const srcM = tag.match(/src\s*=\s*['"]([^'"]+)['"]/i);
    const altText = humanizeId(srcM ? srcM[1] : "graphic");
    issues.push({
      rule_id: "WCAG-1.1.1",
      criterion: "1.1.1 Non-text Content (Level A)",
      severity: "CRITICAL",
      message: `Image \`${srcM ? srcM[1] : "<img>"}\` lacks an \`alt\` attribute for screen readers.`,
      fix: `Added descriptive \`alt="${altText}"\`.`
    });
    const selfClose = tag.endsWith("/>");
    const core = selfClose ? tag.slice(0, -2).trimEnd() : tag.slice(0, -1).trimEnd();
    return `${core} alt="${escapeHtml(altText)}"${selfClose ? " />" : ">"}`;
  });

  // 2. Non-semantic <div|span onclick="...">
  repaired = repaired.replace(
    /<(div|span)\b([^>]*\bonclick\s*=\s*['"][^'"]+['"][^>]*)>([\s\S]*?)<\/\1>/gi,
    (_, tagName, attrs, inner) => {
      issues.push({
        rule_id: "WCAG-2.1.1",
        criterion: "2.1.1 Keyboard & 4.1.2 Name, Role, Value (Level A)",
        severity: "CRITICAL",
        message: `Non-semantic \`<${tagName} onclick=...>\` is unreachable via keyboard \`Tab\` / \`Enter\`.`,
        fix: `Upgraded \`<${tagName}>\` to native \`<button type="button">\` control.`
      });
      return `<button type="button"${attrs}>${inner}</button>`;
    }
  );

  // 3. Unlabeled form controls
  const existingFor = new Set(
    Array.from(repaired.matchAll(/<label\b[^>]*\bfor\s*=\s*['"]([^'"]+)['"]/gi)).map(m => m[1])
  );
  let fieldSeq = 0;
  repaired = repaired.replace(
    /<(input|select|textarea)\b[^>]*>(?:[\s\S]*?<\/(?:select|textarea)>)?/gi,
    (fullTag, tagName) => {
      if (/\baria-label(?:ledby)?\s*=/i.test(fullTag)) return fullTag;
      if (/\btype\s*=\s*['"](?:hidden|submit|button|reset)['"]/i.test(fullTag)) return fullTag;
      const idM = fullTag.match(/\bid\s*=\s*['"]([^'"]+)['"]/i);
      if (idM && existingFor.has(idM[1])) return fullTag;

      fieldSeq += 1;
      const phM = fullTag.match(/\bplaceholder\s*=\s*['"]([^'"]+)['"]/i);
      const nameM = fullTag.match(/\bname\s*=\s*['"]([^'"]+)['"]/i);
      const labelText = phM ? phM[1].trim() : nameM ? humanizeId(nameM[1]) : `Accessible Field ${fieldSeq}`;
      const ctrlId = idM ? idM[1] : `a11y-field-${fieldSeq}`;

      issues.push({
        rule_id: "WCAG-3.3.2",
        criterion: "1.3.1 Info & Relationships / 3.3.2 Labels (Level A)",
        severity: "HIGH",
        message: `Form \`<${tagName.toLowerCase()}>\` control has no programmatic \`<label for>\` binding.`,
        fix: `Added \`<label for="${ctrlId}">${labelText}</label>\`.`
      });

      const updatedTag = idM
        ? fullTag
        : fullTag.replace(new RegExp(`^<${tagName}\\b`, "i"), `<${tagName.toLowerCase()} id="${ctrlId}"`);
      return `<label for="${ctrlId}">${escapeHtml(labelText)}</label>\n  ${updatedTag}`;
    }
  );

  // 4. Skipped heading levels
  let prevH = 0;
  repaired = repaired.replace(/<h([1-6])\b([^>]*)>([\s\S]*?)<\/h\1>/gi, (m, lvlStr, attrs, body) => {
    const orig = Number(lvlStr);
    let target = prevH === 0 && orig > 2 ? 1 : Math.min(orig, prevH + 1);
    if (prevH === 0 && orig === 2) target = 2;
    if (target !== orig) {
      issues.push({
        rule_id: "WCAG-2.4.6",
        criterion: "1.3.1 & 2.4.6 Heading Hierarchy (Level AA)",
        severity: "MEDIUM",
        message: `Skipped heading \`<h${orig}>\` disrupts screen-reader rotor navigation.`,
        fix: `Normalized \`<h${orig}>\` to sequential \`<h${target}>\`.`
      });
    }
    prevH = target;
    return `<h${target}${attrs}>${body}</h${target}>`;
  });

  // 5. Low-contrast inline colors
  repaired = repaired.replace(/style\s*=\s*(['"])(.*?)\1/gi, (full, quote, styleStr) => {
    const fgM = styleStr.match(/(?<![a-zA-Z-])color\s*:\s*(#[0-9a-fA-F]{3,6}|rgb\([^)]+\))/);
    const bgM = styleStr.match(/background(?:-color)?\s*:\s*(#[0-9a-fA-F]{3,6}|rgb\([^)]+\))/);
    if (!fgM || !bgM) return full;
    const fg = parseColorRgb(fgM[1]);
    const bg = parseColorRgb(bgM[1]);
    if (!fg || !bg) return full;
    const ratio = calcContrast(fg, bg);
    if (ratio >= 4.5) return full;
    const bgLum = relLuminance(bg);
    const newHex = bgLum > 0.35 ? "#0f172a" : "#f8fafc";
    const newRatio = calcContrast(parseColorRgb(newHex), bg);
    issues.push({
      rule_id: "WCAG-1.4.3",
      criterion: "1.4.3 & 1.4.6 Contrast Enhanced (AA / AAA)",
      severity: "HIGH",
      message: `Inline foreground \`${fgM[1]}\` on \`${bgM[1]}\` is only ${ratio}:1 (< 4.5:1 minimum).`,
      fix: `Repaired foreground color to \`${newHex}\` (${newRatio}:1 WCAG AAA contrast).`
    });
    const patched = styleStr.replace(fgM[0], `color:${newHex}`);
    return `style=${quote}${patched}${quote}`;
  });

  // 6. Vague link text
  repaired = repaired.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi, (full, attrs, txt) => {
    const clean = txt.trim().toLowerCase();
    if (/\baria-label\s*=/i.test(attrs) || !["click here", "here", "read more", "more", "link"].includes(clean)) {
      return full;
    }
    const hrefM = attrs.match(/href\s*=\s*['"]([^'"]+)['"]/i);
    const dest = humanizeId(hrefM ? hrefM[1] : "Document Resource");
    issues.push({
      rule_id: "WCAG-2.4.4",
      criterion: "2.4.4 Link Purpose in Context (Level A)",
      severity: "MEDIUM",
      message: `Ambiguous link label "${txt.trim()}" conveys no destination to screen-reader users.`,
      fix: `Updated link text and \`aria-label\` to "Open ${dest}".`
    });
    return `<a${attrs} aria-label="Open ${escapeHtml(dest)}">Open ${escapeHtml(dest)}</a>`;
  });

  // 7. Data table headers & caption
  repaired = repaired.replace(/<table\b([^>]*)>([\s\S]*?)<\/table>/gi, (full, attrs, body) => {
    let updated = body;
    let changed = false;
    if (!/<caption/i.test(updated)) {
      updated = "\n    <caption>Summary Data Table</caption>" + updated;
      changed = true;
    }
    if (!/<th\b/i.test(updated)) {
      updated = updated.replace(/<td>([\s\S]*?)<\/td>/i, '<th scope="row">$1</th>');
      changed = true;
    }
    if (changed) {
      issues.push({
        rule_id: "WCAG-1.3.1-TABLE",
        criterion: "1.3.1 Data Table Headers & Caption (Level A)",
        severity: "MEDIUM",
        message: "Data `<table>` lacked `<caption>` and `<th scope>` header cells.",
        fix: 'Injected `<caption>` and `<th scope="row">` association.'
      });
    }
    return `<table${attrs}>${updated}</table>`;
  });

  // 8. Missing landmark or html[lang]
  if (/<html\b/i.test(repaired)) {
    if (!/<html\b[^>]*\blang\s*=/i.test(repaired)) {
      repaired = repaired.replace(/<html\b/i, '<html lang="en"');
      issues.push({
        rule_id: "WCAG-3.1.1",
        criterion: "3.1.1 Language of Page (Level A)",
        severity: "HIGH",
        message: "Root `<html>` tag lacks `lang` attribute.",
        fix: 'Added `lang="en"`.'
      });
    }
  } else if (!/<(main|section|article|nav)\b/i.test(repaired)) {
    issues.push({
      rule_id: "WCAG-1.3.6",
      criterion: "1.3.6 / 2.4.1 Semantic Landmark Region (Level AA)",
      severity: "LOW",
      message: "Component uses generic `<div>` wrapper without a `<main>` landmark.",
      fix: 'Wrapped snippet in `<main id="main-content" aria-label="Accessible Content Region">`.'
    });
    repaired = `<main id="main-content" aria-label="Accessible Content Region">\n${repaired}\n</main>`;
  }

  const weights = { CRITICAL: 18, HIGH: 13, MEDIUM: 8, LOW: 5 };
  const penalty = issues.reduce((sum, item) => sum + (weights[item.severity] || 8), 0);
  const beforeScore = Math.max(12, 100 - penalty);
  const afterScore = 100;

  const origLines = source.split("\n");
  const repLines = repaired.split("\n");
  const diff = ["--- original.html", "+++ repaired-wcag22.html"];
  for (const l of origLines) if (!repLines.includes(l)) diff.push(`- ${l}`);
  for (const l of repLines) if (!origLines.includes(l)) diff.push(`+ ${l}`);

  return {
    before_score: beforeScore,
    after_score: afterScore,
    issue_count: issues.length,
    issues,
    original_html: source,
    repaired_html: repaired,
    diff: diff.join("\n")
  };
}

// ---------------------------------------------------------------------------
// 4. Interactive Concept Map Graph Builder (`<= 24` Nodes Cap)
// ---------------------------------------------------------------------------

function buildConceptMap(text, domainHint = null, docTitle = "Document Overview") {
  const domain = detectDomain(text, domainHint);
  const checklist = extractChecklistAndRisks(text, domain, docTitle);
  const glossary = extractGlossary(text);
  const nodes = [];
  const edges = [];
  const MAX_NODES = 22; // Strictly <= 24 nodes per Host Resource Guardrail #2

  const hubId = "node-hub";
  nodes.push({
    id: hubId,
    label: docTitle.length > 32 ? docTitle.slice(0, 30) + "…" : docTitle,
    kind: "document",
    x: 470,
    y: 265,
    detail: `Central ${domain.toUpperCase()} document analyzed by AccessLens AI.`,
    aria_label: `Central Document Hub: ${docTitle}`
  });

  const parties = [];
  for (const a of checklist.actions) {
    if (!parties.includes(a.who)) parties.push(a.who);
  }
  if (domain === "legal" && !parties.includes("Vendor / Counterparty")) parties.push("Vendor / Counterparty");
  if (domain === "medical" && !parties.includes("Health Plan / Lab")) parties.push("Health Plan / Lab");
  if (domain === "financial" && !parties.includes("Lender / Agent")) parties.push("Lender / Agent");

  const partyIds = {};
  parties.slice(0, 3).forEach((party, idx) => {
    if (nodes.length >= MAX_NODES) return;
    const id = `party-${idx + 1}`;
    partyIds[party] = id;
    nodes.push({
      id,
      label: party.slice(0, 24),
      kind: "party",
      x: 130,
      y: 135 + idx * 130,
      detail: `Stakeholder / Responsible Party in this ${domain} workflow.`,
      aria_label: `Party: ${party}`
    });
    edges.push({ source: hubId, target: id, relation: "INVOLVES" });
  });

  checklist.actions.slice(0, 5).forEach((act, idx) => {
    if (nodes.length >= MAX_NODES - 2) return;
    const obId = `ob-${idx + 1}`;
    const shortWords = act.what.split(/\s+/).slice(0, 5).join(" ");
    const yPos = 75 + idx * 92;
    nodes.push({
      id: obId,
      label: shortWords.slice(0, 26) + (act.what.split(/\s+/).length > 5 ? "…" : ""),
      kind: "obligation",
      x: 695,
      y: yPos,
      priority: act.priority,
      detail: `[${act.priority}] ${act.what} (Owner: ${act.who})`,
      aria_label: `Obligation (${act.priority}): ${act.what}. Due: ${act.by_when}`
    });
    edges.push({ source: partyIds[act.who] || hubId, target: obId, relation: "MUST_DO" });

    if (nodes.length < MAX_NODES && act.by_when !== "Review before signing / acting") {
      const dlId = `dl-${idx + 1}`;
      nodes.push({
        id: dlId,
        label: act.by_when.slice(0, 24),
        kind: "deadline",
        x: 875,
        y: yPos,
        detail: `Required timeline for "${shortWords}": ${act.by_when}.`,
        aria_label: `Deadline: ${act.by_when}`
      });
      edges.push({ source: obId, target: dlId, relation: "DUE_BY" });
    }
  });

  checklist.red_flags.slice(0, 4).forEach((rf, idx) => {
    if (nodes.length >= MAX_NODES) return;
    const rkId = `risk-${idx + 1}`;
    nodes.push({
      id: rkId,
      label: rf.title.slice(0, 25) + (rf.title.length > 25 ? "…" : ""),
      kind: "risk",
      x: 235 + idx * 175,
      y: 472,
      severity: rf.severity,
      detail: `[${rf.severity} RISK] ${rf.explanation}`,
      aria_label: `${rf.severity} Risk: ${rf.title}. ${rf.explanation}`
    });
    edges.push({ source: hubId, target: rkId, relation: "TRIGGERS_RISK" });
  });

  glossary.slice(0, 3).forEach((g, idx) => {
    if (nodes.length >= MAX_NODES) return;
    const cId = `concept-${idx + 1}`;
    nodes.push({
      id: cId,
      label: g.term.slice(0, 23),
      kind: "concept",
      x: 270 + idx * 165,
      y: 58,
      detail: `Plain-English Meaning: ${g.plain}. ${g.definition}`,
      aria_label: `Defined Term ${g.term}: ${g.plain}`
    });
    edges.push({ source: hubId, target: cId, relation: "DEFINES" });
  });

  return {
    domain,
    title: docTitle,
    nodes: nodes.slice(0, 24),
    edges
  };
}

// ---------------------------------------------------------------------------
// 5. Anna Host SDK Bridge (`AnnaAppRuntime`) + Persistent Storage Adapter
// ---------------------------------------------------------------------------

class AnnaBridgeAdapter {
  constructor() {
    this.anna = null;
    this.connected = false;
    this.ttsVoicesCatalog = [];
    this._saveTimers = {};
  }

  async init() {
    if (window.anna && typeof window.anna.storage?.get === "function") {
      this.anna = window.anna;
      this.connected = true;
      return true;
    }

    const params = new URLSearchParams(window.location.search);
    const likelyInAnna = params.has("wid") || params.has("t") || window.parent !== window;
    if (!likelyInAnna) return false;

    try {
      const sdkModule = await Promise.race([
        import("/static/anna-apps/_sdk/latest/index.js"),
        new Promise((_, reject) => setTimeout(() => reject(new Error("SDK load timeout")), 1200))
      ]);
      if (sdkModule && sdkModule.AnnaAppRuntime) {
        this.anna = await Promise.race([
          sdkModule.AnnaAppRuntime.connect(),
          new Promise((_, reject) => setTimeout(() => reject(new Error("Handshake timeout")), 1500))
        ]);
        this.connected = Boolean(this.anna);
        if (this.connected && this.anna.llm?.catalog) {
          try {
            const cat = await this.anna.llm.catalog({ serviceType: "tts" });
            this.ttsVoicesCatalog = cat?.models || [];
          } catch (_) {
            // Optional TTS catalog discovery
          }
        }
        return this.connected;
      }
    } catch (_) {
      this.connected = false;
    }
    return false;
  }

  async getStorage(key, fallback = null) {
    // Valid APS key format (`prefix/name`, no leading slash)
    if (this.connected && this.anna?.storage?.get) {
      try {
        const res = await this.anna.storage.get({ key });
        const payload = res?.result !== undefined ? res.result : res;
        if (payload && payload.exists) return payload.value;
        if (payload && payload.value !== undefined && payload.exists !== false) return payload.value;
      } catch (_) {
        // Fall through to localStorage
      }
    }
    try {
      const raw = localStorage.getItem(`accesslens:${key}`);
      return raw ? JSON.parse(raw) : fallback;
    } catch (_) {
      return fallback;
    }
  }

  setStorageDebounced(key, value, delayMs = 280) {
    try {
      localStorage.setItem(`accesslens:${key}`, JSON.stringify(value));
    } catch (_) {
      // Ignore storage quota errors in private browsing
    }
    if (!this.connected || !this.anna?.storage?.set) return;
    clearTimeout(this._saveTimers[key]);
    this._saveTimers[key] = setTimeout(async () => {
      try {
        await this.anna.storage.set({ key, value });
      } catch (_) {
        // Silently keep localStorage copy
      }
    }, delayMs);
  }

  async refineWithHostLlm(text, readingLevel, domain) {
    if (!this.connected || !this.anna?.llm?.complete) {
      return null;
    }
    const modeDesc = {
      grade5: "a warm, crystal-clear 5th-grade plain-English explanation with short active sentences",
      consumer: "a clear patient/consumer brief that translates technical jargon inline while preserving exact numbers and dates",
      executive: "an executive high-signal BLUF digest with bulleted takeaways and key deadlines/numbers"
    }[readingLevel] || "plain English";

    const response = await this.anna.llm.complete({
      systemPrompt:
        "You are AccessLens AI, a WCAG 2.2 AAA plain-language accessibility specialist. Never invent facts, dosages, or dates. Output clean plain text only (no markdown fences).",
      messages: [
        {
          role: "user",
          content: `Rewrite this ${domain} document into ${modeDesc}. Keep every real deadline, dosage, percentage, and warning accurate:\n\n${text}`
        }
      ],
      maxTokens: 1200,
      temperature: 0.2,
      thinking: false
    });
    const unwrapped = response?.result || response;
    return unwrapped?.content?.text || null;
  }

  async appendChatArtifact(summary, data) {
    if (!this.connected || !this.anna?.chat?.append_artifact) {
      return false;
    }
    await this.anna.chat.append_artifact({
      artifact: {
        kind: "accesslens_brief",
        app_slug: "accesslens-ai",
        summary: summary.slice(0, 950),
        data
      }
    });
    return true;
  }
}

// ---------------------------------------------------------------------------
// 6. Application State & Interactive Studio Controller
// ---------------------------------------------------------------------------

const bridge = new AnnaBridgeAdapter();

const state = {
  activeSampleId: "medical",
  activeTab: "plain",
  readingMode: "grade5",
  docTitle: SAMPLE_DOCUMENTS.medical.title,
  docDomain: "auto",
  sourceText: SAMPLE_DOCUMENTS.medical.text,
  rawHtml: SAMPLE_DOCUMENTS.medical.sampleHtml,
  htmlViewMode: "repaired",
  glossaryFilter: "",
  mapFilter: "all",
  mapZoom: 1.0,
  selectedNodeId: "node-hub",
  focusedParaIdx: 0,
  llmRefinedOverride: null,

  // Computed outputs
  simplified: null,
  checklist: null,
  htmlAudit: null,
  conceptMap: null,

  // Persistent user checklist completion & custom items keyed by doc hash
  checklistMemory: {},

  // Persistent user accessibility & dyslexia preferences
  prefs: {
    theme: "dark",
    fontFamily: "sans",
    bionicRatio: 0.45,
    syllableDots: false,
    rulerEnabled: false,
    fontSize: 19,
    letterSpacing: 0.04,
    wordSpacing: 0.08,
    lineHeight: 1.85,
    measure: 66
  },

  // Narration karaoke state
  tts: {
    playing: false,
    paused: false,
    sentenceIdx: 0,
    activeCharIdx: -1,
    activeCharLen: 0,
    timerId: null,
    audioEl: null,
    voices: []
  }
};

function announcePolite(msg) {
  const el = document.getElementById("sr-announcer");
  if (el) el.textContent = msg;
}

let toastTimer = null;
function showToast(msg) {
  const banner = document.getElementById("toast-banner");
  if (!banner) return;
  banner.textContent = msg;
  banner.hidden = false;
  announcePolite(msg);
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    banner.hidden = true;
  }, 3600);
}

// Apply user typography & theme variables with zero layout shift
function applyPreferencesToDom() {
  const root = document.documentElement;
  root.dataset.theme = state.prefs.theme;

  const fontStacks = {
    sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Inter, Roboto, sans-serif',
    dyslexia: '"OpenDyslexic", Verdana, Tahoma, "Trebuchet MS", sans-serif',
    serif: 'Georgia, "Iowan Old Style", "Palatino Linotype", serif',
    mono: 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace'
  };
  root.style.setProperty("--al-font-reader", fontStacks[state.prefs.fontFamily] || fontStacks.sans);
  root.style.setProperty("--al-font-size", `${state.prefs.fontSize}px`);
  root.style.setProperty("--al-letter-spacing", `${Number(state.prefs.letterSpacing).toFixed(2)}em`);
  root.style.setProperty("--al-word-spacing", `${Number(state.prefs.wordSpacing).toFixed(2)}em`);
  root.style.setProperty("--al-line-height", `${Number(state.prefs.lineHeight).toFixed(1)}`);
  root.style.setProperty("--al-measure", `${state.prefs.measure}ch`);

  document.querySelectorAll("[data-set-theme]").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.setTheme === state.prefs.theme);
  });

  const rulerOverlay = document.getElementById("line-focus-overlay");
  const rulerBtn = document.getElementById("btn-toggle-ruler");
  const studioRuler = document.getElementById("ctrl-studio-ruler");
  if (rulerOverlay) rulerOverlay.hidden = !state.prefs.rulerEnabled;
  if (rulerBtn) {
    rulerBtn.textContent = `Line Ruler: ${state.prefs.rulerEnabled ? "On" : "Off"}`;
    rulerBtn.setAttribute("aria-pressed", String(state.prefs.rulerEnabled));
  }
  if (studioRuler) studioRuler.checked = state.prefs.rulerEnabled;

  // Sync Dyslexia Studio controls
  const setVal = (id, v) => {
    const el = document.getElementById(id);
    if (el) el.value = String(v);
  };
  setVal("ctrl-font-family", state.prefs.fontFamily);
  setVal("ctrl-bionic-level", state.prefs.bionicRatio);
  setVal("ctrl-font-size", state.prefs.fontSize);
  setVal("ctrl-letter-spacing", state.prefs.letterSpacing);
  setVal("ctrl-word-spacing", state.prefs.wordSpacing);
  setVal("ctrl-line-height", state.prefs.lineHeight);
  setVal("ctrl-measure", state.prefs.measure);
  const syl = document.getElementById("ctrl-syllable-dots");
  if (syl) syl.checked = state.prefs.syllableDots;

  const setText = (id, t) => {
    const el = document.getElementById(id);
    if (el) el.textContent = t;
  };
  setText("out-font-size", `${state.prefs.fontSize}px`);
  setText("out-letter-spacing", `${Number(state.prefs.letterSpacing).toFixed(2)}em`);
  setText("out-word-spacing", `${Number(state.prefs.wordSpacing).toFixed(2)}em`);
  setText("out-line-height", `${Number(state.prefs.lineHeight).toFixed(1)}`);
  setText("out-measure", `${state.prefs.measure}ch`);
}

function getDocRecord() {
  const key = hashText(state.sourceText);
  if (!state.checklistMemory[key]) {
    state.checklistMemory[key] = { completedIds: {}, customTasks: [] };
  }
  return state.checklistMemory[key];
}

function runAllEngines() {
  const domHint = state.docDomain === "auto" ? null : state.docDomain;
  state.simplified = simplifyDocument(state.sourceText, state.readingMode, domHint);
  if (state.llmRefinedOverride && state.llmRefinedOverride.mode === state.readingMode) {
    state.simplified.simplified_text = state.llmRefinedOverride.text;
    state.simplified.after_metrics = computeReadabilityMetrics(state.llmRefinedOverride.text);
    state.simplified.grade_reduction = Math.max(
      0,
      +(state.simplified.before_metrics.flesch_kincaid_grade - state.simplified.after_metrics.flesch_kincaid_grade).toFixed(1)
    );
  }
  state.checklist = extractChecklistAndRisks(state.sourceText, state.simplified.domain, state.docTitle);
  state.htmlAudit = auditAndRepairHtml(state.rawHtml);
  state.conceptMap = buildConceptMap(state.sourceText, state.simplified.domain, state.docTitle);
  if (!state.conceptMap.nodes.some(n => n.id === state.selectedNodeId)) {
    state.selectedNodeId = "node-hub";
  }
  renderEverything();
}

// ---------------------------------------------------------------------------
// 7. Rendering All 6 Panels + Telemetry Ribbon
// ---------------------------------------------------------------------------

function renderKpis() {
  const bm = state.simplified.before_metrics;
  const am = state.simplified.after_metrics;
  const rec = getDocRecord();
  const allActions = [...state.checklist.actions, ...rec.customTasks];
  const doneCount = allActions.filter(a => rec.completedIds[a.id]).length;

  document.getElementById("kpi-grade-after").textContent = `Grade ${am.flesch_kincaid_grade}`;
  document.getElementById("kpi-grade-delta").textContent =
    state.simplified.grade_reduction > 0 ? `-${state.simplified.grade_reduction} Grades` : "Plain Target";
  document.getElementById("kpi-grade-before").textContent = `Was Grade ${bm.flesch_kincaid_grade} (${bm.difficulty_band.split("(")[0].trim()})`;

  document.getElementById("kpi-fog-after").textContent = `${am.gunning_fog_index}`;
  document.getElementById("kpi-fog-delta").textContent =
    am.gunning_fog_index <= 10 ? "Plain-Language Ready" : `-${state.simplified.fog_reduction} Fog`;
  document.getElementById("kpi-fog-before").textContent =
    `Was ${bm.gunning_fog_index} Fog · ${state.simplified.glossary.length} Jargon Terms Defined`;

  document.getElementById("kpi-actions-count").textContent = `${allActions.length} Actions`;
  document.getElementById("kpi-actions-done").textContent = `${doneCount} / ${allActions.length} Done`;
  document.getElementById("kpi-memory-status").textContent = bridge.connected
    ? "Synced to Anna Persistent Storage (APS)"
    : "Saved to Persistent Browser Memory";

  document.getElementById("kpi-risks-count").textContent = `${state.checklist.red_flags.length} Red Flags`;
  document.getElementById("kpi-wcag-score").textContent =
    `HTML ${state.htmlAudit.before_score} → ${state.htmlAudit.after_score}`;
  document.getElementById("live-char-counter").textContent = `${bm.word_count} words · ${bm.sentence_count} sentences`;
}

function decorateWithInlineJargonButtons(plainText, glossary) {
  // Also highlight plain replacements or surviving technical terms so users can tap inline!
  let htmlOut = escapeHtml(plainText);
  const candidates = [];
  for (const g of glossary) {
    candidates.push({ matchText: g.term, item: g });
    if (g.plain.length >= 10) candidates.push({ matchText: g.plain, item: g });
  }
  candidates.sort((a, b) => b.matchText.length - a.matchText.length);

  const used = new Set();
  for (const c of candidates) {
    if (used.has(c.item.canonical)) continue;
    const escapedTarget = escapeHtml(c.matchText);
    const re = new RegExp(`(${escapeRegExp(escapedTarget)})`, "i");
    if (re.test(htmlOut)) {
      used.add(c.item.canonical);
      htmlOut = htmlOut.replace(
        re,
        `<button type="button" class="jargon-chip" data-term-key="${escapeHtml(c.item.canonical)}">$1</button>`
      );
    }
  }
  return htmlOut
    .split("\n")
    .filter(Boolean)
    .map(line => `<p>${line}</p>`)
    .join("");
}

function renderPlainPanel() {
  document.getElementById("plain-doc-heading").textContent = state.docTitle;
  document.getElementById("domain-pill").textContent = state.simplified.domain.toUpperCase();
  document.getElementById("orig-word-badge").textContent = `${state.simplified.before_metrics.word_count} words`;
  document.getElementById("original-reference-box").textContent = state.simplified.original_text;

  document.querySelectorAll("[data-reading-mode]").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.readingMode === state.readingMode);
  });

  const bodyEl = document.getElementById("plain-output-body");
  bodyEl.innerHTML = decorateWithInlineJargonButtons(state.simplified.simplified_text, state.simplified.glossary);

  // Readability Before/After comparison bars
  const bm = state.simplified.before_metrics;
  const am = state.simplified.after_metrics;
  const metricsRows = [
    {
      label: "Flesch-Kincaid Grade (Lower = Easier)",
      beforeVal: `Grade ${bm.flesch_kincaid_grade}`,
      afterVal: `Grade ${am.flesch_kincaid_grade}`,
      beforePct: Math.min(100, (bm.flesch_kincaid_grade / 20) * 100),
      afterPct: Math.min(100, (am.flesch_kincaid_grade / 20) * 100)
    },
    {
      label: "Gunning Fog Index (Target ≤ 9.0)",
      beforeVal: `${bm.gunning_fog_index}`,
      afterVal: `${am.gunning_fog_index}`,
      beforePct: Math.min(100, (bm.gunning_fog_index / 24) * 100),
      afterPct: Math.min(100, (am.gunning_fog_index / 24) * 100)
    },
    {
      label: "Avg Words per Sentence",
      beforeVal: `${bm.avg_words_per_sentence} w/s`,
      afterVal: `${am.avg_words_per_sentence} w/s`,
      beforePct: Math.min(100, (bm.avg_words_per_sentence / 36) * 100),
      afterPct: Math.min(100, (am.avg_words_per_sentence / 36) * 100)
    }
  ];

  document.getElementById("readability-bars").innerHTML = metricsRows
    .map(
      r => `
      <div>
        <div class="metric-row-head">
          <span>${escapeHtml(r.label)}</span>
          <span>${escapeHtml(r.beforeVal)} → <strong class="accent-emerald">${escapeHtml(r.afterVal)}</strong></span>
        </div>
        <div class="dual-bar">
          <div class="bar-line" title="Original"><div class="bar-fill-before" style="width:${r.beforePct}%"></div></div>
          <div class="bar-line" title="Simplified"><div class="bar-fill-after" style="width:${r.afterPct}%"></div></div>
        </div>
      </div>`
    )
    .join("");

  // Glossary cards
  const q = state.glossaryFilter.trim().toLowerCase();
  const filtered = state.simplified.glossary.filter(
    g =>
      !q ||
      g.term.toLowerCase().includes(q) ||
      g.plain.toLowerCase().includes(q) ||
      g.definition.toLowerCase().includes(q)
  );
  document.getElementById("glossary-count").textContent = String(filtered.length);
  document.getElementById("glossary-cards-grid").innerHTML = filtered.length
    ? filtered
        .map(
          g => `
        <article class="glossary-item">
          <strong>${escapeHtml(g.term)}</strong>
          <span class="glossary-plain">→ ${escapeHtml(g.plain)}</span>
          <p class="glossary-def">${escapeHtml(g.definition)}</p>
        </article>`
        )
        .join("")
    : `<p class="muted-meta">No jargon terms matched "${escapeHtml(state.glossaryFilter)}".</p>`;
}

function renderChecklistPanel() {
  const rec = getDocRecord();
  const allActions = [...state.checklist.actions, ...rec.customTasks];
  const doneCount = allActions.filter(a => rec.completedIds[a.id]).length;
  const pct = allActions.length ? Math.round((doneCount / allActions.length) * 100) : 0;

  document.getElementById("checklist-progress-label").textContent =
    `${doneCount} of ${allActions.length} Actions Completed (${pct}%)`;
  document.getElementById("checklist-progress-fill").style.width = `${pct}%`;

  const listEl = document.getElementById("checklist-items-list");
  listEl.innerHTML = allActions
    .map(item => {
      const checked = Boolean(rec.completedIds[item.id]);
      const pBadge =
        item.priority === "CRITICAL"
          ? "badge-rose"
          : item.priority === "HIGH"
          ? "badge-amber"
          : "badge-cyan";
      return `
        <li class="checklist-item ${checked ? "is-done" : ""}">
          <input
            type="checkbox"
            class="task-checkbox"
            id="chk-${escapeHtml(item.id)}"
            data-task-id="${escapeHtml(item.id)}"
            ${checked ? "checked" : ""}
            aria-label="${escapeHtml(item.what)}"
          />
          <div class="task-body">
            <label for="chk-${escapeHtml(item.id)}" class="task-what">${escapeHtml(item.what)}</label>
            <div class="task-meta-row">
              <span class="badge ${pBadge}">${escapeHtml(item.priority)}</span>
              <span><strong>Who:</strong> ${escapeHtml(item.who)}</span>
              <span><strong>By When:</strong> ${escapeHtml(item.by_when)}</span>
            </div>
          </div>
        </li>`;
    })
    .join("");

  document.getElementById("redflag-badge").textContent = `${state.checklist.red_flags.length} Flags`;
  document.getElementById("redflag-list").innerHTML = state.checklist.red_flags.length
    ? state.checklist.red_flags
        .map(
          rf => `
        <article class="redflag-card ${rf.severity === "CRITICAL" ? "is-critical" : ""}">
          <div class="redflag-head">
            <strong>${escapeHtml(rf.title)}</strong>
            <span class="badge ${rf.severity === "CRITICAL" ? "badge-rose" : "badge-amber"}">${escapeHtml(rf.severity)}</span>
          </div>
          <p class="muted-meta">${escapeHtml(rf.explanation)}</p>
        </article>`
        )
        .join("")
    : `<p class="muted-meta">No critical red-flag clauses detected in this passage.</p>`;
}

function renderDyslexiaPanel() {
  const canvas = document.getElementById("dyslexia-reading-canvas");
  canvas.innerHTML = renderBionicParagraphsHtml(
    state.simplified.simplified_text,
    Number(state.prefs.bionicRatio),
    Boolean(state.prefs.syllableDots),
    state.focusedParaIdx
  );
}

function renderHtmlRepairPanel() {
  const htmlInput = document.getElementById("html-source-textarea");
  if (htmlInput.value !== state.rawHtml) {
    htmlInput.value = state.rawHtml;
  }

  document.getElementById("html-score-before").textContent = `${state.htmlAudit.before_score} / 100`;
  document.getElementById("html-score-after").textContent = `${state.htmlAudit.after_score} / 100`;
  document.getElementById("html-issues-summary").textContent =
    `${state.htmlAudit.issue_count} WCAG 2.2 Violation${state.htmlAudit.issue_count === 1 ? "" : "s"} Automatically Repaired`;

  document.getElementById("html-issues-list").innerHTML = state.htmlAudit.issues.length
    ? state.htmlAudit.issues
        .map(
          iss => `
        <article class="issue-card ${iss.severity === "CRITICAL" ? "is-critical" : ""}">
          <div class="redflag-head">
            <strong>${escapeHtml(iss.criterion)}</strong>
            <span class="badge ${iss.severity === "CRITICAL" ? "badge-rose" : "badge-amber"}">${escapeHtml(iss.severity)}</span>
          </div>
          <p class="muted-meta">${escapeHtml(iss.message)}</p>
          <p style="margin:6px 0 0;font-size:0.84rem;color:var(--accent-emerald);font-weight:700;">✓ ${escapeHtml(iss.fix)}</p>
        </article>`
        )
        .join("")
    : `<p class="muted-meta">Zero WCAG violations found — HTML snippet is already accessible!</p>`;

  document.querySelectorAll("[data-html-view]").forEach(btn => {
    btn.classList.toggle("is-active", btn.dataset.htmlView === state.htmlViewMode);
  });

  const singlePre = document.getElementById("html-repaired-pre");
  const sideGrid = document.getElementById("html-sidebyside-grid");
  if (state.htmlViewMode === "sidebyside") {
    singlePre.hidden = true;
    sideGrid.hidden = false;
    document.getElementById("html-orig-pre").textContent = state.htmlAudit.original_html;
    document.getElementById("html-rep-side-pre").textContent = state.htmlAudit.repaired_html;
  } else {
    singlePre.hidden = false;
    sideGrid.hidden = true;
    singlePre.textContent =
      state.htmlViewMode === "diff" ? state.htmlAudit.diff : state.htmlAudit.repaired_html;
  }
}

function renderNarrationPanel() {
  const sentences = splitSentences(state.simplified.simplified_text);
  if (state.tts.sentenceIdx >= sentences.length) state.tts.sentenceIdx = 0;

  document.getElementById("tts-progress-pill").textContent = state.tts.playing
    ? `Speaking Sentence ${state.tts.sentenceIdx + 1} of ${sentences.length}`
    : `Ready · ${sentences.length} Sentences`;

  const container = document.getElementById("karaoke-sentences-list");
  container.innerHTML = sentences
    .map((sent, idx) => {
      const isCurrent = idx === state.tts.sentenceIdx && (state.tts.playing || state.tts.paused);
      let rendered = escapeHtml(sent);
      if (isCurrent && state.tts.activeCharIdx >= 0) {
        const start = Math.min(sent.length, state.tts.activeCharIdx);
        const rest = sent.slice(start);
        const wordMatch = rest.match(/^\S+/);
        const len = wordMatch ? wordMatch[0].length : state.tts.activeCharLen || 4;
        rendered =
          escapeHtml(sent.slice(0, start)) +
          `<mark class="karaoke-word-active">${escapeHtml(sent.slice(start, start + len))}</mark>` +
          escapeHtml(sent.slice(start + len));
      }
      return `
        <div
          role="listitem"
          tabindex="0"
          class="karaoke-sentence ${isCurrent ? "is-speaking" : ""}"
          data-sentence-idx="${idx}"
          aria-label="Sentence ${idx + 1}: ${escapeHtml(sent)}"
        >
          <span class="badge badge-neutral" style="margin-right:8px;">#${idx + 1}</span>
          ${rendered}
        </div>`;
    })
    .join("");
}

function renderConceptMapPanel() {
  const map = state.conceptMap;
  document.getElementById("map-node-count-badge").textContent = `${map.nodes.length} Nodes (≤24 Cap)`;

  const palette = {
    document: { fill: "#0284c7", stroke: "#38bdf8" },
    party: { fill: "#5b21b6", stroke: "#a78bfa" },
    obligation: { fill: "#065f46", stroke: "#34d399" },
    deadline: { fill: "#92400e", stroke: "#fbbf24" },
    risk: { fill: "#9f1239", stroke: "#fb7185" },
    concept: { fill: "#1e40af", stroke: "#60a5fa" }
  };

  const nodeById = Object.fromEntries(map.nodes.map(n => [n.id, n]));
  const svg = document.getElementById("concept-map-svg");
  svg.style.transform = `scale(${state.mapZoom})`;

  const edgesSvg = map.edges
    .map(e => {
      const s = nodeById[e.source];
      const t = nodeById[e.target];
      if (!s || !t) return "";
      const isHighlighted = e.source === state.selectedNodeId || e.target === state.selectedNodeId;
      const midX = (s.x + t.x) / 2;
      const d = `M ${s.x} ${s.y} C ${midX} ${s.y}, ${midX} ${t.y}, ${t.x} ${t.y}`;
      const stroke = isHighlighted ? "#38bdf8" : "#475569";
      const width = isHighlighted ? 3 : 1.8;
      const lx = Math.round((s.x + t.x) / 2);
      const ly = Math.round((s.y + t.y) / 2) - 6;
      return `
        <g>
          <path d="${d}" fill="none" stroke="${stroke}" stroke-width="${width}" marker-end="url(#arrow-head)" opacity="${isHighlighted ? "1" : "0.72"}" />
          ${
            isHighlighted
              ? `<text x="${lx}" y="${ly}" text-anchor="middle" fill="#cbd5e1" font-size="10" font-weight="700">${escapeHtml(e.relation)}</text>`
              : ""
          }
        </g>`;
    })
    .join("");

  const nodesSvg = map.nodes
    .map(n => {
      const colors = palette[n.kind] || palette.concept;
      const isSelected = n.id === state.selectedNodeId;
      const dimmed = state.mapFilter !== "all" && n.kind !== state.mapFilter && n.kind !== "document";
      const w = n.kind === "document" ? 210 : 176;
      const h = n.kind === "document" ? 54 : 44;
      const rx = n.x - w / 2;
      const ry = n.y - h / 2;
      return `
        <g
          class="map-node-group"
          tabindex="0"
          role="button"
          data-node-id="${escapeHtml(n.id)}"
          aria-label="${escapeHtml(n.aria_label)}"
          aria-pressed="${isSelected}"
          opacity="${dimmed ? "0.28" : "1"}"
        >
          <rect
            x="${rx}"
            y="${ry}"
            width="${w}"
            height="${h}"
            rx="12"
            fill="${colors.fill}"
            stroke="${isSelected ? "#fde047" : colors.stroke}"
            stroke-width="${isSelected ? "3.5" : "2"}"
          />
          <text
            x="${n.x}"
            y="${n.y + 5}"
            text-anchor="middle"
            fill="#ffffff"
            font-size="${n.kind === "document" ? "12.5" : "11.5"}"
            font-weight="700"
          >${escapeHtml(n.label)}</text>
        </g>`;
    })
    .join("");

  svg.innerHTML = `
    <defs>
      <marker id="arrow-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 1 L 10 5 L 0 9 z" fill="#64748b" />
      </marker>
    </defs>
    ${edgesSvg}
    ${nodesSvg}
  `;

  // Render Node Inspector
  const selected = nodeById[state.selectedNodeId] || map.nodes[0];
  const connected = map.edges.filter(e => e.source === selected.id || e.target === selected.id);
  const relItems = connected
    .map(e => {
      const otherId = e.source === selected.id ? e.target : e.source;
      const other = nodeById[otherId];
      if (!other) return "";
      const dir = e.source === selected.id ? `→ ${e.relation} →` : `← ${e.relation} ←`;
      return `<li><strong>${escapeHtml(dir)}</strong> ${escapeHtml(other.label)} (${escapeHtml(other.kind)})</li>`;
    })
    .join("");

  document.getElementById("map-node-inspector").innerHTML = `
    <div>
      <span class="badge badge-cyan">${escapeHtml(selected.kind.toUpperCase())}</span>
      <h4 style="margin:8px 0 6px;font-size:1.05rem;">${escapeHtml(selected.label)}</h4>
      <p style="margin:0;color:var(--text-secondary);">${escapeHtml(selected.detail)}</p>
    </div>
    <div>
      <strong style="font-size:0.84rem;color:var(--text-muted);text-transform:uppercase;">Connected Cause-Effect Links (${connected.length})</strong>
      <ul class="inspector-rel-list">${relItems || "<li>Standalone node</li>"}</ul>
    </div>
  `;
}

function renderEverything() {
  renderKpis();
  renderPlainPanel();
  renderChecklistPanel();
  renderDyslexiaPanel();
  renderHtmlRepairPanel();
  renderNarrationPanel();
  renderConceptMapPanel();
}

// ---------------------------------------------------------------------------
// 8. Tab Routing (`#/plain`, `#/checklist`, `#/dyslexia`, `#/html-repair`, `#/narration`, `#/concept-map`)
// ---------------------------------------------------------------------------

const ROUTE_TO_TAB = {
  plain: "plain",
  main: "plain",
  checklist: "checklist",
  dyslexia: "dyslexia",
  dyslexia_studio: "dyslexia",
  html: "html",
  "html-repair": "html",
  html_repair: "html",
  narration: "narration",
  map: "map",
  "concept-map": "map",
  concept_map: "map"
};

function activateTab(tabKey, focusTabBtn = false) {
  const resolved = ROUTE_TO_TAB[tabKey] || "plain";
  state.activeTab = resolved;

  document.querySelectorAll('[role="tab"]').forEach(btn => {
    const active = btn.dataset.tab === resolved;
    btn.classList.toggle("is-active", active);
    btn.setAttribute("aria-selected", String(active));
    btn.tabIndex = active ? 0 : -1;
    if (active && focusTabBtn) btn.focus();
  });

  const panelIds = {
    plain: "panel-plain",
    checklist: "panel-checklist",
    dyslexia: "panel-dyslexia",
    html: "panel-html",
    narration: "panel-narration",
    map: "panel-map"
  };

  for (const [k, pid] of Object.entries(panelIds)) {
    const el = document.getElementById(pid);
    if (el) el.hidden = k !== resolved;
  }

  bridge.setStorageDebounced("workspace/session", {
    activeSampleId: state.activeSampleId,
    activeTab: state.activeTab,
    readingMode: state.readingMode,
    docTitle: state.docTitle,
    sourceText: state.sourceText
  });
}

// ---------------------------------------------------------------------------
// 9. Synchronized Web-Speech + Anna Neural TTS Karaoke Engine
// ---------------------------------------------------------------------------

function populateVoiceOptions() {
  const sel = document.getElementById("tts-voice-select");
  if (!sel) return;
  const options = [];

  if (bridge.connected && bridge.anna?.audio?.speak) {
    options.push(`<option value="anna:default">✨ Anna OS Neural TTS (Host Cloud)</option>`);
  }

  if ("speechSynthesis" in window) {
    state.tts.voices = window.speechSynthesis.getVoices() || [];
    state.tts.voices.slice(0, 18).forEach((v, idx) => {
      options.push(`<option value="web:${idx}">${escapeHtml(v.name)} (${escapeHtml(v.lang)})</option>`);
    });
  }

  if (!options.length) {
    options.push(`<option value="cadence:0">Visual Karaoke Pacer (Silent Guided Mode)</option>`);
  }
  sel.innerHTML = options.join("");
}

function stopNarration() {
  clearInterval(state.tts.timerId);
  state.tts.timerId = null;
  state.tts.playing = false;
  state.tts.paused = false;
  state.tts.activeCharIdx = -1;
  if ("speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch (_) {}
  }
  if (state.tts.audioEl) {
    state.tts.audioEl.pause();
    state.tts.audioEl = null;
  }
  renderNarrationPanel();
}

async function speakSentenceAtIndex(idx) {
  const sentences = splitSentences(state.simplified.simplified_text);
  if (!sentences.length) return;
  if (idx >= sentences.length) {
    stopNarration();
    showToast("Finished narrating document.");
    return;
  }

  clearInterval(state.tts.timerId);
  state.tts.sentenceIdx = Math.max(0, idx);
  state.tts.playing = true;
  state.tts.paused = false;
  state.tts.activeCharIdx = 0;

  const text = sentences[state.tts.sentenceIdx];
  const speed = Number(document.getElementById("tts-speed-select")?.value || 1.0);
  const pitch = Number(document.getElementById("tts-pitch-select")?.value || 1.0);
  const voiceChoice = document.getElementById("tts-voice-select")?.value || "web:0";

  renderNarrationPanel();
  const activeRow = document.querySelector(`.karaoke-sentence[data-sentence-idx="${state.tts.sentenceIdx}"]`);
  if (activeRow) activeRow.scrollIntoView({ block: "nearest", behavior: "smooth" });

  // Option A: Anna Host Neural TTS (`anna.audio.speak`)
  if (voiceChoice.startsWith("anna:") && bridge.connected && bridge.anna?.audio?.speak) {
    try {
      const ttsRes = await bridge.anna.audio.speak({
        text: text.slice(0, 950),
        speed,
        format: "mp3",
        delivery: "inline"
      });
      const payload = ttsRes?.result || ttsRes;
      const srcUrl = payload?.audioBase64
        ? `data:${payload.mimeType || "audio/mpeg"};base64,${payload.audioBase64}`
        : payload?.url;
      if (srcUrl) {
        const audio = new Audio(srcUrl);
        state.tts.audioEl = audio;
        startWordCadenceTimer(text, speed);
        audio.onended = () => {
          if (state.tts.playing) speakSentenceAtIndex(state.tts.sentenceIdx + 1);
        };
        await audio.play();
        return;
      }
    } catch (_) {
      // Gracefully fall back to Web Speech API
    }
  }

  // Option B: Browser Web Speech API (`speechSynthesis`) with boundary tracking + timer fallback
  if ("speechSynthesis" in window && state.tts.voices.length > 0 && voiceChoice.startsWith("web:")) {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = speed;
    utter.pitch = pitch;
    const vIdx = Number(voiceChoice.split(":")[1] || 0);
    if (state.tts.voices[vIdx]) utter.voice = state.tts.voices[vIdx];

    let boundaryFired = false;
    utter.onboundary = ev => {
      if (typeof ev.charIndex === "number") {
        boundaryFired = true;
        clearInterval(state.tts.timerId);
        state.tts.activeCharIdx = ev.charIndex;
        state.tts.activeCharLen = ev.charLength || 5;
        renderNarrationPanel();
      }
    };

    startWordCadenceTimer(text, speed, () => boundaryFired);

    utter.onend = () => {
      if (state.tts.playing && !state.tts.paused) {
        speakSentenceAtIndex(state.tts.sentenceIdx + 1);
      }
    };
    utter.onerror = () => {
      // Fallback to visual karaoke cadence if OS speech engine errors
      runVisualCadenceSentence(text, speed);
    };
    window.speechSynthesis.speak(utter);
    return;
  }

  // Option C: Deterministic Visual Karaoke Cadence (works even on headless/voice-less OS!)
  runVisualCadenceSentence(text, speed);
}

function startWordCadenceTimer(text, speed, shouldStopFn = () => false) {
  clearInterval(state.tts.timerId);
  const wordMatches = Array.from(text.matchAll(/\S+/g));
  let wPtr = 0;
  const stepMs = Math.max(140, Math.round(310 / speed));
  state.tts.timerId = setInterval(() => {
    if (!state.tts.playing || state.tts.paused || shouldStopFn()) return;
    if (wPtr < wordMatches.length) {
      state.tts.activeCharIdx = wordMatches[wPtr].index;
      state.tts.activeCharLen = wordMatches[wPtr][0].length;
      wPtr += 1;
      renderNarrationPanel();
    }
  }, stepMs);
}

function runVisualCadenceSentence(text, speed) {
  clearInterval(state.tts.timerId);
  const wordMatches = Array.from(text.matchAll(/\S+/g));
  let wPtr = 0;
  const stepMs = Math.max(130, Math.round(290 / speed));
  state.tts.timerId = setInterval(() => {
    if (!state.tts.playing || state.tts.paused) return;
    if (wPtr < wordMatches.length) {
      state.tts.activeCharIdx = wordMatches[wPtr].index;
      state.tts.activeCharLen = wordMatches[wPtr][0].length;
      wPtr += 1;
      renderNarrationPanel();
    } else {
      clearInterval(state.tts.timerId);
      speakSentenceAtIndex(state.tts.sentenceIdx + 1);
    }
  }, stepMs);
}

// ---------------------------------------------------------------------------
// 10. File Download Helpers (`.ics` & Markdown)
// ---------------------------------------------------------------------------

function triggerFileDownload(filename, mimeType, content) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
}

function buildIcsExport() {
  const rec = getDocRecord();
  const allActions = [...state.checklist.actions, ...rec.customTasks];
  const baseDate = new Date(Date.UTC(2026, 10, 16));
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//AccessLens AI//Anna Founding Builder Program//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH"
  ];
  allActions.forEach((act, idx) => {
    const d = new Date(baseDate.getTime() + Math.max(0, act.due_in_days || 7) * 86400000);
    const y = d.getUTCFullYear();
    const m = String(d.getUTCMonth() + 1).padStart(2, "0");
    const day = String(d.getUTCDate()).padStart(2, "0");
    const dt = `${y}${m}${day}`;
    const cleanSummary = `[${act.priority}] ${act.what}`.slice(0, 75).replace(/[,;]/g, " ");
    lines.push(
      "BEGIN:VEVENT",
      `UID:accesslens-${idx + 1}-${dt}@anna.partners`,
      "DTSTAMP:20261116T120000Z",
      `DTSTART;VALUE=DATE:${dt}`,
      `SUMMARY:${cleanSummary}`,
      `DESCRIPTION:Who: ${act.who} | By When: ${act.by_when}`,
      "BEGIN:VALARM",
      "TRIGGER:-PT9H",
      "ACTION:DISPLAY",
      `DESCRIPTION:${cleanSummary}`,
      "END:VALARM",
      "END:VEVENT"
    );
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}

function buildMarkdownExport() {
  const rec = getDocRecord();
  const allActions = [...state.checklist.actions, ...rec.customTasks];
  const lines = [
    `# ${state.docTitle}`,
    "",
    "## Plain-Language Summary",
    state.simplified.simplified_text,
    "",
    "## Prioritized Action Checklist"
  ];
  for (const a of allActions) {
    const box = rec.completedIds[a.id] ? "[x]" : "[ ]";
    lines.push(`- ${box} **[${a.priority}] ${a.what}** — *Who:* ${a.who} | *By When:* ${a.by_when}`);
  }
  if (state.checklist.red_flags.length) {
    lines.push("", "## Red-Flag Clauses & Safety Warnings");
    for (const rf of state.checklist.red_flags) {
      lines.push(`- **[${rf.severity}] ${rf.title}:** ${rf.explanation}`);
    }
  }
  return lines.join("\n");
}

// ---------------------------------------------------------------------------
// 11. Event Binding (Zero Inline Event Handlers — Strict CSP Safe!)
// ---------------------------------------------------------------------------

function bindAllEvents() {
  // Sample selector pills
  document.querySelectorAll("[data-sample-id]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.dataset.sampleId;
      const sample = SAMPLE_DOCUMENTS[id];
      if (!sample) return;
      stopNarration();
      state.activeSampleId = id;
      state.docTitle = sample.title;
      state.docDomain = sample.domain;
      state.sourceText = sample.text;
      state.rawHtml = sample.sampleHtml;
      state.llmRefinedOverride = null;
      state.focusedParaIdx = 0;

      document.querySelectorAll("[data-sample-id]").forEach(b => {
        b.classList.toggle("is-active", b.dataset.sampleId === id);
      });
      document.getElementById("doc-title-input").value = state.docTitle;
      document.getElementById("doc-domain-select").value = state.docDomain;
      document.getElementById("doc-source-textarea").value = state.sourceText;
      document.getElementById("inline-term-popover").hidden = true;

      runAllEngines();
      showToast(`Loaded ${sample.domain.toUpperCase()} sample document.`);
    });
  });

  // Theme switcher
  document.querySelectorAll("[data-set-theme]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.prefs.theme = btn.dataset.setTheme;
      applyPreferencesToDom();
      bridge.setStorageDebounced("settings/accessibility", state.prefs);
    });
  });

  // Line Focus Ruler toggle + mouse tracking
  document.getElementById("btn-toggle-ruler").addEventListener("click", () => {
    state.prefs.rulerEnabled = !state.prefs.rulerEnabled;
    applyPreferencesToDom();
    bridge.setStorageDebounced("settings/accessibility", state.prefs);
  });

  window.addEventListener("mousemove", ev => {
    if (!state.prefs.rulerEnabled) return;
    document.documentElement.style.setProperty("--al-ruler-y", `${ev.clientY}px`);
  });

  // Editor drawer toggle
  const drawer = document.getElementById("source-editor-drawer");
  const toggleEditorBtn = document.getElementById("btn-toggle-editor");
  toggleEditorBtn.addEventListener("click", () => {
    drawer.hidden = !drawer.hidden;
    toggleEditorBtn.setAttribute("aria-expanded", String(!drawer.hidden));
    if (!drawer.hidden) document.getElementById("doc-source-textarea").focus();
  });
  document.getElementById("btn-close-editor").addEventListener("click", () => {
    drawer.hidden = true;
    toggleEditorBtn.setAttribute("aria-expanded", "false");
  });

  document.getElementById("btn-analyze-now").addEventListener("click", () => {
    state.docTitle = document.getElementById("doc-title-input").value.trim() || "Custom Document Brief";
    state.docDomain = document.getElementById("doc-domain-select").value;
    state.sourceText = document.getElementById("doc-source-textarea").value.trim() || SAMPLE_DOCUMENTS.medical.text;
    state.llmRefinedOverride = null;
    runAllEngines();
    showToast("Transformed document across all 6 accessibility views.");
  });

  // Tab navigation + WAI-ARIA Left/Right/Home/End keyboard pattern
  const tabButtons = Array.from(document.querySelectorAll('[role="tab"]'));
  tabButtons.forEach((btn, idx) => {
    btn.addEventListener("click", () => activateTab(btn.dataset.tab, false));
    btn.addEventListener("keydown", ev => {
      let nextIdx = null;
      if (ev.key === "ArrowRight") nextIdx = (idx + 1) % tabButtons.length;
      else if (ev.key === "ArrowLeft") nextIdx = (idx - 1 + tabButtons.length) % tabButtons.length;
      else if (ev.key === "Home") nextIdx = 0;
      else if (ev.key === "End") nextIdx = tabButtons.length - 1;
      if (nextIdx !== null) {
        ev.preventDefault();
        activateTab(tabButtons[nextIdx].dataset.tab, true);
      }
    });
  });

  // Reading level mode pills
  document.querySelectorAll("[data-reading-mode]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.readingMode = btn.dataset.readingMode;
      runAllEngines();
    });
  });

  // Inline Jargon Term click/tap delegation
  document.getElementById("plain-output-body").addEventListener("click", ev => {
    const chip = ev.target.closest(".jargon-chip");
    if (!chip) return;
    const key = chip.dataset.termKey;
    const found = state.simplified.glossary.find(g => g.canonical === key);
    if (!found) return;
    document.getElementById("popover-term-title").textContent = found.term;
    document.getElementById("popover-term-plain").textContent = `Plain English: ${found.plain}`;
    document.getElementById("popover-term-def").textContent = found.definition;
    const pop = document.getElementById("inline-term-popover");
    pop.hidden = false;
    announcePolite(`${found.term} means ${found.plain}. ${found.definition}`);
  });

  document.getElementById("btn-close-popover").addEventListener("click", () => {
    document.getElementById("inline-term-popover").hidden = true;
  });

  document.getElementById("glossary-filter-input").addEventListener("input", ev => {
    state.glossaryFilter = ev.target.value;
    renderPlainPanel();
  });

  document.getElementById("btn-copy-plain").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(state.simplified.simplified_text);
      showToast("Plain-language summary copied to clipboard.");
    } catch (_) {
      showToast("Ready to copy from reader surface.");
    }
  });

  document.getElementById("btn-jump-narrate").addEventListener("click", () => {
    activateTab("narration", false);
    speakSentenceAtIndex(0);
  });

  // Anna Host LLM Refine button
  document.getElementById("btn-anna-llm").addEventListener("click", async () => {
    const btn = document.getElementById("btn-anna-llm");
    btn.disabled = true;
    btn.textContent = "⏳ Refining…";
    try {
      const refined = await bridge.refineWithHostLlm(
        state.sourceText,
        state.readingMode,
        state.simplified.domain
      );
      if (refined) {
        state.llmRefinedOverride = { mode: state.readingMode, text: refined };
        runAllEngines();
        showToast("Refined plain-language brief via Anna Host LLM!");
      } else {
        runAllEngines();
        showToast("Verified via AccessLens deterministic plain-language engine (connect inside Anna OS for cloud LLM sampling).");
      }
    } catch (err) {
      showToast(`Used deterministic local clarity engine (${err.message || "offline-safe"}).`);
    } finally {
      btn.disabled = false;
      btn.textContent = "✨ Deep Refine (Anna AI)";
    }
  });

  // Share to Anna Chat (`chat.append_artifact`) or copy Markdown
  document.getElementById("btn-share-chat").addEventListener("click", async () => {
    const md = buildMarkdownExport();
    try {
      const posted = await bridge.appendChatArtifact(
        `AccessLens AI (${state.simplified.domain.toUpperCase()}): Grade ${state.simplified.before_metrics.flesch_kincaid_grade} → ${state.simplified.after_metrics.flesch_kincaid_grade}, ${state.checklist.actions.length} actions, ${state.checklist.red_flags.length} red flags`,
        {
          title: state.docTitle,
          simplified_text: state.simplified.simplified_text,
          actions: state.checklist.actions,
          red_flags: state.checklist.red_flags
        }
      );
      if (posted) {
        showToast("Attached AccessLens brief & checklist artifact directly to Anna Chat!");
        return;
      }
    } catch (_) {}
    try {
      await navigator.clipboard.writeText(md);
      showToast("Copied full Plain-Language Brief & Checklist Markdown to clipboard!");
    } catch (_) {
      triggerFileDownload("accesslens-brief.md", "text/markdown;charset=utf-8", md);
    }
  });

  // Checklist interactions + persistence
  document.getElementById("checklist-items-list").addEventListener("change", ev => {
    const chk = ev.target.closest(".task-checkbox");
    if (!chk) return;
    const rec = getDocRecord();
    rec.completedIds[chk.dataset.taskId] = chk.checked;
    bridge.setStorageDebounced("checklists/state", state.checklistMemory);
    renderChecklistPanel();
    renderKpis();
  });

  document.getElementById("custom-task-form").addEventListener("submit", ev => {
    ev.preventDefault();
    const whatEl = document.getElementById("custom-task-input");
    const whenEl = document.getElementById("custom-task-when");
    const what = whatEl.value.trim();
    if (!what) return;
    const rec = getDocRecord();
    rec.customTasks.push({
      id: `custom-${Date.now()}`,
      who: "Me",
      what,
      by_when: whenEl.value.trim() || "Follow-up",
      due_in_days: 3,
      priority: "HIGH"
    });
    whatEl.value = "";
    whenEl.value = "";
    bridge.setStorageDebounced("checklists/state", state.checklistMemory);
    renderChecklistPanel();
    renderKpis();
    showToast("Saved custom action item to persistent memory.");
  });

  document.getElementById("btn-reset-checks").addEventListener("click", () => {
    const rec = getDocRecord();
    rec.completedIds = {};
    bridge.setStorageDebounced("checklists/state", state.checklistMemory);
    renderChecklistPanel();
    renderKpis();
  });

  document.getElementById("btn-export-ics").addEventListener("click", () => {
    triggerFileDownload("accesslens-deadlines.ics", "text/calendar;charset=utf-8", buildIcsExport());
    showToast("Downloaded `.ics` calendar file with deadline alarms.");
  });

  document.getElementById("btn-export-md").addEventListener("click", () => {
    triggerFileDownload("accesslens-checklist.md", "text/markdown;charset=utf-8", buildMarkdownExport());
    showToast("Downloaded Markdown checklist & risk report.");
  });

  // Dyslexia & Bionic Studio controls
  const bindPref = (id, prop, isNum = false, isBool = false) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener("input", () => {
      state.prefs[prop] = isBool ? el.checked : isNum ? Number(el.value) : el.value;
      applyPreferencesToDom();
      renderDyslexiaPanel();
      bridge.setStorageDebounced("settings/accessibility", state.prefs);
    });
  };
  bindPref("ctrl-font-family", "fontFamily");
  bindPref("ctrl-bionic-level", "bionicRatio", true);
  bindPref("ctrl-syllable-dots", "syllableDots", false, true);
  bindPref("ctrl-studio-ruler", "rulerEnabled", false, true);
  bindPref("ctrl-font-size", "fontSize", true);
  bindPref("ctrl-letter-spacing", "letterSpacing", true);
  bindPref("ctrl-word-spacing", "wordSpacing", true);
  bindPref("ctrl-line-height", "lineHeight", true);
  bindPref("ctrl-measure", "measure", true);

  document.getElementById("btn-dyslexia-preset").addEventListener("click", () => {
    Object.assign(state.prefs, {
      theme: "cream",
      fontFamily: "dyslexia",
      bionicRatio: 0.45,
      syllableDots: true,
      fontSize: 21,
      letterSpacing: 0.12,
      wordSpacing: 0.16,
      lineHeight: 2.0,
      measure: 60
    });
    applyPreferencesToDom();
    renderDyslexiaPanel();
    bridge.setStorageDebounced("settings/accessibility", state.prefs);
    showToast("Applied WCAG 1.4.12 Dyslexia & Warm Cream Studio preset.");
  });

  document.getElementById("btn-reset-typography").addEventListener("click", () => {
    Object.assign(state.prefs, {
      fontFamily: "sans",
      bionicRatio: 0.45,
      syllableDots: false,
      rulerEnabled: false,
      fontSize: 19,
      letterSpacing: 0.04,
      wordSpacing: 0.08,
      lineHeight: 1.85,
      measure: 66
    });
    applyPreferencesToDom();
    renderDyslexiaPanel();
    bridge.setStorageDebounced("settings/accessibility", state.prefs);
  });

  // Keyboard paragraph stepping inside Dyslexia Canvas
  document.getElementById("dyslexia-reading-canvas").addEventListener("keydown", ev => {
    const paras = document.querySelectorAll(".dyslexia-para");
    if (!paras.length) return;
    if (ev.key === "ArrowDown") {
      ev.preventDefault();
      state.focusedParaIdx = Math.min(paras.length - 1, state.focusedParaIdx + 1);
      renderDyslexiaPanel();
      const active = document.querySelector(`.dyslexia-para[data-para-idx="${state.focusedParaIdx}"]`);
      if (active) {
        const rect = active.getBoundingClientRect();
        document.documentElement.style.setProperty("--al-ruler-y", `${rect.top + rect.height / 2}px`);
      }
    } else if (ev.key === "ArrowUp") {
      ev.preventDefault();
      state.focusedParaIdx = Math.max(0, state.focusedParaIdx - 1);
      renderDyslexiaPanel();
      const active = document.querySelector(`.dyslexia-para[data-para-idx="${state.focusedParaIdx}"]`);
      if (active) {
        const rect = active.getBoundingClientRect();
        document.documentElement.style.setProperty("--al-ruler-y", `${rect.top + rect.height / 2}px`);
      }
    }
  });

  // WCAG HTML Repair bindings
  document.getElementById("btn-load-sample-html").addEventListener("click", () => {
    const sample = SAMPLE_DOCUMENTS[state.activeSampleId] || SAMPLE_DOCUMENTS.medical;
    state.rawHtml = sample.sampleHtml;
    document.getElementById("html-source-textarea").value = state.rawHtml;
    state.htmlAudit = auditAndRepairHtml(state.rawHtml);
    renderHtmlRepairPanel();
    renderKpis();
    showToast("Loaded broken HTML sample and auto-repaired WCAG 2.2 issues.");
  });

  document.getElementById("btn-audit-html").addEventListener("click", () => {
    state.rawHtml = document.getElementById("html-source-textarea").value;
    state.htmlAudit = auditAndRepairHtml(state.rawHtml);
    renderHtmlRepairPanel();
    renderKpis();
    showToast(`Repaired ${state.htmlAudit.issue_count} WCAG accessibility issues.`);
  });

  document.querySelectorAll("[data-html-view]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.htmlViewMode = btn.dataset.htmlView;
      renderHtmlRepairPanel();
    });
  });

  document.getElementById("btn-copy-repaired-html").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(state.htmlAudit.repaired_html);
      showToast("Copied WCAG 2.2 repaired HTML to clipboard.");
    } catch (_) {
      showToast("Repaired HTML ready in code pane.");
    }
  });

  // Narration bindings
  document.getElementById("btn-tts-play").addEventListener("click", () => {
    if (state.tts.paused && "speechSynthesis" in window) {
      state.tts.paused = false;
      state.tts.playing = true;
      window.speechSynthesis.resume();
      renderNarrationPanel();
      return;
    }
    speakSentenceAtIndex(state.tts.sentenceIdx);
  });

  document.getElementById("btn-tts-pause").addEventListener("click", () => {
    if (!state.tts.playing) return;
    state.tts.paused = true;
    if ("speechSynthesis" in window) window.speechSynthesis.pause();
    if (state.tts.audioEl) state.tts.audioEl.pause();
    renderNarrationPanel();
  });

  document.getElementById("btn-tts-stop").addEventListener("click", () => stopNarration());
  document.getElementById("btn-tts-prev").addEventListener("click", () => {
    speakSentenceAtIndex(Math.max(0, state.tts.sentenceIdx - 1));
  });
  document.getElementById("btn-tts-next").addEventListener("click", () => {
    speakSentenceAtIndex(state.tts.sentenceIdx + 1);
  });

  const karaokeList = document.getElementById("karaoke-sentences-list");
  karaokeList.addEventListener("click", ev => {
    const row = ev.target.closest(".karaoke-sentence");
    if (row) speakSentenceAtIndex(Number(row.dataset.sentenceIdx));
  });
  karaokeList.addEventListener("keydown", ev => {
    if (ev.key === "Enter" || ev.key === " ") {
      const row = ev.target.closest(".karaoke-sentence");
      if (row) {
        ev.preventDefault();
        speakSentenceAtIndex(Number(row.dataset.sentenceIdx));
      }
    }
  });

  if ("speechSynthesis" in window) {
    window.speechSynthesis.onvoiceschanged = () => populateVoiceOptions();
  }

  // Concept Map interactions (Click + Enter/Space + Zoom + Filter)
  const mapSvg = document.getElementById("concept-map-svg");
  mapSvg.addEventListener("click", ev => {
    const grp = ev.target.closest(".map-node-group");
    if (!grp) return;
    state.selectedNodeId = grp.dataset.nodeId;
    renderConceptMapPanel();
  });
  mapSvg.addEventListener("keydown", ev => {
    const grp = ev.target.closest(".map-node-group");
    if (!grp) return;
    if (ev.key === "Enter" || ev.key === " ") {
      ev.preventDefault();
      state.selectedNodeId = grp.dataset.nodeId;
      renderConceptMapPanel();
      const restored = mapSvg.querySelector(`[data-node-id="${CSS.escape(state.selectedNodeId)}"]`);
      if (restored) restored.focus();
    }
  });

  document.querySelectorAll("[data-map-filter]").forEach(btn => {
    btn.addEventListener("click", () => {
      state.mapFilter = btn.dataset.mapFilter;
      document.querySelectorAll("[data-map-filter]").forEach(b => {
        b.classList.toggle("is-active", b.dataset.mapFilter === state.mapFilter);
      });
      renderConceptMapPanel();
    });
  });

  document.getElementById("btn-zoom-in").addEventListener("click", () => {
    state.mapZoom = Math.min(1.5, +(state.mapZoom + 0.12).toFixed(2));
    renderConceptMapPanel();
  });
  document.getElementById("btn-zoom-out").addEventListener("click", () => {
    state.mapZoom = Math.max(0.72, +(state.mapZoom - 0.12).toFixed(2));
    renderConceptMapPanel();
  });
  document.getElementById("btn-zoom-reset").addEventListener("click", () => {
    state.mapZoom = 1.0;
    renderConceptMapPanel();
  });

  window.addEventListener("hashchange", () => {
    const route = window.location.hash.replace(/^#\/?/, "");
    if (route && ROUTE_TO_TAB[route]) activateTab(route, false);
  });
}

// ---------------------------------------------------------------------------
// 12. Bootstrap & Anna Host Handshake (`entry_payload` + `runtime_state`)
// ---------------------------------------------------------------------------

function applyAnnaEntryPayload(payload) {
  if (!payload || typeof payload !== "object") return;
  if (payload.title) state.docTitle = String(payload.title);
  if (payload.domain) state.docDomain = String(payload.domain);
  if (payload.reading_level && ["grade5", "consumer", "executive"].includes(payload.reading_level)) {
    state.readingMode = payload.reading_level;
  }
  if (payload.text) {
    state.sourceText = String(payload.text);
    state.llmRefinedOverride = null;
  }
  if (payload.html) {
    state.rawHtml = String(payload.html);
  }
  document.getElementById("doc-title-input").value = state.docTitle;
  document.getElementById("doc-source-textarea").value = state.sourceText;
  if (payload.view && ROUTE_TO_TAB[payload.view]) {
    activateTab(payload.view, false);
  }
  runAllEngines();
}

async function boot() {
  document.getElementById("doc-source-textarea").value = state.sourceText;
  document.getElementById("html-source-textarea").value = state.rawHtml;

  bindAllEvents();
  populateVoiceOptions();

  // Connect to Anna OS Host Runtime if embedded, otherwise run cleanly standalone
  const isAnna = await bridge.init();
  const badge = document.getElementById("runtime-badge");

  if (isAnna && bridge.anna) {
    badge.textContent = "Anna OS Connected · APS Memory + Host AI";
    badge.className = "runtime-badge runtime-anna";

    if (bridge.anna.theme && ["light", "dark"].includes(bridge.anna.theme)) {
      state.prefs.theme = bridge.anna.theme === "light" ? "cream" : "dark";
    }
    if (typeof bridge.anna.onThemeChange === "function") {
      bridge.anna.onThemeChange(({ theme }) => {
        if (theme === "light" && state.prefs.theme === "dark") {
          state.prefs.theme = "cream";
          applyPreferencesToDom();
        } else if (theme === "dark" && state.prefs.theme === "cream") {
          state.prefs.theme = "dark";
          applyPreferencesToDom();
        }
      });
    }
    if (typeof bridge.anna.on === "function") {
      bridge.anna.on("entry_payload", payload => applyAnnaEntryPayload(payload));
      bridge.anna.on("runtime_state_synced", synced => {
        if (synced && synced["settings/accessibility"]) {
          Object.assign(state.prefs, synced["settings/accessibility"]);
          applyPreferencesToDom();
        }
      });
    }
  }

  // Hydrate persisted user preferences & checklist completions
  const savedPrefs = await bridge.getStorage("settings/accessibility", null);
  if (savedPrefs && typeof savedPrefs === "object") {
    Object.assign(state.prefs, savedPrefs);
  }
  const savedChecks = await bridge.getStorage("checklists/state", null);
  if (savedChecks && typeof savedChecks === "object") {
    state.checklistMemory = savedChecks;
  }

  // Route from URL hash or Anna viewMeta / entryPayload
  const hashRoute = window.location.hash.replace(/^#\/?/, "");
  const viewName = bridge.anna?.viewMeta?.name;
  if (hashRoute && ROUTE_TO_TAB[hashRoute]) {
    activateTab(hashRoute, false);
  } else if (viewName && ROUTE_TO_TAB[viewName]) {
    activateTab(viewName, false);
  }

  if (bridge.anna?.entryPayload) {
    applyAnnaEntryPayload(bridge.anna.entryPayload);
  }

  populateVoiceOptions();
  applyPreferencesToDom();
  runAllEngines();
}

boot();
