var express = require('express');
var router = express.Router();
const CartService = require('../service/cart');
const ListingService = require('../service/posts');
const WishlistService = require('../service/wishlist');
const PurchaseHistoryService = require('../service/purchaseHistory');
const verifySession = require('../middleware/session');
const { isPurchaseMethodValid } = require('../service/payment');
const { verifyAddress } = require('../service/address');

router.use(verifySession);

// get user's cart
router.get('/', async function (req, res) {
    try {
        if (req.session) {
            res.send(await CartService.getCart(req.session.user._id));
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});

// add item to user's cart
router.post('/', async function (req, res) {
    try {
        if (req.session) {
            const item = req.body;
            if (await CartService.addToCart(item, req.session.user._id)) {
                res.json(item);
            } else {
                res.status(409).json({ success: false, message: "Item already in cart" });
            }
        } else {
            res.status(401).json({ success: false, message: "Unauthorized" });
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});

// remove item from cart
router.delete('/:id', async function (req, res) {
    try {
        if (req.session) {
            const { id } = req.params;
            if (await CartService.deleteFromCart(id, req.session.user._id)) {
                return res.send({ id });
            }
            else {
                return res.status(404).send("Specified cart item not found");
            }
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});

// clear cart
router.delete('/', async function (req, res) {
    try {
        if (req.session) {
            res.send(await CartService.clearCart(req.session.user._id));
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});

// purchase items in cart
router.post('/purchase', async function (req, res) {
    try {
        if (req.session) {
            const { cart, details } = req.body;
            const { missing, unconfirmed } = await verifyAddress({
                address: {
                    regionCode: details.country,
                    locality: details.city,
                    postalCode: details.postal_code,
                    addressLines: [details.street]
                }
            });
            console.log(missing);
            console.log(unconfirmed);
            console.log(!missing);
            if ((!missing || (missing && missing.length == 0)) && (!unconfirmed || ( unconfirmed && unconfirmed.length == 0))) {
                if (isPurchaseMethodValid({
                    card_number: details.card_number,
                    cvc: details.cvc,
                    month: details.month,
                    year: details.year,
                    card_postal_code: details.card_postal_code
                })) {
                    const ids = cart.map(listing => listing._id);
                    const success = await ListingService.markListingsAsSold(ids);
                    const purchasedDate = new Date().toISOString();
                    if (success) {
                        await CartService.pullSoldItemsFromCart(ids);
                        await WishlistService.pullSoldItemsFromWishlist(ids);
                        await PurchaseHistoryService.addToPurchaseHistory(req.session.user._id, ids, purchasedDate);
                        return res.status(200).send("success");
                    } else {
                        return res.status(409).send("Item(s) in cart not available");
                    }
                } else {
                    return res.status(402).send("Invalid Payment Method");
                }
            } else {
                return res.status(400).send("Invalid Address");
            }
        } else {
            return res.status(401).send("Unauthorized");
        }
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
});

module.exports = router;
