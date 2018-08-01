import React from 'react';
import { NavBar, Icon } from 'antd-mobile';


class Email extends React.Component {
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.toMySelf()}
                >邮箱
            </NavBar>
            </div>
        )
    }
}
export default Email;