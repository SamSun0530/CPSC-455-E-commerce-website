const AllListings = require('../db/models/listing');

async function getSellerPosts(userId) {
    try {
        const sellerPosts = await AllListings.find({ user_id: userId });
        return sellerPosts;
    } catch (error) {
        console.error('Error fetching seller posts:', error);
        throw error;
    }
}

const deleteSellerPost = async (userId, itemId) => {
    try {
        const result = await AllListings.findOneAndDelete({ _id: itemId, user_id: userId });
        return result;
    } catch(err) {
        console.error('Error deleting seller post:', err);
        throw err;
    }
};

const updatePost = async (userId, updatedData) => {
    try{
        const res =  await AllListings.findByIdAndUpdate(userId, updatedData, { new: true });
        return res;
    } catch(err) {
        console.error('Error updating seller post:', err);
        throw err;
    }
}

module.exports = {
    getSellerPosts,
    deleteSellerPost,
    updatePost
};