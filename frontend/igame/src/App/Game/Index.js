import React from 'react'
import  {Flex, Button, WingBlank} from 'antd-mobile'
import { Row, Col, Table, Icon, Divider ,Input } from 'antd';
import $ from 'jquery';
import Session from '../User/session'

import {Match} from '../Models/Models'
import Login from './Index0'

const source = new EventSource('http://192.168.0.20:8989/stream');  // 监听这个网址的消息。事件。

// N: 201 S:203 E:202 W 204
// spades: 黑桃  hearts: 红桃  diamond: 方块  clubs: 梅花    ♠ ♥ ♦ ♣ 
// const Card=[{dir:'N', card: 'T8.Q.QT874.A9632'},{dir:'E', card: 'J53.J7652.93.JT4'},{dir:'S', card: 'AQ62.K94.KJ62.Q8'}, {dir:'W', card: 'K974.AT83.A5.K75'},]
const columns = [
    { title: 'N', dataIndex: 'N', key: 'N'},
    { title: 'E', dataIndex: 'E', key: 'E'},
    { title: 'S', dataIndex: 'S', key: 'S'},
    { title: 'W', dataIndex: 'W', key: 'W'},];

// const suit = ['NT','♠','♥','♦','♣']
const dbl = ['PASS','X','XX',]
const suit=[
    ['1♠','2♠','3♠','4♠','5♠','6♠','7♠'],
    ['1♥','2♥','3♥','4♥','5♥','6♥','7♥'],
    ['1♦','2♦','3♦','4♦','5♦','6♦','7♦'],
    ['1♣','2♣','3♣','4♣','5♣','6♣','7♣'],
    ['1NT','2NT','3NT','4NT','5NT','6NT','7NT']
]
const direct = [ 'N' ,'E','S','W',]
const user =[ '201', '202', '203','204',]

let pier=[]
let piersCountSN = 0
let piersCountEW = 0
let count=0

export default class PokerTable extends React.Component{
    // 叫牌完成后，返回值：定约，明守方牌面，首墩第一个出牌方位，
    // 打牌过程（墩）：当前出牌方位所出牌面，下一个出牌方位（根据出牌方位判断己方是否可出牌）
    constructor(props){
        super(props);
    }
    state={
        calculate:true,
        cards:[],
        dataSource:[{
            key:count,
            N:'',
            E:'',
            S:'',
            W:'',
        }],
        banker:null, //庄家方位 
        guard:null,  //明守方位
        myDirect:localStorage.user, //我所在方位
        myName:user[direct.indexOf(localStorage.user)],
        topDirect:direct[direct.indexOf(localStorage.user)+2]||direct[direct.indexOf(localStorage.user)-2], //对家
        topName:user[direct.indexOf(localStorage.user)+2]||user[direct.indexOf(localStorage.user)-2], //对家
        rightDirect:direct[direct.indexOf(localStorage.user)-1]||direct[direct.indexOf(localStorage.user)+3], //右侧
        rightName:user[direct.indexOf(localStorage.user)-1]||user[direct.indexOf(localStorage.user)+3], //右侧
        leftDirect:direct[direct.indexOf(localStorage.user)+1]||direct[direct.indexOf(localStorage.user)-3], //左侧
        leftName:user[direct.indexOf(localStorage.user)+1]||user[direct.indexOf(localStorage.user)-3], //左侧
        myCards:null, //我的牌，消息格式
        myCardsNum:null,//我的牌，全数字
        guardCards:null, //我的牌，消息格式
        guardCardsNum:null,//我的牌，全数字
        call:true, //是否处于叫牌状态
        callDirect:'N', //当前应该哪个方位叫牌  ** 
        callCards:null, //我，叫的牌  ** 
        openLeader:null, //首攻  
        currentDirect:'N', //当前应该哪个方位打牌  ** 
        currentCardB:null, // 我，当前出的牌 
        currentCardT:null, // 我的对家，当前出的牌 
        currentCardL:null, // 左侧，当前出的牌 
        currentCardR:null, // 右侧，当前出的牌 
        piersCount:0, // 墩，计数  ** 
        allPiers:[],  // 所有墩  ** 
        currentPiers:[], // 当前墩  ** 
        scoreSN:0,  //SN方位得分  ** 
        scoreEW:0,  //EW方位得分  ** 
        piersSN:piersCountSN,  //  ** 
        piersEW:piersCountEW   //  ** 
    }

