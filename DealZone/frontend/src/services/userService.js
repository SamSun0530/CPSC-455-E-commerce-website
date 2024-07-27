const getUser = async (id) => {
    const response = await fetch(`https://project-10-tech-titans.onrender.com/users/${id}`, {
        method: 'GET',
        credentials: 'include'
    });
    return response.json();
};

const updateUser = async (id, data) => {
    const response = await fetch(`https://project-10-tech-titans.onrender.com/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        credentials: 'include'
    });
    return response.json();
};

export default {
    getUser,
    updateUser
};
