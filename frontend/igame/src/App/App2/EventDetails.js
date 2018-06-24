import React from 'react'
import { WingBlank, Button } from 'antd-mobile';
import EventNavBar from './Common/EventNavBar'

export default class EventDetails extends React.Component{
    backSpace=()=>{
        this.props.backToList();
    }

    handlerSign=()=>{
        this.props.signMatch();
    }
    render(){
        let list=this.props.list;
        let page=this.props.page-1;
        let listItemDetails= list[page].info;
        return(
            <WingBlank>              
                <EventNavBar left="left" eventName={listItemDetails.eventName} clickArrow={this.backSpace}/>
                <img src={listItemDetails.thumb} style={{display:'block', margin:'0 auto', marginBottom:15, width:'100%'}}/>
                <p>{listItemDetails.eventName}</p>
                <p>比赛时间：</p>
                <p style={{marginLeft:30}}>{listItemDetails.eventTime}</p>
                <p>主办单位：</p>
                <p style={{marginLeft:30}}>{listItemDetails.organizer}</p>
                <p>赞助单位：</p>
                <p style={{marginLeft:30}}>{listItemDetails.sponsors}</p>
                <p>裁判：</p>
                <p style={{marginLeft:30}}>{listItemDetails.referee}</p>
                <p>仲裁：</p>
                <p style={{marginLeft:30}}>{listItemDetails.arbitration}</p>
                <p>报名时间：</p>
                <p style={{marginLeft:30}}>{listItemDetails.signingTime}</p>
                <Button type="primary" size="small" onClick={this.handlerSign} disabled={listItemDetails.isSign}>{!listItemDetails.isSign ? '我要报名' : '已报名'}</Button>
            </WingBlank>
        )
    }
}