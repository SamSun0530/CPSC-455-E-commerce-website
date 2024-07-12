var express = require('express');
var router = express.Router();
const PostsService = require('../service/posts');

// Get posts
router.get('/', async function (req, res, next) {
    try {
        const listings = await PostsService.getListings();
        console.log(listings);
        res.send(listings);
    } catch (err) {
        console.log("Error in getting listings: ", err);
    }
});

// Add new post
router.post('/', async function (req, res, next) {
    const {title, desc, image, price, user_id} = req.body;
    const posted_on = new Date();

    try {
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
