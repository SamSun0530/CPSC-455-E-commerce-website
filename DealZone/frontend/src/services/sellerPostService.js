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
};

const updateSellerPost = async (updatedMember) => { 
    const response = await fetch(`http://localhost:3000/sellerPosts/${updatedMember._id}`,{
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedMember)
    });

    return response.json(); 
};

export default {
    getSellerPost,
    deleteSellerPost,
    updateSellerPost
};
