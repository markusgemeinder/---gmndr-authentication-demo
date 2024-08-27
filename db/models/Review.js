// /db/models/Review.js

import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    email: { type: String, required: true },
    note: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
  },
  { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
