import React from 'react';
import axios from 'axios';
import {Card, WingBlank, WhiteSpace } from "antd-mobile";
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';

class Team extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        this.props.getUserList(this.props.team);
    }

    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <div>
                <WingBlank>
                    <WhiteSpace size="lg" />
                    {this.props.userList.map(v => (
                        v.avatar ? <Card key={v._id}>
                            <Header
                                title={v.user}
                                thumb={require(`../images/${v.avatar}.png`)}
                            ></Header>
                            <Body>
                                {v.desc.split('\n').map(val => (
                                    <div key={val}>{val}</div>
                                ))}
                            </Body>

                        </Card> : null
                    ))}
                </WingBlank>
            </div>
        );
    }
}

Team = connect(state=>state.chatuser, {getUserList})(Team);
export default Team;