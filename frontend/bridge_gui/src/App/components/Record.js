/**
 * card_str  N  E S W  S H D C
 * card_str: "J8.Q9865.QJ43.KJ AT5.J732.752.QT8 KQ97.AT.86.A9743 6432.K4.AKT9.652"
 */

/**
 * 牌型分布
 * [{
 *      name: 张三，
 *      card:['J8',"Q9865","QJ43","KJ"]
 * },
 * {
 *       name: 李四，
 *      card:['J8',"Q9865","QJ43","KJ"]
 * },
 * {
 * name: 张三，
 *      card:['J8',"Q9865","QJ43","KJ"]
 * },
 * {
 * }
 * ]
 */

import React, { Component } from "react";
import { inject, observer } from 'mobx-react';
import {Row, Col, Table,Drawer, Select} from 'antd';
const Option = Select.Option;
// import club from '../../../public/cards/club.svg';
// import diamond from '../../../public/cards/diamond.svg';
// import heart from '../../../public/cards/heart.svg';
// import spade from '../../../public/cards/spade.svg';
const club ='/cards/club.svg';
const  diamond ='/cards/diamond.svg';
const heart ='/cards/heart.svg';
const spade ='/cards/spade.svg';
// import diamond from '../../../public/cards/diamond.svg';
// import heart from '../../../public/cards/heart.svg';
// import spade from '../../../public/cards/spade.svg';
// const suits=[
//     <img src={spade} style={{width:"12px"}}/>,
//     <img src={club} style={{width:"12px"}}/>,
//     <img src={heart} style={{width:"12px"}}/>,
//     <img src={diamond} style={{width:"12px"}}/>,
// ]
// 牌型分布
const CARDS = [{
    name: "张三",
    card:['J8',"Q9865","QJ43","KJ"]
},{
    name: "李四",
    card:['J8',"Q9865","QJ43","KJ"]
},{
    name: "王五",
    card:['J8',"Q9865","QJ43","KJ"]
},{
    name: "赵六",
    card:['J8',"Q9865","QJ43","KJ"]
}]
function suits(suit,num){
   return (<span style={{height:"12px",display:"inline-block"}}><img src={suit} style={{width:"12px",height:"12px"}}/>{num}</span>)
}
const callData=[
    ["-","H2","Pass","Pass"],
    ["Pass"]
]
const callColumns=[{
    title:'北',
    dataIndex:'0',
    key:'north',
    align:'center'
},{
    title:'东',
    dataIndex:'1',
    key:'earth',
    align:'center'
},{
    title:'南',
    dataIndex:'2',
    key:'south',
    align:'center'
},{
    title:'西',
    dataIndex:'3',
    key:'west',
    align:'center'
}];

const resultColumns=[
    {title:'No',dataIndex:'sequence',key:'sequence'},
    {title:'结果',dataIndex:'result',key:'result'},
    {title:'NS',dataIndex:'ns_point',key:'ns_point'},
    {title:'EW',dataIndex:'ew_point',key:'ew_point'},
    {title:'南北IMP',dataIndex:'nsimp',key:'nsimp'},
    {title:'东西IMP',dataIndex:'ewimp',key:'ewimp'},
];

const processColumns=[{
    title:'北',
    dataIndex:'0',
    key:'north',
    align:'center'
},{
    title:'东',
    dataIndex:'1',
    key:'earth',
    align:'center'
},{
    title:'南',
    dataIndex:'2',
    key:'south',
    align:'center'
},{
    title:'西',
    dataIndex:'3',
    key:'west',
    align:'center'
},{
    title:'北',
    dataIndex:'4',
    key:'north1',
    align:'center'
},{
    title:'东',
    dataIndex:'5',
    key:'earth1',
    align:'center'
},{
    title:'南',
    dataIndex:'6',
    key:'south1',
    align:'center'
},{
    title:'西',
    dataIndex:'7',
    key:'west1',
    align:'center'
}];
const processData=[
    ["-","H2","H2","H2","H2","H2"]
]

@inject('tableStore')
@observer
export default class Play extends Component{
    state = { sequence: 1 };
    showDrawer = () => {
        this.props.tableStore.showHistory()
      };
    onClose = () => {
        this.props.tableStore.hideHistory()
    };

