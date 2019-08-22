import React from 'react';
import PropTypes from "prop-types";
import { TabBar } from "antd-mobile";
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';

class NavLinkBar extends React.Component {
    static propTypes = {
        data: PropTypes.array.isRequired
    };

    render() {
        const navList = this.props.data;
        const {pathname} = this.props.location;
        return (
            <TabBar>
                {
                    navList.filter(v => !v.hide).map(v=> {
                        return (
                            <TabBar.Item
                                badge={v.path === '/msg' ? this.props.unread : 0}
                                key={v.title}
                                title={v.title}
                                icon={{uri: require(`./images/${v.icon}.png`)}}
                                selectedIcon={{uri: require(`./images/${v.icon}-selected.png`)}}
                                selected={pathname===v.path}
                                onPress={() => {
                                    this.props.history.push(v.path);
                                }}
                            ></TabBar.Item>
                        )
                    })
                }
            </TabBar>
        )
    }
}
NavLinkBar = withRouter(NavLinkBar);
NavLinkBar = connect(state => state.chat)(NavLinkBar);
export default NavLinkBar;