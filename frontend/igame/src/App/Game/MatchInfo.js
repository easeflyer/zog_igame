import React from 'react'
import { Row, Col, Input } from 'antd';


export default class MatchInfo extends React.Component{
    state={
        scoreSN:this.props.scoreSN,
        scoreEW:this.props.scoreEW,
        piersSN:this.props.piersSN,
        piersEW:this.props.piersEW,
        declarer:this.props.declarer,
        contract:this.props.contract,
        claimCount:0,
        claim:this.props.claim,
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
                            <Col span={12}>{this.state.scoreSN}</Col>
                        </Row>
                        <Row style={{background:'#B0E0E6'}}>
                            <Col span={12}>EW:</Col>
                            <Col span={12}>{this.state.scoreEW}</Col>
                        </Row>
                    </Col>
                    <Col span={6} style={{height:65,margin:5}}>
                        <div style={{position:'absolute',width:20,height:65,border:'1px solid #fff',background:'#20B2AA',zIndex:1}}>{this.state.piersSN}</div>
                        <div style={{position:'absolute',bottom:0,width:60,height:20,paddingRight:5,border:'1px solid #fff',background:'#20B2AA',textAlign:'right'}}>{this.state.piersEW}</div>
                        <div style={{position:'absolute',right:30,width:35,height:40,padding:'0 5px',borderRadius:3,background:'#B0E0E6',textAlign:'center'}}>{this.state.declarer?this.re_transfer(this.state.contract,1,0,false):null}{`\n`}{this.state.declarer?this.state.declarer:null}</div>
                    </Col>
                    <Col span={6}>
                        <Row><span>Claim:</span></Row>
                        <Row><Input value={this.state.claimCount} onChange={(e)=>this.setState({claimCount:e.target.value})} onPressEnter={(e)=>this.postMsg('claim'+this.state.claimCount)} disabled={this.state.claim}></Input></Row>
                    </Col>
                </Row>
            </div>
        )
    }
}