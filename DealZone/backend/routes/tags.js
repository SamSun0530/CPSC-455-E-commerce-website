var express = require('express');
var router = express.Router();
const TagsService = require('../service/tags');
const verifySession = require('../middleware/session');


// Get all tags
router.get('/', async function (req, res) {
    try {
        const allTags = await TagsService.getAllTags();
        res.send(allTags);
    } catch (err) {
        return res.status(500).send(err);
    }
});

// Add new tag
router.post('/', async function (req, res) {
    try {
        const tag = req.body;
        console.log("Tags received in routes: ", tag);
        await TagsService.addTag(tag);
        res.status(201).send();
    } catch (err) {
        console.error("error adding new tag: ", err);
        return res.status(500).send(err);
    }

});

router.use(verifySession);

// Remove tags
router.delete('/:id', async function (req, res) {
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
    } catch (err) {
        return res.status(500).send(err);
    }
});


module.exports = router;
