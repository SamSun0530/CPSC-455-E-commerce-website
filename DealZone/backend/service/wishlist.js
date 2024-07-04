let wishlist = [
	{
		id: 123,
		name: 'Post 1',
		price: 20,
		desc: 'This is the description for Post 1',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaTEG_xpBkCdkRDedJ1ei1BoVjqD3J5muqhQ&s',
	},
	{
		id: 124,
		name: 'Post 2',
		price: 30,
		desc: 'This is the description for Post 2',
		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmj0wqdcbsV4OHlipy3rxoZDk_YPFhKUmtHg&s',
	}
]

const getWishlist = () => {
	// console.log(wishlist)
	return wishlist;
};

const addToWishlist = (item) => {
	wishlist.push(item);
	return item;
};

const deleteFromWishlist = (id) => {
	// wishlist = wishlist.filter(item => item.id !== id);
	const item = wishlist.find(item => item.id == id);
	if (item) {
		wishlist = wishlist.filter(item => item.id !== id);
		return id;
	}

	// 	console.log(`del`+item)
	// 	return item
	// } else {
	// 	return res.status(404).send(`No wishlist item found with id ${id}`);
	// }

};

const clearWishlist = () => {
	wishlist = [];
};

module.exports = {
	getWishlist,
	addToWishlist,
	deleteFromWishlist,
	clearWishlist
};
