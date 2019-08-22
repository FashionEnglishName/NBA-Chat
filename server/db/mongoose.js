const mongoose = require("mongoose");

const DB_URL = "mongodb://localhost:27017/chat-app";
mongoose.connect(DB_URL);
mongoose.connection.on("connected", () => {
    console.log("success");
});