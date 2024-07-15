const getCart = async () => {
    const response = await fetch('http://localhost:3000/cart', {
        method: 'GET',
        credentials: 'include'
    });
    return response.json();
};

const addToCart = async (item) => {
    const response = await fetch('http://localhost:3000/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
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
    const response = await fetch(`http://localhost:3000/cart/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    return response.json();
}

const clearCart = async () => {
    const response = await fetch('http://localhost:3000/cart', {
        method: 'DELETE',
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
