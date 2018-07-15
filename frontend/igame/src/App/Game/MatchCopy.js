import React from 'react'
import  {Flex, Button, WingBlank} from 'antd-mobile'
import { Row, Col, Table, Icon, Divider ,Input } from 'antd';
import Session from '../User/session'

import Polling from '../OdooRpc/Polling'
import Board from '../OdooRpc/Board'
import Channel from '../OdooRpc/Channel'
import Model from '../OdooRpc/OdooRpc'

// spades: 黑桃  hearts: 红桃  diamond: 方块  clubs: 梅花    ♠ ♥ ♦ ♣ 
const columns = [
    { title: 'N', dataIndex: 'N', key: 'N'},
    { title: 'E', dataIndex: 'E', key: 'E'},
    { title: 'S', dataIndex: 'S', key: 'S'},
    { title: 'W', dataIndex: 'W', key: 'W'},];

const dbl = ['Pass','X','XX',]
const suit=[
    ['1♠','2♠','3♠','4♠','5♠','6♠','7♠'],
    ['1♥','2♥','3♥','4♥','5♥','6♥','7♥'],
    ['1♦','2♦','3♦','4♦','5♦','6♦','7♦'],
    ['1♣','2♣','3♣','4♣','5♣','6♣','7♣'],
    ['1NT','2NT','3NT','4NT','5NT','6NT','7NT']
]
const direct = [ 'N' ,'E','S','W',]

let count=0
let pass=['1s','Pass','Pass','Pass']
let pollingId=1

// "942.AQT4.AT7.T32   N       J85.K85.9865.AQ4   E       AQT.7632.KQ432.9   S           K763.J9.J.KJ8765  W"
export default class PokerTable extends React.Component{
    state={
        contract:null,//定约
        deal:false, //是否发牌
        call:false, //是否处于叫牌状态
        play:false,  //是否处于打牌状态
        channel_id:null,//频道ID
        board_id:null,  //board id
        cards:null,   //四个方位的牌
        dataSource:[{  //叫牌表格
            key:count,
            N:'',
            E:'',
            S:'',
            W:'',
        }],
        declarer:null, //庄家方位 
        dummy:null,  //明手方位
        myDirect:null, //我所在方位
        myName:null,  
        topDirect:null, //对家
        topName:null, //对家
        rightDirect:null, //右侧
        rightName:null, //右侧
        leftDirect:null, //左侧
        leftName:null, //左侧
        myCards:null, //我的牌，消息格式
        myCardsNum:null,//我的牌，全数字
        dummyCards:null, //我的牌，消息格式
        dummyCardsNum:null,//我的牌，全数字
        callDirect:null, //当前应该哪个方位叫牌  ** 
        callCards:null, //我，叫的牌  ** 
        openLeader:null, //首攻  
        currentDirect:null, //当前应该哪个方位打牌 
        currentCardB:null, // 我，当前出的牌 
        currentCardT:null, // 我的对家，当前出的牌 
        currentCardL:null, // 左侧，当前出的牌 
        currentCardR:null, // 右侧，当前出的牌 
        piersCount:0, // 墩，计数  ** 
        allPiers:[],  // 所有墩  ** 
        currentPiers:[], // 当前墩 
        scoreSN:0,  //SN方位得分  ** 
        scoreEW:0,  //EW方位得分  ** 
        piersSN:0,  //  ** 
        piersEW:0,   //  ** 
        claimCount:0,
    }

