const Wishlist = require('../db/models/wishlist');
const Listings = require('../db/models/listing');

const getWishlistListings = async (wishlist) => {
	const ids = wishlist.items
	return await Listings.find({ _id: { $in: ids } })
}

const getWishlist = async (user_id) => {
	const wishlist = await Wishlist.findOne({ user_id: user_id });
	if (wishlist) {
		return await getWishlistListings(wishlist);
	} else {
		const new_wishlist = new Wishlist({
			user_id: user_id,
			items: []
		})
		await new_wishlist.save();
		return await getWishlistListings(new_wishlist)
	}
}

const addToWishlist = async (listing, user_id) => {
	const listing_id = listing._id;
	const wishlist = await Wishlist.findOne({ user_id: user_id });
	if (wishlist) {
		if (!wishlist.items.find(id => id === listing_id)) {
			await Wishlist.findOneAndUpdate(
				{ user_id: user_id },
				{ $push: { items: listing_id } }
			);
			return await Listings.findOne({ _id: listing_id })
		}
	} else {
		await new Wishlist({
			user_id: user_id,
			items: [listing_id]
		}).save()
		return await Listings.findOne({ _id: listing_id })
	}
}

const deleteFromWishlist = async (listing_id, user_id) => {
	const wishlist = await Wishlist.findOne({ user_id: user_id });
	const item = wishlist.items.find(item_id => item_id === listing_id);
	if (item) {
		const updatedItems = wishlist.items.filter(item_id => item_id !== listing_id);
		await Wishlist.findOneAndUpdate(
			{ user_id: user_id },
			{ $set: { items: updatedItems } }
		);
		return listing_id;
	}
};

const clearWishlist = async (user_id = null) => {
	return await Wishlist.findOneAndUpdate(
		{ user_id: user_id },
		{ $set: { items: [] } }
	);
};

const pullSoldItemsFromWishlist = async (idsToRemove) => {
	await Wishlist.updateMany(
		{},
		{ $pull: { items: { $in: idsToRemove } } }
	);
}

module.exports = {
	getWishlist,
	addToWishlist,
	deleteFromWishlist,
	clearWishlist,
	pullSoldItemsFromWishlist
};
