'use client'

import ReviewForm from "@/components/ReviewForm";
import { useAuth } from "@/utils/authContext";
import { reviewDefaults } from "@/utils/constants";
import { createReview } from "@/utils/reviewsFunctions";
import { useRouter } from "next/navigation";
import { getUserByID } from "@/utils/userFunctions";

const CreateReview = () => {
    const router = useRouter();
    const {isLoggedIn, setIsLoggedIn} = useAuth();

    if(!isLoggedIn) {
        router.push('/');
    }
    const userId = sessionStorage.getItem("userId");

    const onSubmit = async (data) => {

        const current_user = await getUserByID(userId)
        const newReview = {...data, username: current_user.username, userId: userId}
        const response = await createReview(newReview);

        if (response) {
            router.push('/my_reviews');
        } else {
            alert('Failed to create record');
        }
    }

    return  <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-8">Create Record</h1>
      <ReviewForm data={reviewDefaults} onSubmit={onSubmit} />
    </div>
}

export default CreateReview;