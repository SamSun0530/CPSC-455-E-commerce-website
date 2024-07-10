var express = require('express');
var router = express.Router();
const UserService = require('../service/user');

/* User login */
router.post('/login', function (req, res, next) {
    console.log(req.body);
    const { email, password } = req.body;
    if (UserService.authUser(email, password)) {
        return res.send({ success: true });
    } else {
        return res.status(401).send({ success: false });
    }
});

/* User Registration */
router.post('/register', function (req, res, next) {
    const { email, password } = req.body;
    if (UserService.registerUser(email, password)) {
        return res.send({ created: true });
    } else {
        return res.status(400).send({ created: false });
    }
});

/* User logout */
router.post('/logout', function (req, res, next) {
    // TODO set session token expiration to now OR remove session token record.
});

// app.use(midd)


module.exports = router;