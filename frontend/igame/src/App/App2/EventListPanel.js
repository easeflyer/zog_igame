import React from 'react';
import { SearchBar} from 'antd-mobile'
import EventNavBar from './EventNavBar'

export default class EventListPanel extends React.Component{

    handlerSearch(value){
        this.props.handlerSearch(value);
    }
    render(){
        return(
            <div>
                <EventNavBar  left="" eventName="比赛列表" />
                <SearchBar
                ref='eventSearchBar'
                placeholder="Search"
                onSubmit={value => this.handlerSearch(value)}
                onChange={value => this.handlerSearch(value)}
                />
            </div>
        )
    }
}