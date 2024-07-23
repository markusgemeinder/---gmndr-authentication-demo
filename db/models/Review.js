import mongoose from 'mongoose';

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    note: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  { timestamps: true }
);

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema);

export default Review;
