import React from 'react';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
// import MatchMine from './Mine';
// import CompletedMatch from './Completed/Index';
// import UpcomingMatch from './Upcoming/Index';

export default class MyTeam extends React.Component {
    state = {
        teamPageState:0,       // 0：默认页(Team列表)，  1：创建队伍页， 2：队伍详情页
    }
    toTeamMine = ()=>{         //返回我的赛队列表页
        this.setState({
            teamPageState:0,
        })
    }
    toAddTeam = ()=>{        //进入创建赛队页
        this.setState({
            teamPageState:1,
        })
    }
    toTeamDetails = ()=>{        //进入我的赛队详情页
        this.setState({
            teamPageState:2,
        })
    }
    render() {
        let page = null;
        switch (this.state.teamPageState) {
            case 0:
                page = <TeamMine 
                    toMine={this.props.toMine}               //回到‘我’页面
                    toAddTeam={this.toAddTeam}               //创建赛队
                    toTeamDetails={this.toTeamDetails} />;   //我的赛队详情
                break;
            case 1:
                page = <TeamAdd toTeamMine={this.toTeamMine}  />;   //创建赛队页
                break;
            case 2:
                page = <TeamDetailes toTeamMine={this.toTeamMine} />;   //赛队详情页
                break;
            default:
                
                break;
        }
        return(
            <div>
                {page}
            </div>
        );
    }
}
