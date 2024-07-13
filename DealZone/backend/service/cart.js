const Cart = require('../db/models/cart');

const getCart = async () => {
    return await Cart.find({});
};

const addToCart = async (item) => {
    const newItem = new Cart(item);
    await newItem.save();
    return newItem;
};

const deleteFromCart = async (id) => {
    const result = await Cart.findByIdAndDelete(id);
    return result !== null;
};

const clearCart = async () => {
    await Cart.deleteMany({});
    return true;
};

module.exports = {
    getCart,
    addToCart,
    deleteFromCart,
    clearCart
};
