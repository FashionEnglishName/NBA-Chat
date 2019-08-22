import axios from 'axios';
import {getRedirectPath} from '../utils/util';
const ERROR_MSG = 'ERROR_MSG';
const LOGOUT = 'LOGOUT';
const AUTH_SUCCESS = "AUTH_SUCCESS";
const CLEAR_MSG = 'CLEAR_MSG';
const LOAD_DATA ='LOAD_DATA';

const initState = {
    msg: '',
    user: '',
    team: '',
    redirectTo: ''
};

function errorMsg(msg) {
    return {msg, type: ERROR_MSG};
}

function authSuccess(data) {
    return {type: AUTH_SUCCESS, payload: data};
}

export function clearMsg() {
    return {type: CLEAR_MSG};
}

export function loadData(userInfo) {
    return {type: LOAD_DATA, payload: userInfo};
}

export function user(state = initState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {...state, redirectTo: getRedirectPath(action.payload), msg: '', ...action.payload};
        case ERROR_MSG:
            return {...state, msg: action.msg, isAuth: false};
        case CLEAR_MSG:
            return {...state, msg: ''};
        case LOAD_DATA:
            return {...state, ...action.payload};
        case LOGOUT:
            return {...initState, redirectTo: '/login'};
        default:
            return state;
    }
}

export function login({user, pwd}) {
    if(!user || !pwd) return errorMsg("required username and password.");

    return dispatch => {
        axios.post('/user/login', {user, pwd}).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function register({user, pwd, checkPwd, team}) {
    if(!user || !pwd || !checkPwd || !team) return errorMsg("required username and password.");
    if(pwd !== checkPwd) return errorMsg("passwords don't match.");

    return dispatch => {
        axios.post('/user/register', {user, pwd, team}).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess({user, pwd, team}))
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function update(data) {
    return dispatch => {
        axios.post("/user/update", data).then(res => {
            if(res.status === 200 && res.data.code === 0) {
                dispatch(authSuccess(res.data.data));
            } else {
                dispatch(errorMsg(res.data.msg));
            }
        })
    }
}

export function logoutSubmit() {
    return {type: LOGOUT};
}



