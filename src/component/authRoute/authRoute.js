import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadData } from "../../redux/user.redux";

class AuthRoute extends React.Component {
    componentDidMount() {
        const publicList = ['register', 'login'];
        const pathname = this.props.location.pathname;
        if(publicList.indexOf(pathname) > -1) {
            return null;
        }
        // get user data
        axios.get("/user/info").then(res => {
            if(res.status === 200) {
                if(res.data.code === 0) {
                    // able to get data
                    this.props.loadData(res.data.data);
                } else {
                    // no data
                    this.props.history.push('./login');
                }
            }
        })

        // if logged in?
        // if is on login page?

        // warriors of raptors?
        // if has chosen avatar and filled personal description?
    }
    render() {
        return null;
    }
}
AuthRoute = withRouter(AuthRoute);
AuthRoute = connect(null, { loadData })(AuthRoute);
export default AuthRoute;