const PurchaseHistory = require('../db/models/purchaseHistory');
const Listing = require('../db/models/listing');

const getPurchasedListing = async ({listing_id, purchased_on}) => {
    const listing = await Listing.findOne({ _id: listing_id });
    return {_id: listing_id, title: listing.title, price: listing.price, image: listing.image, description: listing.description, purchased_on};
}


const getPurchaseHistory = async (user_id) => {
    const history = await PurchaseHistory.findOne({ user_id: user_id });
    if (history) {
        let purchases = [];
        for (const purchase of history.items) {
            purchases.push(await getPurchasedListing(purchase));
        }
        return purchases;
    } else {
        const newHistory = new PurchaseHistory({
            user_id: user_id,
            items: []
        })
        await newHistory.save();
        return newHistory.items;
    }
}

const addToPurchaseHistory = async (user_id, listing_ids, purchased_on) => {
    let history = await PurchaseHistory.findOne({ user_id: user_id });
    if (!history) {
        history = new PurchaseHistory({
            user_id: user_id,
            items: []
        });
    } 

    const existingListingIds = new Set(history.items.map(item => item.listing_id));
    for (const listing_id of listing_ids) {
        if (!existingListingIds.has(listing_id)) {
            history.items.push({ listing_id, purchased_on });
            existingListingIds.add(listing_id);
        }
    }
    await history.save();
}

module.exports = {
    getPurchaseHistory,
    addToPurchaseHistory
};
