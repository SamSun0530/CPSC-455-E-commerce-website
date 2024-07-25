const getSellerPost = async () => {
    const response = await fetch('http://localhost:3000/sellerPosts', {
        method: 'GET',
        credentials: 'include'
    });
    return response.json();
};

const deleteSellerPost = async (id) => {
    const response = await fetch(`http://localhost:3000/sellerPosts/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });
    return response.json();
}


export default {
    getSellerPost,
    deleteSellerPost
};
