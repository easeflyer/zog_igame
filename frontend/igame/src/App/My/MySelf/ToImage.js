import React from 'react';
import { NavBar, Icon } from 'antd-mobile';


class Tolmage extends React.Component {
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.toMySelf()}
                >头像
            </NavBar>
            </div>
        )
    }
}
export default Tolmage;