let users = [
    {email: "test@a", password: "testing123"}
]

function getUserByEmail(email) {
    return users.find(user => user.email === email);
}

const authUser = (email, password) => {
    console.log('at userService', email, password);
    const user = getUserByEmail(email);
    // hash password param here in future when db is implemented
    if (user && user.password === password) {
        console.log(`User: ${email} logged in`);
        return true;
    } else {
        console.log(`User: ${email} login failed. No account with email or wrong password`);
        return false;
    }
}

const registerUser = (email, password) => {
    if (getUserByEmail(email)) {
        console.log(`User with ${email} already exists.`);
        return false;
    }
    users.push({ email, password });
    console.log(`User: ${email} registered.`);
    return true;
}

// even if user is already logged in, should require current and new password
// check current password first using authUser, then if successful call this function
const changeUserPassword = (email, newPassword) => {
    const user = getUserByEmail(email);
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
    deleteUser
};