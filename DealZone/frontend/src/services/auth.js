const checkSession = async () => {
    const response = await fetch('http://localhost:3000/session', {
        method: 'GET',
        credentials: 'include'
    });
    console.log(response);
    return response.json();
}

const authUser = async (email, password) => {
    const response = await fetch('http://localhost:3000/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}

const registerUser = async (username, email, phone_number, password) => {
    const response = await fetch('http://localhost:3000/user/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, phone_number, password })
    });
    return response.json();
}

const logOutUser = async () => {
    // TODO: send logout req to backend server.
}

export default {
    authUser,
    registerUser,
    checkSession
}