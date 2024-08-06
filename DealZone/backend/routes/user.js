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
    if (req.session) {
        const user_id = req.session.user._id;
        SessionService.removeSession(user_id).then(() => {
            return res.send();
        }).catch((err) => {
            console.log("logout error", err);
            return res.status(500).send(err);
        });
    } else {
        return res.status(401).send("Unauthorized");
    }
});

router.delete('/delete', function (req, res, next) {
    if (req.session) {
        const user_id = req.session.user._id;
        UserService.deleteUser(user_id).then(() => {
            return res.send({ success: true });
        }).catch((err) => {
            return res.status(500).send(err);
        })
    } else {
        return res.status(401).send("Unauthorized");
    }
})


// Get user data
router.get('/', async function (req, res, next) {
    try {
        if (req.session) {
            const user = await UserService.getUserBasic(req.session.user._id);
            return res.send(user);
        } else {
            return res.status(401).send("Unauthorized");
        }
    } catch (error) {
        return res.status(500).send(error);
    }
});

// Update user data by email, no password change here. 
// If changing password should have a separate route, and require user enter current password again
router.patch('/:email', async function (req, res, next) {
    try {
        const user = await UserService.updateUserByEmail(req.params.email, req.body);
        res.send(user);
    } catch (error) {
        next(error);
    }
});


module.exports = router;