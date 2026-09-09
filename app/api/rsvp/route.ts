type RsvpPayload = { firstName?: string; lastName?: string; organisation?: string; position?: string; email?: string; attendance?: string; dietary?: string; accessibility?: string; notes?: string; language?: string };
const trim = (value: unknown, max = 500) => typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(request: Request) {
  try {
    const body = await request.json() as RsvpPayload;
    const record = { first_name: trim(body.firstName, 100), last_name: trim(body.lastName, 100), organisation: trim(body.organisation, 200), position: trim(body.position, 200), email: trim(body.email, 254).toLowerCase(), attendance: trim(body.attendance, 30), dietary: trim(body.dietary), accessibility: trim(body.accessibility), notes: trim(body.notes, 1000), language: body.language === "tr" ? "tr" : "en", updated_at: new Date().toISOString() };
    if (!record.first_name || !record.last_name || !record.organisation || !record.position || !/^\S+@\S+\.\S+$/.test(record.email) || !["attending", "not_attending"].includes(record.attendance)) return Response.json({ ok: false }, { status: 400 });
    const supabaseUrl = process.env.SUPABASE_URL, serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !serviceKey) throw new Error("Supabase is not configured");
    const stored = await fetch(`${supabaseUrl}/rest/v1/rsvps?on_conflict=email`, { method: "POST", headers: { apikey: serviceKey, authorization: `Bearer ${serviceKey}`, "content-type": "application/json", prefer: "resolution=merge-duplicates,return=minimal" }, body: JSON.stringify(record) });
    if (!stored.ok) throw new Error(`Registration storage failed: ${stored.status}`);
    await sendNotifications({ ...record, firstName: record.first_name, lastName: record.last_name });
    return Response.json({ ok: true });
  } catch (error) { console.error(error); return Response.json({ ok: false }, { status: 500 }); }
}

async function sendNotifications(data: Record<string, string>) {
  const apiKey = process.env.RESEND_API_KEY, from = process.env.RSVP_FROM_EMAIL;
  if (!apiKey || !from) return;
  const attending = data.attendance === "attending";
  const responseText = data.language === "tr" ? (attending ? "Katılacağım" : "Katılamayacağım") : (attending ? "Attending" : "Unable to attend");
  const participantSubject = data.language === "tr" ? "Avrupa Belediye Birlikleri Zirvesi katılım yanıtınız" : "Your registration for the European Summit of Municipal Associations";
  const participantHtml = data.language === "tr" ? `<p>Sayın ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)},</p><p>Katılım yanıtınız kaydedilmiştir.</p><p><strong>Durum:</strong> ${responseText}</p><p>13 Ekim 2026 · 14.00–18.30<br>CEMR Toplantı Salonu, 1. Kat<br>Square de Meeûs 1, 1000 Brüksel</p>` : `<p>Dear ${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)},</p><p>Your registration response has been recorded.</p><p><strong>Status:</strong> ${responseText}</p><p>13 October 2026 · 14:00–18:30<br>CEMR Meeting Room, 1st Floor<br>Square de Meeûs 1, 1000 Brussels</p>`;
  const organiserHtml = `<h2>New Summit Registration</h2><p><strong>${escapeHtml(data.firstName)} ${escapeHtml(data.lastName)}</strong><br>${escapeHtml(data.position)} · ${escapeHtml(data.organisation)}<br>${escapeHtml(data.email)}</p><p><strong>Status:</strong> ${escapeHtml(responseText)}</p><p><strong>Dietary:</strong> ${escapeHtml(data.dietary || "—")}<br><strong>Accessibility:</strong> ${escapeHtml(data.accessibility || "—")}<br><strong>Note:</strong> ${escapeHtml(data.notes || "—")}</p>`;
  await Promise.all([sendEmail(apiKey, from, "polen.bicer@tbb.gov.tr", `Summit Registration · ${data.firstName} ${data.lastName}`, organiserHtml), sendEmail(apiKey, from, data.email, participantSubject, participantHtml)]);
}
async function sendEmail(apiKey: string, from: string, to: string, subject: string, html: string) { const response = await fetch("https://api.resend.com/emails", { method: "POST", headers: { authorization: `Bearer ${apiKey}`, "content-type": "application/json" }, body: JSON.stringify({ from, to: [to], subject, html }) }); if (!response.ok) console.error("Email delivery failed", response.status); }
function escapeHtml(value: string) { return value.replace(/[&<>'"]/g, c => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", "'":"&#39;", '"':"&quot;" })[c] || c); }
