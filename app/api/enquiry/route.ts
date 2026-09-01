import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

const MAX_ATTACHMENT_BYTES = 8 * 1024 * 1024; // 8MB — keep enquiry emails light

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export async function POST(req: NextRequest) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return NextResponse.json(
      { ok: false, error: 'Enquiry service is not configured yet. Please email us directly.' },
      { status: 500 }
    );
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid form submission.' }, { status: 400 });
  }

  const get = (key: string) => (formData.get(key) as string | null)?.trim() ?? '';

  const name = get('name');
  const company = get('company');
  const email = get('email');
  const country = get('country');
  const interest = get('interest');
  const product = get('product');
  const message = get('message');

  if (!name || !company || !email || !country || !message) {
    return NextResponse.json({ ok: false, error: 'Please fill in all required fields.' }, { status: 400 });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  }

  const attachments: { filename: string; content: Buffer }[] = [];
  const file = formData.get('file');
  if (file instanceof File && file.size > 0) {
    if (file.size > MAX_ATTACHMENT_BYTES) {
      return NextResponse.json({ ok: false, error: 'Attachment is too large (max 8MB).' }, { status: 400 });
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    attachments.push({ filename: file.name || 'attachment', content: buffer });
  }

  const resend = new Resend(apiKey);
  const fromAddress = process.env.RESEND_FROM_EMAIL || 'Paul Global Website <onboarding@resend.dev>';
  const toAddress = process.env.RESEND_TO_EMAIL || 'exports@paulglobal.com';

  const html = `
    <h2>New enquiry from Paul Global website</h2>
    <p><strong>Name:</strong> ${escapeHtml(name)}</p>
    <p><strong>Company:</strong> ${escapeHtml(company)}</p>
    <p><strong>Email:</strong> ${escapeHtml(email)}</p>
    <p><strong>Country:</strong> ${escapeHtml(country)}</p>
    <p><strong>Interested in:</strong> ${escapeHtml(interest || '—')}</p>
    <p><strong>Product (if known):</strong> ${escapeHtml(product || '—')}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: fromAddress,
      to: toAddress,
      replyTo: email,
      subject: `New enquiry: ${company} (${country})`,
      html,
      attachments: attachments.length ? attachments : undefined,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ ok: false, error: 'Could not send your enquiry. Please try again.' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Enquiry send failed:', err);
    return NextResponse.json({ ok: false, error: 'Could not send your enquiry. Please try again.' }, { status: 500 });
  }
}
