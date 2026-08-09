/**
 * Netlify Scheduled Function — Portfolio Health Monitor
 * Runs every 6 hours via cron.
 * - Checks jananthnikash.com availability + performance
 * - Checks the Render agent API (/api/chat)
 * - Checks Netlify deploy status
 * - Sends email alert for major issues
 * - Auto-logs minor issues for reference
 */

export const config = {
  schedule: "0 */6 * * *", // every 6 hours
};

const SITE_URL = "https://www.jananthnikash.com";
const AGENT_URL = "https://portfolioagent-sklw.onrender.com";
const NOTIFY_EMAIL = "jananthnikash.ky@outlook.in";

// ─── Checks ──────────────────────────────────────────────────────────────────

async function checkSite() {
  const start = Date.now();
  try {
    const res = await fetch(SITE_URL, {
      method: "GET",
      signal: AbortSignal.timeout(15000),
    });
    const latency = Date.now() - start;
    return {
      name: "Portfolio Site",
      url: SITE_URL,
      ok: res.ok,
      status: res.status,
      latency,
      issue: res.ok
        ? latency > 5000
          ? `Slow response: ${latency}ms`
          : null
        : `HTTP ${res.status}`,
    };
  } catch (err) {
    return {
      name: "Portfolio Site",
      url: SITE_URL,
      ok: false,
      status: 0,
      latency: Date.now() - start,
      issue: `Unreachable: ${err.message}`,
    };
  }
}

async function checkAgentHealth() {
  const start = Date.now();
  try {
    const res = await fetch(`${AGENT_URL}/`, {
      method: "GET",
      signal: AbortSignal.timeout(90000), // Render cold start can take 60s
    });
    const latency = Date.now() - start;
    const body = await res.json().catch(() => ({}));
    return {
      name: "Agent API (health)",
      url: `${AGENT_URL}/`,
      ok: res.ok && body.status === "ok",
      status: res.status,
      latency,
      issue: !res.ok
        ? `HTTP ${res.status}: ${body.message || "unknown"}`
        : body.status !== "ok"
        ? `Agent reports error: ${body.message}`
        : latency > 70000
        ? `Cold start slow: ${Math.round(latency / 1000)}s`
        : null,
    };
  } catch (err) {
    return {
      name: "Agent API (health)",
      url: `${AGENT_URL}/`,
      ok: false,
      status: 0,
      latency: Date.now() - start,
      issue: `Unreachable after timeout: ${err.message}`,
    };
  }
}

async function checkAgentChat() {
  const start = Date.now();
  try {
    const res = await fetch(`${AGENT_URL}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "ping" }),
      signal: AbortSignal.timeout(90000),
    });
    const latency = Date.now() - start;
    const body = await res.json().catch(() => ({}));
    const hasAnswer = typeof body.answer === "string" && body.answer.length > 0;
    return {
      name: "Agent API (chat)",
      url: `${AGENT_URL}/api/chat`,
      ok: res.ok && hasAnswer,
      status: res.status,
      latency,
      issue: !res.ok
        ? `HTTP ${res.status}: ${body.error || "unknown"}`
        : !hasAnswer
        ? `Empty answer returned: ${JSON.stringify(body)}`
        : null,
    };
  } catch (err) {
    return {
      name: "Agent API (chat)",
      url: `${AGENT_URL}/api/chat`,
      ok: false,
      status: 0,
      latency: Date.now() - start,
      issue: `Chat request failed: ${err.message}`,
    };
  }
}

// ─── Classifier ───────────────────────────────────────────────────────────────

function classify(results) {
  const major = [];
  const minor = [];

  for (const r of results) {
    if (!r.ok) {
      // Site completely down or chat broken = major
      if (r.name === "Portfolio Site" || r.name === "Agent API (chat)") {
        major.push(r);
      } else {
        minor.push(r);
      }
    } else if (r.issue) {
      // Has issue but still ok (slow etc.) = minor
      minor.push(r);
    }
  }

  return { major, minor };
}

// ─── Email via EmailJS REST API ───────────────────────────────────────────────

async function sendAlert(major, minor, allResults) {
  const serviceId = process.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = process.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.VITE_EMAILJS_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    console.warn("[HealthCheck] EmailJS env vars not set — skipping email.");
    return;
  }

  const now = new Date().toUTCString();
  const majorLines = major
    .map((r) => `❌ ${r.name}: ${r.issue} (${r.latency}ms)`)
    .join("\n");
  const minorLines = minor
    .map((r) => `⚠️  ${r.name}: ${r.issue || "slow"} (${r.latency}ms)`)
    .join("\n");
  const allLines = allResults
    .map((r) => `${r.ok && !r.issue ? "✅" : r.ok ? "⚠️ " : "❌"} ${r.name}: ${r.ok ? (r.issue || "OK") : r.issue} — ${r.latency}ms`)
    .join("\n");

  const messageBody = `
Portfolio Health Check Alert
Time: ${now}

${major.length > 0 ? `🚨 MAJOR ISSUES (requires your attention):\n${majorLines}\n` : ""}
${minor.length > 0 ? `⚠️  Minor issues (logged only):\n${minorLines}\n` : ""}

Full report:
${allLines}

→ Visit https://www.jananthnikash.com to verify.
`.trim();

  try {
    const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: {
          from_name: "Portfolio Health Monitor",
          from_email: NOTIFY_EMAIL,
          to_email: NOTIFY_EMAIL,
          subject: `🚨 Portfolio Alert: ${major.length} major, ${minor.length} minor issue(s) detected`,
          message: messageBody,
        },
      }),
    });
    if (res.ok) {
      console.log("[HealthCheck] Alert email sent.");
    } else {
      console.error("[HealthCheck] Email failed:", await res.text());
    }
  } catch (err) {
    console.error("[HealthCheck] Email error:", err.message);
  }
}

// ─── Handler ──────────────────────────────────────────────────────────────────

export default async function handler() {
  console.log("[HealthCheck] Starting portfolio health check...");
  const timestamp = new Date().toISOString();

  const [siteResult, agentHealth, agentChat] = await Promise.all([
    checkSite(),
    checkAgentHealth(),
    checkAgentChat(),
  ]);

  const allResults = [siteResult, agentHealth, agentChat];
  const { major, minor } = classify(allResults);

  // Always log full report
  console.log(`\n[HealthCheck] Report @ ${timestamp}`);
  for (const r of allResults) {
    const icon = r.ok && !r.issue ? "✅" : r.ok ? "⚠️ " : "❌";
    console.log(`${icon} ${r.name}: ${r.ok ? r.issue || "OK" : r.issue} (${r.latency}ms)`);
  }

  if (major.length > 0) {
    console.log(`\n[HealthCheck] 🚨 ${major.length} MAJOR issue(s) — sending alert email...`);
    await sendAlert(major, minor, allResults);
  } else if (minor.length > 0) {
    console.log(`\n[HealthCheck] ⚠️  ${minor.length} minor issue(s) — logged only, no email sent.`);
  } else {
    console.log("\n[HealthCheck] ✅ All systems healthy.");
  }

  return new Response(
    JSON.stringify({
      timestamp,
      results: allResults,
      major: major.length,
      minor: minor.length,
      status: major.length > 0 ? "alert" : minor.length > 0 ? "warning" : "healthy",
    }),
    { headers: { "Content-Type": "application/json" } }
  );
}