    get_session=()=> {
        if (localStorage && localStorage.session) {
            return localStorage.session;
        } else {
            return false;
        }
    }

    componentDidMount(){
        this.calculateDirect()
        this.sse();
        
        // 建立连接
        // const m = new Match(this.sucPolling,this.failPolling); //说明：传入回调函数
        // m.longPolling();  //说明：调用Models里面定义好的方法，传入相应的参数

        // 发送消息
        // const m = new Match(this.sucPost,this.failPost); //说明：传入回调函数
        // m.play_cards();  //说明：调用Models里面定义好的方法，传入相应的参数
    }
    sse=()=> {
        let i=0;
        const this_=this;
        var source = new EventSource('http://192.168.0.20:8989/stream');  // 监听这个网址的消息。事件。
        source.onmessage = function (e) {
            console.log(e.data)
            if(e.data.split(':').length===2){   //发牌
                let data=e.data.split(':');
                this_.state.cards.push(data);
                this_.deal_cards(data);
            }
            if(this_.state.call && e.data.split(' ').length===3){   //叫牌
                let call_direct = direct[user.indexOf(e.data.split(' ')[1].slice(0,3))];  //方位
                let call_card = e.data.split(' ')[2];   //叫的牌
                this_.call_cards(call_direct,call_card);
            }
            if(e.data.split(' ')[1]==='card:' && this_.state.calculate){   //叫牌结束，设置庄家、明守、首攻
                this_.setState({
                    call:false,
                    openLeader: e.data.split(' ')[0],
                    banker:direct[direct.indexOf(e.data.split(' ')[0])+3]||direct[direct.indexOf(e.data.split(' ')[0])-1],
                    guard:direct[direct.indexOf(e.data.split(' ')[0])+1]||direct[direct.indexOf(e.data.split(' ')[0])-3],
                    calculate:false,
                })
                let data =this_.state.cards[ direct.indexOf(e.data.split(' ')[0])+1]||this_.state.cards[ direct.indexOf(e.data.split(' ')[0])-3]
                this_.setState({
                    guardCards:this_.addColor(this_.arrange_my_cards(data[1]))[0],
                    guardCardsNum:this_.arrange_my_cards(data[1]),
                })
            }
            if(!this_.state.call && e.data.split(' ').length===3 && e.data.split(' ')[1].slice(3,4)===':'){  //打牌
                let play_direct = direct[user.indexOf(e.data.split(' ')[1].slice(0,3))];  //方位
                let play_card = e.data.split(' ')[2];   //出的牌
                play_direct===this_.state.topDirect?this_.setState({currentCardT:this_.re_transfer(play_card,true)}):null;
                play_direct===this_.state.myDirect?this_.setState({currentCardB:this_.re_transfer(play_card,true)}):null;
                play_direct===this_.state.leftDirect?this_.setState({currentCardL:this_.re_transfer(play_card,true)}):null;
                play_direct===this_.state.rightDirect?this_.setState({currentCardR:this_.re_transfer(play_card,true)}):null;
                this_.state.currentPiers.push({dir:play_direct,card:play_card})
            }
            //这里没有屏蔽 跨站脚本攻击，可以输入脚本。造成 安全隐患！
        };
        source.onclose = function(e){
            alert('再见！')
        }
    }
    postMsg=(val)=>{
        $.post('http://192.168.0.20:8989/post?session_id='+this.get_session(), { 'message': val } );
    }
    arrange_my_cards=(cards)=>{   //整理牌的格式
        let  cardMy=[];
        cards.split('.').map(i=>{
            cardMy.push(i.split(''));
        })
        return cardMy
    }
    deal_cards=(data)=>{    //发牌
        direct.map(item=>{
            data[0].slice(7,8)===item && this.state.myDirect === item ? 
            this.setState({
                myCards:this.addColor(this.arrange_my_cards(data[1]))[0],
                myCardsNum:this.arrange_my_cards(data[1]),
            }):null
        })
    }
    call_cards=(direct,card)=>{   //叫牌
        let calls=this.state.dataSource;
        if(direct==='N'){
            if(calls[count].N){ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].N=this.re_transfer(card,false);}else{ calls[count].N=this.re_transfer(card,false);}
        }
        if(direct==='E'){
            if(calls[count].E){ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].E=this.re_transfer(card,false);}else{ calls[count].E=this.re_transfer(card,false);}
        }
        if(direct==='S'){
            if(calls[count].S){ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].S=this.re_transfer(card,false);}else{ calls[count].S=this.re_transfer(card,false);}
        }
        if(direct==='W'){
            if(calls[count].W){ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].W=this.re_transfer(card,false);}else{ calls[count].W=this.re_transfer(card,false);}
        } 
        this.setState({
            dataSource:calls
        });
    }
 
    //发送消息
    click=(e)=>{
        // ♠ ♥ ♦ ♣ 
        let val = e.target.innerHTML;
        //打牌时
        if(!this.state.call){
            val = this.transfer(val,2);
            console.log(val)
            // let i1=0,i2=0;
            // this.state.myCards.map((item,index)=>{
            //     if(item.indexOf(val)>=0){
            //         i1=index;
            //         i2=item.indexOf(val);
            //         item.splice(item.indexOf(val),1)
            //     }
            // })
            // this.state.myCardsNum.map((item,index)=>{
            //     if(index===i1){
            //         item.splice(i2,1)
            //     }
            // })
        }else{
            //叫牌时
            val=this.transfer(val,1);
        }
        this.postMsg(val);
    }

    //计算方位
    calculateDirect=(dir)=>{
        let calculateDirect=null;
        let base = direct.indexOf(this.state.myDirect);
        dir==='top'?calculateDirect=direct[base+2]:null
        dir==='left'?calculateDirect=direct[base+1]:null
        dir==='right'?calculateDirect=direct[base-1]:null
        return calculateDirect;
    }

    // 处理发过来的牌：添加花色
    addColor=(cards,dir)=>{
        let addCards=[[],[],[],[]],colorCards=[[],[],[],[]];
        cards.map((item,index)=>{
            if(index===0&&item.length!==0){
                item.map(i=>{
                    {/*addCards[0].push(<span key={index+i} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={!this.state.call&&this.state.currentDirect===this.state.myDirect&&this.state.myDirect!==this.state.guard?this.click:null}>{i}{`\n`}{'♠'}</span>)*/}
                    addCards[0].push(<span key={index+i} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={!this.state.call?this.click:null}>{i}{`\n`}{'♠'}</span>)
                    colorCards[0].push(i+'s')
                })
            }
            if(index===1&&item.length!==0){
                item.map(i=>{
                    {/*addCards[1].push(<span key={index+i} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={!this.state.call&&this.state.currentDirect===this.state.myDirect&&this.state.myDirect!==this.state.guard?this.click:null}>{i}{`\n`}{'♥'}</span>)*/}
                    addCards[1].push(<span key={index+i} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={!this.state.call?this.click:null}>{i}{`\n`}{'♥'}</span>)
                    colorCards[1].push(i+'h')
                })
            }
            if(index===2&&item.length!==0){
                item.map(i=>{
                    {/* addCards[2].push(<span key={index+i} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={!this.state.call&&this.state.currentDirect===this.state.myDirect&&this.state.myDirect!==this.state.guard?this.click:null}>{i}{`\n`}{'♦'}</span>)*/}
                   addCards[2].push(<span key={index+i} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={!this.state.call?this.click:null}>{i}{`\n`}{'♦'}</span>)
                    colorCards[2].push(i+'d')
                })
            }
            if(index===3&&item.length!==0){
                item.map(i=>{
                     {/*addCards[3].push(<span key={index+i} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={!this.state.call&&this.state.currentDirect===this.state.myDirect&&this.state.myDirect!==this.state.guard?this.click:null}>{i}{`\n`}{'♣'}</span>)*/}
                   addCards[3].push(<span key={index+i} style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} onClick={!this.state.call?this.click:null}>{i}{`\n`}{'♣'}</span>)
                    colorCards[3].push(i+'c')
                })
            }
        })
        return [addCards,colorCards]  //两种格式：5♥  5h 
    }
    
    // 要发送的消息整理成‘5h’的格式
    transfer=(val,num)=>{
        if(val.split('')[num]==="♠"){val=val.split('')[0]+'s'}
        if(val.split('')[num]==="♥"){val=val.split('')[0]+'h'}
        if(val.split('')[num]==="♦"){val=val.split('')[0]+'d'}
        if(val.split('')[num]==="♣"){val=val.split('')[0]+'c'}
        return val;
    }
    //要显示的消息整理成5♥的格式
    re_transfer=(val,y)=>{
        let add = y ? `\n` :'';
        if(val.split('')[1]==='s'){val = val.split('')[0]+add+'♠'}
        if(val.split('')[1]==='h'){val = val.split('')[0]+add+'♥'}
        if(val.split('')[1]==='d'){val = val.split('')[0]+add+'♦'}
        if(val.split('')[1]==='c'){val = val.split('')[0]+add+'♣'}
        return val;
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
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>{this.state.topDirect}</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>{this.state.topName} {this.state.currentDirect===this.state.topDirect?'★':null}</Col>
                    <Col span={24} style={{display:!this.state.call&&this.state.guard==this.state.topDirect?'inline-block':'none',paddingLeft:10,textAlign:'center'}}>{this.state.guardCardsNum===null?null:this.addColor(this.state.guardCardsNum)[0]}</Col>
                </Row>
                <Row>
                {/* 左 */}
                    <Col span={2}>
                        <Row style={{height:300,writingMode: 'vertical-lr'}}>
                        <Col span={24} style={{height:60,background:'#0f0'}}>{this.state.leftDirect}</Col>
                        <Col span={24} style={{height:240,background:'#ff0'}}>{this.state.leftName} {this.state.currentDirect===this.state.leftDirect?'★':null}</Col>
                        </Row>
                    </Col>
                    <Col span={6} style={{display:!this.state.call&&this.state.guard===this.state.leftDirect?'inline-block':'none'}}>
                        <Row>
                            <Col span={24}>{this.state.guardCardsNum===null?null:this.addColor(this.state.guardCardsNum)[0][0]}</Col>
                            <Col span={24}>{this.state.guardCardsNum===null?null:this.addColor(this.state.guardCardsNum)[0][1]}</Col>
                            <Col span={24}>{this.state.guardCardsNum===null?null:this.addColor(this.state.guardCardsNum)[0][2]}</Col>
                            <Col span={24}>{this.state.guardCardsNum===null?null:this.addColor(this.state.guardCardsNum)[0][3]}</Col>
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
                   <Col span={this.state.guard===this.state.leftDirect||this.state.guard==this.state.rightDirect?14:20} style={{display:this.state.call?'none':'inline-block',height:200,textAlign:'center',verticalAlign:'middle'}}>
                        <Row>
                            <Col span={24} style={{textAlign:'center'}}>
                                <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.currentCardT}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{textAlign:'left'}}>
                                <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.currentCardL}</p>
                            </Col>
                            <Col span={12} style={{textAlign:'right'}}>
                                <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.currentCardR}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{textAlign:'center'}}>
                                <p style={{width:30,border:'1px solid #ddd',borderRadius:5,background:'#ccc',textAlign:'center',padding:10,margin:'0 auto'}}>{this.state.currentCardB}</p>
                            </Col>
                        </Row>
                    </Col>
                {/* 右 */}
                    <Col span={6} style={{display:!this.state.call&&this.state.guard==this.state.rightDirect?'inline-block':'none',textAlign:'right'}}>
                    <Row>
                    <Col span={24}>{this.state.guardCardsNum===null?null:this.addColor(this.state.guardCardsNum)[0][0]}</Col>
                    <Col span={24}>{this.state.guardCardsNum===null?null:this.addColor(this.state.guardCardsNum)[0][1]}</Col>
                    <Col span={24}>{this.state.guardCardsNum===null?null:this.addColor(this.state.guardCardsNum)[0][2]}</Col>
                    <Col span={24}>{this.state.guardCardsNum===null?null:this.addColor(this.state.guardCardsNum)[0][3]}</Col>
                </Row>
                    </Col>
                    <Col span={2}>
                        <Row style={{height:300,writingMode: 'vertical-lr',float:'right'}}>
                        <Col span={24} style={{height:60,background:'#0f0'}}>{this.state.rightDirect}</Col>
                        <Col span={24} style={{height:240,background:'#ff0'}}>{this.state.rightName} {this.state.currentDirect===this.state.rightDirect?'★':null}</Col>
                        </Row>
                    </Col>
                </Row>
                {/* 下 */}
                <Row style={{marginTop:10}}>
                    <Col span={24} style={{paddingLeft:10,textAlign:'center'}}>{this.state.myCardsNum===null?null:this.addColor(this.state.myCardsNum)[0]}</Col>
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>{this.state.myDirect}</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>{this.state.myName} {this.state.currentDirect===this.state.myDirect?'★':null}</Col>
                </Row>
            </div>
        )
    }
}
