const { authSession } = require("../service/session");
const { getUserBasic } = require("../service/user");

const verifySession = async (req, res, next) => {
    if (req.cookies && req.cookies.sessionToken) {
        console.log(req.cookies);
        const sessionToken = req.cookies.sessionToken;
        const auth = await authSession(sessionToken);
        if (auth) {
            const user = await getUserBasic(auth);
            req.session = {
                user
            };
        } else {
            req.session = false;
        }
    } else {
        const sessionToken = req.headers['session-token'];
        console.log("token: ", sessionToken);
        if (sessionToken) {
            const auth = await authSession(sessionToken);
            if (auth) {
                const user = await getUserBasic(auth);
                req.session = {
                    user
                };
            } else {
                req.session = false;
            }
        } else {
            req.session = false;
        }
    }
    next();
}

module.exports = verifySession;