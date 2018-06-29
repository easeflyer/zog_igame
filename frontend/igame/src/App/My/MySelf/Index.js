import React from 'react';
import { WhiteSpace, Button, NavBar, List} from 'antd-mobile';
import { Icon } from 'antd';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import session from '../../User/session';

const Item = List.Item;

export default class MySelf extends React.Component {
    loginOut = ()=>{
        this.props.loginOut();
        this.props.toMine();
        session.destroy();
    }
    render() {
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.props.toMine}
                >个人信息
                </NavBar>
                <WhiteSpace size="xl" />
                <List>
                    <Item extra={<img alt='头像' src={require("../../User/963065731.jpg")} style={{width:60}} />}
                    arrow="horizontal" onClick={() => {}}>头像</Item>
                    <Item extra="张三丰" arrow="horizontal" onClick={() => {}}>姓名</Item>
                    <Item extra="13111333311" arrow="horizontal" onClick={() => {}}>绑定手机</Item>
                    <Item extra="" arrow="horizontal" onClick={() => {}}>绑定身份证</Item>
                    <Item extra="" arrow="horizontal" onClick={() => {}}>修改密码</Item>
                    <Item extra="" arrow="horizontal" onClick={() => {}}>我的银行卡</Item>
                    <Item extra="" arrow="horizontal" onClick={() => {}}>我的邮箱</Item>
                    <Item extra="v 1.0.0" arrow="horizontal" onClick={() => {}}>关于智赛桥牌</Item>
                </List>
                <WhiteSpace size='xl' />
                <WhiteSpace size='xl' />
                <WhiteSpace size='xl' />

                <Button type="" size='small'
                style={{width:150,backgroundColor:'#e8e8e8',margin:'auto'}} 
                onClick={()=>this.loginOut()} 
                >退出登录</Button>

            </div>
        );
    }
}