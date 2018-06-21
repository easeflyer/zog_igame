import React from 'react';
import {List} from 'antd-mobile'
import EventDetails from './EventDetails'

export default class Event extends React.Component{  
    state={
        open:false,
        listPage:0
    }

    handlerClick=(key)=>{
        this.setState({
            open:true,
            listPage: key
        });
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
                {!this.state.open? <List>{items}</List> : null}
                { this.state.open ? <EventDetails list={this.props.list} page={this.state.listPage}/> : null}
            </div>
        );
        

    }
}