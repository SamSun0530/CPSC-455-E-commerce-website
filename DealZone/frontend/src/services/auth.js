const authUser = async (email, password) => {
    const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    return response.json();
}

const registerUser = async (email, password) => {
    const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password})
    });
    return response.json();
}

const updateUser = async (userData) => {
    const response = await fetch(`http://localhost:3000/user/${userData.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    });
    if (!response.ok) {
        throw new Error('Failed to update user');
    }
    return response.json();
}


const logOutUser = async () => {
    // TODO: send logout req to backend server.
}

export default {
    authUser,
    registerUser,
    updateUser
}