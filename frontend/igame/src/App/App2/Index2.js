import React from 'react';

import EventList from './EventList'
import EventDetails from './EventDetails'
import SignEvent from './SignEvent'

export default class ListApp extends React.Component{
    
    state={
        originList :  null, //暂存请求到的赛事列表数据
        originTeams :null, //暂存请求到的赛队列表数据
        originFriends: null,//暂存请求到的好友列表数据
        open: 1, //1: list, 2: detail, 3: sign
        eventId: null, //赛事ID，根据此参数展示相应的详情信息
    }

// 获取赛事列表信息，以便传入其他子组件 ★
    stateList=(list)=>{
        this.setState({
            originList:list
        });
    }

// 获取赛队列表信息
    stateTeams=(teams)=>{
        this.setState({
            originTeams:teams,
        });
    }

// 获取好友列表信息
    stateFriends=(friends)=>{
        this.setState({
            originFriends:friends,
        });
    }

// 回到列表页 ★
    backToList=()=>{
        this.setState({
            open:1,
        });
    }

// 根据赛事ID，转至详情页，展示相应的赛事详情 ★
    handlerDetail=(key)=>{
        this.setState({
            open: 2,
            eventId: key
        });
    }

// 回到详情页 ★
    backToDetail=()=>{
        this.setState({
            open:2
        });
    }

// 转到报名页 ★
    signMatch=()=>{
        this.setState({
            open:3
        });
    }

    render(){
        return(
            <div>  
                { this.state.open === 1 ? <EventList initialize={this.state.initialize} originList={this.state.originList} stateList={this.stateList}  handlerDetail={this.handlerDetail} /> : null}                
                { this.state.open === 2 ? <EventDetails list={this.state.originList.filter(item => { return item.id === this.state.eventId })}  backToList={this.backToList} signMatch={this.signMatch} /> : null}
                { this.state.open === 3 ? <SignEvent list={this.state.originList.filter(item => { return item.id === this.state.eventId })} stateTeams={this.stateTeams} stateFriends={this.stateFriends} backToDetail={this.backToDetail} stateTeams={this.stateTeams}/> : null}
            </div>
        )
    }
}