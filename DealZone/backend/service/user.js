const bcrypt = require('bcrypt');
const User = require('../db/models/user');
const Cart = require('../db/models/cart');
const Listing = require('../db/models/listing');
const PurchaseHistory = require('../db/models/purchaseHistory');
const Wishlist = require('../db/models/wishlist');

const hashPassword = async (password) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
};

const verifyPassword = async (password, hashedPassword) => {
    const isSame = await bcrypt.compare(password, hashedPassword);
    return isSame;
};

const getUserByEmail = async (email) => {
    const user = await User.findOne({ email });
    return user;
};

const getUser = async (id) => {
    return await User.findById(id);
};

const getUserBasic = async (id) => {
    return await User.findById(id).select('_id username email first_name last_name address');
}

const updateUser = async (id, data) => {
    return await User.findByIdAndUpdate(id, data, { new: true });
};

const authUser = async (email, password) => {
    const user = await getUserByEmail(email);
    if (user) {
        const isPasswordSame = await verifyPassword(password, user.password);
        if (isPasswordSame) {
            console.debug(`User: ${email} logged in`);
            return user._id;
        }
        console.debug(`password does not match`);
    }
    return false;
}

const registerUser = async (username, email, phone_number, password) => {
    if (await getUserByEmail(email)) {
        console.log(`User with ${email} already exists.`);
        return false;
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({ username, email, phone_number, password: hashedPassword });
    console.log(`User: ${email} registered.`);
    return true;
}

const changeUserPassword = async (id, currentPassword, newPassword) => {
    const user = await getUser(id);
    if (user) {
        const isPasswordMatch = await verifyPassword(currentPassword, user.password);
        if (isPasswordMatch) {
            const newPasswordHashed = await hashPassword(newPassword);
            user.password = newPasswordHashed;
            await user.save();
            console.log(`User: ${email} password changed.`);
            return true;
        }
        console.log(`user password incorrect`);
    }
    return false;
}

const deleteUser = async (user_id) => {
    await User.deleteOne({ _id: user_id });
    await Cart.deleteOne({ user_id });
    await Listing.deleteMany({ user_id });
    await PurchaseHistory.deleteOne({ user_id });
    await Wishlist.deleteOne({ user_id });
    return true;
}

module.exports = {
    authUser,
    registerUser,
    changeUserPassword,
    deleteUser,
    getUserBasic,
    updateUser,
};