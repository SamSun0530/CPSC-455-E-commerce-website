var express = require('express');
var router = express.Router();
const PurchaseHistoryService = require('../service/purchaseHistory');
const verifySession = require('../middleware/session');

router.use(verifySession);

router.get('/', async function (req, res, next) {
    if (req.session) {
        res.send(await PurchaseHistoryService.getPurchaseHistory(req.session.user._id));
    } else {
        res.status(401).send("Unauthorized");
    }
});

module.exports = router;