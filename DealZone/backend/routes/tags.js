var express = require('express');
var router = express.Router();
const TagsService = require('../service/tags');
const verifySession = require('../middleware/session');

router.use(verifySession);

// Get all tags
router.get('/', async function (req, res, next) {
    try {
        const allTags = await TagsService.getAllTags();
        res.send(allTags);
    } catch(err) {
        next(err);
    }
});

// Add new tag
router.post('/', async function (req, res, next) {
    try {
        const tag = req.body;
        console.log("Req body in routes: ", req.body);
        console.log("Tags received in routes: ", tag);
        await TagsService.addTag(tag);
        res.status(201).send();
    } catch (err) {
        console.error("error adding new tag: ", err);
    }
    
});


// Remove tags
/*
router.delete('/:id', async function (req, res, next) {
    try {
        if (!req.session.user) {
            return res.status(401).send("Unauthorized");
        }
        const { id } = req.params;
        if (await TagsService.deleteTag(req.session.user._id, id)) {
            res.send({ id });
        } else {
            res.status(404).send("Error deleting tag");
        }
    } catch (error) {
        next(error);
    }
});
*/


module.exports = router;
