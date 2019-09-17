import React from 'react';
import {connect} from 'react-redux';
import {List, Badge} from "antd-mobile";
import {chat} from "../../redux/chat.redux";

class Message extends React.Component {
    render() {
        const msgGroup = {};
        this.props.chat.chatMsg.forEach(msg => {
            msgGroup[msg.chatId] = msgGroup[msg.chatId] || [];
            msgGroup[msg.chatId].push(msg);
        });

        let chatList = Object.values(msgGroup).sort(function (a, b) {
            return a[a.length - 1].createdAt < b[b.length - 1].createdAt ? 1 : -1;
        });

        const userId = this.props.user._id;

        const Item = List.Item;
        const Brief = Item.Brief;
        return (
            <div>

                {chatList.map(chat => {
                    const length = chat.length - 1;
                    const targetId = userId === chat[0].fromId ? chat[0].toId : chat[0].fromId;
                    const unRead = chat.filter(c => !c.read && c.toId === userId);
                    return (
                        <List key={chat[0]._id}>
                            <Item
                                key={chat[0]._id}
                                thumb={require(`../images/${this.props.chat.users[targetId].avatar}`)}
                                extra={<Badge text={unRead.length}></Badge>}
                                arrow='horizontal'
                                onClick={() => {
                                    this.props.history.push(`/chat/${targetId}`)
                                }}
                            >
                                {chat[length].content}
                                <Brief>{this.props.chat.users[targetId].name}</Brief>
                            </Item>
                        </List>
                    )
                })}

            </div>
        )
    }
}

Message = connect(state => state)(Message);
export default Message;