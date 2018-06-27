import React from 'react'
import { WingBlank, Button, } from 'antd-mobile';
import {   Row, Col } from 'antd';
import EventNavBar from './Common/EventNavBar'

export default class EventDetails extends React.Component{
    state={
        eventDetail:this.props.list[0],//要查看赛事的全部信息
    }

// 回到列表页 ★
    backSpace=()=>{
        this.props.backToList();
    }

// 转至报名页 ★
    handlerSign=()=>{
        this.props.signMatch();
    }

    render(){
        return(
            <WingBlank>              
                <EventNavBar left="left" eventName={this.state.eventDetail.name} clickArrow={this.backSpace}/>
                {/*<img src={listItemDetails.thumb} style={{display:'block', margin:'0 auto', marginBottom:15, width:'100%'}}/>*/}
                <p style={{fontSize:20}}>{this.state.eventDetail.name}</p>
                <Row>
                    <Col span={8}><p>比赛时间：</p></Col>
                    <Col span={16}><p>{this.state.eventDetail.eventTime}</p></Col>
                </Row>
                <Row>
                    <Col span={8}><p>主办单位：</p></Col>
                    <Col span={16}><p>{this.state.eventDetail.organizer}</p></Col>
                </Row>
                <Row>
                    <Col span={8}><p>赞助单位：</p></Col>
                    <Col span={16}><p>{this.state.eventDetail.sponsors}</p></Col>
                </Row>
                <Row>
                    <Col span={8}><p>裁判：</p></Col>
                    <Col span={16}><p>{this.state.eventDetail.referee}</p></Col>
                </Row>
                <Row>
                    <Col span={8}><p>仲裁：</p></Col>
                    <Col span={16}><p>{this.state.eventDetail.arbitration}</p></Col>
                </Row>
                <Row>
                    <Col span={8}><p>报名时间：</p></Col>
                    <Col span={16}><p>{this.state.eventDetail.signingTime}</p></Col>
                </Row>
                <Button type="primary" size="small" onClick={this.handlerSign} >我要报名</Button>
            </WingBlank>
        )
    }
}