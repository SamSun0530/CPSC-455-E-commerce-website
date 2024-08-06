const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const purchaseHistorySchema = new Schema({
    user_id: String,
    items: [{
        listing_id: String,
        purchased_on: String
    }]
});

const PurchaseHistory = model('PurchaseHistory', purchaseHistorySchema);
module.exports = PurchaseHistory;