import React from 'react';
import { NavBar, Icon } from 'antd-mobile';


class BankCard extends React.Component {
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.toMySelf()}
                >银行卡
            </NavBar>
            </div>
        )
    }
}
export default BankCard;