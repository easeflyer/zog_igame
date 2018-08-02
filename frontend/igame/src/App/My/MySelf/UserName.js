import React from 'react';
import { NavBar, Icon } from 'antd-mobile';

class UserName extends React.Component {
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.toMySelf()}
                >姓名
            </NavBar>
            </div>
        )
    }
}
export default UserName;