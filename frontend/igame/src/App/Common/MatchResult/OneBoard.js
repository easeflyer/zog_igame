import React from 'react';
import { NavBar, WhiteSpace} from 'antd-mobile';
import { Icon } from 'antd';

export default class OneBoard extends React.Component{
    render(){
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={()=>this.props.showPage('OneCourseResult')}    //到一轮结果
                >第{this.props.boardId}副牌
                </NavBar>
                <WhiteSpace size='xl' />
                <h1>赛事名称：{this.props.match.name}</h1>
                <h1>赛事ID：{this.props.match.id}</h1>
                <h1>轮次ID：{this.props.courseId[0]}</h1>
                <h1>牌的ID：{this.props.boardId}</h1>

            </div>
        );
    }
}