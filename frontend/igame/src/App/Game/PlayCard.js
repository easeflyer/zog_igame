import React from 'react'
import { Row, Col} from 'antd';
import Initial from './Initial'
import Func from './Func'

export default class PlayCard extends React.Component{
    state={
        playCards:new Initial().playCards
    }
    render(){
        return(
            <Col span={20} style={{}}>
                <Row>
                    <Col span={24} style={{textAlign:'center'}}>
                        <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.playCards.currentCardT}</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={12} style={{textAlign:'left'}}>
                        <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.playCards.currentCardL}</p>
                    </Col>
                    <Col span={12} style={{textAlign:'right'}}>
                        <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.playCards.currentCardR}</p>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{textAlign:'center'}}>
                        <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.playCards.currentCardB}</p>
                    </Col>
                </Row>
            </Col>
        )
    }
}