var express = require('express');
var router = express.Router();
const CartService = require('../service/cart');
const verifySession = require('../middleware/session');

router.use(verifySession);

// Get cart
router.get('/', async function (req, res, next) {
    try {
        const cart = await CartService.getCart();
        res.send(cart);
    } catch (error) {
        next(error);
    }
});

// Add item to cart
router.post('/', async function (req, res, next) {
    try {
        const item = req.body;
        const newItem = await CartService.addToCart(item);
        res.send(newItem);
    } catch (error) {
        if (error.message === 'Item already in cart') {
            res.status(400).send({ error: error.message });
        } else {
            next(error);
        }
    }
});

// Delete item from cart
router.delete('/:id', async function (req, res, next) {
    try {
        const { id } = req.params;
        if (await CartService.deleteFromCart(id)) {
            res.send({ id });
        } else {
            res.status(404).send("Specified cart item not found");
        }
    } catch (error) {
        next(error);
    }
});

// Clear cart
router.delete('/', async function (req, res, next) {
    try {
        const response = await CartService.clearCart();
        res.send(response);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
