// /app/api/send-test-email/route.js

import sendEmail from '@/utils/sendEmail';
import { getText } from '@/lib/languageLibrary';
import { getLanguageFromCookies } from '@/utils/getLanguageFromCookies';

export async function POST(req) {
  try {
    const language = getLanguageFromCookies(req);

    const testEmailOptions = {
      to: '190774@gmx.de',
      subject: getText('test_email', 'subject', language),
      text: getText('test_email', 'text', language),
    };

    await sendEmail(testEmailOptions);
    return new Response(JSON.stringify({ message: getText('test_email', 'success_message', language) }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: getText('test_email', 'failure_message', language) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
