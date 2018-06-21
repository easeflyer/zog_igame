import React from 'react';

import EventListPanel from './EventListPanel'
import EventList from './EventList'
import List from './DealList'
import EventDetails from './EventDetails'

export default class ListApp extends React.Component{
    constructor(){
	    super();
		this.state = {
            list : new List(),
            openDetail: false,
            listPage: 0
		};
    }

    handlerSearch=(word)=>{
        this.setState({
            list: this.state.list.searchlist(word)
        });
    }

    handlerDetail=(key)=>{
        this.setState({
            openDetail:true,
            listPage: key
        });
    }

    backToList=()=>{
        this.setState({
            openDetail:false
        })
    }

    render(){
        return(
            <div>  
                { !this.state.openDetail ? <EventListPanel handlerSearch={this.handlerSearch}/> : null}
                { !this.state.openDetail ? <EventList list={this.state.list.list} handlerDetail={this.handlerDetail}/> : null}                
                { this.state.openDetail ? <EventDetails list={this.state.list.list} page={this.state.listPage} backToList={this.backToList}/> : null}
            </div>
        )
    }
}