import React from 'react';
import { NavBar, WhiteSpace} from 'antd-mobile';
import { Icon } from 'antd';

export default class OneCourseResult extends React.Component{
    render(){
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={()=>this.props.toMatchDetails()}    //返回轮次页
                >{this.props.courseId[1]}成绩<Icon type="caret-up" /><Icon type="caret-down" />
                </NavBar>
                <WhiteSpace size='xl' />
                <h1>赛事名称：{this.props.match.name}</h1>
                <h1>赛事ID：{this.props.match.id}</h1>
                <h1>轮次ID：{this.props.courseId[0]}</h1>


                <div>赛队得分</div>
                <div><button onClick={()=>this.props.showPage('OneCourseRanking')} >本轮排名</button></div>
                <div><button onClick={()=>this.props.showPage('Ranking_scores')} >排名表(按名次)</button></div>

                {/* <div><button onClick={()=>this.props.showPage('OneCourseRanking')} >排名表(按序号)</button></div> */}
                <div><button onClick={()=>this.props.showPage('Datum')} >Datum</button></div>
                {/* <div><button onClick={()=>this.props.showPage('OneCourseRanking')} >1副牌</button></div>
                <div><button onClick={()=>this.props.showPage('OneCourseRanking')} >一桌牌</button></div>
                <div><button onClick={()=>this.props.showPage('OneCourseRanking')} >一个队结果</button></div> */}

            </div>
        );
    }
}