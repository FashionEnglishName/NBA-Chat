import React from 'react';
import Logo from '../../component/logo/logo';
import {List, Radio, InputItem, WingBlank, WhiteSpace, Button, Flex} from "antd-mobile";
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import {register, clearMsg} from "../../redux/user.redux";
import handleChangeWrap from "../../component/handleChangeWrap/handleChangeWrap";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.state = {
            user: '',
            pwd: '',
            checkPwd: '',
            team: 'warriors',
            msg: ''
        };
    }

    componentDidMount() {
        this.props.handleChange("team", "warriors");
    }

    // jump to login page
    login() {
        this.props.clearMsg();
        this.props.history.push('/login');
    }

    handleRegister() {
        this.props.register(this.props.state);
    }

    render() {
        const RadioItem = Radio.RadioItem;
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
                <Logo></Logo>
                <WingBlank>
                    {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}

                    <InputItem
                        onChange={v => this.props.handleChange('user', v)}
                    >username</InputItem>
                    <WhiteSpace />
                    <InputItem
                        onChange={v => this.props.handleChange('pwd', v)}
                        type='password'
                    >password</InputItem>
                    <WhiteSpace />
                    <InputItem
                        onChange={v => this.props.handleChange('checkPwd', v)}
                        type='password'
                    >recheck</InputItem>
                    <h4>Which team?</h4>
                    <List>
                        <RadioItem
                            checked={ this.props.state.team === "warriors"}
                            onChange={v => this.props.handleChange('team', 'warriors')}
                        >Warriors</RadioItem>
                        <RadioItem
                            checked={this.props.state.team === "raptors"}
                            onChange={v => this.props.handleChange('team', 'raptors')}
                        >Raptors</RadioItem>
                    </List>
                </WingBlank>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WingBlank>
                    <Flex>
                        <Flex.Item>
                            <Button
                                onClick={this.login}
                                type="primary"
                            >sign in</Button>
                        </Flex.Item>
                        <Flex.Item>
                            <Button
                                type="primary"
                                onClick={this.handleRegister}
                            >sign up</Button>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    console.log(state);
    return state.user;
};

Register = handleChangeWrap(Register);
const mapActionCreatorToProps = { register, clearMsg };
Register = connect(mapStateToProps, mapActionCreatorToProps)(Register);
export default Register;