    jsonrpc(uri,data=null){
        const sid = Session.get_sid();
        if(sid) uri += '?session_id=' + sid;
        const data1 = {
            "jsonrpc": "2.0",
            "method": "call",
            "id": 123,
            "params": data
        }
        fetch(uri, {
            method: 'POST',
            body: JSON.stringify(data1), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type':'application/json'
            })
        }).then(res=>res.json()
        ).catch(error=>console.error('Error:',error)
        ).then(response => {
            console.log(response.result);
            if (response.result){
                this.sucPolling(response.result)
            }else{
                this.failPolling(response.result)
            }
        });
    }

    componentDidMount(){
        // 建立连接
        this.polling()
        // const poll = new Polling(this.sucPolling,this.failPolling); //说明：传入回调函数
        // poll.polling(pollingId);  //说明：调用Models里面定义好的方法，传入相应的参数

        //加入当前比赛的频道
        const JoinChannel = new Channel(this.sucChannel,this.failChannel);
        JoinChannel.join_channel(6);   // 6 : table_id
 
    }
    polling(last) {    //接收消息
        const uri = 'http://192.168.0.112:8069' + '/longpolling/igame'
        last = pollingId
        const  data = { "channels": [], "last": last, "options": {} }
        this.jsonrpc(uri,data)
    }

    sucChannel=(data)=>{   //加入比赛聊天频道成功
        //[42,[44, 40, 41, 38, 43, 39, 45, 42]] [channel_id,[board_id1,board_id2,board_id3...]]
        this.setState({
            channel_id:data[0],
            board_id:data[1][0]
        })
        this.post('init',44,this.state.channel_id)   //初始化牌桌
    }
    failChannel=()=>{ /*加入比赛聊天频道失败 */ }

    post(m,...data){
        const  board= new Board(this.sucPost,this.failPost); 
        m==='init'?board.init_board(...data):null;   //初始化牌桌
        m==='call'?board.bid(...data):null;    //发送叫牌消息
        m==='call_result'?board.call_result(...data):null;    //查询叫牌结果
        m==='play'?board.play(...data):null;       //发送打牌消息
    }
    sucPost=(data)=>{
        console.log(data)  
        if(!this.state.deal){   //初始化牌桌
            //{cards: "942.AQT4.AT7.T32 J85.K85.9865.AQ4 AQT.7632.KQ432.9 K763.J9.J.KJ8765", players: Array(4), dealer: "S", vulnerable: "BO"}
            let i=null, s = null;
            data.players.map((item,index)=>{ if(item[0]===Session.get_name()){i=index} })
            direct.map((item,index)=>{ if(data.players[i][1]===item){s=index} })
            this.deal_cards(data.cards.split(' ')[s]);
            this.setState({
                cards:data.cards.split(' '),
                deal:true,
                call:true,
                myDirect:data.players[i][1],
                myName:data.players[i][0],
                callDirect:data.dealer,
                topDirect:direct[direct.indexOf(data.players[i][1])+2]||direct[direct.indexOf(data.players[i][1])-2],
                rightDirect:direct[direct.indexOf(data.players[i][1])-1]||direct[direct.indexOf(data.players[i][1])+3],
                leftDirect:direct[direct.indexOf(data.players[i][1])+1]||direct[direct.indexOf(data.players[i][1])-3],
                topName:data.players.filter(item=>{
                            return item[1]===direct[direct.indexOf(data.players[i][1])+2]||item[1]===direct[direct.indexOf(data.players[i][1])-2]
                        })[0][0],
                rightName:data.players.filter(item=>{
                            return item[1]===direct[direct.indexOf(data.players[i][1])-1]||item[1]===direct[direct.indexOf(data.players[i][1])+3]
                        })[0][0],
                leftName:data.players.filter(item=>{
                            return item[1]===direct[direct.indexOf(data.players[i][1])+1]||item[1]===direct[direct.indexOf(data.players[i][1])-3]
                        })[0][0],
            })
        }
        // if(!this.state.call&&!this.state.play){ //叫牌完毕，处理叫牌结果 
        //     this.setState({
        //         play:true
        //     })
        // }
        if(this.state.play){   //打牌过程

        }
    }
    failPost=()=>{ console.log('打牌fail') }
    
    sucPolling=(data)=>{
        console.log(data)
        console.log(pollingId)
        if (data.length){
            pollingId=data.slice(-1)[0]['id'];
            let body = data[data.length-1].message.body;    //"<p>{'board_id': 44, 'number': 1, 'name': u'1S', 'pos': u'S'}</p>"
            body = body.replace(/u'/g,"'").replace(/ /g,'')
            body = eval('('+body.substring(3,body.length-4)+')')  //{board_id: 44, number: 1, name: '1S', pos: 'S'}

            if(body.board_id&&body.name&&body.pos&&body.number){  //收到叫牌消息   {board_id: 44, number: 1, name: '1S', pos: 'S'}
                this.setState({
                    callDirect:direct[direct.indexOf(body.pos)+1]||direct[direct.indexOf(body.pos)-3]
                })
                // if(body.pos==='S'){this.setState({callDirect:'W'})}
                // if(body.pos==='W'){this.setState({callDirect:'N'})}
                // if(body.pos==='N'){this.setState({callDirect:'E'})}
                // if(body.pos==='E'){this.setState({callDirect:'S'})}
                this.call_cards(body.pos,body.name)   //在页面展示叫牌信息
            }
            if(body.dummy&&body.openlead&&body.declarer){   //收到叫牌结果信息   {dummy:'N',openlead:'W',declarer:'S',nextplayer:'W',contract:'1S'}
                let m=direct.indexOf(body.dummy);
                this.setState({
                    call:false,
                    play:true,
                    openLeader:body.openlead,
                    currentDirect:body.openlead,
                    dummy:body.dummy,
                    declarer:body.declarer,
                    contract:body.contract,
                    dummyCards:this.addColor(this.arrange_my_cards(this.state.cards[m]))[1],
                    dummyCardsNum:this.arrange_my_cards(this.state.cards[m]),
                })
            }
            if(body.number&&body.rank&&body.card){   //收到打牌消息 {declarer_win:0,number:1,rank:'5',pos:'W',suit:'C',nextplayer:'W',card:'C5',opp_win:0}
                if(this.state.currentPiers.length===4){
                    this.setState({
                        currentCardT:null,
                        currentCardB:null,
                        currentCardL:null,
                        currentCardR:null,
                        currentPiers:[],
                        // piersSN:body.ns_win,
                        // piersEW:body.ew_win,
                    })
                }else{
                    body.pos===this.state.topDirect?this.setState({currentCardT:this.re_transfer(body.card,0,1,true)}):null;
                    body.pos===this.state.myDirect?this.setState({currentCardB:this.re_transfer(body.card,0,1,true)}):null;
                    body.pos===this.state.leftDirect?this.setState({currentCardL:this.re_transfer(body.card,0,1,true)}):null;
                    body.pos===this.state.rightDirect?this.setState({currentCardR:this.re_transfer(body.card,0,1,true)}):null;
                    this.state.currentPiers.push({pos:body.pos,card:body.card})
                }
                this.setState({ /* currentDirect:body.nextplayer */ })
                // body.nextplayer===this.state.dummy?this.setState({ /* currentDirect:this.state.declarer */ }):this.setState({ /* currentDirect:body.nextplayer */ })
            }    
        } 
        this.polling()
    }
    failPolling=()=>{ console.log('fail') }
    
    //发送消息
    click=(e)=>{
        let val = e.target.innerHTML;
        //打牌时
        if(!this.state.call){
            val = this.transfer(val,2,false);
            this.post('play',this.state.board_id,this.state.myDirect,val,this.state.channel_id); //发送打牌信息
        }else{
            //叫牌时
            val=this.transfer(val,1,true);
            pass.push(val) 
            this.post('call',this.state.board_id,this.state.myDirect,val,this.state.channel_id);   //发送叫牌信息
            console.log(pass)
            if(pass.length>3){
                console.log(pass)
                let length = pass.length;
                if(pass[length-1]==='Pass'&&pass[length-2]==='Pass'&&pass[length-3]==='Pass'){
                    //查询叫牌结果
                    this.post('call_result',this.state.board_id,this.state.channel_id); 
                    // this.setState({ call:false, })
                }
            }
        }
    }
    arrange_my_cards=(cards)=>{   //整理牌的格式 
        let  cardMy=[];
        cards.split('.').map(i=>{
            cardMy.push(i.split(''));
        })
        return cardMy
    }
    deal_cards=(data)=>{    //展示己方牌面
        this.setState({
            myCards:this.addColor(this.arrange_my_cards(data))[1],
            myCardsNum:this.arrange_my_cards(data),
        })
    }
    call_cards=(direct,card)=>{   //展示叫牌信息
        let calls=this.state.dataSource;
        if(direct==='N'){
            if(!calls[count].N&&!calls[count].E&&!calls[count].S&&!calls[count].W){ calls[count].N=this.re_transfer(card,1,0,false);}else{ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].N=this.re_transfer(card,1,0,false);}
            // if(calls[count].N){ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].N=this.re_transfer(card,1,0,false);}else{ calls[count].N=this.re_transfer(card,1,0,false);}
        }
        if(direct==='E'){
            if(!calls[count].E&&!calls[count].S&&!calls[count].W){ calls[count].E=this.re_transfer(card,1,0,false);}else{ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].E=this.re_transfer(card,1,0,false);}
            // if(calls[count].E){ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].E=this.re_transfer(card,1,0,false);}else{ calls[count].E=this.re_transfer(card,1,0,false);}
        }
        if(direct==='S'){
            if(!calls[count].S&&!calls[count].W){ calls[count].S=this.re_transfer(card,1,0,false);}else{ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].S=this.re_transfer(card,1,0,false);}
            // if(calls[count].S){ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].S=this.re_transfer(card,1,0,false);}else{ calls[count].S=this.re_transfer(card,1,0,false);}
        }
        if(direct==='W'){
            if(!calls[count].W){ calls[count].W=this.re_transfer(card,1,0,false);}else{ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].W=this.re_transfer(card,1,0,false);}
            // if(calls[count].W){ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].W=this.re_transfer(card,1,0,false);}else{ calls[count].W=this.re_transfer(card,1,0,false);}
        } 
        this.setState({
            dataSource:calls
        });
    }

    // 处理发过来的牌：添加花色
    addColor=(cards,dir)=>{
        let addCards=[[],[],[],[]],colorCards=[[],[],[],[]];
        cards.map((item,index)=>{
            if(index===0&&item.length!==0){
                item.map(i=>{
                    addCards[0].push(<span 
                        key={index+i} 
                        style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} 
                        // onClick={this.state.play&&this.state.currentDirect===this.state.myDirect?this.click:null}
                        onClick={this.click}
                        >
                        {i}{`\n`}{'♠'}
                        </span>)
                    colorCards[0].push(i+'s')
                })
            }
            if(index===1&&item.length!==0){
                item.map(i=>{
                    addCards[1].push(<span 
                        key={index+i} 
                        style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} 
                        // onClick={this.state.play&&this.state.currentDirect===this.state.myDirect?this.click:null}
                        onClick={this.click}
                        >
                        {i}{`\n`}{'♥'}
                        </span>)
                    colorCards[1].push(i+'h')
                })
            }
            if(index===2&&item.length!==0){
                item.map(i=>{
                     addCards[2].push(<span 
                        key={index+i} 
                        style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} 
                        // onClick={this.state.play&&this.state.currentDirect===this.state.myDirect?this.click:null}
                        onClick={this.click}
                        >
                        {i}{`\n`}{'♦'}
                        </span>)
                    colorCards[2].push(i+'d')
                })
            }
            if(index===3&&item.length!==0){
                item.map(i=>{
                     addCards[3].push(<span 
                        key={index+i} 
                        style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} 
                        // onClick={this.state.play&&this.state.currentDirect===this.state.myDirect?this.click:null}
                        onClick={this.click}
                        >
                        {i}{`\n`}{'♣'}</span>)
                    colorCards[3].push(i+'c')
                })
            }
        })
        return [addCards,colorCards]  //两种格式：5♥  5h 
    }
    
    // 要发送的消息整理成‘5H’或‘H5’的格式
    transfer=(val,num,y=true)=>{
        if(y){
            if(val.split('')[num]==="♠"){val=val.split('')[0]+'S'}
            if(val.split('')[num]==="♥"){val=val.split('')[0]+'H'}
            if(val.split('')[num]==="♦"){val=val.split('')[0]+'D'}
            if(val.split('')[num]==="♣"){val=val.split('')[0]+'C'}
        }else{
            if(val.split('')[num]==="♠"){val='S'+val.split('')[0]}
            if(val.split('')[num]==="♥"){val='H'+val.split('')[0]}
            if(val.split('')[num]==="♦"){val='D'+val.split('')[0]}
            if(val.split('')[num]==="♣"){val='C'+val.split('')[0]}
        }
        return val;
    }
    //要显示的消息整理成5♥的格式
    re_transfer=(val,num1,num2,y)=>{
        let add = y ? `\n` :''; 
        if(val.split('')[num1]==='S'){val = val.split('')[num2]+add+'♠'}
        if(val.split('')[num1]==='H'){val = val.split('')[num2]+add+'♥'}
        if(val.split('')[num1]==='D'){val = val.split('')[num2]+add+'♦'}
        if(val.split('')[num1]==='C'){val = val.split('')[num2]+add+'♣'}
        return val;
    }

    render(){
        // 叫牌所需花色及墩数
        let callSuitS = [];
        suit.map((items,i)=>{
            items.map((item,index)=>{
                // callSuitS.push(<span key={item} style={{display:'inline-block',width:35,height:25,margin:3,border:'1px solid #ccc',borderRadius:3,textAlign:'center'}} onClick={this.state.deal?this.click:null}>{item}</span>)
                callSuitS.push(<span key={item} style={{display:'inline-block',width:35,height:25,margin:3,border:'1px solid #ccc',borderRadius:3,textAlign:'center'}} onClick={this.state.deal&&this.state.call&&this.state.callDirect===this.state.myDirect?this.click:null}>{item}</span>)
            })
        })
        let callDbl = [];
        dbl.map((item,i)=>{
            // callDbl.push(<span key={item} style={{display:'inline-block',width:35,height:25,margin:3,border:'1px solid #ccc',borderRadius:3,textAlign:'center'}} onClick={this.state.deal?this.click:null}>{item}</span>)
            callDbl.push(<span key={item} style={{display:'inline-block',width:35,height:25,margin:3,border:'1px solid #ccc',borderRadius:3,textAlign:'center'}} onClick={this.state.deal&&this.state.call&&this.state.callDirect===this.state.myDirect?this.click:null}>{item}</span>)
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
                    <Col span={6}>
                        <Row><span>Claim:</span></Row>
                        <Row><Input value={this.state.claimCount} onChange={(e)=>this.setState({claimCount:e.target.value})} onPressEnter={(e)=>this.postMsg('claim'+this.state.claimCount)} disabled={!(this.state.currentDirect===this.state.myDirect)}></Input></Row>
                    </Col>
                </Row>
                {/* 上 */}
                <Row style={{marginBottom:10}}>
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>{this.state.topDirect}</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>{this.state.topName} {this.state.declarer===this.state.topDirect?'庄家':null}{this.state.currentDirect===this.state.topDirect?'★':null}</Col>
                    <Col span={24} style={{display:this.state.play&&this.state.dummy==this.state.topDirect?'inline-block':'none',paddingLeft:10,textAlign:'center'}}>{this.state.dummyCardsNum===null?null:this.addColor(this.state.dummyCardsNum)[0]}</Col>
                </Row>
                <Row>
                {/* 左 */}
                    <Col span={2}>
                        <Row style={{height:300,writingMode: 'vertical-lr'}}>
                        <Col span={24} style={{height:60,background:'#0f0'}}>{this.state.leftDirect}</Col>
                        <Col span={24} style={{height:240,background:'#ff0'}}>{this.state.leftName} {this.state.declarer===this.state.leftDirect?'庄家':null}{this.state.currentDirect===this.state.leftDirect?'★':null}</Col>
                        </Row>
                    </Col>
                    <Col span={6} style={{display:this.state.play&&this.state.dummy===this.state.leftDirect?'inline-block':'none'}}>
                        <Row>
                            <Col span={24}>{this.state.dummyCardsNum===null?null:this.addColor(this.state.dummyCardsNum)[0][0]}</Col>
                            <Col span={24}>{this.state.dummyCardsNum===null?null:this.addColor(this.state.dummyCardsNum)[0][1]}</Col>
                            <Col span={24}>{this.state.dummyCardsNum===null?null:this.addColor(this.state.dummyCardsNum)[0][2]}</Col>
                            <Col span={24}>{this.state.dummyCardsNum===null?null:this.addColor(this.state.dummyCardsNum)[0][3]}</Col>
                        </Row>
                    </Col>
                {/* 叫牌区 */}
                    <Col span={20} style={{display:this.state.call&&!this.state.play?'inline-block':'none'}}>
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
                   <Col span={this.state.dummy===this.state.leftDirect||this.state.dummy==this.state.rightDirect?14:20} style={{display:!this.state.call&&this.state.play?'none':'inline-block',height:200,textAlign:'center',verticalAlign:'middle'}}>
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
                    <Col span={6} style={{display:this.state.play&&this.state.dummy==this.state.rightDirect?'inline-block':'none',textAlign:'right'}}>
                    <Row>
                    <Col span={24}>{this.state.dummyCardsNum===null?null:this.addColor(this.state.dummyCardsNum)[0][0]}</Col>
                    <Col span={24}>{this.state.dummyCardsNum===null?null:this.addColor(this.state.dummyCardsNum)[0][1]}</Col>
                    <Col span={24}>{this.state.dummyCardsNum===null?null:this.addColor(this.state.dummyCardsNum)[0][2]}</Col>
                    <Col span={24}>{this.state.dummyCardsNum===null?null:this.addColor(this.state.dummyCardsNum)[0][3]}</Col>
                </Row>
                    </Col>
                    <Col span={2}>
                        <Row style={{height:300,writingMode: 'vertical-lr',float:'right'}}>
                        <Col span={24} style={{height:60,background:'#0f0'}}>{this.state.rightDirect}</Col>
                        <Col span={24} style={{height:240,background:'#ff0'}}>{this.state.rightName} {this.state.declarer===this.state.rightDirect?'庄家':null}{this.state.currentDirect===this.state.rightDirect?'★':null}</Col>
                        </Row>
                    </Col>
                </Row>
                {/* 下 */}
                <Row style={{marginTop:10}}>
                    <Col span={24} style={{paddingLeft:10,textAlign:'center'}}>{this.state.myCardsNum===null?null:this.addColor(this.state.myCardsNum)[0]}</Col>
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>{this.state.myDirect}</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>{this.state.myName} {this.state.declarer===this.state.myDirect?'庄家':null}{this.state.currentDirect===this.state.myDirect?'★':null}</Col>
                </Row>
            </div>
        )
    }
}
