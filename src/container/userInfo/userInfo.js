import React from 'react';
import {NavBar, WingBlank, TextareaItem, WhiteSpace, Button} from "antd-mobile";
import AvatarSelector from "../../component/avatar-selector/avatar-selector";
import {connect} from 'react-redux';
import {update} from "../../redux/user.redux";
import {Redirect} from 'react-router-dom';

class UserInfo extends React.Component{
    constructor(props) {
        super(props);
        this.selectAvatar = this.selectAvatar.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            avatar: ''
        };
    }

    selectAvatar(avatar) {
        this.setState({avatar: avatar});
    }

    handleChange(key, val) {
        this.setState({[key]: val});
    }

    render() {
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo}></Redirect> : null}
                <NavBar mode="dark">User Info</NavBar>
                <WingBlank style={{marginTop:45}}>
                    <AvatarSelector
                        selectAvatar={this.selectAvatar}
                    ></AvatarSelector>
                    <WhiteSpace size="lg" />
                    <TextareaItem
                        title="description:"
                        rows="5"
                        onChange={(v) => this.handleChange('desc', v)}
                    >
                    </TextareaItem>
                    <Button
                        type="primary"
                        onClick={() => this.props.update(this.state)}
                    >
                        Save
                    </Button>
                </WingBlank>
            </div>
        )
    }
}

const mapStateToProps = function (state) {
    return state.user;
};

const mapActionCreatorsToProps = {update};

UserInfo = connect(mapStateToProps, mapActionCreatorsToProps)(UserInfo);
export default UserInfo;