const getUser = async (id) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'GET'
    });
    return response.json();
};

const updateUser = async (id, data) => {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
};

export default {
    getUser,
    updateUser
};
