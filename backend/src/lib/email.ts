import { Resend } from 'resend';

const resendApiKey = process.env.RESEND_API_KEY?.trim();
const fromEmail = process.env.CONTACT_FROM_EMAIL?.trim() || 'MR DGN Group <onboarding@resend.dev>';
const adminEmail = process.env.CONTACT_ADMIN_EMAIL?.trim() || '';

let resend: Resend | null = null;
if (resendApiKey) {
  try {
    resend = new Resend(resendApiKey);
  } catch {
    resend = null;
  }
}

export type ContactPayload = {
  source: string;
  name: string | null;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message?: string | null;
  metadata?: Record<string, unknown> | null;
};

function sourceLabel(source: string): string {
  const labels: Record<string, string> = {
    construction: 'MR DGN Constructions',
    group: 'MR DGN Group',
    entertainment: 'MR DGN Entertainment',
    'mansaluxe-realty': 'Mansa Luxe Realty',
  };
  return labels[source] || source;
}

function formatMetadata(metadata: Record<string, unknown> | null | undefined): string {
  if (!metadata || typeof metadata !== 'object') return '—';
  return Object.entries(metadata)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
}

/**
 * Send notification to admin when a contact form is submitted (any website).
 */
export async function sendContactNotificationToAdmin(payload: ContactPayload): Promise<{ ok: boolean; error?: string }> {
  if (!resend || !adminEmail) {
    return { ok: false, error: 'Resend or CONTACT_ADMIN_EMAIL not configured' };
  }
  const siteName = sourceLabel(payload.source);
  const subject = `[${siteName}] New contact / quote request from ${payload.name || payload.email}`;
  const metaText = formatMetadata(payload.metadata ?? null);
  const html = `
    <h2>New contact submission</h2>
    <p><strong>Website:</strong> ${siteName} (${payload.source})</p>
    <p><strong>Name:</strong> ${payload.name ?? '—'}</p>
    <p><strong>Email:</strong> ${payload.email}</p>
    <p><strong>Phone:</strong> ${payload.phone ?? '—'}</p>
    <p><strong>Subject:</strong> ${payload.subject ?? '—'}</p>
    <p><strong>Message:</strong></p>
    <pre style="white-space:pre-wrap;background:#f4f4f4;padding:12px;border-radius:8px;">${payload.message ?? '—'}</pre>
    ${metaText !== '—' ? `<p><strong>Details:</strong></p><pre style="white-space:pre-wrap;background:#f4f4f4;padding:12px;border-radius:8px;">${metaText}</pre>` : ''}
    <p style="color:#666;font-size:12px;">Submitted via contact form. Reply to ${payload.email}.</p>
  `;
  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [adminEmail],
      replyTo: payload.email,
      subject,
      html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return { ok: false, error: message };
  }
}

/**
 * Send confirmation email to the user who submitted the form.
 */
export async function sendContactConfirmationToUser(payload: ContactPayload): Promise<{ ok: boolean; error?: string }> {
  if (!resend) return { ok: false, error: 'Resend not configured' };
  const siteName = sourceLabel(payload.source);
  const subject = `We've received your message – ${siteName}`;
  const html = `
    <p>Hi ${payload.name || 'there'},</p>
    <p>Thank you for getting in touch. We've received your message and will get back to you within 24 hours.</p>
    <p>If your inquiry was urgent, you can also reach us by phone or WhatsApp: +234 813 532 4467.</p>
    <p>Best regards,<br/><strong>${siteName}</strong></p>
  `;
  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [payload.email],
      subject,
      html,
    });
    if (error) return { ok: false, error: error.message };
    return { ok: true };
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Unknown error';
    return { ok: false, error: message };
  }
}
