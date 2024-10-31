// /app/api/send-test-email/route.js

import sendEmail from '@/utils/sendEmail';
import { getText } from '@/lib/languageLibrary';

export async function POST(req) {
  const language = req.headers.get('accept-language')?.split(',')[0] || 'EN';

  const testEmailOptions = {
    to: '190774@gmx.de',
    subject: getText('test_email', 'subject', language),
    text: getText('test_email', 'text', language),
  };

  try {
    await sendEmail(testEmailOptions);
    return new Response(JSON.stringify({ message: getText('test_email', 'success_message', language) }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return new Response(JSON.stringify({ message: getText('test_email', 'failure_message', language) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
