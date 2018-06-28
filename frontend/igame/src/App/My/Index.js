import React from 'react';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import Mine from './Mine';
import MySelf from './MySelf/Index';
import MyMatch from './MyMatch/Index';
import MyFriend from './MyFriend/Index';

export default class My extends React.Component {
    state = {
        page:'mine',
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
                toMyMatch={this.toMyMatch} />
                break;
            case 'myself':
                now = <MySelf toMine={this.toMine} />
                break;
            case 'mymatch':
                now = <MyMatch toMine={this.toMine} />
                break;
            case 'myfriend':
                now = <MyFriend toMine={this.toMine} />
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

