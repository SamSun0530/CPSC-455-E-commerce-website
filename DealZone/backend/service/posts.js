const Listing = require('../db/models/listing');

async function getListings(query) {
    if (query) {
        return await Listing.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ]
        })
    } else {
        const listings = await Listing.find();
        return listings;
    }
}

const addListing = async (title, description, image, price, posted_on, user_id) => {
    await Listing.create({ title, description, image, price, posted_on, user_id });
}

module.exports = {
    getListings,
    addListing
};