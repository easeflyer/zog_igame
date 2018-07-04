import React from 'react'
import  {Flex, Button, WingBlank} from 'antd-mobile'
import { Row, Col, Table, Icon, Divider  } from 'antd';

// spades: 黑桃  hearts: 红桃  diamond: 方块  clubs: 梅花    ♠ ♥ ♦ ♣ 
const Cards=[
    {W: [{num:'7', score:'♠'}, {num:'3', score:'♣'}, {num:'Q', score:'♥'}, {num:'A', score:'♥'}, {num:'5', score:'♠'},
        {num:'7', score:'♣'}, {num:'K', score:'♥'}, {num:'J', score:'♠'}, {num:'8', score:'♣'}, {num:'2', score:'♦'},
        {num:'9', score:'♦'}, {num:'A', score:'♦'}, {num:'4', score:'♦'} ]},
    {E: [{num:'6', score:'♠'}, {num:'2', score:'♣'}, {num:'10', score:'♥'}, {num:'6', score:'♥'}, {num:'9', score:'♠'},
        {num:'J', score:'♣'}, {num:'Q', score:'♥'}, {num:'J', score:'♠'}, {num:'A', score:'♣'}, {num:'7', score:'♦'},
        {num:'10', score:'♦'}, {num:'A', score:'♦'}, {num:'4', score:'♦'} ]},
    {S: [{num:'8', score:'♠'}, {num:'4', score:'♣'}, {num:'K', score:'♥'}, {num:'2', score:'♥'}, {num:'6', score:'♠'},
        {num:'8', score:'♣'}, {num:'A', score:'♥'}, {num:'Q', score:'♠'}, {num:'9', score:'♣'}, {num:'3', score:'♦'},
        {num:'10', score:'♦'}, {num:'2', score:'♦'}, {num:'5', score:'♦'} ]},
    {N: [{num:'6', score:'♠'}, {num:'2', score:'♣'}, {num:'10', score:'♥'}, {num:'6', score:'♥'}, {num:'9', score:'♠'},
        {num:'J', score:'♣'}, {num:'Q', score:'♥'}, {num:'J', score:'♠'}, {num:'A', score:'♣'}, {num:'7', score:'♦'},
        {num:'10', score:'♦'}, {num:'A', score:'♦'}, {num:'4', score:'♦'} ]}
]

const columns = [{
    title: 'W',
    dataIndex: 'w',
    key: 'w'
  },{
      title: 'N',
      dataIndex: 'n',
      key: 'n'
    },{
      title: 'E',
      dataIndex: 'e',
      key: 'e'
    },{
      title: 'S',
      dataIndex: 's',
      key: 's'
    }];

export default class PokerTable extends React.Component{
    state={
        dataSource:[{
            key:1,
            w:'7♠',
            n:'5♦',
            e:'Pass',
            s:'Dbl'
        }],
        cardsW:Cards[0],
        cardsE:Cards[1],
        cardsS:Cards[2],
        cardsN:Cards[3],
        piersCount:0,
        allPiers:[],
        donePiers:[],
        currentCard:null,
    }

    

    render(){
        let itemsW=[[],[],[],[]];
        if(this.state.cardsW.length===0){
            itemsW.push(<p>暂无数据</p>)
        }else{
            this.state.cardsW.W.map((item,index)=>{
                let id = item.num+item.score;
                if(item.score==='♠'){
                    itemsW[0].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♥'){
                    itemsW[1].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♦'){
                    itemsW[2].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♣'){
                    itemsW[3].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}>{item.num}{`\n`}{item.score}</span>)
                }
            })
        }
        let itemsE=[];
        if(this.state.cardsE.length===0){
            itemsE.push(<p>暂无数据</p>)
        }else{
            this.state.cardsE.E.map((item,index)=>{
                let id = item.num+item.score;
                itemsE.push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}>{item.num}{`\n`}{item.score}</span>)
            })
        }
        let itemsS=[];
        if(this.state.cardsS.length===0){
            itemsS.push(<p>暂无数据</p>)
        }else{
            this.state.cardsS.S.map((item,index)=>{
                let id = item.num+item.score;
                itemsS.push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}>{item.num}{`\n`}{item.score}</span>)
            })
        }
        let itemsN=[];
        if(this.state.cardsN.length===0){
            itemsN.push(<p>暂无数据</p>)
        }else{
            this.state.cardsN.N.map((item,index)=>{
                let id = item.num+item.score;
                itemsN.push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={key=>this.clickCard(key)}>{item.num}{`\n`}{item.score}</span>)
            })
        }
        return(
            <div style={{bottom:40}}>
                <Row>
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>N</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>盼盼</Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <Row style={{height:300,writingMode: 'vertical-lr'}}>
                        <Col span={24} style={{height:60,background:'#0f0'}}>W</Col>
                        <Col span={24} style={{height:240,background:'#ff0'}}>盼盼</Col>
                        </Row>
                    </Col>
                    <Col span={20}>
                    <Row>
                        <Table columns={columns} dataSource={this.state.dataSource} size="small" style={{width:210}} />
                    </Row>
                    <Row style={{marginTop:20}}>
                        <table>
                        <tbody>
                            <tr>
                                <td colSpan={3}><Button inline size="small" type="ghost">Pass</Button></td>
                                <td colSpan={10}><Button inline size="small" type="warning">Dbl</Button></td>
                            </tr>
                            <tr>
                                <td colSpan={2}><Button inline size="small"> ♠ </Button></td>
                                <td colSpan={3}><Button inline size="small"> ♥ </Button></td>
                                <td colSpan={3}><Button inline size="small"> ♦ </Button></td>
                                <td colSpan={2}><Button inline size="small"> ♣ </Button></td>
                                <td colSpan={3}><Button inline size="small"> NT </Button></td>
                            </tr>
                            <tr>
                                <td><Button>A</Button></td>
                                <td><Button>2</Button></td>
                                <td><Button>3</Button></td>
                                <td><Button>4</Button></td>
                                <td><Button>5</Button></td>
                                <td><Button>6</Button></td>
                                <td><Button>7</Button></td>
                                <td><Button>8</Button></td>
                                <td><Button>9</Button></td>
                                <td><Button>10</Button></td>
                                <td><Button>J</Button></td>
                                <td><Button>Q</Button></td>
                                <td><Button>K</Button></td>
                            </tr>
                            <tr>
                                <td colSpan={13}><Button size="small" inline type="ghost">Alert</Button></td>
                            </tr>
                            </tbody>
                        </table>
                    </Row>
                    </Col>
                    <Col span={2}>
                        <Row style={{height:300,writingMode: 'vertical-lr'}}>
                        <Col span={24} style={{height:60,background:'#0f0'}}>E</Col>
                        <Col span={24} style={{height:240,background:'#ff0'}}>盼盼</Col>
                        </Row>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{paddingLeft:10}}>{itemsS}</Col>
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>S</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>baifdsf</Col>
                </Row>
            </div>
        )
    }
}
