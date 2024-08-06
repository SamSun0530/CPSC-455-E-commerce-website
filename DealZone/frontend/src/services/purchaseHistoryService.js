import SERVER_URL from '../../config';

const getPurchaseHistory = async () => {
    const response = await fetch(SERVER_URL + '/purchase_history', {
        method: 'GET',
        headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
        credentials: 'include',
        cache: 'no-store' // Ensure no caching
    });
    return response.json();
};

const addToPurchaseHistory = async (item) => {
    const response = await fetch(SERVER_URL + '/purchase_history', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session-token': sessionStorage.getItem('sessionToken')
        },
        body: JSON.stringify(item),
        credentials: 'include'
    });
    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
};

export default {
    getPurchaseHistory,
    addToPurchaseHistory
};