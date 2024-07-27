const getCart = async () => {
    const response = await fetch('https://project-10-tech-titans.onrender.com/cart', {
        method: 'GET',
        headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
    });
    return response.json();
};

const addToCart = async (item) => {
    const response = await fetch('https://project-10-tech-titans.onrender.com/cart', {
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

const deleteFromCart = async (id) => {
    const response = await fetch(`https://project-10-tech-titans.onrender.com/cart/${id}`, {
        method: 'DELETE',
        headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
        credentials: 'include'
    });
    return response.json();
}

const clearCart = async () => {
    const response = await fetch('https://project-10-tech-titans.onrender.com/cart', {
        method: 'DELETE',
        headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
        credentials: 'include'
    });
    return response.json();
};

export default {
    getCart,
    addToCart,
    deleteFromCart,
    clearCart
};