import React from 'react'
import { WingBlank, Button, } from 'antd-mobile';
import {   Row, Col } from 'antd';
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
                <Row>
                    <Col span={8}><p>比赛时间：</p></Col>
                    <Col span={16}><p>{listItemDetails.eventTime}</p></Col>
                </Row>
                <Row>
                    <Col span={8}><p>主办单位：</p></Col>
                    <Col span={16}><p>{listItemDetails.organizer}</p></Col>
                </Row>
                <Row>
                    <Col span={8}><p>赞助单位：</p></Col>
                    <Col span={16}><p>{listItemDetails.sponsors}</p></Col>
                </Row>
                <Row>
                    <Col span={8}><p>裁判：</p></Col>
                    <Col span={16}><p>{listItemDetails.referee}</p></Col>
                </Row>
                <Row>
                    <Col span={8}><p>仲裁：</p></Col>
                    <Col span={16}><p>{listItemDetails.arbitration}</p></Col>
                </Row>
                <Row>
                    <Col span={8}><p>报名时间：</p></Col>
                    <Col span={16}><p>{listItemDetails.signingTime}</p></Col>
                </Row>
                <Button type="primary" size="small" onClick={this.handlerSign} disabled={listItemDetails.isSign}>{!listItemDetails.isSign ? '我要报名' : '已报名'}</Button>
            </WingBlank>
        )
    }
}