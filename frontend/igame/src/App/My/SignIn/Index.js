import React, { Component } from 'react';
import { NavBar } from 'antd-mobile';
import { Icon } from 'antd';


class SignIn extends Component {
    state = {
        date: new Date(),
    }

    onChange = date => {
        console.log(date, "onchange");
        this.setState({ date })
    }

    formatMonth = (value, type) => {
        console.log(value, type);
        return value.getMonth() + 1 + "月";
    }
    onChange = date => this.setState({ date })
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onClick={() => this.props.toMine()}
                >每日签到
            </NavBar>
                <div>
                    {/* Calendar 组件 注释 文档 */}
                    
                </div>
                );
            </div>
        )
    }
}

export default SignIn;



