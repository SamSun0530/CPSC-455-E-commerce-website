const User = require('../db/models/user');

async function getUserByEmail(email) {
    const user = await User.findOne({ email });
    return user;
}

const getUser = async (id) => {
    return await User.findById(id);
};

const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

const authUser = async (email, password) => {
    console.log('at userService', email, password);
    const user = await getUserByEmail(email);
    // hash password param here in future when db is implemented
    if (user && user.password === password) {
        console.log(`User: ${email} logged in`);
        return user._id;
    } else {
        console.log(`User: ${email} login failed. No account with email or wrong password`);
        return false;
    }
}

const registerUser = async (username, email, phone_number, password) => {
    if (await getUserByEmail(email)) {
        console.log(`User with ${email} already exists.`);
        return false;
    }
    const newUser = await User.create({username, email, phone_number, password});
    console.log(`User: ${email} registered.`);
    // here is where session token would be created and returned
    return true;
}

// even if user is already logged in, should require current and new password
// check current password first using authUser, then if successful call this function
const changeUserPassword = async (email, newPassword) => {
    const user = await getUserByEmail(email);
    if (user) {
        user.password = newPassword;
        console.log(`User: ${email} password changed.`);
        return true;
    } else {
        console.log(`User: not found ${email} not found.`);
        return false;
    }
}

// TODO: need to add button to account view page
// should verify that user is logged in.
const deleteUser = (email) => {
    users = users.filter(user => user.email !== email);
    return true;
}

module.exports = {
    authUser,
    registerUser,
    changeUserPassword,
    deleteUser,
    getUser
};