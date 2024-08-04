// /app/api/reviews/[id]/route.js
import dbConnect from '@/db/connect';
import Review from '@/db/models/Review';
import mongoose from 'mongoose';
import { getToken } from 'next-auth/jwt';
import CryptoJS from 'crypto-js';

const secretKey = process.env.SECRET_KEY || 'my_secret_key';

const encryptEmail = (email) => {
  return CryptoJS.AES.encrypt(email, secretKey).toString();
};

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

    const decryptedReview = {
      ...review.toObject(),
      email: decryptEmail(review.email),
    };

    return new Response(JSON.stringify(decryptedReview), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ status: 'Server error' }), { status: 500 });
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
    reviewData.email = encryptEmail(reviewData.email); // Verschlüsseln der E-Mail

    const updatedReview = await Review.findByIdAndUpdate(id, { $set: reviewData }, { new: true });

    if (!updatedReview) {
      return new Response(JSON.stringify({ status: 'Review not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ status: 'Review updated', updatedReview }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ status: 'Server error' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  await dbConnect();
  const { id } = params;

  try {
    await Review.findByIdAndDelete(id);
    return new Response(JSON.stringify({ status: 'Review successfully deleted.' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ status: 'Server error' }), { status: 500 });
  }
}
