"use client";

import { Suspense, useState, useEffect } from "react";
import ReviewForm from "@/components/ReviewForm";
import Spinner from "@/components/Spinner";
import { useRouter, useSearchParams } from "next/navigation";
import { reviewDefaults } from "@/utils/constants";
import { useAuth } from "@/utils/authContext";
import { getReviewById, updateReview } from "@/utils/reviewsFunctions";
import { getUserByID } from "@/utils/userFunctions";

const EditContent = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [entry, setEntry] = useState(reviewDefaults);
    const [isLoading, setIsLoading] = useState(true);
    const {isLoggedIn, setIsLoggedIn} = useAuth();
  
    if(!isLoggedIn) {
        router.push('/');
    }
    const userId = sessionStorage.getItem("userId");

    const getReview = async (id) => {
        const data = await getReviewById(id, userId);

        if (data) {
            setEntry(data);
        }

        setIsLoading(false);
    };

    const onSubmit = async (data) => {
        const user = await getUserByID(userId)
        const full_data = {...data, username: user.username, userId: userId}
        const response = await updateReview(full_data, userId);

        if (response) {
            router.push('/my_reviews');
        } else {
            alert('Failed to update record.');
        }
    }

    useEffect(() => {
        const id = searchParams.get("id");

        if (!id) {
        router.push("/");
        } else {
        getReview(id);
        }
    }, []);

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div className="max-w-2xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-8">Edit Review</h1>
        <ReviewForm data={entry} onSubmit={onSubmit} />
        </div>
    );
};

const EditReview = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <EditContent />
    </Suspense>
  );
};

export default EditReview;
