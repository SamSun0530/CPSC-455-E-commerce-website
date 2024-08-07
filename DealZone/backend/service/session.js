const Session = require('../db/models/session');
const { v4: uuidv4 } = require('uuid');


const authSession = async (token) => {
    const current_time = new Date().toISOString();
    const session = await Session.findOne({ session_token: token });
    if (session && session.expires_on > current_time) {
        console.log('session verified');
        const newExpiry = new Date(new Date().getTime() + 15 * 60000).toISOString();
        session.expires_on = newExpiry;
        await session.save();
        console.log('session duration extended');
        return session.user_id;
    } else {
        console.log('session invalid');
        return false;
    }
};

const createSession = async (user_id) => {
    let session = await Session.findOne({ user_id });
    const expiry = new Date(new Date().getTime() + 15 * 60000).toISOString();
    const token = uuidv4();
    if (session) {
        session.session_token = token;
        session.expires_on = expiry;
        await session.save();
    } else {
        session = await Session.create({ user_id, session_token: token, expires_on: expiry });
    }
    return session;
};

const removeSession = async (user_id) => {
    await Session.deleteOne({ user_id });
}

module.exports = {
    authSession,
    createSession,
    removeSession
};