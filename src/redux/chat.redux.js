import axios from 'axios';
import io from 'socket.io-client';
const socket = io("ws://localhost:9093");

const MSG_LIST = 'MSG_LIST';
const MSG_RECV = 'MSG_RECV';
const MSG_READ = 'MSG_READ';

const initState = {
    chatMsg: [],
    users: {},
    unread: 0
};

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return {...state, users:action.payload.users, chatMsg: action.payload.msg, unread: action.payload.msg.filter(v => !v.read && v.toId === action.payload.userId).length}
        case MSG_RECV:
            const n = action.payload.toId === action.userId ? 1 : 0;
            return {...state, chatMsg: [...state.chatMsg, action.payload], unread: state.unread + n};
        case MSG_READ:
            return {...state, chatMsg: state.chatMsg.map(chat => {
                chat.read = action.payload.fromId === chat.fromId ? true : chat.read;
                return chat;
            }), unread: state.unread - action.payload.num};
        default:
            return state;
    }
}

function msgList(msg, users, userId) {
    return {type: MSG_LIST, payload: {msg, users, userId}};
}

function msgReceive(msg, userId) {
    return {userId, type: MSG_RECV, payload: msg};
}

function msgRead({fromId, toId, num}) {
    return {type: MSG_READ, payload: {fromId, toId, num}};
}

export function getMsgList() {
    return (dispatch, getState) => {
        axios("/user/msgList")
            .then(res => {
                if(res.status === 200 && res.data.code === 0) {
                    const userId = getState().user._id;
                    dispatch(msgList(res.data.msg, res.data.users, userId));
                }
            })
    }
}

export function sendMsg({fromId, toId, msg}) {
    return dispatch => {
        console.log(fromId, toId, msg);
        socket.emit("sendMsg", {fromId, toId, msg});
    }
}

export function recvMsg() {
    return (dispatch, getState) => {
        socket.on('receiving', function (data) {
            const userId = getState().user._id;
            dispatch(msgReceive(data, userId));
        })
    }
}

export function readMsg(fromId) {
    return (dispatch, getState) => {
        axios.post('/user/readMsg', {fromId})
            .then(res => {
                const userId = getState().user._id;
                console.log("readmsg");

                if(res.status === 200 && res.data.code === 0) {
                    console.log("readmsg");
                    dispatch(msgRead({userId, fromId, num: res.data.num}));
                }
            })
    }
}