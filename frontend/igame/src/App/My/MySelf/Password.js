import React from 'react';
import { NavBar, Icon } from 'antd-mobile';


class Password extends React.Component {
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.toMySelf()}
                >修改密码
            </NavBar>
            </div>
        )
    }
}
export default Password;