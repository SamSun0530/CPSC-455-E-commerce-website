const Cart = require('../db/models/cart');
const Listings = require('../db/models/listing');

const getCartListings = async (cart) => {
    const ids = cart.items
    return await Listings.find({ _id: { $in: ids } })
}

const getCart = async (user_id) => {
    const cart = await Cart.findOne({ user_id: user_id });
    if (cart) {
        return await getCartListings(cart);
    } else {
        const new_cart = new Cart({
            user_id: user_id,
            items: []
        })
        await new_cart.save();
        return await getCartListings(new_cart)
    }
}

const addToCart = async (listing, user_id = null) => {
    const listing_id = listing._id;
    const cart = await Cart.findOne({ user_id: user_id });
    if (cart) {
        if (!cart.items.find(id => id === listing_id)) {
            await Cart.findOneAndUpdate(
                { user_id: user_id },
                { $push: { items: listing_id } }
            );
            return await Listings.findOne({ _id: listing_id })
        }
    } else {
        await new Cart({
            user_id: user_id,
            items: [listing_id]
        }).save()
        return await Listings.findOne({ _id: listing_id })
    }
}

const deleteFromCart = async (listing_id, user_id) => {
    const cart = await Cart.findOne({ user_id: user_id });
    const item = cart.items.find(item_id => item_id === listing_id);
    if (item) {
        const updatedItems = cart.items.filter(item_id => item_id !== listing_id);
        await Cart.findOneAndUpdate(
            { user_id: user_id },
            { $set: { items: updatedItems } }
        );
        return listing_id;
    }
};

const clearCart = async (user_id = null) => {
    return await Cart.findOneAndUpdate(
        { user_id: user_id },
        { $set: { items: [] } }
    );
};

const pullSoldItemsFromCart = async (idsToRemove) => {
    await Cart.updateMany(
        {},
        { $pull: { items: { $in: idsToRemove } } }
    );
}

module.exports = {
    getCart,
    addToCart,
    deleteFromCart,
    clearCart,
    pullSoldItemsFromCart
};
