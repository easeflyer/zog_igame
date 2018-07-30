import React from 'react';
import { NavBar, Icon } from 'antd-mobile';


class IdCard extends React.Component {
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.toMySelf()}
                >身份证
            </NavBar>
            </div>
        )
    }
}
export default IdCard;