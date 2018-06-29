import React from 'react';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import Mine from './Mine';
import MySelf from './MySelf/Index';
import MyMatch from './MyMatch/Index';
import MyFriend from './MyFriend/Index';
import MyTeam from './MyTeam/Index';

export default class My extends React.Component {
    state = {
        page:'mine',
    }
    toMyTeam = ()=>{
        this.setState({page:'myteam'})
    }
    toMyFriend = ()=>{
        this.setState({page:'myfriend'})
    }
    toMySelf = ()=>{
        this.setState({page:'myself'})
    }
    toMyMatch = ()=>{
        this.setState({page:'mymatch'})
    }
    toMine = ()=>{
        this.setState({page:'mine'})
    }
    render() {
        let now = null;
        switch (this.state.page) {
            case 'mine':
                now = <Mine toMySelf={this.toMySelf} 
                toMyFriend={this.toMyFriend}
                toMyTeam={this.toMyTeam}
                toMyMatch={this.toMyMatch} />
                break;
            case 'myself':
                now = <MySelf toMine={this.toMine}  loginOut={this.props.loginOut} />
                break;
            case 'mymatch':
                now = <MyMatch toMine={this.toMine} />
                break;
            case 'myfriend':
                now = <MyFriend toMine={this.toMine} />
                break;
            case 'myteam':
                now = <MyTeam toMine={this.toMine} />
                break;
            default:
                break;
        }
        return (
            <div>
                {now}
            </div>
        );
    }
}

