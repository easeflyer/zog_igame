import React from 'react';
import {List} from 'antd-mobile'
import { SearchBar} from 'antd-mobile'
import EventNavBar from './Common/EventNavBar'

export default class Event extends React.Component{  

    handlerClick=(key)=>{
        this.props.handlerDetail(key);
    }

    handlerSearch(value){
        this.props.handlerSearch(value);
    }

    render(){
        let items = [];
		
		if(this.props.list.length == 0) {
		    items.push(<p key={0}  style={{textAlign:'center',fontSize:14,padding:15}} >暂无比赛</p>);
		}else {
		    this.props.list.forEach(item => {
			    items.push(
                    <List.Item 
                        key={item.key} 
                        style={{margin:'5px 0'}}
                        arrow="horizontal" 
                        onClick={key => this.handlerClick(item.key)}
                        >
                        <span style={{marginRight:5}}>{item.info.eventName}</span>
                    </List.Item>
                );
		    });
		}
        
        return (
            <div>  
                <EventNavBar  left="" eventName="比赛列表" />
                <SearchBar
                ref='eventSearchBar'
                placeholder="Search"
                onSubmit={value => this.handlerSearch(value)}
                onChange={value => this.handlerSearch(value)}
                />
                <List>{items}</List>
            </div>
        );
    }
}