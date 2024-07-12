var express = require('express');
var router = express.Router();
const UserService = require('../service/user');

/* User login */
router.post('/login', function (req, res, next) {
    console.log(req.body);
    const { email, password } = req.body;
    UserService.authUser(email, password).then((auth) => {
        if (auth) {
            console.log('returning login true');
            return res.send({ success: true });
        } else {
            console.log('returning login false');
            return res.status(401).send({ success: false });
        }
    }).catch((err) => {
        console.log(err);
        return res.status(500).send("Encountered error");
    });
});

/* User Registration */
router.post('/register', function (req, res, next) {
    const { username, email, phone_number, password } = req.body;
    UserService.registerUser(username, email, phone_number, password).then((created) => {
        if (created) {
            return res.send({ created: true });
        } else {
            return res.status(400).send({ created: false });
        }
    }).catch((err) => {
        console.log(err);
        return res.status(500).send("Encountered error");
    })
});

/* User logout */
router.post('/logout', function (req, res, next) {
    // TODO set session token expiration to now OR remove session token record.
});

// app.use(midd)


module.exports = router;