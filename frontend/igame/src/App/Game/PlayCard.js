import React from 'react'
import { Row, Col} from 'antd';
import Initial from './Initial'
import Func from './Models/Func'

export default class PlayCard extends React.Component{
    state={
        playCards:this.props.playCards
    }
    render(){
        return(
            <Col span={this.props.span} style={{}}>
                <Row>
                    <Col span={24} style={{textAlign:'center'}}>
                        <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.playCards.currentCardT?this.state.playCards.currentCardT:null}</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={{textAlign:'left'}}>
                        <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.playCards.currentCardL?this.state.playCards.currentCardL:null}</p>
                    </Col>
                    <Col span={12} style={{textAlign:'right'}}>
                        <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.playCards.currentCardR?this.state.playCards.currentCardR:null}</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign:'center'}}>
                        <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.playCards.currentCardB?this.state.playCards.currentCardB:null}</p>
                    </Col>
                </Row>
            </Col>
        )
    }
}