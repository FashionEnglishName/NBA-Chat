import React from 'react';
import {connect} from 'react-redux';
import {NavBar} from "antd-mobile";
import {Switch, Route, Redirect } from 'react-router-dom';
import NavLinkBar from "../../component/navLink/navLink";
import Warriors from "../warriors/warriors";
import Raptors from "../raptors/raptors";
import Personal from "../personal/personal";
import {getMsgList, sendMsg, recvMsg} from "../../redux/chat.redux";
import Message from "../message/message";

class Dashboard extends React.Component {
    componentDidMount() {
        if(this.props.chat.chatMsg.length === 0) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }

    render () {
        const user = this.props.user;
        console.log("user",user)
        const {pathname} = this.props.location;
        if(!user.user) return (
            <Redirect to='/login' />
        )

        const navList = [
            {
                path: '/warriors',
                icon: 'team',
                title: 'warriors',
                component: Warriors,
                hide: user.team === 'warriors'
            },
            {
                path: '/raptors',
                icon: 'team',
                title: 'raptors',
                component: Raptors,
                hide: user.team === 'raptors'
            },
            {
                path: '/msg',
                icon: 'message',
                title: 'message',
                component: Message,
            },
            {
                path: '/me',
                icon: 'personal',
                title: 'personal',
                component: Personal,
            }
        ];
        console.log('navList', navList);
        return (
            <div>
                <NavBar
                    mode='dark'
                >{navList.find(v=>v.path === pathname).title}</NavBar>
                <div style={{marginTop: 45}}>
                    <Switch>
                        {navList.map(v => (
                            <Route key={v.path} path={v.path} component={v.component}></Route>
                        ))}
                    </Switch>
                </div>
                <NavLinkBar data={navList}></NavLinkBar>

            </div>
        )
    }
}

const mapState = function (state) {
    return state
};
Dashboard = connect(mapState, {getMsgList, recvMsg})(Dashboard);
export default Dashboard;