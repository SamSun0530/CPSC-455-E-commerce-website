const getPostsList = async () => {
	const response = await fetch('http://localhost:3000/posts', {
		method: 'GET'
	});
	return response.json();
};

const addToPostsList = async (item) => {
	const response = await fetch('http://localhost:3000/posts', {
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

const deleteFromPostsList = async (id) => {
	const response = await fetch(`http://localhost:3000/posts/${id}`, {
		method: 'DELETE'
	});
	console.log(response.json)
	return response.json();
}

export default {
	getPostsList,
	addToPostsList,
	deleteFromPostsList
};