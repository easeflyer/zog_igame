import React from 'react'
import { Row, Col, Input } from 'antd';
import Initial from './Initial'
import Func from './Models/Func'

const DealFunc = new Func()
export default class TopInfo extends React.Component{
    state={
        topInfo:new Initial().topInfo,
        topInfo2:new Initial().topInfo2
    }

    componentWillReceiveProps(newProps){
        if(newProps.topInfo2){
            this.setState({
                topInfo2:newProps.topInfo2,
            })
        }
        if(newProps.topInfo){
            this.setState({
                topInfo:newProps.topInfo,
            })
        }
    }

    render(){
        return(
            <div>
                <Row >
                    <Col span={6} style={{width:70,margin:5,textAlign:'center',border:'1px solid #b0e0e6',borderRadius:3}}>
                        <Row>
                            <Col span={24}>IMPS</Col>
                        </Row>
                        <Row style={{background:'#B0E0E6'}}>
                            <Col span={12}>NS:</Col>
                            <Col span={12}>{this.state.topInfo.scoreSN}</Col>
                        </Row>
                        <Row style={{background:'#B0E0E6'}}>
                            <Col span={12}>EW:</Col>
                            <Col span={12}>{this.state.topInfo.scoreEW}</Col>
                        </Row>
                    </Col>
                    <Col span={6} style={{height:65,margin:5}}>
                        <div style={{position:'absolute',width:20,height:65,border:'1px solid #fff',background:'#20B2AA',zIndex:1}}>{this.state.topInfo.piersSN}</div>
                        <div style={{position:'absolute',bottom:0,width:60,height:20,paddingRight:5,border:'1px solid #fff',background:'#20B2AA',textAlign:'right'}}>{this.state.topInfo.piersEW}</div>
                        <div style={{position:'absolute',right:30,width:35,height:40,padding:'0 5px',borderRadius:3,background:'#B0E0E6',textAlign:'center'}}>{this.state.topInfo2.contract?DealFunc.re_transfer(this.state.topInfo2.contract,1,0,false):null}{`\n`}{this.state.topInfo2.declarer}</div>
                    </Col>
                    <Col span={6}>
                        <Row><span>Claim:</span></Row>
                        <Row><Input value={this.state.topInfo.claimCount} disabled={this.state.topInfo.claim}></Input></Row>
                    </Col>
                </Row>
            </div>
        )
    }
}