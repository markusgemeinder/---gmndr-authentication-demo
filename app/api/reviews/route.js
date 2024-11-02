// /app/api/reviews/route.js

import dbConnect from '@/db/connect';
import Review from '@/db/models/Review';
import { getToken } from 'next-auth/jwt';
import CryptoJS from 'crypto-js';
import { getText } from '@/lib/languageLibrary';
import { getLanguageFromCookies } from '@/utils/getLanguageFromCookies';

const secretKey = process.env.SECRET_KEY || 'my_secret_key';

const encryptEmail = (email) => {
  return CryptoJS.AES.encrypt(email, secretKey).toString();
};

const decryptEmail = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export async function GET(request) {
  const language = getLanguageFromCookies(request);
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: getText('api_reviews', 'unauthorized', language) }), { status: 401 });
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

export async function POST(request) {
  const language = getLanguageFromCookies(request);

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: getText('api_reviews', 'unauthorized', language) }), { status: 401 });
  }

  await dbConnect();

  try {
    const reviewData = await request.json();
    reviewData.email = encryptEmail(reviewData.email);

    const newReview = new Review(reviewData);
    await newReview.save();

    return new Response(JSON.stringify({ status: getText('api_reviews', 'review_created', language), newReview }), {
      status: 201,
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
