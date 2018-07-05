import React from 'react'
import  {Flex, Button, WingBlank} from 'antd-mobile'
import { Row, Col, Table, Icon, Divider  } from 'antd';

// spades: 黑桃  hearts: 红桃  diamond: 方块  clubs: 梅花    ♠ ♥ ♦ ♣ 
const Cards=[
    {N: [{num:'6', score:'♠'}, {num:'2', score:'♣'}, {num:'10', score:'♥'}, {num:'6', score:'♥'}, {num:'9', score:'♠'},
        {num:'J', score:'♣'}, {num:'Q', score:'♥'}, {num:'J', score:'♠'}, {num:'A', score:'♣'}, {num:'7', score:'♦'},
        {num:'10', score:'♦'}, {num:'A', score:'♦'}, {num:'4', score:'♦'} ]},
    {E: [{num:'6', score:'♠'}, {num:'2', score:'♣'}, {num:'10', score:'♥'}, {num:'6', score:'♥'}, {num:'9', score:'♠'},
        {num:'J', score:'♣'}, {num:'Q', score:'♥'}, {num:'J', score:'♠'}, {num:'A', score:'♣'}, {num:'7', score:'♦'},
        {num:'10', score:'♦'}, {num:'A', score:'♦'}, {num:'4', score:'♦'} ]},
    {S: [{num:'8', score:'♠'}, {num:'4', score:'♣'}, {num:'K', score:'♥'}, {num:'2', score:'♥'}, {num:'6', score:'♠'},
        {num:'8', score:'♣'}, {num:'A', score:'♥'}, {num:'Q', score:'♠'}, {num:'9', score:'♣'}, {num:'3', score:'♦'},
        {num:'10', score:'♦'}, {num:'2', score:'♦'}, {num:'5', score:'♦'} ]},
    {W: [{num:'7', score:'♠'}, {num:'3', score:'♣'}, {num:'Q', score:'♥'}, {num:'A', score:'♥'}, {num:'5', score:'♠'},
        {num:'7', score:'♣'}, {num:'K', score:'♥'}, {num:'J', score:'♠'}, {num:'8', score:'♣'}, {num:'2', score:'♦'},
        {num:'9', score:'♦'}, {num:'A', score:'♦'}, {num:'4', score:'♦'} ]},
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
        cardsN:Cards[0], // North 牌面
        cardsE:Cards[1], // East 牌面
        cardsS:Cards[2], // South 牌面
        cardsW:Cards[3], // West 牌面
        piersCount:0, // 墩，计数
        allPiers:[],  // 所有墩
        currentPiers:[], // 当前墩
        currentCardS:null, // 我，当前出的牌
        currentCardN:null, // North，当前出的牌
        currentCardW:null, // West，当前出的牌
        currentCardE:null, // East，当前出的牌
        currentDirect:'W', //当前应该哪个方位打牌
        scoreSN:0,
        scoreEW:0,
        piersSN:piersCountSN,
        piersEW:piersCountEW
    }

    

    render(){
        // 对每个方位的牌面进行分类排序
        let itemsN=[[],[],[],[]];
        if(this.state.cardsN.length===0){
            itemsN.push(<p>暂无数据</p>)
        }else{
            this.state.cardsN.N.map((item,index)=>{
                let id = item.num+item.score;
                if(item.score==='♠'){
                    itemsN[0].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}  onClick={key=>this.clickN(key)}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♣'){
                    itemsN[1].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}  onClick={key=>this.clickN(key)}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♥'){
                    itemsN[2].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5,color:'#f00'}}  onClick={key=>this.clickN(key)}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♦'){
                    itemsN[3].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5,color:'#f00'}}  onClick={key=>this.clickN(key)}>{item.num}{`\n`}{item.score}</span>)
                }
            })
        }

        let itemsE=[[],[],[],[]];
        if(this.state.cardsE.length===0){
            itemsE.push(<p>暂无数据</p>)
        }else{
            this.state.cardsE.E.map((item,index)=>{
                let id = item.num+item.score;
                if(item.score==='♠'){
                    itemsE[0].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}  onClick={key=>this.clickE(key)}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♣'){
                    itemsE[1].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}  onClick={key=>this.clickE(key)}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♥'){
                    itemsE[2].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5,color:'#f00'}}  onClick={key=>this.clickE(key)}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♦'){
                    itemsE[3].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5,color:'#f00'}}  onClick={key=>this.clickE(key)}>{item.num}{`\n`}{item.score}</span>)
                }
            })
        }

        let itemsS=[[],[],[],[]];
        if(this.state.cardsS.length===0){
            itemsS.push(<p>暂无数据</p>)
        }else{
            this.state.cardsS.S.map((item,index)=>{
                let id = item.num+item.score;
                if(item.score==='♠'){
                    itemsS[0].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}  onClick={key=>this.clickS(key)}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♣'){
                    itemsS[1].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}  onClick={key=>this.clickS(key)}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♥'){
                    itemsS[2].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5,color:'#f00'}}  onClick={key=>this.clickS(key)}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♦'){
                    itemsS[3].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5,color:'#f00'}}  onClick={key=>this.clickS(key)}>{item.num}{`\n`}{item.score}</span>)
                }
            })
        }

        let itemsW=[[],[],[],[]];
        if(this.state.cardsW.length===0){
            itemsW.push(<p>暂无数据</p>)
        }else{
            this.state.cardsW.W.map((item,index)=>{
                let id = item.num+item.score;
                if(item.score==='♠'){
                    itemsW[0].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}  onClick={key=>this.clickW(key)}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♣'){
                    itemsW[1].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}}  onClick={key=>this.clickW(key)}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♥'){
                    itemsW[2].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5,color:'#f00'}}  onClick={key=>this.clickW(key)}>{item.num}{`\n`}{item.score}</span>)
                }
                if(item.score==='♦'){
                    itemsW[3].push(<span key={index} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5,color:'#f00'}}  onClick={key=>this.clickW(key)}>{item.num}{`\n`}{item.score}</span>)
                }
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
                                <td colSpan={4}><Button inline size="small" type="ghost">Pass</Button></td>
                                <td colSpan={4}><Button inline size="small" type="warning">X</Button></td>
                                <td colSpan={4}><Button inline size="small" type="warning">XX</Button></td>
                            </tr>
                            <tr>
                                <td colSpan={3}><Button inline size="small"> NT </Button></td>
                                <td colSpan={2}><Button inline size="small"> ♠ </Button></td>
                                <td colSpan={3}><Button inline size="small"> ♥ </Button></td>
                                <td colSpan={3}><Button inline size="small"> ♦ </Button></td>
                                <td colSpan={2}><Button inline size="small"> ♣ </Button></td>
                            </tr>
                            <tr>
                                <td><Button>1</Button></td>
                                <td><Button>2</Button></td>
                                <td><Button>3</Button></td>
                                <td><Button>4</Button></td>
                                <td><Button>5</Button></td>
                                <td><Button>6</Button></td>
                                <td><Button>7</Button></td>
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
                    <Col span={24} style={{paddingLeft:10}}>{itemsS[0]}{itemsS[1]}{itemsS[2]}{itemsS[3]}</Col>
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>S</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>baifdsf</Col>
                </Row>
            </div>
        )
    }
}
