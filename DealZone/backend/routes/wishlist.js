var express = require('express');
var router = express.Router();
const WishlistService = require('../service/wishlist');

router.get('/', async function (req, res, next) {
    res.send(await WishlistService.getWishlist());
});

router.post('/', async function (req, res, next) {
    const item = req.body;
    if (await WishlistService.addToWishlist(item)) {
        res.send(item)
    } else {
        return res.status(409).send("Item already in wishlist");
    }
    // res.send(WishlistService.addToWishlist(item));
});

router.delete('/:id', async function (req, res, next) {
    const { id } = req.params;
    if (await WishlistService.deleteFromWishlist(id)) {
        return res.send(JSON.stringify(id));
    }
    else {
        return res.status(404).send("Specified wishlist item not found");
    }
});

router.delete('/', async function (req, res, next) {
    res.send(await WishlistService.clearWishlist());
});

module.exports = router;