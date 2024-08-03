var express = require('express');
var router = express.Router();
const UserService = require('../service/user');
const SessionService = require('../service/session');
const verifySession = require('../middleware/session');

/* User login */
router.post('/login', function (req, res, next) {
    const { email, password } = req.body;
    UserService.authUser(email, password).then(async (user_id) => {
        if (user_id) {
            const session = await SessionService.createSession(user_id);
            console.log('returning login true');
            // res.cookie('sessionToken', session.session_token, {
            //     sameSite: 'None',
            //     secure: true,
            //     path: '/',
            //     domain: 'project-10-tech-titans.onrender.com'
            // });
            return res.send({ success: true, session });
        } else {
            console.log('returning login false');
            return res.status(401).send({ success: false });
        }
    }).catch((err) => {
        console.log("User error: ", err);
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
        console.log("User error: ", err);
        return res.status(500).send("Encountered error");
    })
});

router.use(verifySession);
/* User logout */
router.post('/logout', function (req, res, next) {
    const user_id = req.session.user._id;
    SessionService.removeSession(user_id).then(() => {
        return res.send();
    }).catch((err) => {
        console.log("logout error", err);
        return res.status(500).send(err);
    });
});

// app.use(midd)

// Get user data by email
router.get('/:email', async function (req, res, next) {
    try {
        const user = await UserService.getUserByEmail(req.params.email);
        res.send(user);
    } catch (error) {
        next(error);
    }
});

// Update user data by email
router.put('/:email', async function (req, res, next) {
    try {
        const user = await UserService.updateUserByEmail(req.params.email, req.body);
        res.send(user);
    } catch (error) {
        next(error);
    }
});


module.exports = router;