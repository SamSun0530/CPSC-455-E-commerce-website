var express = require('express');
var router = express.Router();
const CartService = require('../service/cart');

// Get cart
router.get('/', function (req, res, next) {
    res.send(CartService.getCart());
});

// Add item to cart
router.post('/', function (req, res, next) {
    const item = req.body;
    res.send(CartService.addToCart(item));
});

// Delete item from cart
router.delete('/:id', function (req, res, next) {
    const { id } = req.params;
    if (CartService.deleteFromCart(Number(id))) {
        return res.send(id);
    }
    else {
        return res.status(404).send("Specified wishlist item not found");
    }
});

// Clear cart
router.delete('/', function (req, res, next) {
    res.send(CartService.clearCart());
});

module.exports = router;
