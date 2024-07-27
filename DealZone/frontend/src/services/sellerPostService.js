const getSellerPost = async () => {
    const response = await fetch('https://project-10-tech-titans.onrender.com/sellerPosts', {
        method: 'GET',
        credentials: 'include'
    });
    return response.json();
};

const deleteSellerPost = async (id) => {
    const response = await fetch(`https://project-10-tech-titans.onrender.com/sellerPosts/${id}`, {
        method: 'DELETE',
        credentials: 'include'
    });

    return await response.json();
};

const updateSellerPost = async (updatedMember) => { 
    const response = await fetch(`https://project-10-tech-titans.onrender.com/sellerPosts/${updatedMember._id}`,{
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
