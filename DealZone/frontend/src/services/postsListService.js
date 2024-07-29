import SERVER_URL from '../../config';

const getPostsList = async () => {
	const response = await fetch(SERVER_URL + '/posts', {
		method: 'GET',
		headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
		credentials: 'include'
	});
	return response.json();
};

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

const queryPostsList = async (query, tags) => {
	const response = await fetch(`${SERVER_URL}/posts?q=${query}&tags=${encodeURIComponent(JSON.stringify(tags))}`, {
		method: 'GET',
		headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
		credentials: 'include'
	});
	return response.json();
}

export default {
	getPostsList,
	addToPostsList,
	deleteFromPostsList,
	queryPostsList
};