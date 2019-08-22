import React from 'react';
import {Card, WingBlank, WhiteSpace } from "antd-mobile";
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';

class Warriors extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
        this.handleClick = this.handleClick.bind(this);
    }
    componentDidMount() {
        this.props.getUserList('warriors');
    }

    handleClick (v) {
        this.props.history.push("/chat/" + v._id);
    }

    render() {
        const Header = Card.Header;
        const Body = Card.Body;
        return (
            <div>
                <WingBlank>
                    <WhiteSpace size="lg" />
                    {this.props.userList.map(v => (
                        v.avatar ? <Card
                                        key={v._id}
                                        onClick={() => this.handleClick(v)}
                                   >
                            <Header
                                title={v.user}
                                thumb={require(`../images/${v.avatar}`)}
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

Warriors = connect(state=>state.chatuser, {getUserList})(Warriors);
export default Warriors;