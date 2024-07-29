const Listing = require('../db/models/listing');

async function getListings(query, tags) {
    let searchCriteria = {};
    if (query) {
        searchCriteria.$or = [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
        ];
    }
    
    if (tags && tags.length > 0) {
        searchCriteria.tags = { $in: tags };
    }
    const listings = await Listing.find(searchCriteria);
    return listings;
}

const addListing = async (title, description, image, price, posted_on, user_id, tags) => {
    await Listing.create({ title, description, image, price, posted_on, user_id, tags });
}

module.exports = {
    getListings,
    addListing
};