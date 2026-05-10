'use client';

import { getAllReviews } from '@/utils/reviewsFunctions';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavBar from './NavBar';
import { useAuth } from '@/utils/authContext';


const MainPage = () => {
    const [reviews, setReviews] = useState([]);
    const { isLoggedIn, setIsLoggedIn } = useAuth();


    const fetchReviews = async () => {
        const data = await getAllReviews();

        if (data) {
            setReviews(data);
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [])

  return (
    <div>
    <NavBar />
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex flex-col justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Reviews</h1>
      </div>

      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews found.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="border rounded-lg p-4 flex justify-between items-start shadow-sm"
            >
              <div>
                <h2 className="text-xl font-semibold">{review.artist} - {review.album}</h2>
                {review.username && (
                  <p className="text-gray-500 text-sm">{review.username}</p>
                )}
                {review.review_text && (
                  <p className="mt-1 text-gray-700">{review.review_text}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default MainPage