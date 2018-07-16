import React from 'react';
import { NavBar, WhiteSpace} from 'antd-mobile';
import { Icon } from 'antd';

export default class OneCourseRanking extends React.Component{
    render(){
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={()=>this.props.toMatchDetails()}    //返回轮次页
                >{this.props.courseId[1]}排名
                </NavBar>
                <WhiteSpace size='xl' />
                <h1>赛事名称：{this.props.match.name}</h1>
                <h1>赛事ID：{this.props.match.id}</h1>
                <h1>轮次ID：{this.props.courseId[0]}</h1>
                <button onClick={()=>this.props.showPage('OneCourseResult')} >到结果</button>

            </div>
        );
    }
}