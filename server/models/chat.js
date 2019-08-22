const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
    'chatId': {
        type: String,
        required: true
    },
    'fromId': {
        type: String,
        required: true
    },
    'toId': {
        type: String,
        required: true
    },
    'read': {
        type: Boolean,
        default: false
    },
    'content': {
        type: String,
        required: true,
        default: ''
    }
}, {timestamps: true});


const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;