// app/api/contact/route.js
import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

function validatePayload(payload) {
    const name = payload?.name?.trim();
    const email = payload?.email?.trim();
    const subject = payload?.subject?.trim();
    const message = payload?.message?.trim();

    if (!name || !email || !subject || !message) {
        return { error: 'All fields are required.' };
    }

    if (message.length < 10) {
        return { error: 'Message must be at least 10 characters long.' };
    }

    return { name, email, subject, message };
}

export async function POST(request) {
    const apiKey = process.env.SENDGRID_API_KEY;
    const toEmail = process.env.SENDGRID_TO_EMAIL;
    const fromEmail = process.env.SENDGRID_FROM_EMAIL;

    if (!apiKey || !toEmail || !fromEmail) {
        return NextResponse.json(
            { error: 'Missing SendGrid server configuration.' },
            { status: 500 }
        );
    }

    let payload;
    try {
        payload = await request.json();
    } catch {
        return NextResponse.json({ error: 'Invalid payload.' }, { status: 400 });
    }

    const validated = validatePayload(payload);
    if (validated.error) {
        return NextResponse.json({ error: validated.error }, { status: 400 });
    }

    sgMail.setApiKey(apiKey);

    const { name, email, subject, message } = validated;

    try {
        await sgMail.send({
            to: toEmail,
            from: fromEmail,
            replyTo: email,
            subject: `[Contact] ${subject}`,
            text: [
                `Name: ${name}`,
                `Email: ${email}`,
                '',
                'Message:',
                message,
            ].join('\n'),
        });

        return NextResponse.json({ ok: true }, { status: 200 });
    } catch (error) {
        const sendGridMessage = error?.response?.body?.errors?.[0]?.message;
        return NextResponse.json(
            {
                error: sendGridMessage || 'Could not send the email at this time.',
            },
            { status: 502 }
        );
    }
}
