// /app/api/reviews/route.js

import dbConnect from '@/db/connect';
import Review from '@/db/models/Review';
import { getToken } from 'next-auth/jwt';
import CryptoJS from 'crypto-js';
import { maskEmail } from '@/utils/maskEmail';

const secretKey = process.env.SECRET_KEY || 'my_secret_key';

const encryptEmail = (email) => {
  return CryptoJS.AES.encrypt(email, secretKey).toString();
};

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
      let decryptedEmail = 'Email only visible to review creator or admin';
      if (token.email === decryptEmail(review.email) || token.role === 'admin') {
        decryptedEmail = decryptEmail(review.email);
        // decryptedEmail = maskEmail(decryptedEmail);
      }
      return {
        ...review.toObject(),
        email: decryptedEmail,
      };
    });
    return new Response(JSON.stringify(decryptedReviews), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}

export async function POST(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  await dbConnect();

  try {
    const reviewData = await request.json();
    reviewData.email = encryptEmail(reviewData.email);
    await Review.create(reviewData);
    return new Response(JSON.stringify({ status: 'Review added' }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
