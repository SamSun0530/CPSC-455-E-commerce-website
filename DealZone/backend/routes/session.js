var express = require('express');
const verifySession = require('../middleware/session');
var router = express.Router();

router.use(verifySession);

router.get('/', async function (req, res, next) {
    if (req.session) {
        res.status(200).send({ loggedIn: true });
    } else {
        res.status(401).send({ loggedIn: false });
    }
});

module.exports = router;