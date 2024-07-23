import dbConnect from '@/db/connect';
import Review from '@/db/models/Review';
import mongoose from 'mongoose';

export async function GET(request, { params }) {
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

    return new Response(JSON.stringify(review), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ status: 'Server error' }), { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  await dbConnect();
  const { id } = params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return new Response(JSON.stringify({ status: 'Invalid ID' }), { status: 400 });
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(id, { $set: await request.json() }, { new: true });

    if (!updatedReview) {
      return new Response(JSON.stringify({ status: 'Review not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ status: 'Review updated', updatedReview }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ status: 'Server error' }), { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  await dbConnect();
  const { id } = params;

  try {
    await Review.findByIdAndDelete(id);
    return new Response(JSON.stringify({ status: 'Review successfully deleted.' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ status: 'Server error' }), { status: 500 });
  }
}
