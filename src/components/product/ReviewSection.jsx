import React, { useState } from 'react';
import { StarIcon } from '@heroicons/react/solid';
import axios from 'axios';

const ReviewSection = ({ productId, reviews, onReviewAdded }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`/api/products/${productId}/reviews`, {
        rating,
        comment
      });
      onReviewAdded(response.data);
      setRating(5);
      setComment('');
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Review Form */}
      <form onSubmit={handleSubmit} className="bg-[#181818] rounded-lg p-6">
        <h3 className="text-xl font-bold text-white mb-4">Write a Review</h3>
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className={`${
                  star <= rating ? 'text-[#FFD700]' : 'text-gray-400'
                }`}
              >
                <StarIcon className="h-8 w-8" />
              </button>
            ))}
          </div>
        </div>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full bg-[#232323] text-white rounded-lg p-4 mb-4"
          rows="4"
          placeholder="Share your experience..."
        />
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-[#FFD700] text-black rounded-lg hover:bg-[#FFE55C] transition-colors"
        >
          {loading ? 'Submitting...' : 'Submit Review'}
        </button>
      </form>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review._id} className="bg-[#181818] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating ? 'text-[#FFD700]' : 'text-gray-400'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-white font-medium">{review.user.name}</span>
              </div>
              <span className="text-[rgba(255,255,255,0.74)]">
                {new Date(review.createdAt).toLocaleDateString()}
              </span>
            </div>
            <p className="text-[rgba(255,255,255,0.74)]">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection; 