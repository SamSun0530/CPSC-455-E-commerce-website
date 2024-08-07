var express = require('express');
var router = express.Router();
const UserService = require('../service/user');
const SessionService = require('../service/session');
const verifySession = require('../middleware/session');


// User login
router.post('/login', function (req, res) {
    const { email, password } = req.body;
    UserService.authUser(email, password).then(async (user_id) => {
        if (user_id) {
            const session = await SessionService.createSession(user_id);
            console.log('returning login true');
            // using sessionStorage to store token instead of cookie
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
        console.log("Login error: ", err);
        return res.status(500).send(err);
    });
});

// User Registration 
router.post('/register', function (req, res) {
    const { username, email, phone_number, password } = req.body;
    UserService.registerUser(username, email, phone_number, password).then((created) => {
        if (created) {
            return res.send({ created: true });
        } else {
            return res.status(400).send({ created: false });
        }
    }).catch((err) => {
        console.log("Registration error: ", err);
        return res.status(500).send(err);
    })
});

router.use(verifySession);
// Logout user
router.post('/logout', function (req, res) {
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

// delete user account
router.delete('/delete', function (req, res) {
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
router.get('/', async function (req, res) {
    try {
        if (req.session) {
            const user = await UserService.getUserBasic(req.session.user._id);
            return res.send(user);
        } else {
            return res.status(401).send("Unauthorized");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});

// Update user information
router.patch('/', async function (req, res) {
    try {
        const { username, email, password, first_name, last_name, phone_number, street, city, province, country, postal } = req.body;
        const updateFields = {
            username, email, password, first_name, last_name, phone_number, street, city, province, country, postal
        };
        Object.keys(updateFields).forEach(key => {
            if (updateFields[key] === undefined) {
                delete updateFields[key];
            }
        });
        const updatedUser = await UserService.updateUser(req.session.user.id, updateFields);
        res.send(updatedUser);
    } catch (err) {
        return res.status(500).send(err);
    }
});


module.exports = router;