var express = require('express');
var router = express.Router();
const WishlistService = require('../service/wishlist');
const verifySession = require('../middleware/session');

router.use(verifySession);

// get wishlist
router.get('/', async function (req, res) {
    try {
        if (req.session) {
            res.send(await WishlistService.getWishlist(req.session.user._id));
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});

// add to wishlist
router.post('/', async function (req, res) {
    try {
        if (req.session) {
            const item = req.body;
            if (await WishlistService.addToWishlist(item, req.session.user._id)) {
                res.send(item)
            } else {
                res.status(409).json({ success: false, message: "Item already in wishlist" });
            }
        } else {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});

// remove from wishlist
router.delete('/:id', async function (req, res) {
    try {
        if (req.session) {
            const { id } = req.params;
            if (await WishlistService.deleteFromWishlist(id, req.session.user._id)) {
                return res.send(JSON.stringify(id));
            }
            else {
                return res.status(404).send("Specified wishlist item not found");
            }
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (err) {
        return res.status(500).send(err);
    }

});

// clear wishlist
router.delete('/', async function (req, res) {
    try {
        if (req.session) {
            res.send(await WishlistService.clearWishlist(req.session.user._id));
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});

module.exports = router;