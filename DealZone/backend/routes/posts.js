var express = require('express');
var router = express.Router();
const PostsService = require('../service/posts');
const verifySession = require('../middleware/session');

router.use(verifySession);
// Get posts
router.get('/', async function (req, res, next) {
    const query = req.query.q || "";
    try {
        const listings = await PostsService.getListings(query);
        console.log(listings);
        res.send(listings);
    } catch (err) {
        console.log("Error in getting listings: ", err);
    }
});

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
        console.log("error adding new listing: ", err);
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
