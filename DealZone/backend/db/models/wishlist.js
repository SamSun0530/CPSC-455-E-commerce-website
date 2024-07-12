const { Schema, model } = mongoose;

const wishlistSchema = new Schema({
    user_id: String,
    items: [String]
});

const Wishlist = model('Wishlist', wishlistSchema);
module.exports = Wishlist;