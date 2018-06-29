import React from 'react';
import { NavBar, List, WhiteSpace } from 'antd-mobile';
import { Icon } from 'antd';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？

const Item = List.Item;
export default class MatchMine extends React.Component {       //我的比赛分类列表页组件，可以考虑分离出去
    render() {
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.props.toMine}
                >我的比赛
                </NavBar>
                <WhiteSpace size='xl' />
                <Item extra="" arrow="horizontal" onClick={() => this.props.toUpcomingMatch()}>即将开始的比赛</Item>
                <Item extra="" arrow="horizontal" onClick={() => this.props.toCompletedMatch()}>已经完成的比赛</Item>
            </div>
        );
    }
}