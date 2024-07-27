var express = require('express');
var router = express.Router();
const CartService = require('../service/cart');
const verifySession = require('../middleware/session');

router.use(verifySession);

// Get cart
router.get('/', async function (req, res, next) {
    if (req.session) {
        res.send(await CartService.getCart(req.session.user._id));
    } else {
        res.status(401).send("Unauthorized");
    }
});

// Add item to cart
router.post('/', async function (req, res, next) {
    if (req.session) {
        const item = req.body;
        if (await CartService.addToCart(item, req.session.user._id)) {
            res.send(item)
        } else {
            return res.status(409).send("Item already in cart");
        }
    } else {
        res.status(401).send("Unauthorized");
    }

});

// Delete item from cart
router.delete('/:id', async function (req, res, next) {
    if (req.session) {
        const { id } = req.params;
        if (await CartService.deleteFromCart(id, req.session.user._id)) {
            return res.send(JSON.stringify(id));
        }
        else {
            return res.status(404).send("Specified cart item not found");
        }
    } else {
        res.status(401).send("Unauthorized");
    }
});

// Clear cart
router.delete('/', async function (req, res, next) {
    if (req.session) {
        res.send(await CartService.clearCart(req.session.user._id));
    } else {
        res.status(401).send("Unauthorized");
    }
});

module.exports = router;
