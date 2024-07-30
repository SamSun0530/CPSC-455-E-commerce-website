import SERVER_URL from '../../config';

const checkSession = async () => {
    const response = await fetch(SERVER_URL + '/session', {
        method: 'GET',
        headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
        credentials: 'include'
    });
    console.log("auth resp: ", response);
    return response.json();
}

const authUser = async (email, password) => {
    const response = await fetch(SERVER_URL + '/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    });
    return response.json();
}

const registerUser = async (username, email, phone_number, password) => {
    const response = await fetch(SERVER_URL + '/user/register', {
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