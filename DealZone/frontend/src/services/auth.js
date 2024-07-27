const checkSession = async () => {
    const response = await fetch('https://project-10-tech-titans.onrender.com/session', {
        method: 'GET',
        headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
        credentials: 'include'
    });
    console.log(response);
    return response.json();
}

const authUser = async (email, password) => {
    const response = await fetch('https://project-10-tech-titans.onrender.com/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}

const registerUser = async (username, email, phone_number, password) => {
    const response = await fetch('https://project-10-tech-titans.onrender.com/user/register', {
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