import React from 'react';
import { Flex, WhiteSpace, InputItem, Toast, Button, NavBar, List, Grid } from 'antd-mobile';
import { Icon } from 'antd';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？

const Item = List.Item;
const Brief = Item.Brief;



export default class My extends React.Component {
    render() {
        const data1 = Array.from(new Array(4)).map((_val, i) => ({
            icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',
            text: `name${i}`,
          }));
        const data = [
            {text: <div><p>大师分</p><p>33333</p></div>,},
            {text: <div><p>智币</p><p>123</p></div>,},
            {text: <div><p>积分</p><p>123</p></div>,},
            {text: <div><p>荣誉</p><p>123</p></div>,},
            // {icon: 'https://gw.alipayobjects.com/zos/rmsportal/nywPmnTAvTmLusPxHPSu.png',text: `name`,},
        ];
        return (
            <div>
                <NavBar
                mode="light"
                onLeftClick={this.props.goHome}
                >个人中心
                </NavBar>
                    <Item
                        multipleLine
                        align="middle" 
                        thumb={require("../User/963065731.jpg")}
                        arrow="horizontal"
                        onClick={() => {}}
                        >张三丰
                        <div>邀请码：12345678</div>
                    </Item>
                    <WhiteSpace size="sm" />
                    <Grid data={data} activeStyle={false} />
                    <WhiteSpace size="sm" />
                    <Item
                        thumb={<Icon type="flag" style={{fontSize:'22px'}} />}   //{require("../User/963065731.jpg")}
                        arrow="horizontal"
                        onClick={() => {}}
                        >我的比赛
                    </Item>
                    <Item
                        thumb={<Icon type='usergroup-add' style={{fontSize:'22px'}} />}
                        arrow="horizontal"
                        onClick={() => {}}
                        >我的赛队
                    </Item>
                    <Item
                        thumb={<Icon type='team' style={{fontSize:'22px'}} />}
                        arrow="horizontal"
                        onClick={() => {}}
                        >我的好友
                    </Item>
                    <Item
                        thumb={<Icon type='heart' style={{fontSize:'22px'}} />}
                        arrow="horizontal"
                        onClick={() => {}}
                        >我的收藏
                    </Item>
                    <WhiteSpace size="xl" />
                    <Item
                        thumb={<Icon type="schedule" style={{fontSize:'22px'}} />}
                        arrow="horizontal"
                        onClick={() => {}}
                        >每日签到
                    </Item>
                    <Item
                        thumb={<Icon type="trophy" style={{fontSize:'22px'}} />}
                        arrow="horizontal"
                        onClick={() => {}}
                        >平台奖励政策
                    </Item>
                   
            </div>
        );
    }
}

