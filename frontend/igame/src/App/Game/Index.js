import React from 'react'
import  {Flex, Button, WingBlank} from 'antd-mobile'
import { Row, Col, Table, Icon, Divider  } from 'antd';

// spades: 黑桃  hearts: 红桃  diamond: 方块  clubs: 梅花    ♠ ♥ ♦ ♣ 
const Card=[{dir:'N', card: 'T8.Q.QT874.A9632'},{dir:'E', card: 'J53.J7652.93.JT4'},{dir:'S', card: 'AQ62.K94.KJ62.Q8'}, {dir:'W', card: 'K974.AT83.A5.K75'},]
const columns = [
    { title: 'W', dataIndex: 'w', key: 'w'},
    { title: 'N', dataIndex: 'n', key: 'n'},
    { title: 'E', dataIndex: 'e', key: 'e'},
    { title: 'S', dataIndex: 's', key: 's'}];

// const suit = ['NT','♠','♥','♦','♣']
const dbl = ['PASS','X','XX','Alert']
const suit=[
    ['1♠','2♠','3♠','4♠','5♠','6♠','7♠'],
    ['1♥','2♥','3♥','4♥','5♥','6♥','7♥'],
    ['1♦','2♦','3♦','4♦','5♦','6♦','7♦'],
    ['1♣','2♣','3♣','4♣','5♣','6♣','7♣'],
    ['1NT','2NT','3NT','4NT','5NT','6NT','7NT']
]

let pier=[]
let piersCountSN = 0
let piersCountEW = 0

export default class PokerTable extends React.Component{
    // 叫牌完成后，返回值：定约，明守方牌面，首墩第一个出牌方位，
    // 打牌过程（墩）：当前出牌方位所出牌面，下一个出牌方位（根据出牌方位判断己方是否可出牌）
    state={
        dataSource:[{
            key:1,
            w:'',
            n:'',
            e:'',
            s:''
        }],
        myDirect:'S', //我所在方位
        myCards:null,
        call:false, //是否处于叫牌状态
        callDirect:'N', //当前应该哪个方位叫牌
        callCards:null, //我，叫的牌
        guard:'W',  //明守方位
        piersCount:0, // 墩，计数
        allPiers:[],  // 所有墩
        currentPiers:[], // 当前墩
        currentCardS:null, // 我，当前出的牌
        currentCardN:null, // North，当前出的牌
        currentCardW:null, // West，当前出的牌
        currentCardE:null, // East，当前出的牌
        currentDirect:'S', //当前应该哪个方位打牌
        scoreSN:0,
        scoreEW:0,
        piersSN:piersCountSN,
        piersEW:piersCountEW
    }

    componentDidMount(){
        this.setState({
            myCards:this.addColor(this.dealCards(this.state.myDirect))[1]
        })
    }

    // 处理发过来的牌:分割
    dealCards=(dir)=>{
        let  cardMy=[];
        Card.map(item=>{
            if(item.dir===dir){
                item.card.split('.').map(i=>{
                    cardMy.push(i.split(''));
                })
            }
        })
        return cardMy
    }
    // 处理发过来的牌：添加花色
    addColor=(cards,dir)=>{
        let catoCards=[]
        let addCards=[[],[],[],[]]
        let colorCards=[[],[],[],[]]
        cards.map((item,index)=>{
            if(index===0&&item.length!==0){
                item.map(i=>{
                    colorCards[0].push(i+'s')
                    addCards[0].push(<span key={index+i} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={this.state.currentDirect===dir?this.post:null}>{i}{`\n`}{'♠'}</span>)
                })
            }
            if(index===1&&item.length!==0){
                item.map(i=>{
                    colorCards[1].push(i+'h')
                    addCards[1].push(<span key={index+i} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={this.state.currentDirect===dir?this.post:null}>{i}{`\n`}{'♥'}</span>)
                })
            }
            if(index===2&&item.length!==0){
                item.map(i=>{
                    colorCards[2].push(i+'d')
                    addCards[2].push(<span key={index+i} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={this.state.currentDirect===dir?this.post:null}>{i}{`\n`}{'♦'}</span>)
                })
            }
            if(index===3&&item.length!==0){
                item.map(i=>{
                    colorCards[3].push(i+'c')
                    addCards[3].push(<span key={index+i} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={this.state.currentDirect===dir?this.post:null}>{i}{`\n`}{'♣'}</span>)
                })
            }
        })
        return [addCards,colorCards]  //两种格式：5♥  5h 
    }
    //发送消息
    post=(e)=>{
        // ♠ ♥ ♦ ♣ 
        let val = e.target.innerHTML;
        val = this.transfer(val,2)
        console.log(val)
        // $.post('/post', { 'message': val });
        this.setState({
            myCards:'',
            currentCardS:e.target.innerHTML,
            // currentPiers:pier,
        })
    }
    // 要发送的消息整理成‘5h’的格式
    transfer=(val,num)=>{
        if(val.split('')[num]==="♠"){val=val.split('')[0]+'s'}
        if(val.split('')[num]==="♥"){val=val.split('')[0]+'h'}
        if(val.split('')[num]==="♦"){val=val.split('')[0]+'d'}
        if(val.split('')[num]==="♣"){val=val.split('')[0]+'c'}
        return val;
    }

