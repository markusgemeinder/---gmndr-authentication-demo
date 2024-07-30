import dbConnect from '@/db/connect';
import Review from '@/db/models/Review';
import { getToken } from 'next-auth/jwt';

export async function GET(request) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
  }

  await dbConnect();

  try {
    const reviews = await Review.find();
    return new Response(JSON.stringify(reviews), { status: 200 });
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
    await Review.create(reviewData);
    return new Response(JSON.stringify({ status: 'Review added' }), { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }
}
