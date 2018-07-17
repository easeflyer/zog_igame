import React from 'react'
import { Row, Col} from 'antd';
import Board from '../OdooRpc/Board'
import Initial from './Initial'
import Func from './Func'
import Session from '../User/session'

import PlayCard from './PlayCard'
import CallCard from './CallCard'
import Cards from './Cards'

const direct = [ 'N' ,'E','S','W',]
const suitWord = ['S','H','D','C']
const DealFunc = new Func();
export default class PlayerInfo extends React.Component{
    state={
        playerInfo:new Initial().playerInfo,
        myCardsNum:null,
        cards:null,
        deal:false,
        call:false,
        play:false,
        callDirect:null,
        id_msg:this.props.id_msg||null
    }

    componentWillReceiveProps(newProps){
        //初始化牌桌
        if(newProps.init_board){
            this.post('init_board',newProps.id_msg.board_id,newProps.id_msg.channel_id)
        }
    }

    post(method,...data){
        const  board= new Board(this.sucPost,this.failPost); 
        method==='init_board'?board.init_board(...data):null;   //初始化牌桌
        method==='bid'?board.bid(this.state.id_msg.board_id,this.state.playerInfo.myDirect,...data,this.state.id_msg.channel_id):null;    //发送叫牌消息
        method==='call_result'?board.call_result(...data):null;    //查询叫牌结果
        method==='play'?board.play(...data):null;       //发送打牌消息
    } 
    sucPost=(data)=>{
        let s = DealFunc.sucPost(data)
        this.setState({
            cards:s.cards,
            deal:s.deal,
            call:s.call,
            play:s.play,
            myCardsNum:s.myCardsNum,
            callDirect:s.callDirect,
            playerInfo:s.playerInfo
        })
    }
    failPost(){ console.log('fali post') }

    render(){
        return(
            <div>
                {/* 上 */}
                <Row style={{marginBottom:10}}>
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>{this.state.playerInfo.topDirect}</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>{this.state.playerInfo.topName}</Col>
                </Row>
                <Row>
                {/* 左 */}
                    <Col span={2}>
                        <Row style={{height:300,writingMode: 'vertical-lr'}}>
                            <Col span={24} style={{height:60,background:'#0f0'}}>{this.state.playerInfo.leftDirect}</Col>
                            <Col span={24} style={{height:240,background:'#ff0'}}>{this.state.playerInfo.leftName}</Col>
                        </Row>
                    </Col>
                {/* 右 */}
                    {this.state.play?<PlayCard />:<Col span={20}></Col>}
                    {this.state.call?<CallCard post={this.post} callDirect={this.state.callDirect} myDirect={this.state.playerInfo.myDirect}/>:<Col span={20}></Col>}
                    <Col span={2}>
                        <Row style={{height:300,writingMode: 'vertical-lr',float:'right'}}>
                            <Col span={24} style={{height:60,background:'#0f0'}}>{this.state.playerInfo.rightDirect}</Col>
                            <Col span={24} style={{height:240,background:'#ff0'}}>{this.state.playerInfo.rightName}</Col>
                        </Row>
                    </Col>
                </Row>
                {/* 下 */}
                <Row style={{marginTop:10}}>
                    <Cards cards={this.state.myCardsNum===null?null:DealFunc.addColor(this.state.myCardsNum)}></Cards>
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>{this.state.playerInfo.myDirect}</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>{this.state.playerInfo.myName}</Col>
                </Row>
            </div>
        )
    }
}