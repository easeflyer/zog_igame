import React from 'react'
import  {Flex, Button, WingBlank} from '../../../node_modules/_antd-mobile@2.2.0@antd-mobile'
import { Row, Col, Table, Icon, Divider ,Input } from '../../../node_modules/_antd@3.6.3@antd';
import $ from 'jquery';
import Session from '../User/session'

import Polling from '../OdooRpc/Polling'
import Board from '../OdooRpc/Board'
import Channel from '../OdooRpc/Channel'
import Model from '../OdooRpc/OdooRpc'

// N: 201 S:203 E:202 W 204
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
const user =[ '201', '202', '203','204',]

let count=0
let pass=['1s','Pass','Pass','Pass']
let less1=1

"942.AQT4.AT7.T32   N       J85.K85.9865.AQ4   E       AQT.7632.KQ432.9   S           K763.J9.J.KJ8765  W"
export default class PokerTable extends React.Component{
    // 叫牌完成后，返回值：定约，明守方牌面，首墩第一个出牌方位，
    // 打牌过程（墩）：当前出牌方位所出牌面，下一个出牌方位（根据出牌方位判断己方是否可出牌）
    constructor(props){
        super(props);
    }
    state={
        contract:null,
        deal:false, //是否发牌
        call:true, //是否处于叫牌状态
        play:false,  //是否处于打牌状态
        channel_id:null,//频道ID
        board_id:null,  
        calculate:true,
        cards:null,
        dataSource:[{
            key:count,
            N:'',
            E:'',
            S:'',
            W:'',
        }],
        banker:null, //庄家方位 
        guard:null,  //明手方位
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
        guardCards:null, //我的牌，消息格式
        guardCardsNum:null,//我的牌，全数字
        
        callDirect:null, //当前应该哪个方位叫牌  ** 
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

    componentDidMount(){
        this.polling()
        // this.sse();
        // 建立连接
        // const poll = new Polling(this.sucPolling,this.failPolling); //说明：传入回调函数
        // poll.polling();  //说明：调用Models里面定义好的方法，传入相应的参数
       

        // 发送叫牌消息
        // const  board= new Board(this.sucPost,this.failPost); //说明：传入回调函数
        // board.bid();  //说明：调用Models里面定义好的方法，传入相应的参数
        const JoinChannel = new Channel(this.sucChannel,this.failChannel);
        JoinChannel.join_channel(6);
        // this.post('call_result',this.state.board_id,this.state.channel_id);
 
    }
    polling(last) {
        const uri = 'http://192.168.0.112:8069' + '/longpolling/igame'
        // last = window.last;
        last = less1
        const  data = { "channels": [], "last": last, "options": {} }
        this.jsonrpc(uri,data,[],this.sucPolling)
    }
    jsonrpc(uri,data=null,headers=null,cb){
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

    post(m,...data){
        const  board= new Board(this.sucPost,this.failPost); //说明：传入回调函数
        m==='call'?board.bid(...data):null;
        m==='call_result'?board.call_result(...data):null;
        m==='play'?board.play(...data):null;
        m==='init'?board.init_board(...data):null;
    }
    sucPost=(data)=>{
        console.log(data)  ////{cards: "942.AQT4.AT7.T32 J85.K85.9865.AQ4 AQT.7632.KQ432.9 K763.J9.J.KJ8765", players: Array(4), dealer: "S", vulnerable: "BO"}
        if(!this.state.deal){   //处理发牌
            let i=null;
            let s = null;
            data.players.map((item,index)=>{
                if(item[0]===Session.get_name()){
                    i=index
                }
            })
            direct.map((item,index)=>{
                if(data.players[i][1]===item){
                    s=index
                }
            })
            this.deal_cards(data.cards.split(' ')[s]);
            this.setState({
                cards:data.cards.split(' '),
                deal:true,
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
        if(!this.state.call&&!this.state.play){ //叫牌完毕，处理叫牌结果 
            this.setState({
                play:true
            })
        }
        if(this.state.play){   //打牌过程

        }
    }
    failPost=()=>{
        console.log('打牌fail')
    }
    sucChannel=(data)=>{
        // console.log(data)  //[42,[44, 40, 41, 38, 43, 39, 45, 42]]
        this.setState({
            channel_id:data[0],
            board_id:data[1][0]
        })
        this.post('init',44,this.state.channel_id)   
    }
    failChannel=()=>{

    }
    sucPolling=(data)=>{
        console.log(data)
        console.log(less1)
        if (data.length){
            // window.last = data.slice(-1)[0]['id'];
            less1=data.slice(-1)[0]['id'];
            console.log(less1)
            let body = data[data.length-1].message.body;
            body = body.replace(/u'/g,"'").replace(/ /g,'')
            body = eval('('+body.substring(3,body.length-4)+')')
            //"<p>{'board_id': 44, 'number': 1, 'name': u'1S', 'pos': u'S'}</p>"
            if(body.board_id&&body.name&&body.pos&&body.number){  //收到叫牌消息
                if(body.pos==='S'){this.setState({callDirect:'W'})}
                if(body.pos==='W'){this.setState({callDirect:'N'})}
                if(body.pos==='N'){this.setState({callDirect:'E'})}
                if(body.pos==='E'){this.setState({callDirect:'S'})}
                this.call_cards(body.pos,body.name)   //在页面展示叫牌信息
                // console.log(body.pos)
                // console.log(this.state.callDirect)
            }
            if(body.dummy&&body.openlead&&body.declarer){   //"<p>{'dummy': 'N', 'openlead': 'W', 'declarer': u'S', 'nextplayer': 'W', 'contract': u'1S'}</p>"
                let m=direct.indexOf(body.dummy);
                this.setState({
                    call:false,
                    openLeader:body.openlead,
                    currentDirect:body.openlead,
                    guard:body.dummy,
                    banker:body.declarer,
                    contract:body.contract,
                    guardCards:this.addColor(this.arrange_my_cards(this.state.cards[m]))[1],
                    guardCardsNum:this.arrange_my_cards(this.state.cards[m]),
                })
            }
            if(body.number&&body.rank&&body.card){   //"<p>{'declarer_win': 0, 'number': 1, 'rank': u'5', 'pos': u'W', 'suit': u'C',  'nextplayer': 'W', 'card': u'C5', 'opp_win': 0}</p>"
                this.setState({
                    // currentDirect:body.nextplayer
                })
            }    
            
        } 
        this.polling()
    }
    failPolling=()=>{
        console.log('fail')
    }
    
    //发送消息
    click=(e)=>{
        // ♠ ♥ ♦ ♣ 
        let val = e.target.innerHTML;
        //打牌时
        if(!this.state.call){
            val = this.transfer(val,2,false);
            console.log(val);
            this.post('play',this.state.board_id,this.state.myDirect,val,this.state.channel_id);  ///////////////
        }else{
            //叫牌时
            val=this.transfer(val,1,true);
            // this.call_cards(this.state.myDirect,val)
            // console.log(val); //'2s'
            // pass.push(val) 
            console.log(pass)  
            // this.post('call',this.state.board_id,this.state.myDirect,val,this.state.channel_id);   ///////////////
            if(pass.length>3){
                console.log(pass)
                let length = pass.length;
                if(pass[length-1]==='Pass'&&pass[length-2]==='Pass'&&pass[length-3]==='Pass'){
                    //查询叫牌结果
                    this.post('call_result',this.state.board_id,this.state.channel_id);  ////////////////
                    this.setState({
                        call:false,
                    })
                }
            }
        }
        // this.postMsg(val);
    }
    
    sse=()=> {
        let i=0;
        const this_=this;
        // var source = new EventSource('http://124.42.117.43:8989/stream');  // 监听这个网址的消息。事件。
        var source = new EventSource('http://192.168.0.20:8989/stream');  // 监听这个网址的消息。事件。
        source.onmessage = function (e) {
            console.log(e.data)
            // if(e.data.split(':').length===2 && e.data.split(':')[0].slice(0,6)==='SERVER'){   //发牌  SERVER(N):J92.K64.KJ84.J32
            //     let data=e.data.split(':');
            //     this_.state.cards.push(data);
            //     this_.deal_cards(data);
            //     this_.setState({ //初始化
            //         deal:true,  // 
            //         call:true,
            //         dataSource:[{
            //             key:count,
            //             N:'',
            //             E:'',
            //             S:'',
            //             W:'',
            //         }],
            //         claimCount:0,
            //         currentDirect:null
            //     })
            // }
            // if(this_.state.call && e.data.split(' ').length===3){   //叫牌    [10:18:47] 201: 1s
            //     let call_direct = direct[user.indexOf(e.data.split(' ')[1].slice(0,3))];  //方位
            //     let call_card = e.data.split(' ')[2];   //叫的牌
            //     this_.call_cards(call_direct,call_card);
            //     this_.setState({
            //         callDirect:direct[user.indexOf(e.data.split(' ')[1].slice(0,3))+1]||direct[user.indexOf(e.data.split(' ')[1].slice(0,3))-3]
            //     })
            // }
            if(e.data.split(' ')[1]==='card:'){   //calculate？叫牌结束，设置庄家、明守、首攻：接收到下一轮出牌方信息  E card: AK.AQJT875.T.Q85
                if(this_.state.calculate){
                    this_.setState({
                        call:false,    //设置不处于叫牌状态
                        openLeader: e.data.split(' ')[0],   //设置首攻
                        banker:direct[direct.indexOf(e.data.split(' ')[0])+3]||direct[direct.indexOf(e.data.split(' ')[0])-1],   //设置庄家
                        guard:direct[direct.indexOf(e.data.split(' ')[0])+1]||direct[direct.indexOf(e.data.split(' ')[0])-3],    //设置明守
                        calculate:false,
                    })
                    let data =this_.state.cards[ direct.indexOf(e.data.split(' ')[0])+1]||this_.state.cards[ direct.indexOf(e.data.split(' ')[0])-3]
                    console.log(data)
                    this_.setState({
                        guardCards:this_.addColor(this_.arrange_my_cards(data[1]))[1],
                        guardCardsNum:this_.arrange_my_cards(data[1]),
                    })
                }
                // if(e.data.split(' ')[0]===this_.state.currentDirect){
                //     this_.state.currentDirect===this_.state.topDirect?this_.setState({currentCardT:null}):null;
                //     this_.state.currentDirect===this_.state.myDirect?this_.setState({currentCardB:null}):null;
                //     this_.state.currentDirect===this_.state.leftDirect?this_.setState({currentCardL:null}):null;
                //     this_.state.currentDirect===this_.state.rightDirect?this_.setState({currentCardR:null}):null;
                //     let is = null;
                //     this_.state.currentPiers.map((item,index)=>{
                //         item.dir===this_.state.currentDirect?is = index:null;
                //         return is;
                //     })
                //     this_.state.currentPiers = this_.state.currentPiers.splice(is,1);
                // }
                if(e.data.split(' ')[0]===this_.state.myDirect){this_.setState({myCardsNum:this_.arrange_my_cards(e.data.split(' ')[2])})}
                if(e.data.split(' ')[0]===this_.state.guard){this_.setState({guardCardsNum:this_.arrange_my_cards(e.data.split(' ')[2])})}
                this_.setState({
                    currentDirect:e.data.split(' ')[0],
                })
                // if(this_.state.currentPiers.length===4){
                //     setTimeout(()=>{
                //         this_.setState({
                //             currentCardB:null,
                //             currentCardT:null,
                //             currentCardL:null,
                //             currentCardR:null,
                //             currentPiers:[]
                //         })
                //     },1000)
                // }
            }
            if(!this_.state.call && e.data.split(' ').length===3 && e.data.split(' ')[1].slice(3,4)===':' && e.data.split(' ')[2].slice(0,4)!=='claim'){  //接收到打牌消息   [10:19:04] 202: c5
                let play_direct = direct[user.indexOf(e.data.split(' ')[1].slice(0,3))];  //方位
                let play_card = e.data.split(' ')[2];   //出的牌 c5格式
                this_.setState({currentSuit:play_card.slice(1,1)})
                let val = e.data.split(' ')[2].split('').reverse().join('');   //出的牌 5c格式
                play_direct===this_.state.topDirect?this_.setState({currentCardT:this_.re_transfer(play_card,0,1,true)}):null;
                play_direct===this_.state.myDirect?this_.setState({currentCardB:this_.re_transfer(play_card,0,1,true)}):null;
                play_direct===this_.state.leftDirect?this_.setState({currentCardL:this_.re_transfer(play_card,0,1,true)}):null;
                play_direct===this_.state.rightDirect?this_.setState({currentCardR:this_.re_transfer(play_card,0,1,true)}):null;
                this_.state.currentPiers.push({dir:play_direct,card:play_card})
                if(play_direct===this_.state.myDirect){
                    let i1=0,i2=0;
                    this_.state.myCards.map((item,index)=>{
                        if(item.indexOf(val)>=0){
                            i1=index;
                            i2=item.indexOf(val);
                            item.splice(item.indexOf(val),1)
                        }
                    })
                    this_.state.myCardsNum.map((item,index)=>{
                        if(index===i1){
                            item.splice(i2,1)
                        }
                    })
                }
                if(play_direct===this_.state.guard){
                    let i1=0,i2=0;
                    this_.state.guardCards.map((item,index)=>{
                        if(item.indexOf(val)>=0){
                            i1=index;
                            i2=item.indexOf(val);
                            item.splice(item.indexOf(val),1)
                        }
                    })
                    this_.state.guardCardsNum.map((item,index)=>{
                        if(index===i1){
                            item.splice(i2,1)
                        }
                    })
                }
                
            }
            // if(!this_.state.call && e.data.split(' ').length===3 && e.data.split(' ')[1].slice(3,4)===':' && e.data.split(' ')[2].slice(0,4)=='claim')  //[15:12:00] 201: claim5
            //这里没有屏蔽 跨站脚本攻击，可以输入脚本。造成 安全隐患！
        };
        source.onclose = function(e){
            alert('再见！')
        }
    }
    postMsg=(val)=>{
        // $.post('http://124.42.117.43:8989/post?session_id='+this.get_session(), { 'message': val } );
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
        // direct.map(item=>{
            // data[0].slice(7,8)===item && this.state.myDirect === item ? 
            this.setState({
                myCards:this.addColor(this.arrange_my_cards(data))[1],
                myCardsNum:this.arrange_my_cards(data),
            })
            // :null
        // })
    }
    call_cards=(direct,card)=>{   //叫牌
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
                        // onClick={!this.state.call&&this.state.currentDirect===this.state.myDirect?this.click:null}
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
                        // onClick={!this.state.call&&this.state.currentDirect===this.state.myDirect?this.click:null}
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
                        // onClick={!this.state.call&&this.state.currentDirect===this.state.myDirect?this.click:null}
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
                        // onClick={!this.state.call&&this.state.currentDirect===this.state.myDirect?this.click:null}
                        onClick={this.click}
                        >
                        {i}{`\n`}{'♣'}</span>)
                    colorCards[3].push(i+'c')
                })
            }
        })
        return [addCards,colorCards]  //两种格式：5♥  5h 
    }
    
    // 要发送的消息整理成‘5h’或‘h5’的格式
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
