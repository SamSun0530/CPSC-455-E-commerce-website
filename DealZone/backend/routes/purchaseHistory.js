var express = require('express');
var router = express.Router();
const PurchaseHistoryService = require('../service/purchaseHistory');
const verifySession = require('../middleware/session');

router.use(verifySession);

// get purchase history for user
router.get('/', async function (req, res) {
    if (req.session) {
        res.send(await PurchaseHistoryService.getPurchaseHistory(req.session.user._id));
    } else {
        res.status(401).send("Unauthorized");
    }
});

module.exports = router;