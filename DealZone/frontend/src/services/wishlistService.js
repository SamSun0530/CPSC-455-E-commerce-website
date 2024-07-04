const getWishlist = async () => {
	const response = await fetch('http://localhost:3000/wishlist', {
		method: 'GET'
	});
	// console.log(response.json())
	return response.json();
};

const addToWishlist = async (item) => {
	const response = await fetch('http://localhost:3000/wishlist', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(item)
	});
	const data = await response.json();
	if (!response.ok) {
		const errorMsg = data?.message;
		throw new Error(errorMsg)
	}
	return data;
};

const deleteFromWishlist = async (id) => {
	const response = await fetch(`http://localhost:3000/wishlist/${id}`, {
		method: 'DELETE'
	});
	return response.json();
}

const clearWishlist = async () => {
	const response = await fetch('http://localhost:3000/wishlist', {
		method: 'DELETE'
	});
	return response.json();
};

export default {
	getWishlist,
	addToWishlist,
	deleteFromWishlist,
	clearWishlist
};