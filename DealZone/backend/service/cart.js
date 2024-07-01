let cart = [];

const getCart = () => {
    return cart;
};

const addToCart = (item) => {
    cart.push(item);
    return item;
};

const deleteFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    return id;
};

const clearCart = () => {
    cart = [];
    return [];
};

module.exports = {
    getCart,
    addToCart,
    deleteFromCart,
    clearCart
};
