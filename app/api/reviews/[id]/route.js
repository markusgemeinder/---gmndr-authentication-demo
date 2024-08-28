// /app/api/reviews/[id]/route.js

import dbConnect from '@/db/connect';
import Review from '@/db/models/Review';
import mongoose from 'mongoose';
import { getToken } from 'next-auth/jwt';
import CryptoJS from 'crypto-js';

const secretKey = process.env.SECRET_KEY || 'my_secret_key';

const decryptEmail = (cipherText) => {
  const bytes = CryptoJS.AES.decrypt(cipherText, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

export async function GET(request, { params }) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ status: 'Invalid ID' }), { status: 400 });
  }

  try {
    const review = await Review.findById(id);

    if (!review) {
      return new Response(JSON.stringify({ status: 'Not found' }), { status: 404 });
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
    return new Response(JSON.stringify({ status: 'Server error', error: error.message }), { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ status: 'Invalid ID' }), { status: 400 });
  }

  try {
    const reviewData = await request.json();
    const existingReview = await Review.findById(id);

    if (!existingReview) {
      return new Response(JSON.stringify({ status: 'Review not found' }), { status: 404 });
    }

    if (existingReview.email) {
      reviewData.email = existingReview.email;
    } else {
      reviewData.email = CryptoJS.AES.encrypt(reviewData.email, secretKey).toString();
    }

    const updatedReview = await Review.findByIdAndUpdate(id, { $set: reviewData }, { new: true });

    return new Response(JSON.stringify({ status: 'Review updated', updatedReview }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ status: 'Server error', error: error.message }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ status: 'Invalid ID' }), { status: 400 });
  }

  try {
    const review = await Review.findById(id);

    if (!review) {
      return new Response(JSON.stringify({ status: 'Review not found' }), { status: 404 });
    }

    await review.deleteOne();

    return new Response(JSON.stringify({ status: 'Review deleted' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ status: 'Server error', error: error.message }), { status: 500 });
  }
}
