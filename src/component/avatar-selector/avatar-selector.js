import React from 'react';
import {Grid, List} from "antd-mobile";
import PropTypes from 'prop-types';

class AvatarSelector extends React.Component {
    static propTypes = {
        selectAvatar: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render() {
        const avatarList = [];
        for(let i = 1; i <= 20; i++) {
            avatarList.push({icon: require(`../images/头像${i}.png`), text: `头像${i}.png`});
        }

        const gridHeader = this.state.avatar
                            ? (
                                <div>
                                    <span>已选择头像</span>
                                    <img src={this.state.avatar.icon} alt="header" style={{width:20}}/>
                                </div>
                              )
                            : <div>请选择头像</div>

        return (
            <div>
                <List renderHeader={gridHeader}>
                    <Grid
                        data={avatarList}
                        columnNum={5}
                        onClick={avatar => {
                            this.props.selectAvatar(avatar.text);
                            this.setState({avatar})
                        }}
                    ></Grid>
                </List>

            </div>
        )
    }
}

export default AvatarSelector;