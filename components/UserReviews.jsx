
'use client';

import { deleteReview, getReviewsOfUser } from '@/utils/reviewsFunctions';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MainPage = () => {
    const [reviews, setReviews] = useState([]);
    const userId = sessionStorage.getItem("sessionId")

    const fetchReviews = async () => {
        const data = await getReviewsOfUser(userId);

        if (data) {
            setReviews(data);
        }
    }

    const handleDelete = async (id) => {
        const success = await deleteReview(id, userId);

        if (success) {
            setReviews((reviews) => reviews.filter((r) => r._id !== id));
        } else {
            alert('Failed to delete review');
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [])

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-col justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Your reviews</h1>
        <br />
        <div className="flex items-center gap-3">
          <Link
            href="/reviews/create"
            className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors"
          >
            Add Review
          </Link>
        </div>
      </div>

      {reviews.length === 0 ? (
        <p className="text-gray-500">You have not posted any reviews.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg p-4 flex justify-between items-start shadow-sm"
            >
              <div>
                <h2 className="text-xl font-semibold">{review.artist} - {review.album}</h2>
                {review.review_text && (
                  <p className="mt-1 text-gray-700">{review.review_text}</p>
                )}
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/reviews/edit?id=${review._id}`}
                  className="bg-yellow-400 text-white rounded px-3 py-1 hover:bg-yellow-500 transition-colors text-sm"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(review._id)}
                  className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 transition-colors text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MainPage