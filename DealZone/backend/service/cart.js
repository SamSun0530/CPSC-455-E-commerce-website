let cart = [
    { id: 1, name: 'Item 1', price: 10, image: 'https://via.placeholder.com/150' },
    { id: 2, name: 'Item 2', price: 20, image: 'https://via.placeholder.com/150' },
    { id: 3, name: 'Item 3', price: 30, image: 'https://via.placeholder.com/150' },
    { id: 4, name: 'Item 4', price: 40, image: 'https://via.placeholder.com/150' },
    { id: 5, name: 'Item 5', price: 50, image: 'https://via.placeholder.com/150' }
];

const getCart = () => {
    return cart;
};

const addToCart = (item) => {
    cart.push(item);
    return item;
};

const deleteFromCart = (id) => {
    const item = cart.find(item => item.id == id);
    if (item) {
        cart = cart.filter(item => item.id !== id);
        return id;
    }
};

const clearCart = () => {
    cart = [];
   
};

module.exports = {
    getCart,
    addToCart,
    deleteFromCart,
    clearCart
};
