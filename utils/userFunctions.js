export const getUserByID = async (userId) => {
    const response = await fetch(`/api/users/${userId}`, {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
        }
    });
    if (!response.ok) return null;
    return response.json();
}

export const loginUser = async(data) => {
    const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    //if (!response.ok) return null;
    //console.log(response)
    return response.json();
}

export const registerUser = async(data) => {
    const response = await fetch('/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    //if (!response.ok) return null;
    //console.log(response)
    return response.json();
}
