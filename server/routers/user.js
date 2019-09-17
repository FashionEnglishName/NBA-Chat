const express = require('express');
const Router = express.Router();
const myPassword = require('../utils/password');
const Chat = require('../models/chat');

const User = require('../models/user');

const _filter = { 'pwd': 0, '__v': 0 };

Router.get("/user/info", function(req, res) {
    const {userId} = req.cookies;
    console.log(req.cookies)
    if(!userId) return res.json({code: 1});
    User.findById(userId, _filter, function(err, user) {
        if(err) return res.json({code: 1, msg: "backend error"});
        return res.json({code: 0, data: user});
    });
});

Router.get("/user/list", async (req, res) => {
    try {
        const team = req.query.team;
        console.log(team);
        let users;
        if(team) {
             users = await User.find({team});
        } else {
            users = await User.find({});
        }

        if(!users) return res.status(404).send();
        await res.json({code: 0, data: users});
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
});

Router.post("/user/register", async (req, res) => {
    try {
        console.log(req.body);
        const newUser = new User(req.body);
        await newUser.save();
        const {user, _id, team} = newUser;
        res.cookie("userId", _id);
        res.status(200).json({code: 0, data: {user, _id, team}});
    } catch(e) {
        res.status(200).json({code: 1, msg: "username has existed."});
    }
});

Router.post("/user/login", async (req, res) => {
    try {
        const {user, pwd} = req.body;
        const userFound = await User.findOne({user, pwd: myPassword(pwd)}, _filter);
        if(!userFound) return res.json({code:1, msg: "wrong username or password"});
        res.cookie("userId", userFound._id);
        return res.json({code:0, data:userFound});
    } catch (e) {
        res.status(200).json({code: 1, msg: "backend error"});
    }
});

Router.post("/user/update", async (req, res) => {
    try {
        const {userId} = req.cookies;
        if(!userId) return res.json({code: 1});
        const user = await User.findByIdAndUpdate(userId, req.body);
        return res.json({code:0, data: user})

    } catch (e) {
        console.log(e);
        res.status(200).json({code: 1, msg: "backend error"});
    }
});
Router.get("/user/msgList", async (req, res) => {
    try {
        const userId = req.cookies.userId;
        if(!userId) return res.json({code: 1});
        let users = await User.find({});
        let trimmedUser = {};
        users.forEach(user => {
            trimmedUser[user._id] = {name: user.user, avatar: user.avatar};
        });

        const chats = await Chat.find({'$or': [{fromId: userId}, {toId: userId}]});

        res.status(200).json({code: 0, msg: chats, users: trimmedUser});
    } catch(e) {
        console.log(e);
        res.status(200).json({code: 1, msg: e});
    }
});

Router.post('/user/readMsg', async (req, res) => {
    try {
        const userId = req.cookies.userId;
        const {fromId} = req.body;
        console.log(userId, fromId);
        const result = await Chat.update({fromId, toId: userId, read: false}, {'$set': {read: true}}, {multi: true});

        res.status(200).json({code: 0, num: result.nModified});
    } catch (e) {
        res.status(200).json({code: 1, msg: "backend error"});
    }


});

module.exports = Router;