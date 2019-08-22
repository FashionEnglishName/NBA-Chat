const mongoose = require("mongoose");
const myPassword = require("../utils/password");

const userSchema = new mongoose.Schema({
    'user': {
        type: String,
        required: true,
        unique: true
    },
    'pwd': {
        type: String,
        required: true
    },
    'team': {
        type: String,
        required: true
    },
    'avatar': {
        type: String
    },
    'desc': {
        type: String
    }
});

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.pwd;

    return userObject;
};

userSchema.pre('save', async function(next) {
    const user = this;

    if(user.isModified("pwd")) {
        user.pwd = await myPassword(user.pwd);
    }

    next();
});

const User = mongoose.model("User", userSchema);
module.exports = User;