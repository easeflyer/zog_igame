import React from 'react';
import { SearchBar} from 'antd-mobile'
import EventList from './EventList'
import List from './DealList'

export default class ListApp extends React.Component{
    constructor(){
	    super();
		this.state = {
		    list : new List()
		};
    }

    handlerSearch=(word)=>{
        this.setState({
            list: this.state.list.searchlist(word)
        });
    }

    render(){
        return(
            <div>
                <h2 style={{textAlign:'center'}}>比赛列表</h2>
                <SearchBar
                placeholder="Search"
                onSubmit={value => this.handlerSearch(value)}
                onChange={value => this.handlerSearch(value)}
                />
                <EventList list={this.state.list.list}/>
            </div>
        )
    }
}