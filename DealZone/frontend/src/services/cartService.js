import SERVER_URL from '../../config';

const getCart = async () => {
    const response = await fetch(SERVER_URL + '/cart', {
        method: 'GET',
        headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
    });
    return response.json();
};

const addToCart = async (item) => {
    try {
        const response = await fetch(SERVER_URL + '/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'session-token': sessionStorage.getItem('sessionToken')
            },
            body: JSON.stringify(item),
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json();
            const errorMsg = errorData.message || 'Something went wrong';
            throw new Error(errorMsg);
        }
        return await response.json();
    } catch (error) {
        //console.error("Error adding to cart:", error);
        throw error;
    }
};

const deleteFromCart = async (id) => {
    const response = await fetch(`${SERVER_URL}/cart/${id}`, {
        method: 'DELETE',
        headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
        credentials: 'include'
    });
    return response.json();
}

const clearCart = async () => {
    const response = await fetch(SERVER_URL + '/cart', {
        method: 'DELETE',
        headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
    });
    return response.json();
};

const purchaseCart = async ({cart, details}) => {
    const response = await fetch(SERVER_URL + '/cart/purchase', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session-token': sessionStorage.getItem('sessionToken')
        },
        body: JSON.stringify({cart, details}),
    });
    if (response.status === 401) {
        const data = await response.json();
        throw new Error(data.message);
    }
    return response.status;
}

export default {
    getCart,
    addToCart,
    deleteFromCart,
    clearCart,
    purchaseCart
};