var express = require('express');
var router = express.Router();
const WishlistService = require('../service/wishlist');

router.get('/', function (req, res, next) {
    res.send(WishlistService.getWishlist());
});

router.post('/', function (req, res, next) {
    const item = req.body;
    if (WishlistService.addToWishlist(item)) {
        res.send(item)
    } else {
        return res.status(409).send("Item already in wishlist");
    }
    // res.send(WishlistService.addToWishlist(item));
});

router.delete('/:id', function (req, res, next) {
    const { id } = req.params;
    if (WishlistService.deleteFromWishlist(Number(id))) {
        return res.send(id);
    }
    else {
        return res.status(404).send("Specified wishlist item not found");
    }
});

router.delete('/', function (req, res, next) {
    res.send(WishlistService.clearWishlist());
});

module.exports = router;