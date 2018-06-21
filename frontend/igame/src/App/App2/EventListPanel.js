import React from 'react';
import { SearchBar} from 'antd-mobile'

export default class EventListPanel extends React.Component{

    handlerSearch(value){
        this.props.handlerSearch(value);
    }
    render(){
        return(
            <div>
                <h2 style={{textAlign:'center'}}>比赛列表</h2>
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