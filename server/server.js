const express = require("express");
const cookieParser = require('cookie-parser');
const http = require('http');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);

const Chat = require('./models/chat');

require('./db/mongoose');

io.on('connection', function(socket) {
    socket.on("sendMsg", function (data) {
        const {fromId, toId, msg} = data;
        const chatId = [fromId, toId].sort().join('_');
        Chat.create({chatId, fromId, toId,content: msg}, function (err, chat) {
                console.log(data);
                if(err) return console.log(err);
                io.emit("receiving", Object.assign({}, chat._doc));
        });
    })
});

const userRouter = require('./routers/user');

app.use(cookieParser());
app.use(express.json());
app.use(userRouter);

server.listen(9093, () => {
    console.log("listen on 9093");
});