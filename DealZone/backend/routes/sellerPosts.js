var express = require('express');
var router = express.Router();
const SellerPostsService = require('../service/sellerPostService');
const verifySession = require('../middleware/session');

router.use(verifySession);

// Get seller posts
router.get('/', async function (req, res, next) {
    try {
        if (!req.session.user) {
            return res.status(401).send("Unauthorized");
        }
        const sellerPosts = await SellerPostsService.getSellerPosts(req.session.user._id);
        res.send(sellerPosts);
    } catch(err) {
        next(err);
    }
});

// Delete seller post
/*
router.delete('/:id', function (req, res, next) {
    const { id } = req.params;
    if (SellerPostsService.deleteFromCart(Number(id))) {
        return res.send(id);
    }
    else {
        return res.status(404).send("Specified wishlist item not found");
    }
});

// Edit seller post
router.delete('/', function (req, res, next) {
    let response = SellerPostsService.clearCart();
    console.log(response);
    res.send(response);
});*/

module.exports = router;
