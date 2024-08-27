// /app/api/reviews/route.js

import dbConnect from '@/db/connect';
import Review from '@/db/models/Review';
import { getToken } from 'next-auth/jwt';
import CryptoJS from 'crypto-js';

const secretKey = process.env.SECRET_KEY || 'my_secret_key';

const decryptEmail = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export async function GET(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  await dbConnect();

  try {
    const reviews = await Review.find();
    const decryptedReviews = reviews.map((review) => {
      const email = decryptEmail(review.email);
      return {
        ...review.toObject(),
        email,
      };
    });
    return new Response(JSON.stringify(decryptedReviews), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
