import React from 'react';

import EventList from './EventList'
import List from './Model/DealList'
import EventDetails from './EventDetails'
import SignEvent from './SignEvent'

export default class ListApp extends React.Component{

    state={
        list : new List(),
        open: 0, //0: list, 1: detail, 2: sign
        listPage: 0
    }

    handlerSearch=(word)=>{
        this.setState({
            list: this.state.list.searchlist(word)
        });
    }

    handlerDetail=(key)=>{
        this.setState({
            open: 1,
            listPage: key
        });
    }
    
    backToList=()=>{
        this.setState({
            open:0
        });
    }
    
    backToDetail=()=>{
        this.setState({
            open:1
        });
    }

    signMatch=()=>{
        this.setState({
            open:2
        });
    }

    submitExistTeamForm=(formData)=>{
        console.log(formData)
    }

    render(){
        return(
            <div>  
                { this.state.open == 0 ? <EventList list={this.state.list.list}  handlerDetail={this.handlerDetail} handlerSearch={this.handlerSearch}/> : null}                
                { this.state.open == 1 ? <EventDetails list={this.state.list.list} page={this.state.listPage} backToList={this.backToList} signMatch={this.signMatch} /> : null}
                { this.state.open == 2 ? <SignEvent list={this.state.list.list} page={this.state.listPage} backToDetail={this.backToDetail} submitExistTeamForm={this.submitExistTeamForm}/> : null}
            </div>
        )
    }
}