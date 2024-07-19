var express = require('express');
var router = express.Router();
const SellerPostsService = require('../service/cart');
const verifySession = require('../middleware/session');

router.use(verifySession);
// Get seller posts
router.get('/', function (req, res, next) {
    res.send(SellerPostsService.getPosts());
});

// Add item to cart
router.post('/', function (req, res, next) {
    const item = req.body;
    res.send(SellerPostsService.addToCart(item));
});

// Delete item from cart
router.delete('/:id', function (req, res, next) {
    const { id } = req.params;
    if (SellerPostsService.deleteFromCart(Number(id))) {
        return res.send(id);
    }
    else {
        return res.status(404).send("Specified wishlist item not found");
    }
});

// Clear cart
router.delete('/', function (req, res, next) {
    let response = SellerPostsService.clearCart();
    console.log(response);
    res.send(response);
});

module.exports = router;
