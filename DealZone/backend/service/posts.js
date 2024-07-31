const Listing = require('../db/models/listing');

async function getListings(query, tags, sortMethod, sortOrder) {
    let searchCriteria = {};
    let sortCriteria = {};
    if (query) {
        searchCriteria.$or = [
            { title: { $regex: query, $options: 'i' } },
            { description: { $regex: query, $options: 'i' } },
        ];
    }
    
    if (tags && tags.length > 0) {
        searchCriteria.tags = { $in: tags };
    }
    
    if (sortMethod) {
        sortCriteria[sortMethod] = sortOrder === 'descending' ? -1 : 1;
    } else {
        sortCriteria['posted_on'] = -1; // By default, sort by most recent
    }
    const listings = await Listing.find(searchCriteria).sort(sortCriteria);
    return listings;
}

const getListing = async (listing_id) => {
    return await Listing.findById(listing_id);
}

const addListing = async (title, description, image, price, posted_on, user_id, tags) => {
    await Listing.create({ title, description, image, price, posted_on, user_id, tags });
}

module.exports = {
    getListings,
    getListing,
    addListing
};