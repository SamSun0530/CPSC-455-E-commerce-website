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

module.exports = {
    getSellerPosts
};