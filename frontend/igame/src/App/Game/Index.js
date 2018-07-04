import React from 'react'
import  {Flex, Button, WingBlank} from 'antd-mobile'
import { Row, Col } from 'antd';

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

export default class PokerTable extends React.Component{
    state={
        cardsW:Cards[0],
        cardsE:Cards[1],
        cardsS:Cards[2],
        cardsN:Cards[3],
        piersCount:0,
        allPiers:[],
        donePiers:[],
        currentCard:null,
    }

    clickCard=(e)=>{
        let val=e.target.innerHTML.split("");
        if(val.length===4){
            val = [val[0]+val[1],val[3]]
        }else{
            val = [val[0],val[2]]
        }
        console.log(val)
        Cards[3].N=Cards[3].N.filter((item,index)=>{
            return( item.num!==val[0] || item.score!==val[1]      )     
        })
        console.log(Cards[3].N)
        this.setState({
            cardsN:{N:Cards[3].N},
            currentCard:e.target.innerHTML
        })
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
                {/* 上 */}
                <Row style={{marginBottom:10}}>
                    <Col span={24} style={{paddingLeft:10}}>{itemsS}</Col>
                </Row>
                <Row>
                 {/* 左 */}
                    <Col span={8}>
                        <Row>
                            <Col span={24}>{itemsW[0]}</Col>
                        </Row>
                        <Row>
                            <Col span={24}>{itemsW[1]}</Col>
                        </Row>
                        <Row>
                            <Col span={24}>{itemsW[2]}</Col>
                        </Row>
                        <Row>
                            <Col span={24}>{itemsW[3]}</Col>
                        </Row>
                    </Col>
                {/* 打牌区 */}
                    <Col span={8} style={{height:200,textAlign:'center',verticalAlign:'middle'}}>
                        <Row>
                            <Col span={24} style={{textAlign:'center'}}>
                                <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>8{`\n`}♦</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{textAlign:'left'}}>
                                <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>10{`\n`}♦</p>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}}>
                                <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>Q{`\n`}♦</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{textAlign:'center'}}>
                                <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.currentCard}</p>
                            </Col>
                        </Row>
                    </Col>
                {/* 右 */}
                    <Col span={8}>
                        <Row>
                            <Col span={24} style={{textAlign:'right'}}>{itemsW[0]}</Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{textAlign:'right'}}>{itemsW[1]}</Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{textAlign:'right'}}>{itemsW[2]}</Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{textAlign:'right'}}>{itemsW[3]}</Col>
                        </Row>
                    </Col>
                </Row>
                {/* 下 */}
                <Row style={{marginTop:10}}>
                    <Col span={24} style={{paddingLeft:10}}>{itemsN}</Col>
                </Row>
            </div>
        )
    }
}
