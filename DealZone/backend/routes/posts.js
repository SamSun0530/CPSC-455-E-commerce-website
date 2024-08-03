var express = require('express');
var router = express.Router();
const PostsService = require('../service/posts');
const verifySession = require('../middleware/session');

// Get posts
router.get('/', async function (req, res, next) {
    console.log("query: ", req.query);
    const query = req.query.q || "";
    let tags = req.query.tags || [];
    const sortMethod = req.query.sortMethod || "";
    const sortOrder = req.query.sortOrder || "descending";
    if (tags && tags.length) {
        try {
            tags = JSON.parse(tags);
        } catch (err) {
            console.error("Error in JSON.parse(tags): ", err);
            tags = null;
        }
    }
    try {
        const listings = await PostsService.getListings(query, tags, sortMethod, sortOrder);
        res.send(listings);
    } catch (err) {
        console.error("Error in getting listings: ", err);
    }
});

// Get Sold Posts
router.get('/sold', async function (req, res, next) {
    try {
        const soldListing = await PostsService.getSoldListings();
        res.send(soldListing);
    } catch (err) {
        console.error("Error in getting sold listings: ", err);
    }
});

router.get('/:listing_id', async function (req, res, next) {
    const { listing_id } = req.params;
    try {
        const listing = await PostsService.getListing(listing_id);
        res.send(listing);
    } catch (err) {
        console.error("Error in getting individual listing: ", err);
    }
});

router.use(verifySession);

// Add new post
router.post('/', async function (req, res, next) {
    try {
        if (!req.session.user) {
            return res.status(401).send("Unauthorized");
        }
        console.log("posts req.body ", req.body);
        const {title, desc, image, price, tags} = req.body;
        const posted_on = new Date();
        const user_id = req.session.user._id;
    
        await PostsService.addListing(title, desc, image, price, posted_on, user_id, tags);
        res.status(201).send();
    } catch (err) {
        console.error("error adding new listing: ", err);
    }
    
});

module.exports = router;
