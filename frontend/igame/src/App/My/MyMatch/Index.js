import React from 'react';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import MatchMine from './Mine';
import CompletedMatch from './Completed/Index';
import UpcomingMatch from './Upcoming/Index';

export default class MyMatch extends React.Component {
    state = {
        matchState:0,       // 0：默认页， 1：即将开始的比赛， 2：已经完成的比赛
    }
    toMatchMine = ()=>{         //返回我的比赛分类页方法
        this.setState({
            matchState:0,
        })
    }
    toUpcomingMatch = ()=>{        //进入即将进行的比赛列表页
        this.setState({
            matchState:1,
        })
    }
    toCompletedMatch = ()=>{        //进入已完成的比赛列表页
        this.setState({
            matchState:2,
        })
    }
    render() {
        let page = null;
        switch (this.state.matchState) {
            case 0:
                page = <MatchMine 
                    toMine={this.props.toMine}                     //返回‘我’页面
                    toUpcomingMatch={this.toUpcomingMatch}         //进入即将进行的比赛页
                    toCompletedMatch={this.toCompletedMatch} />;   //进入已完成的比赛也
                break;
            case 1:
                page = <UpcomingMatch toMatchMine={this.toMatchMine}  />;   //即将开始的比赛列表页面
                break;
            case 2:
                page = <CompletedMatch toMatchMine={this.toMatchMine} />;   //已经完成的比赛列表页面
                break;
            default:
                // page = <Match toMine={this.props.toMine} />;
                break;
        }
        return(
            <div>
                {page}
            </div>
        );
    }
}
