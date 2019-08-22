import React from 'react';
import io from 'socket.io-client';
import {List, InputItem, NavBar} from "antd-mobile";
import {connect} from 'react-redux';
import {getMsgList, sendMsg, recvMsg, readMsg} from "../../redux/chat.redux";
import Icon from "antd-mobile/es/icon";
import {getChatId} from "../../utils/util";



class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            msg:[]
        };
    }

    componentDidMount() {
        if(!this.props.chat.chatMsg.length) {
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    componentWillUnmount() {
        const toId = this.props.match.params.userId;
        this.props.readMsg(toId);
    }

    handleSend () {
        const fromId = this.props.user._id;
        const toId = this.props.match.params.userId;
        const msg = this.state.text;
        console.log(fromId, toId, msg);
        this.props.sendMsg({fromId, toId, msg});
        // socket.emit('sending', {text: this.state.text});
        this.setState({text: ''});
    }

    render() {
        const userId = this.props.match.params.userId;
        const Item = List.Item;
        const users = this.props.chat.users;
        const chatId = getChatId(userId, this.props.user._id);
        const chatMsgs = this.props.chat.chatMsg.filter(msg => msg.chatId === chatId);
        if(!users[userId]) return null;
        return (
            <div id="chat-page">
                <NavBar
                    mode='dark'
                    style={{zIndex:10}}
                    icon={<Icon type='left'/>}
                    onClick={() => {
                        this.props.history.goBack();
                    }}
                >
                    {users[userId].name}
                </NavBar>
                <List style={{marginTop:45}}>
                    {chatMsgs.map(chat => {
                        const avatar = require(`../images/${users[chat.fromId].avatar}`);
                        return chat.fromId === userId ? (
                            <Item
                                key={chat._id}
                                thumb={avatar}
                            >{chat.content}</Item>
                        ) : (
                            <Item
                                key={chat._id}
                                className='chat-me'
                                extra={<img src={avatar} alt="avatar"/>}
                            >{chat.content}</Item>
                        )
                    })}
                </List>

                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="Input"
                            value={this.state.text}
                            onChange={v => this.setState({text: v})}
                            extra={<span onClick={() => this.handleSend()}>send</span>}
                        >Text</InputItem>
                    </List>
                </div>
            </div>

        );
    }
}

Chat = connect(state => state, {getMsgList, sendMsg, recvMsg, readMsg})(Chat);
export default Chat;