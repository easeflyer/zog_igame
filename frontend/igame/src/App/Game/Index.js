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

const columns = [
    { title: 'W', dataIndex: 'w', key: 'w'},
    { title: 'N', dataIndex: 'n', key: 'n'},
    { title: 'E', dataIndex: 'e', key: 'e'},
    { title: 'S', dataIndex: 's', key: 's'}];

const suit = ['NT','♠','♥','♦','♣']
const pierNumber = ['1','2','3','4','5','6','7']
const dbl = ['PASS','X','XX']

let pier=[]
let piersCountSN = 0
let piersCountEW = 0

export default class PokerTable extends React.Component{
    // 叫牌完成后，返回值：定约，明守方牌面，首墩第一个出牌方位，
    // 打牌过程（墩）：当前出牌方位所出牌面，下一个出牌方位（根据出牌方位判断己方是否可出牌）
    state={
        dataSource:[{
            key:1,
            w:'7♠',
            n:'5♦',
            e:'Pass',
            s:'Dbl'
        }],
        call:true, //是否处于叫牌状态
        callDirect:'N', //当前应该哪个方位叫牌
        callCards:null, //我，叫的牌
        guard:'S',  //明守方位
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

    clearCurrentPiers=()=>{
        if(this.state.currentPiers.length===4){
                let next=0;
                let nextDirect='';
                this.state.currentPiers.map((item,index)=>{
                    item[0] === 'A' ? item[0]=1 : null
                    item[0] === 'J' ? item[0]=11 : null
                    item[0] === 'Q' ? item[0]=12 : null
                    item[0] === 'K' ? item[0]=13 : null
                    next = next > parseInt(item[0]) ? next : parseInt(item[0])
                })
                nextDirect = this.state.currentPiers.filter(item=>{
                    item[0] === 'A' ? item[0]=1 : null
                    item[0] === 'J' ? item[0]=11 : null
                    item[0] === 'Q' ? item[0]=12 : null
                    item[0] === 'K' ? item[0]=13 : null
                   return  parseInt(item[0]) === next
                })
                nextDirect[0][2]==='N'||nextDirect[0][2]==='S'? piersCountSN++ : piersCountEW++
                this.setState({
                    piersCount:this.state.piersCount++,
                    currentPiers:[],
                    currentDirect:null,
                    piersSN:piersCountSN,
                    piersEW:piersCountEW,
                });
                pier=[];
                setTimeout(()=>{
                    this.setState({
                        currentCardS:null,
                        currentCardN:null,
                        currentCardW:null,
                        currentCardE:null,
                        currentDirect:nextDirect[0][2],
                  })
              },2000)
        }
    }


    clickN=(e)=>{
        if(this.state.currentDirect==='N'){
            let val=e.target.innerHTML.split("");
            if(val.length===4){
                val = [val[0]+val[1],val[3],"N"]
            }else{
                val = [val[0],val[2],"N"]
            }
            console.log(val)
            Cards[0].N=Cards[0].N.filter((item,index)=>{
                return( item.num!==val[0] || item.score!==val[1] )     
            })
            pier.push(val);
            this.setState({
                cardsN:{N:Cards[0].N},
                currentCardN:e.target.innerHTML,
                currentDirect:'E',
                currentPiers:pier,
            })
            console.log(this.state.currentPiers)
            this.clearCurrentPiers();
        }
    }
    clickE=(e)=>{
        if(this.state.currentDirect==='E'){
            let val=e.target.innerHTML.split("");
            if(val.length===4){
                val = [val[0]+val[1],val[3],"E"]
            }else{
                val = [val[0],val[2],"E"]
            }
            console.log(val)
            Cards[1].E=Cards[1].E.filter((item,index)=>{
                return( item.num!==val[0] || item.score!==val[1] )     
            })
            pier.push(val);
            this.setState({
                cardsE:{E:Cards[1].E},
                currentCardE:e.target.innerHTML,
                currentDirect:'S',
                currentPiers:pier,
            })
            console.log(this.state.currentPiers)
            this.clearCurrentPiers();
        }
    }
    clickS=(e)=>{
        if(this.state.currentDirect==='S'){
            let val=e.target.innerHTML.split("");
            if(val.length===4){
                val = [val[0]+val[1],val[3],"S"]
            }else{
                val = [val[0],val[2],"S"]
            }
            console.log(val)
            Cards[2].S=Cards[2].S.filter((item,index)=>{
                return( item.num!==val[0] || item.score!==val[1] )     
            })
            pier.push(val);
            this.setState({
                cardsS:{S:Cards[2].S},
                currentCardS:e.target.innerHTML,
                currentDirect:'W',
                currentPiers:pier,
            })
            console.log(this.state.currentPiers)
            this.clearCurrentPiers();
        }
    }
    clickW=(e)=>{
        if(this.state.currentDirect==='W'){
            let val=e.target.innerHTML.split("");
            if(val.length===4){
                val = [val[0]+val[1],val[3],"W"]
            }else{
                val = [val[0],val[2],"W"]
            }
            console.log(val)
            Cards[3].W=Cards[3].W.filter((item,index)=>{
                return( item.num!==val[0] || item.score!==val[1] )     
            })
            pier.push(val);
            this.setState({
                cardsW:{W:Cards[3].W},
                currentCardW:e.target.innerHTML,
                currentDirect:'N',
                currentPiers:pier,
            })
            console.log(this.state.currentPiers)
            this.clearCurrentPiers();
        }
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

        // 叫牌所需花色及墩数
        let callDbl = [];
        dbl.map((item,index)=>{
            callDbl.push(<span key={index} style={{display:'inline-block',width:40,height:25,margin:3,border:'1px solid #ccc',borderRadius:3,textAlign:'center'}} onclick={e=>{console.log(e.target.innerHTML)}}>{item}</span>)
        })
        let callSuit = [];
        suit.map((item,index)=>{
            callSuit.push(<span key={index} style={{display:'inline-block',width:30,height:25,margin:3,border:'1px solid #ccc',borderRadius:3,textAlign:'center'}} onclick={e=>{console.log(e.target.innerHTML)}}>{item}</span>)
        })
        let callPierNumber = [];
        pierNumber.map((item,index)=>{
            callPierNumber.push(<span key={index} style={{display:'inline-block',width:30,height:25,margin:3,border:'1px solid #ccc',borderRadius:3,textAlign:'center'}} onclick={e=>{console.log(e.target.innerHTML)}}>{item}</span>)
        })
        
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
                        <div style={{position:'absolute',right:30,width:35,height:40,padding:'0 5px',borderRadius:3,background:'#B0E0E6',textAlign:'center'}}>3 ♥{`\n`}W</div>
                    </Col>
                </Row>
                {/* 上 */}
                <Row style={{marginBottom:10}}>
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>N</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>买玉米 {this.state.currentDirect==='N'?'★':null}</Col>
                    <Col span={24} style={{display:!this.state.call&&this.state.guard=="N"?'inline-block':'none',paddingLeft:10,textAlign:'center'}}>{itemsN[0]}{itemsN[1]}{itemsN[2]}{itemsN[3]}</Col>
                </Row>
                <Row>
                {/* 左 */}
                    <Col span={2}>
                        <Row style={{height:300,writingMode: 'vertical-lr'}}>
                        <Col span={24} style={{height:60,background:'#0f0'}}>W</Col>
                        <Col span={24} style={{height:240,background:'#ff0'}}>猫头鹰 {this.state.currentDirect==='W'?'★':null}</Col>
                        </Row>
                    </Col>
                    <Col span={6} style={{display:!this.state.call&&this.state.guard==="W"?'inline-block':'none'}}>
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
                {/* 叫牌区 */}
                    <Col span={20} style={{display:this.state.call?'inline-block':'none'}}>
                        <Row>
                            <Table columns={columns} dataSource={this.state.dataSource} size="small" style={{width:210}} />
                        </Row>
                        <Row style={{marginTop:20}}>
                            {callDbl}
                        </Row>
                        <Row>
                            {callSuit}
                        </Row>
                        <Row>
                            {callPierNumber}
                        </Row>
                        <Row>
                            <Button size="small" inline={true} type="primary">alert</Button>
                        </Row>
                    </Col>
                {/* 打牌区 */}
                   <Col span={this.state.guard==="W"||this.state.guard=="E"?14:20} style={{display:this.state.call?'none':'inline-block',height:200,textAlign:'center',verticalAlign:'middle'}}>
                        <Row>
                            <Col span={24} style={{textAlign:'center'}}>
                                <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.currentCardN}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{textAlign:'left'}}>
                                <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.currentCardW}</p>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}}>
                                <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.currentCardE}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{textAlign:'center'}}>
                                <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.currentCardS}</p>
                            </Col>
                        </Row>
                    </Col>
                {/* 右 */}
                    <Col span={6} style={{display:!this.state.call&&this.state.guard=="E"?'inline-block':'none'}}>
                        <Row>
                            <Col span={24} style={{textAlign:'right'}}>{itemsE[0]}</Col>
                            <Col span={24} style={{textAlign:'right'}}>{itemsE[1]}</Col>
                            <Col span={24} style={{textAlign:'right'}}>{itemsE[2]}</Col>
                            <Col span={24} style={{textAlign:'right'}}>{itemsE[3]}</Col>
                        </Row>
                    </Col>
                    <Col span={2}>
                        <Row style={{height:300,writingMode: 'vertical-lr',float:'right'}}>
                        <Col span={24} style={{height:60,background:'#0f0'}}>E</Col>
                        <Col span={24} style={{height:240,background:'#ff0'}}>南阳大饭店 {this.state.currentDirect==='E'?'★':null}</Col>
                        </Row>
                    </Col>
                </Row>
                {/* 下 */}
                <Row style={{marginTop:10}}>
                    <Col span={24} style={{paddingLeft:10,textAlign:'center'}}>{itemsS[0]}{itemsS[1]}{itemsS[2]}{itemsS[3]}</Col>
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>S</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>baifdsf {this.state.currentDirect==='S'?'★':null}</Col>
                </Row>
            </div>
        )
    }
}
