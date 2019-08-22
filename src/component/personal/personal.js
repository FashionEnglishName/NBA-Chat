import React from 'react';
import {connect} from 'react-redux';
import {Result, List, WhiteSpace, Button, WingBlank, Modal} from "antd-mobile";
import browserCookies from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom';

class Personal extends React.Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout() {
        const alert = Modal.alert;
        alert("Log Out", "Are you sure to log out?", [
            {text: "cancel"},
            {text: "logout", onPress: () => {
                browserCookies.erase('userId');
                this.props.logoutSubmit();
            }}
        ])
    }

    render() {
        const Item = List.Item;
        return this.props.user ? (
            <div>
                <Result
                    img={<img src={require(`../images/${this.props.avatar}`)}/>}
                    title={this.props.user}
                    message={this.props.team}
                ></Result>

                <List renderHeader={() => "Description"}>
                    <Item>
                        {this.props.desc.split('\n').map(v=><p key={v}>{v}</p>)}
                    </Item>
                </List>

                <WhiteSpace size="lg" />

                <WingBlank>
                    <Button type='warning' onClick={this.logout}>log out</Button>
                </WingBlank>

            </div>
        ) : <Redirect to={this.props.redirectTo} />
    }
}

Personal = connect(state => state.user, {logoutSubmit})(Personal);
export default Personal;