const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: String,
    email: String,
    password: String,
    first_name: String,
    last_name: String,
    address: {
        street: String,
        city: String,
        province: String,
        country: String,
        postal: String
    }
});

const User = model('User', userSchema);
module.exports = User;