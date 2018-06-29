import React from 'react';
import { NavBar, List, WhiteSpace} from 'antd-mobile';
import { Icon } from 'antd';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？


export default class CompletedMatch extends React.Component {    //已完成的比赛
    render() {
        const matchListData = [
            {id:1,  mactchName:'智赛杯桥牌大赛'},
            {id:2,  mactchName:'鸿宏杯桥牌大赛'},
            {id:3,  mactchName:'慧通杯桥牌大赛'}
        ];
        const MatchList = (<div>
            {matchListData.map((item, index) => {
                return (
                    <List.Item key={index}    //?这里应该用id还是索引做key
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
                onLeftClick={this.props.toMatchMine}    //返回我的比赛分类页（选择已完成或即将开始）
                >已经完成的比赛
                </NavBar>
                <WhiteSpace size='xl' />
                {MatchList}
            </div>
        );
    }
}