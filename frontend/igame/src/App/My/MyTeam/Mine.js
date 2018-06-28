import React from 'react';
import { NavBar, List, WhiteSpace } from 'antd-mobile';
import { Icon } from 'antd';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？

export default class TeamMine extends React.Component {       //我的比赛分类列表页组件，可以考虑分离出去
    render() {
        const TeamListData = [
            {id:1,  mactchName:'1号种子队', num:'10'},
            {id:2,  mactchName:'2号种子队', num:'4'},
            {id:2,  mactchName:'2号种子队', num:'8'}
        ];
        const TeamList = (<div>
            {TeamListData.map((item, index) => {
                return (
                    <List.Item key={index}    //?这里应该用id还是索引做key
                    extra={item.num}
                    arrow="horizontal" 
                    onClick={() => {}}
                    >{item.mactchName}</List.Item>
                );
            })}
        </div>);
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.props.toMine}
                >我的赛队
                </NavBar>
                <WhiteSpace size='xl' />
                <TeamList />
            </div>
        );
    }
}
