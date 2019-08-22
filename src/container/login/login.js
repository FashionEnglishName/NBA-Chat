import React from 'react';
import Logo from '../../component/logo/logo';
import { Button, WhiteSpace, WingBlank, InputItem, Flex } from "antd-mobile";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {clearMsg, login} from '../../redux/user.redux';
import handleChangeWrap from '../../component/handleChangeWrap/handleChangeWrap';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.register = this.register.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }

    // jump to register page
    register() {
        this.props.clearMsg();
        this.props.history.push('/register');
    }



    handleLogin() {
        this.props.login(this.props.state);
    }

    render() {
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
                        type="password"
                    >password</InputItem>
                </WingBlank>
                <WhiteSpace size="xl"/>
                <WhiteSpace size="xl"/>
                <WingBlank>
                    <Flex>
                        <Flex.Item>
                            <Button
                                type="primary"
                                onClick={this.handleLogin}
                            >sign in</Button>
                        </Flex.Item>
                        <Flex.Item>
                            <Button onClick={this.register} type="primary">sign up</Button>
                        </Flex.Item>
                    </Flex>
                </WingBlank>
            </div>
        );
    }
}

const mapStateToProps = function(state) {
    return state.user;
};
Login = handleChangeWrap(Login);
const mapActionCreatorsToProps = { login, clearMsg };
Login = connect(mapStateToProps, mapActionCreatorsToProps)(Login);
export default Login;