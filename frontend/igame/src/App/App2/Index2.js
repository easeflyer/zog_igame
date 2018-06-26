import React from 'react';

import EventList from './EventList'
import List from './Model/DealList'
import EventDetails from './EventDetails'
import SignEvent from './SignEvent'
import {DealList, DealSign} from './Model/Deal'

export default class ListApp extends React.Component{

    state={
        list : null,
        open: 1, //1: list, 2: detail, 3: sign
        listPage: 0
    }

    componentWillMount(){
        // 请求赛事列表
        // const eventList = new DealList();
        // let listData = eventList.eventList();
         
        // if(listData){
            // this.setState({
            //     list:listData
            // })
        // }else{
        //     this.setState({
        //         list:null
        //     })
        // }
        this.setState({
            list:new List()
        })
    }

    handlerSearch=(word)=>{
        this.setState({
            list: this.state.list.searchlist(word)
        });
    }

    handlerDetail=(key)=>{
        this.setState({
            open: 2,
            listPage: key
        });
    }
    
    backToList=()=>{
        this.setState({
            list: this.state.list.searchlist(''),
            open:1
        });
    }
    
    backToDetail=()=>{
        this.setState({
            open:2
        });
    }

    signMatch=()=>{
        this.setState({
            open:3
        });
    }


    render(){
        return(
            <div>  
                { this.state.open == 1 ? <EventList list={this.state.list.list}  handlerDetail={this.handlerDetail} handlerSearch={this.handlerSearch}/> : null}                
                { this.state.open == 2 ? <EventDetails list={this.state.list.list} page={this.state.listPage} backToList={this.backToList} signMatch={this.signMatch} /> : null}
                { this.state.open == 3 ? <SignEvent list={this.state.list.list} page={this.state.listPage} backToDetail={this.backToDetail} submitExistTeamForm={this.submitExistTeamForm} submitNewTeamForm={this.submitNewTeamForm}/> : null}
            </div>
        )
    }
}