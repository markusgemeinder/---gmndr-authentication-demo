// /app/api/send-test-email/route.js

import sendEmail from '@/utils/sendEmail';

export async function POST(req) {
  const testEmailOptions = {
    to: '190774@gmx.de',
    subject: 'Test Email from #GMNDR Authentication Demo',
    text: 'This is a test email to verify the sending functionality.',
  };

  try {
    await sendEmail(testEmailOptions);
    return new Response(JSON.stringify({ message: 'Test email sent successfully!' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending test email:', error);
    return new Response(JSON.stringify({ message: 'Failed to send test email.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
