import React from 'react'
import { Row, Col, Table} from 'antd';
import Initial from './Initial'
import Func from './Func'

const DealFunc = new Func();
const dbl = ['Pass','X','XX',]
const suit=[
    ['1♠','2♠','3♠','4♠','5♠','6♠','7♠'],
    ['1♥','2♥','3♥','4♥','5♥','6♥','7♥'],
    ['1♦','2♦','3♦','4♦','5♦','6♦','7♦'],
    ['1♣','2♣','3♣','4♣','5♣','6♣','7♣'],
    ['1NT','2NT','3NT','4NT','5NT','6NT','7NT']
]

export default class CallCard extends React.Component{
    state={
        callCards:new Initial().callCards,
    }
    componentWillReceiveProps(newProps){
        if(newProps.callCards){
            this.setState({
                callCards:newProps.callCards
            })
        }
    }
    click=(e)=>{
        let val = e.target.innerHTML;
        val=DealFunc.transfer(val,1,true);
        this.props.post('bid',val)   //发送叫牌信息
    }

    render(){
        // 叫牌所需花色及墩数
        let callSuitS = [];
        suit.map((items,i)=>{
            items.map((item,index)=>{
                callSuitS.push(<span key={item} style={{display:'inline-block',width:35,height:25,margin:3,border:'1px solid #ccc',borderRadius:3,textAlign:'center'}} onClick={this.click}>{item}</span>)
            })
        })
        let callDbl = [];
        dbl.map((item,i)=>{
            callDbl.push(<span key={item} style={{display:'inline-block',width:35,height:25,margin:3,border:'1px solid #ccc',borderRadius:3,textAlign:'center'}} onClick={this.click}>{item}</span>)
        })

        return(
            <Col span={20} style={{}}>
                <Row>
                    <Table columns={this.state.callCards.columns} dataSource={this.state.callCards.dataSource} size="small" style={{width:210,}} />
                </Row>
                <Row style={{marginTop:20}}>{callSuitS.slice(0,7)}</Row>
                <Row>{callSuitS.slice(7,14)}</Row>
                <Row>{callSuitS.slice(14,21)}</Row>
                <Row>{callSuitS.slice(21,28)}</Row>
                <Row>{callSuitS.slice(28,35)}</Row>
                <Row>{callDbl}</Row>
            </Col>
        )
    }
}