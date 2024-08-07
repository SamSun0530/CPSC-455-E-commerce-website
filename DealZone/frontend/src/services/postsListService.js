import SERVER_URL from '../../config';

const getPostsList = async () => {
	const response = await fetch(SERVER_URL + '/posts', {
		method: 'GET',
	});
	return response.json();
};

const getIndividualListing = async (id) => {
	const response = await fetch(SERVER_URL + '/posts/' + id, {
		method: 'GET',
	});
	return response.json();
}

const addToPostsList = async (item) => {
	const response = await fetch(SERVER_URL + '/posts', {
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

const deleteFromPostsList = async (id) => {
	const response = await fetch(`${SERVER_URL}/posts/${id}`, {
		method: 'DELETE',
		headers: {
			'session-token': sessionStorage.getItem('sessionToken')
		},
		credentials: 'include'
	});
	return response.json();
}

const queryPostsList = async (query, tags, sortMethod, sortOrder) => {
	const response = await fetch(`${SERVER_URL}/posts?q=${query}&tags=${encodeURIComponent(JSON.stringify(tags))}&sortMethod=${sortMethod}&sortOrder=${sortOrder}`, {
		method: 'GET',
		headers: {
			'session-token': sessionStorage.getItem('sessionToken')
		},
		credentials: 'include'
	});
	return response.json();
};

const getSoldPosts = async () => {
	const response = await fetch(SERVER_URL + '/posts/sold', {
		method: 'GET',
	});
	return response.json();
};

export default {
	getPostsList,
	getIndividualListing,
	addToPostsList,
	deleteFromPostsList,
	queryPostsList,
	getSoldPosts
};