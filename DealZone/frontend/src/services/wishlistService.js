import SERVER_URL from '../../config';

const getWishlist = async () => {
	const response = await fetch(SERVER_URL + '/wishlist', {
		method: 'GET',
		headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
		credentials: 'include'
	});
	return response.json();
};

const addToWishlist = async (item) => {
	try {
		const response = await fetch(SERVER_URL + '/wishlist', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'session-token': sessionStorage.getItem('sessionToken')
			},
			body: JSON.stringify(item),
			credentials: 'include'
		});
		if (!response.ok) {
			const errorData = await response.json();
			const errorMsg = errorData.message || 'Something went wrong';
			throw new Error(errorMsg);
		}
		return await response.json();
	} catch (error) {
		//console.error("Error adding to wishlist:", error);
		throw error;
	}
};

const deleteFromWishlist = async (id) => {
	const response = await fetch(`${SERVER_URL}/wishlist/${id}`, {
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
	const response = await fetch(SERVER_URL + '/wishlist', {
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