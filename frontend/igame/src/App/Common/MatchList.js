import React from 'react';
import { NavBar, List, WhiteSpace} from 'antd-mobile';
import { Icon } from 'antd';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？


export default class MatchList extends React.Component {    //已完成的比赛
    render() {
        const MatchList = (<div>
            {this.props.matchList.map((item, index) => {
                return (
                    <List.Item key={index}    //?这里应该用id还是索引做key
                    extra={item.datetime}
                    arrow="horizontal" 
                    onClick={() => this.props.toMatchDetails(index)}
                    >{item.name}</List.Item>
                );
            })}
        </div>);
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.props.toSortList}    //返回我的比赛分类页
                >{this.props.title}
                </NavBar>
                <WhiteSpace size='xl' />
                {MatchList}
            </div>
        );
    }
}