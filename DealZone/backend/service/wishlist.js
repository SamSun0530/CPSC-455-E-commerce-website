const Wishlist = require('../db/models/wishlist');
const Listings = require('../db/models/listing');

const getWishlistListings = async (wishlist) => {
	const ids = wishlist.items
	return await Listings.find({ _id: { $in: ids } })
}

// Returns wishlist corresponding to user.
const getWishlist = async (user_id) => {
	// if (user_id) {
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

	// } else {
	// 	const wishlist = await Wishlist.findOne({});
	// 	return await getWishlistListings(wishlist);
	// }
}

// Add item corresponding to listing_id to user's (user_id) wishlist
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
		// add a wishlist entry for user to database and add the item to wishlist
		await new Wishlist({
			user_id: user_id,
			items: [listing_id]
		}).save()
		return await Listings.findOne({ _id: listing_id })
	}

	// } else {
	// 	const wishlist = await Wishlist.findOne({});
	// 	if (!wishlist.items.find(id => id === listing_id)) {
	// 		await Wishlist.findOneAndUpdate(
	// 			{},
	// 			{ $push: { items: listing_id } }
	// 		);
	// 		return await Listings.findOne({ _id: listing_id })
	// 	}
	// }
}

// Remove item corresponding to listing_id from user's (user_id) wishlist
const deleteFromWishlist = async (listing_id, user_id) => {
	// if (user_id) {
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

	// } else {
	// 	const wishlist = await Wishlist.findOne({});
	// 	// console.log('wishlist delete:\n' + wishlist.items)
	// 	const item = wishlist.items.find(item_id => item_id === listing_id);
	// 	if (item) {
	// 		const updatedItems = wishlist.items.filter(item_id => item_id !== listing_id);
	// 		// console.log('wishlist deletedd:\n' + updatedItems)
	// 		await Wishlist.findOneAndUpdate(
	// 			{},
	// 			{ $set: { items: updatedItems } }
	// 		);
	// 		return listing_id;
	// 	}
	// }
};

// Clear user's wishlist
const clearWishlist = async (user_id = null) => {
	// if (user_id) {
	return await Wishlist.findOneAndUpdate(
		{ user_id: user_id },
		{ $set: { items: [] } }
	);
	// } else {
	// 	return await Wishlist.findOneAndUpdate(
	// 		{},
	// 		{ $set: { items: [] } }
	// 	);
	// }

};

module.exports = {
	getWishlist,
	addToWishlist,
	deleteFromWishlist,
	clearWishlist
};
