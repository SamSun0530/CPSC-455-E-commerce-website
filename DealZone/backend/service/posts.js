const Listing = require('../db/models/listing');
const db = require('../db/db');

async function getListings(query, tags, sortMethod, sortOrder) {
    let searchCriteria = {};
    let sortCriteria = {};
    searchCriteria.sold = { $ne: true };

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
    await Listing.create({ title, description, image, price, posted_on, user_id, tags, sold: false });
}


const markListingsAsSold = async (listingIds) => {
    const session = await db.startSession();
    session.startTransaction();

    const itemCount = listingIds.length;

    try {
        const result = await Listing.updateMany(
            { _id: { $in: listingIds }, sold: false },
            { $set: { sold: true } },
            { session }
        );
        const { acknowledged, matchedCount, modifiedCount } = result;
        if (itemCount == matchedCount && itemCount == modifiedCount) {
            await session.commitTransaction();
            session.endSession();
            return true;
        } else {
            console.log(`Some items in cart were already sold. Cart: ${itemCount}, Avail: ${modifiedCount}`);
            await session.abortTransaction();
            session.endSession();
            return false;
        }
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        console.error(`Error during marking listings as sold`);
        return false;
    }
}

async function getSoldListings() {
    const soldListings = await Listing.find({ sold: true });
    console.log("sold listings: ", soldListings);
    return soldListings;
}

module.exports = {
    getListings,
    getListing,
    addListing,
    markListingsAsSold,
    getSoldListings
};