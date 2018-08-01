import React from 'react';
import { NavBar, Icon } from 'antd-mobile';

const Phone = ({ toMySelf }) => {
    return (
        <div>
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => toMySelf()}
            >手机
            </NavBar>
        </div>
    )
}
export default Phone;
