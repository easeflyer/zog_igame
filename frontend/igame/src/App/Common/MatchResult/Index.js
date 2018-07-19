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
        courseId:this.props.courseId,
        tableNumber:null,
        boardId:null,
        team:null,
    }
    setCourseId=(index)=>{
        this.setState({
            courseId:index,
        })
    }
    setTableNumber=(index)=>{
        this.setState({
            tableNumber:index,
        })
    }
    setBoardId=(index)=>{
        this.setState({
            boardId:index,
        })
    }
    setTeam=(index)=>{
        this.setState({
            team:index,
        })
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
                    match={this.props.match}                //当前比赛
                    courseId={this.state.courseId}          //当前轮次ID
                    setCourseId={this.setCourseId}          //设置轮次ID
                    setTableNumber={this.setTableNumber}    //设置桌号
                    setBoardId={this.setBoardId}            //设置牌的ID
                    setTeam={this.setTeam}              //设置队伍ID
                />
                break;
            case 'OneCourseRanking':            //一轮比赛的排名
                page=<OneCourseRanking
                    showPage={this.showPage}
                    toMatchDetails={this.props.toMatchDetails} 
                    match={this.props.match}        
                    courseId={this.state.courseId}
                />
                break;
            case 'Ranking_scores':              //成绩表(按名次)
                page=<RankingByScores
                    showPage={this.showPage}
                    match={this.props.match}        
                    courseId={this.state.courseId}
                />
                break;
            case 'Datum':                       //Datum
                page=<Datum
                    showPage={this.showPage}
                    match={this.props.match}        
                    courseId={this.state.courseId}
                />
                break;
            case 'Ranking_teamNumber':          //成绩表(按赛队序号)
                page=<RankingByTeamNumber
                    showPage={this.showPage}
                    match={this.props.match}        
                    courseId={this.state.courseId}
                />
                break;
            case 'OneBoard':                    //一副牌的结果
                page=<OneBoard
                    showPage={this.showPage}
                    match={this.props.match}        
                    courseId={this.state.courseId}
                    boardId={this.state.boardId}
                />
                break;
            case 'OneTable':                    //一桌牌的结果
                page=<OneTable
                    showPage={this.showPage}
                    match={this.props.match}        
                    courseId={this.state.courseId}
                    tableNumber={this.state.tableNumber}
                />
                break;
            case 'OneTeam':                    //一个队伍的成绩
                page=<OneTeam
                    showPage={this.showPage}
                    match={this.props.match}        
                    courseId={this.state.courseId}
                    team={this.state.team}
                />
                break;
            default:
                break;
        }
        return(
            <div>{page}</div>
        );
    }
}