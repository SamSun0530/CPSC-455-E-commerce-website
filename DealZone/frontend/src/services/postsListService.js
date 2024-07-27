const getPostsList = async () => {
	const response = await fetch('https://project-10-tech-titans.onrender.com/posts', {
		method: 'GET',
		headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
		credentials: 'include'
	});
	return response.json();
};

const addToPostsList = async (item) => {
	const response = await fetch('https://project-10-tech-titans.onrender.com/posts', {
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
	const response = await fetch(`https://project-10-tech-titans.onrender.com/posts/${id}`, {
		method: 'DELETE',
		headers: {
            'session-token': sessionStorage.getItem('sessionToken')
        },
		credentials: 'include'
	});
	console.log(response.json)
	return response.json();
}

const queryPostsList = async (query, tags) => {
	const response = await fetch(`https://project-10-tech-titans.onrender.com/posts?q=${query}&tags=${encodeURIComponent(JSON.stringify(tags))}`, {
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