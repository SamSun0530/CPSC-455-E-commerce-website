const { authSession } = require("../service/session");
const { getUserBasic } = require("../service/user");

const verifySession = async (req, res, next) => {
    if (req.cookies && req.cookies.sessionToken) {
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
        req.session = false;
    }
    next();
}

module.exports = verifySession;