    // clearCurrentPiers=()=>{
    //     if(this.state.currentPiers.length===4){
    //             let next=0;
    //             let nextDirect='';
    //             this.state.currentPiers.map((item,index)=>{
    //                 item[0] === 'A' ? item[0]=1 : null
    //                 item[0] === 'J' ? item[0]=11 : null
    //                 item[0] === 'Q' ? item[0]=12 : null
    //                 item[0] === 'K' ? item[0]=13 : null
    //                 next = next > parseInt(item[0]) ? next : parseInt(item[0])
    //             })
    //             nextDirect = this.state.currentPiers.filter(item=>{
    //                 item[0] === 'A' ? item[0]=1 : null
    //                 item[0] === 'J' ? item[0]=11 : null
    //                 item[0] === 'Q' ? item[0]=12 : null
    //                 item[0] === 'K' ? item[0]=13 : null
    //                return  parseInt(item[0]) === next
    //             })
    //             nextDirect[0][2]==='N'||nextDirect[0][2]==='S'? piersCountSN++ : piersCountEW++
    //             this.setState({
    //                 piersCount:this.state.piersCount++,
    //                 currentPiers:[],
    //                 currentDirect:null,
    //                 piersSN:piersCountSN,
    //                 piersEW:piersCountEW,
    //             });
    //             pier=[];
    //             setTimeout(()=>{
    //                 this.setState({
    //                     currentCardS:null,
    //                     currentCardN:null,
    //                     currentCardW:null,
    //                     currentCardE:null,
    //                     currentDirect:nextDirect[0][2],
    //               })
    //           },2000)
    
    //     }
    // }

    render(){
        // 叫牌所需花色及墩数
        let callSuitS = [];
        suit.map((items,i)=>{
            items.map((item,index)=>{
                callSuitS.push(<span key={item} style={{display:'inline-block',width:35,height:25,margin:3,border:'1px solid #ccc',borderRadius:3,textAlign:'center'}} onClick={this.post}>{item}</span>)
            })
        })
        let callDbl = [];
        dbl.map((item,i)=>{
            callDbl.push(<span key={item} style={{display:'inline-block',width:35,height:25,margin:3,border:'1px solid #ccc',borderRadius:3,textAlign:'center'}} onClick={this.post}>{item}</span>)
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
                    <Col span={24} style={{display:!this.state.call&&this.state.guard=="N"?'inline-block':'none',paddingLeft:10,textAlign:'center'}}>{this.addColor(this.dealCards(this.state.guard))[0]}</Col>
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
                            <Col span={24}>{this.addColor(this.dealCards(this.state.guard))[0][0]}</Col>
                        </Row>
                        <Row>
                            <Col span={24}>{this.addColor(this.dealCards(this.state.guard))[0][1]}</Col>
                        </Row>
                        <Row>
                            <Col span={24}>{this.addColor(this.dealCards(this.state.guard))[0][2]}</Col>
                        </Row>
                        <Row>
                            <Col span={24}>{this.addColor(this.dealCards(this.state.guard))[0][3]}</Col>
                        </Row>
                    </Col>
                {/* 叫牌区 */}
                    <Col span={20} style={{display:this.state.call?'inline-block':'none'}}>
                        <Row>
                            <Table columns={columns} dataSource={this.state.dataSource} size="small" style={{width:210,}} />
                        </Row>
                        <Row style={{marginTop:20}}>{callSuitS.slice(0,7)}</Row>
                        <Row>{callSuitS.slice(7,14)}</Row>
                        <Row>{callSuitS.slice(14,21)}</Row>
                        <Row>{callSuitS.slice(21,28)}</Row>
                        <Row>{callSuitS.slice(28,35)}</Row>
                        <Row>{callDbl}</Row>
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
                    <Col span={6} style={{display:!this.state.call&&this.state.guard=="E"?'inline-block':'none',textAlign:'right'}}>
                        <Row>
                            <Col span={24}>{this.addColor(this.dealCards(this.state.guard))[0][0]}</Col>
                            <Col span={24}>{this.addColor(this.dealCards(this.state.guard))[0][1]}</Col>
                            <Col span={24}>{this.addColor(this.dealCards(this.state.guard))[0][2]}</Col>
                            <Col span={24}>{this.addColor(this.dealCards(this.state.guard))[0][3]}</Col>
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
                    <Col span={24} style={{paddingLeft:10,textAlign:'center'}}>{this.addColor(this.dealCards(this.state.myDirect),this.state.myDirect)[0]}</Col>
                    {/*<Col span={24} style={{paddingLeft:10,textAlign:'center'}}>{this.state.myCards}</Col>*/}
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>S</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>baifdsf {this.state.currentDirect==='S'?'★':null}</Col>
                </Row>
            </div>
        )
    }
}
