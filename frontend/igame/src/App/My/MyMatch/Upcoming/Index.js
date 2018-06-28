import React from 'react';
import { NavBar, List, WhiteSpace} from 'antd-mobile';
import { Icon } from 'antd';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？


export default class UpcomingMatch extends React.Component {    //已完成的比赛
    render() {
        const matchListData = [
            {id:1,  mactchName:'2019石家庄桥牌大赛'},
            {id:2,  mactchName:'2019唐山桥牌大赛'},
            {id:2,  mactchName:'未来杯桥牌大赛'},
            {id:2,  mactchName:'愿望杯桥牌大赛'},
            {id:2,  mactchName:'农夫山泉杯桥牌大赛'},
            {id:2,  mactchName:'吉祥杯桥牌大赛'},
            {id:3,  mactchName:'2019世界桥牌大赛'}
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
                >即将开始的比赛
                </NavBar>
                <WhiteSpace size='xl' />
                {MatchList}
            </div>
        );
    }
}