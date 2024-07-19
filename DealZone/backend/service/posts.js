const Listing = require('../db/models/listing');

async function getListings() {
    const listings = await Listing.find();
    return listings;
}

const addListing = async (title, description, image, price, posted_on, user_id) => {
    await Listing.create({title, description, image, price, posted_on, user_id});
}

module.exports = {
    getListings,
    addListing
};