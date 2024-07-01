var express = require('express');
var router = express.Router();
const CartService = require('../service/cart');

router.get('/', function (req, res, next) {
    res.send(CartService.getCart());
});

router.post('/', function (req, res, next) {
    const item = req.body;
    res.send(CartService.addToCart(item));
});

router.delete('/:id', function (req, res, next) {
    const { id } = req.params;
    res.send(CartService.deleteFromCart(Number(id)));
});

router.delete('/', function (req, res, next) {
    res.send(CartService.clearCart());
});

module.exports = router;
