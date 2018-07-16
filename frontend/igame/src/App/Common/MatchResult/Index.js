import React from 'react';
import { NavBar, WhiteSpace} from 'antd-mobile';
import { Icon } from 'antd';
import OneCourseResult from './OneCourseResult';
import OneCourseRanking from './OneCourseRanking';

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
            case 'OneCourseResult':
                page=<OneCourseResult 
                    showPage={this.showPage}
                    toMatchDetails={this.props.toMatchDetails} 
                    // match={this.state.match}        //??????????
                    match={this.props.match}        
                    courseId={this.props.courseId}
                />
                break;
            case 'OneCourseRanking':
                page=<OneCourseRanking
                    showPage={this.showPage}
                    toMatchDetails={this.props.toMatchDetails} 
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