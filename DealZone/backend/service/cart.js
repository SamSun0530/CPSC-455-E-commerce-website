const Cart = require('../db/models/cart');

const getCart = async (userId) => {
    return await Cart.find({ user_id: userId });
};

const addToCart = async (item) => {
    const existingItem = await Cart.findOne({ user_id: item.user_id, title: item.title });
    if (existingItem) {
        throw new Error('Item already in cart');
    }
    if (item._id) {
        delete item._id;
    }
    const newItem = new Cart(item);
    await newItem.save();
    return newItem;
};

const deleteFromCart = async (userId, itemId) => {
    const result = await Cart.findOneAndDelete({ _id: itemId, user_id: userId });
    return result !== null;
};

const clearCart = async (userId) => {
    await Cart.deleteMany({ user_id: userId });
    return true;
};

module.exports = {
    getCart,
    addToCart,
    deleteFromCart,
    clearCart
};
