import SERVER_URL from '../../config';

const getUser = async () => {
    const response = await fetch(`${SERVER_URL}/user`, {
        method: 'GET',
        headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
        credentials: 'include'
    });
    return response.json();
};

const updateUser = async (id, data) => {
    const response = await fetch(`${SERVER_URL}/users/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'session-token': sessionStorage.getItem('sessionToken')
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
