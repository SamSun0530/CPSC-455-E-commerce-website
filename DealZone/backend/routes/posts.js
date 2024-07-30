var express = require('express');
var router = express.Router();
const PostsService = require('../service/posts');
const verifySession = require('../middleware/session');

// Get posts
router.get('/', async function (req, res, next) {
    console.log(req.query)
    const query = req.query.q || "";
    let tags = req.query.tags || [];
    // let tags = JSON.stringify(req.query.tags);
    if (tags && tags.length) {
        try {
            tags = JSON.parse(tags);
            // console.log(tags)
        } catch (err) {
            console.error("Error in JSON.parse(tags): ", err);
            tags = null;
        }
    }
    try {
        const listings = await PostsService.getListings(query, tags);
        res.send(listings);
    } catch (err) {
        console.error("Error in getting listings: ", err);
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
        const {title, desc, image, price} = req.body;
        const posted_on = new Date();
        const user_id = req.session.user._id;
    
        await PostsService.addListing(title, desc, image, price, posted_on, user_id);
        res.status(201).send();
    } catch (err) {
        console.error("error adding new listing: ", err);
    }
    
});

// TODO: delete
// Delete a post
// router.delete('/:id', function (req, res, next) {
//     const { id } = req.params;
//     if (PostsService.deletePost(Number(id))) {
//         return res.send(id);
//     }
//     else {
//         return res.status(404).send("Specified wishlist item not found");
//     }
// });

module.exports = router;
