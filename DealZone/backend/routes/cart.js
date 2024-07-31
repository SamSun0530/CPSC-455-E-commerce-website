var express = require('express');
var router = express.Router();
const CartService = require('../service/cart');
const ListingService = require('../service/posts');
const WishlistService = require('../service/wishlist');
const PurchaseHistoryService = require('../service/purchaseHistory');
const verifySession = require('../middleware/session');
const { isPurchaseMethodValid } = require('../service/payment');

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
            return res.send({ id });
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

router.post('/purchase', async function (req, res, next) {
    if (req.session) {
        const { cart, details } = req.body;
        console.log(cart);
        console.log(details);

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
                return res.status(409).send("Item(s) in cart not availible");
            }
        } else {
            return res.status(400).send("Invalid Payment Method");
        }
    } else {
        return res.status(401).send("Unauthorized");
    }
});

module.exports = router;
