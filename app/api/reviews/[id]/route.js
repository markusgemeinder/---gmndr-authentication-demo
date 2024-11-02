// /app/api/reviews/[id]/route.js

import dbConnect from '@/db/connect';
import Review from '@/db/models/Review';
import mongoose from 'mongoose';
import { getToken } from 'next-auth/jwt';
import CryptoJS from 'crypto-js';
import { getText } from '@/lib/languageLibrary';
import { getLanguageFromCookies } from '@/utils/getLanguageFromCookies';

const secretKey = process.env.SECRET_KEY || 'my_secret_key';

const decryptEmail = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export async function GET(request, { params }) {
  const language = getLanguageFromCookies(request);
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: getText('api_reviews_token', 'unauthorized', language) }), {
      status: 401,
    });
  }

  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ status: getText('api_reviews_token', 'invalid_id', language) }), {
      status: 400,
    });
  }

  try {
    const review = await Review.findById(id);

    if (!review) {
      return new Response(JSON.stringify({ status: getText('api_reviews_token', 'not_found', language) }), {
        status: 404,
      });
    }

    const email = decryptEmail(review.email);

    return new Response(
      JSON.stringify({
        ...review.toObject(),
        email,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ status: getText('api_reviews_token', 'server_error', language), error: error.message }),
      { status: 500 }
    );
  }
}

export async function PATCH(request, { params }) {
  const language = getLanguageFromCookies(request);
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: getText('api_reviews_token', 'unauthorized', language) }), {
      status: 401,
    });
  }

  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ status: getText('api_reviews_token', 'invalid_id', language) }), {
      status: 400,
    });
  }

  try {
    const reviewData = await request.json();
    const existingReview = await Review.findById(id);

    if (!existingReview) {
      return new Response(JSON.stringify({ status: getText('api_reviews_token', 'review_not_found', language) }), {
        status: 404,
      });
    }

    if (existingReview.email) {
      reviewData.email = existingReview.email;
    } else {
      reviewData.email = CryptoJS.AES.encrypt(reviewData.email, secretKey).toString();
    }

    const updatedReview = await Review.findByIdAndUpdate(id, { $set: reviewData }, { new: true });

    return new Response(
      JSON.stringify({ status: getText('api_reviews_token', 'review_updated', language), updatedReview }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ status: getText('api_reviews_token', 'server_error', language), error: error.message }),
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  const language = getLanguageFromCookies(request);
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: getText('api_reviews_token', 'unauthorized', language) }), {
      status: 401,
    });
  }

  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ status: getText('api_reviews_token', 'invalid_id', language) }), {
      status: 400,
    });
  }

  try {
    const review = await Review.findById(id);

    if (!review) {
      return new Response(JSON.stringify({ status: getText('api_reviews_token', 'review_not_found', language) }), {
        status: 404,
      });
    }

    await review.deleteOne();

    return new Response(JSON.stringify({ status: getText('api_reviews_token', 'review_deleted', language) }), {
      status: 200,
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ status: getText('api_reviews_token', 'server_error', language), error: error.message }),
      { status: 500 }
    );
  }
}
