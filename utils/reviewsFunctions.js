
export const getAllReviews = async () => {
    const response = await fetch('/api/reviews');
    if (!response.ok) return null;
    return response.json();
}

export const getReviewsOfUser = async (userId) => {
    const response = await fetch('/api/my_reviews', {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'userId': userId
        }
    });
    if (!response.ok) return null;
    return response.json();
}

export const getReviewById = async (id, userId) => {
    const response = await fetch(`/api/my_reviews/${id}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'userId': userId
        }
    });
    if (!response.ok) return null;
    return response.json();
}

export const deleteReview = async (id, userId) => {
    const response = await fetch(`/api/my_reviews/${id}`, { 
        method: 'DELETE',
        headers: {
            'userId': userId
        }
    });
    return response.ok;
};

export const createReview = async (data) => {
    const response = await fetch('/api/my_reviews', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        return null;
    }

    return response.json();
}

export const updateReview = async (data, userId) => {
    const { _id, ...body} = data;

    const response = await fetch(`/api/my_reviews/${_id}`, {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'userId': userId
        },
        body: JSON.stringify(body),
    });

    if (!response.ok) {
        return null;
    }

    return response.json();
}