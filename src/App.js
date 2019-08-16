import React from 'react';
import { connect } from 'react-redux';
import { addGun, removeGun, addGunAsync } from "./index.redux";

// 组件不宜与外界有强耦合关系，所以此处不适合引入addGun, 应该在index.js中引入，再通过props传过来

class App extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        return (
            <div>
                <h1>现在有机枪{this.props.num}把</h1>
                <button onClick={this.props.addGun}>申请武器</button>
                <button onClick={this.props.removeGun}>上交武器</button>
                <button onClick={this.props.addGunAsync}>拖两天再给</button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {num: state};
};
const mapActionCreatorToProps = { addGun, removeGun, addGunAsync };

App = connect(mapStateToProps, mapActionCreatorToProps)(App);
export default App;