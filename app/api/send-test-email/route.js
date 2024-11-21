// /app/api/send-test-email/route.js

import sendEmail from '@/utils/sendEmail';
import { getText } from '@/lib/languageLibrary';
import { getLanguageFromCookies } from '@/utils/getLanguageFromCookies';

export async function POST(req) {
  try {
    const language = getLanguageFromCookies(req);

    const getLanguageText = (key) => {
      return getText('test_email', key, language);
    };

    const testEmailOptions = {
      to: '190774@gmx.de',
      subject: getLanguageText('subject'),
      text: getLanguageText('text'),
    };

    await sendEmail(testEmailOptions);
    return new Response(JSON.stringify({ message: getLanguageText('success_message') }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: getLanguageText('failure_message') }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
