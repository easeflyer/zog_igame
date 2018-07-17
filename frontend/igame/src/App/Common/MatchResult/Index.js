import React from 'react';
import OneCourseResult from './OneCourseResult';
import OneCourseRanking from './OneCourseRanking';
import RankingByScores from './Ranking-scores';
import Datum from './Datum';
import RankingByTeamNumber from './Ranking-teamNumber';
import OneBoard from './OneBoard';
import OneTable from './OneTable';
import OneTeam from './OneTeam';

export default class MatchResult extends React.Component{
    state={
        // match:this.props.match,     //????????
        show:'OneCourseResult',
    }
    showPage=(index)=>{
        this.setState({
            show:index,
        })
    }

    render() {
        let page = null;
        switch (this.state.show) {
            case 'OneCourseResult':             //一轮比赛的对阵结果
                page=<OneCourseResult 
                    showPage={this.showPage}
                    toMatchDetails={this.props.toMatchDetails} 
                    // match={this.state.match}        //??????????
                    match={this.props.match}        
                    courseId={this.props.courseId}
                />
                break;
            case 'OneCourseRanking':            //一轮比赛的排名
                page=<OneCourseRanking
                    showPage={this.showPage}
                    toMatchDetails={this.props.toMatchDetails} 
                    match={this.props.match}        
                    courseId={this.props.courseId}
                />
                break;
            case 'Ranking_scores':              //成绩表(按名次)
                page=<RankingByScores
                    showPage={this.showPage}
                    match={this.props.match}        
                    courseId={this.props.courseId}
                />
                break;
            case 'Datum':                       //Datum
                page=<Datum
                    showPage={this.showPage}
                    match={this.props.match}        
                    courseId={this.props.courseId}
                />
                break;
            case 'Ranking_teamNumber':          //成绩表(按赛队序号)
                page=<RankingByTeamNumber
                    showPage={this.showPage}
                    match={this.props.match}        
                    courseId={this.props.courseId}
                />
                break;
            case 'OneBoard':                    //一副牌的结果
                page=<OneBoard
                    showPage={this.showPage}
                    match={this.props.match}        
                    courseId={this.props.courseId}
                />
                break;
            case 'OneTable':                    //一桌牌的结果
                page=<OneTable
                    showPage={this.showPage}
                    match={this.props.match}        
                    courseId={this.props.courseId}
                />
                break;
            case 'OneTeam':                    //一个队伍的成绩
                page=<OneTeam
                    showPage={this.showPage}
                    match={this.props.match}        
                    courseId={this.props.courseId}
                />
                break;
            default:
                break;
        }
        return(
            // <div>
            //     <NavBar
            //     mode="light"
            //     icon={<Icon type="left" />}
            //     onLeftClick={()=>this.props.toMatchDetails()}    //返回轮次页
            //     >{this.props.courseId[1]}成绩
            //     </NavBar>
            //     <WhiteSpace size='xl' />
            //     <h1>赛事名称：{this.props.match.name}</h1>
            //     <h1>赛事ID：{this.props.match.id}</h1>
            //     <h1>轮次ID：{this.props.courseId[0]}</h1>

            // </div>
            <div>{page}</div>
        );
    }
}