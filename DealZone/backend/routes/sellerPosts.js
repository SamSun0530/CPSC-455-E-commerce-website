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
router.delete('/:id', async function (req, res, next) {
    try {
        if (!req.session.user) {
            return res.status(401).send("Unauthorized");
        }
        const { id } = req.params;
        if (await SellerPostsService.deleteSellerPost(req.session.user._id, id)) {
            res.send({ id });
        } else {
            res.status(404).send("Error deleting post");
        }
    } catch (error) {
        next(error);
    }
});

// Edit seller post
router.patch('/:_id', async function (req, res, next) {
    try {
        const post = await SellerPostsService.updatePost(req.params._id, req.body);
        res.send(post);
    } catch (error) {
        next(error);
    }
});

module.exports = router;