    handleChange =(value) => {
        console.log(`selected ${value}`);
        this.setState({ sequence: value })
    }
   render(){
        console.log(this.props.tableStore.record)
       
        const {auction,cards,tricks} = this.props.tableStore.record[this.state.sequence-1] ||{auction:"",cards:"",tricks:""}  //处理第一幅牌的情况
        const result = this.props.tableStore.record_result;

      
       return(
           <div style={{width:'900px',margin:'0 auto'}}>
                
                <Drawer
                    title="历史记录"
                    placement="right"
                    width="80%"
                    closable={true}
                    closable={false}
                    onClose={this.onClose}
                    visible={this.props.tableStore.history}
                > <Row>
                <Col span={12}>
                    <Result result={result}/>
                </Col>
                <Col span={10}>
                    <Cards cards={cards}/>
                </Col>
                <Col span={2}>
                <Select defaultValue={1} style={{ width: 120 }} onChange={this.handleChange}>
                    {this.props.tableStore.record.map((item,ind)=>{
                        let value = ind + 1;
                        return <Option value={value}>第{value}副</Option>
                    })}
                </Select>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Bid auction={auction}/>
                </Col>
                <Col span={12}>
                    <PlayProcess tricks = {tricks}/>
                </Col>
            </Row>
                   
                </Drawer>
            
           </div>
       )
   }
}


class Cards extends Component{
    constructor(props){
        super(props)
    }
    render(){
        const CARDS = this.props.cards;
        console.log(CARDS)
        return(
            <React.Fragment>
                <h2 style={{textAlign:'center'}}>牌型分布</h2>
                <Row>
                    <Col span={8}>
                        <div>局况</div>
                        <div>无双</div>
                    </Col>
                    <Col span={8}>
                        <div>{CARDS[0]["name"]}</div>

                        <div>{suits(spade)} {CARDS[0]["card"][0]}</div>
                        <div>{suits(heart)}{CARDS[0]["card"][1]}</div>
                        <div>{suits(diamond)} {CARDS[0]["card"][2]}</div>
                        <div>{suits(club)} {CARDS[0]["card"][3]}</div>
                    </Col>
                    <Col span={8}></Col>
                </Row>
                <Row>
                    <Col span={8}>
                        <div>{CARDS[1]["name"]}</div>
                        <div>{suits(spade)} {CARDS[1]["card"][0]}</div>
                        <div>{suits(heart)}{CARDS[1]["card"][1]}</div>
                        <div>{suits(diamond)} {CARDS[1]["card"][2]}</div>
                        <div>{suits(club)} {CARDS[1]["card"][3]}</div>
                    </Col>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <div>{CARDS[2]["name"]}</div>
                        <div>{suits(spade)} {CARDS[2]["card"][0]}</div>
                        <div>{suits(heart)}{CARDS[2]["card"][1]}</div>
                        <div>{suits(diamond)} {CARDS[2]["card"][2]}</div>
                        <div>{suits(club)} {CARDS[2]["card"][3]}</div>
                    </Col>
                </Row>
                <Row>
                    <Col span={8}></Col>
                    <Col span={8}>
                        <div>{suits(spade)} {CARDS[3]["card"][0]}</div>
                        <div>{suits(heart)}{CARDS[3]["card"][1]}</div>
                        <div>{suits(diamond)} {CARDS[3]["card"][2]}</div>
                        <div>{suits(club)} {CARDS[3]["card"][3]}</div>
                        <div>{CARDS[3]["name"]}</div>
                    </Col>
                    <Col span={8}></Col>
                </Row>
            </React.Fragment>
        )
    }
}

let resultData = [
    {sequence:1,result:"W H3",ew_point: 0,ns_point: 50,nsimp:'',ewimp:1},
    {sequence:2,result:"W H3",ew_point: 0,ns_point: 50,nsimp:'',ewimp:1},
    {sequence:3,result:"W H3",ew_point: 0,ns_point: 50,nsimp:'',ewimp:1},
    {sequence:4,result:"W H3",ew_point: 0,ns_point: 50,nsimp:'',ewimp:1},
    {sequence:5,result:"W H3",ew_point: 0,ns_point: 50,nsimp:'',ewimp:1}
] 
class Result extends Component{
    constructor(props){
        super(props)
    }
    render(){
        return(
            <React.Fragment>
                <h2 style={{textAlign:'center'}}>打牌结果</h2>
                <Table columns={resultColumns} size='xs' dataSource={this.props.result} bordered={true} pagination={false}/>
            </React.Fragment>
            
        )
       
    }
}

class Bid extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <React.Fragment>
                <h2 style={{textAlign:'center'}}>叫牌过程</h2>
                <Table size='xs'   columns={callColumns} dataSource={this.props.auction} pagination={false} bordered />
            </React.Fragment>
        )
    }
}
class PlayProcess extends Component {

    constructor(props){
        super(props)
    }
    render(){
        return(
            <React.Fragment>
                <h2 style={{textAlign:'center'}}>打牌过程</h2>
                <Table size='xs'   columns={processColumns} dataSource={this.props.tricks} pagination={false} bordered />
            </React.Fragment>
        )
    }
}