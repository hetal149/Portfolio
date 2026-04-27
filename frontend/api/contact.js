// Vercel Serverless Function: POST /api/contact
// Deployed automatically when you push to Vercel.
//
// Required env vars (set in Vercel project settings):
//   RESEND_API_KEY       = your Resend API key (re_...)
//   CONTACT_TO_EMAIL     = hetalpatil149@gmail.com
//   CONTACT_FROM_EMAIL   = onboarding@resend.dev   (default Resend sender)

export default async function handler(req, res) {
  // CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, detail: "Method not allowed" });
  }

  try {
    const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
    const name = (body.name || "").toString().trim();
    const email = (body.email || "").toString().trim();
    const subject = (body.subject || "").toString().trim();
    const message = (body.message || "").toString().trim();

    // Validation
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (name.length < 2 || name.length > 80) {
      return res.status(422).json({ success: false, detail: "Name must be 2-80 characters." });
    }
    if (!emailOk) {
      return res.status(422).json({ success: false, detail: "Please provide a valid email." });
    }
    if (message.length < 10 || message.length > 5000) {
      return res.status(422).json({ success: false, detail: "Message must be 10-5000 characters." });
    }
    if (subject.length > 200) {
      return res.status(422).json({ success: false, detail: "Subject is too long." });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    const TO = process.env.CONTACT_TO_EMAIL || "hetalpatil149@gmail.com";
    const FROM = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    if (!RESEND_API_KEY) {
      return res.status(500).json({ success: false, detail: "Email service not configured." });
    }

    const safeSubject = subject || `New message from ${name}`;
    const escaped = (s) =>
      s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

    const html = `
<!DOCTYPE html>
<html><head><meta charset="utf-8"></head>
<body style="font-family: Inter, Arial, sans-serif; background:#0a0a0b; padding:24px; color:#e5e7eb;">
  <div style="max-width:600px;margin:auto;background:#111113;border:1px solid #1f2937;border-radius:12px;padding:28px;">
    <div style="border-left:3px solid #10b981;padding-left:12px;margin-bottom:20px;">
      <div style="font-size:12px;color:#10b981;text-transform:uppercase;letter-spacing:1px;font-family:monospace;">New Portfolio Contact</div>
      <h2 style="margin:6px 0 0;color:#fff;">${escaped(safeSubject)}</h2>
    </div>
    <table style="width:100%;font-size:14px;color:#d4d4d8;border-collapse:collapse;">
      <tr><td style="padding:6px 0;color:#71717a;width:80px;">From:</td><td><strong style="color:#fff;">${escaped(name)}</strong></td></tr>
      <tr><td style="padding:6px 0;color:#71717a;">Email:</td><td><a href="mailto:${escaped(email)}" style="color:#34d399;text-decoration:none;">${escaped(email)}</a></td></tr>
      <tr><td style="padding:6px 0;color:#71717a;vertical-align:top;">Message:</td>
          <td style="white-space:pre-wrap;line-height:1.6;">${escaped(message)}</td></tr>
    </table>
    <div style="margin-top:24px;padding-top:16px;border-top:1px solid #1f2937;font-size:12px;color:#71717a;">
      Sent via your portfolio contact form • ${new Date().toUTCString()}
    </div>
  </div>
</body></html>`;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: `Portfolio Contact <${FROM}>`,
        to: [TO],
        reply_to: email,
        subject: `[Portfolio] ${safeSubject}`,
        html,
      }),
    });

    if (!r.ok) {
      const errText = await r.text();
      console.error("Resend error:", errText);
      return res.status(500).json({ success: false, detail: "Email delivery failed.", email_sent: false });
    }

    const data = await r.json();
    return res.status(200).json({
      success: true,
      id: data?.id || null,
      message: "Message sent successfully!",
      email_sent: true,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, detail: "Unexpected error." });
  }
}
