import React from 'react';
import { NavBar, Icon } from 'antd-mobile';


class ToVersion extends React.Component {
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.toMySelf()}
                >版本号
            </NavBar>
            </div>
        )
    }
}
export default ToVersion;