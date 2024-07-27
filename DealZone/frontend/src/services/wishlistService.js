const getWishlist = async () => {
	const response = await fetch('https://project-10-tech-titans.onrender.com/wishlist', {
		method: 'GET',
		headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
		credentials: 'include'
	});
	return response.json();
};

const addToWishlist = async (item) => {
	const response = await fetch('https://project-10-tech-titans.onrender.com/wishlist', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			'session-token': sessionStorage.getItem('sessionToken')
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

const deleteFromWishlist = async (id) => {
	const response = await fetch(`https://project-10-tech-titans.onrender.com/wishlist/${id}`, {
		method: 'DELETE',
		headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
		credentials: 'include'
	});
	const data = await response.json();
	if (!response.ok) {
		const errorMsg = data?.message;
		throw new Error(errorMsg)
	}
	return data;
}

const clearWishlist = async () => {
	const response = await fetch('https://project-10-tech-titans.onrender.com/wishlist', {
		method: 'DELETE',
		headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
		credentials: 'include'
	});
	return response.json();
};

export default {
	getWishlist,
	addToWishlist,
	deleteFromWishlist,
	clearWishlist
};