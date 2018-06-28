import React from 'react';
import { NavBar, List, WhiteSpace } from 'antd-mobile';
import { Icon } from 'antd';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？

export default class MyFriend extends React.Component {       //我的比赛分类列表页组件，可以考虑分离出去
    render() {
        const friendListData = [
            {id:1,  name:'张三', age:'30'},
            {id:2,  name:'李四', age:'24'},
            {id:3,  name:'王五', age:'24'},
            {id:4,  name:'刘德华', age:'24'},
            {id:5,  name:'范冰冰', age:'24'},
            {id:8,  name:'王宝强', age:'24'},
            {id:12,  name:'吴彦祖', age:'18'}
        ];
        const FriendList = (<div>
            {friendListData.map((item, index) => {
                return (
                    <List.Item extra="" 
                    arrow="horizontal" 
                    onClick={() => {}}
                    >
                    {item.name}
                    </List.Item>
                );
            })}
        </div>);
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.props.toMine}
                >我的朋友
                </NavBar>
                <WhiteSpace size='xl' />
                <FriendList />
            </div>
        );
    }
}