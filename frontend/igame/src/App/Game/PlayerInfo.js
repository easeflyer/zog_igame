import React from 'react'
import { Row, Col} from 'antd';
import Board from '../OdooRpc/Board'
import Models from '../OdooRpc/OdooRpc'
import Channel from '../OdooRpc/Channel'
import Initial from './Initial'
import Func from './Func'
import TopInfo from './TopInfo'
import PointModal from './PointModal'
import PlayCard from './PlayCard'
import CallCard from './CallCard'
import CardsR from './CardsR'
import CardsC from './CardsC'

const direct = [ 'N' ,'E','S','W',]
const DealFunc = new Func();
export default class PlayerInfo extends React.Component{
    state={
        playerInfo:new Initial().playerInfo,
        callCards:new Initial().callCards,
        playCards:new Initial().playCards,
        topInfo:new Initial().topInfo,
        topInfo2:new Initial().topInfo2,
        pollingId:1,
        board_id_list:null,
        myCardsNum:null,
        cards:null,
        call:true,
        play:false,
        callDirect:null,
        currentDirect:null,
        dummy:null,
        dummyCardsNum:null,
        id_msg:{
            channel_id:null,
            board_id:null,
        },
        modal:false,
    }
    componentDidMount(){
        const JoinChannel = new Channel(this.sucChannel,this.failChannel);
        JoinChannel.join_channel(10);   // 6 : table_id
        this.polling();
    }
    sucChannel=(data)=>{   //加入比赛聊天频道成功
        console.log(data)
        //[42, [39, 40, 41, 42, 43, 44, 45],50] [channel_id,[board_id1,board_id2,board_id3...],channel_id]
        this.setState({
            board_id_list:data[1],
            id_msg:{
                channel_id:data[0],
                board_id:data[1][0],
            }
        })
        this.post('init_board',this.state.id_msg.board_id,this.state.id_msg.channel_id)
    }
    polling(){
        const Poll = new Models(this.sucPolling,this.failPolling);
        Poll.poll(this.state.pollingId);
    }
    sucPolling=(data)=>{
        console.log(data)
        if (data.length){
            this.setState({
                pollingId:data.slice(-1)[0]['id']
            })
            let body = data[data.length-1].message.body;    //"<p>{'board_id': 44, 'number': 1, 'name': u'1S', 'pos': u'S'}</p>"
            body = body.replace(/u'/g,"'").replace(/ /g,'')
            body = eval('('+body.substring(3,body.length-4)+')')
            console.log(body)
            console.log(this.state.pollingId)
            if(body.board_id&&body.name&&body.pos&&body.number){  //收到叫牌消息   {board_id: 44, number: 1, name: '1S', pos: 'S'}
                this.setState({
                    callDirect:direct[direct.indexOf(body.pos)+1]||direct[direct.indexOf(body.pos)-3],
                    callCards:{
                        dataSource:DealFunc.call_cards(body.pos,body.name,this.state.callCards.dataSource),
                        columns:this.state.callCards.columns,
                    }
                })
                if(DealFunc.onCall(body)){
                    this.post('call_result',this.state.id_msg.board_id,this.state.id_msg.channel_id); //查询叫牌结果
                }
            }
            if(body.dummy&&body.openlead&&body.declarer){   //收到叫牌结果信息   {dummy:'N',openlead:'W',declarer:'S',nextplayer:'W',contract:'1S'}
                let m=direct.indexOf(body.dummy);
                this.setState({
                    call:false,
                    play:true,
                    currentDirect:body.openlead,
                    dummy:body.dummy,
                    dummyCardsNum:DealFunc.arrange_my_cards(this.state.cards[m]),
                    topInfo2:{
                        declarer:body.declarer,
                        contract:body.contract
                    }
                })
            }
            if(body.number&&body.rank&&body.card){   //收到打牌消息 {declarer_win:0,number:1,rank:'5',pos:'W',suit:'C',nextplayer:'W',card:'C5',opp_win:0}
                DealFunc.play_card(body,this.state.dummy,this.state.myCardsNum,this.state.dummyCardsNum,this.state.playerInfo,this.state.playCards,this.state.topInfo)
                this.setState({
                    currentDirect:body.nextplayer,
                })
                if(body.number===52){
                    if(this.state.board_id_list.indexOf(this.state.id_msg.board_id)<=this.state.board_id_list.length-1){
                        this.showModal();
                    }
                }
            }    
        }
        this.polling()
    }
    post=(method,...data)=>{
        const  board= new Board(this.sucPost,this.failPost); 
        method==='init_board' ? board.init_board(...data) : null;   //初始化牌桌
        method==='bid'&&this.state.playerInfo.myDirect===this.state.callDirect ? board.bid(this.state.id_msg.board_id,this.state.playerInfo.myDirect,...data,this.state.id_msg.channel_id) : null;    //发送叫牌消息
        method==='call_result' ? board.call_result(this.state.id_msg.board_id,this.state.id_msg.channel_id) : null;    //查询叫牌结果
        method==='play'&&((this.state.currentDirect!==this.state.dummy&&this.state.currentDirect===this.state.playerInfo.myDirect)||
        (this.state.currentDirect===this.state.dummy&&this.state.topInfo2.declarer===this.state.playerInfo.myDirect)) ? board.play(this.state.id_msg.board_id,this.state.playerInfo.myDirect,...data,this.state.id_msg.channel_id) : null;       //发送打牌消息
        method==='table_points'?board.table_points(6):null    //查询8副牌的成绩
    } 
    sucPost=(data)=>{ 
        console.log(data) 
        if(data.cards&&data.players){
            let s = DealFunc.sucPost(data)
            this.setState({
                cards:s.cards,
                call:s.call,
                play:s.play,
                myCardsNum:s.myCardsNum,
                callDirect:s.callDirect,
                playerInfo:s.playerInfo
            })
        }
    }
    failPost(){ console.log('fail post') }
    showModal =() => { this.setState({ modal: true, }); }
    onClose = () => { 
        if(this.state.board_id_list.indexOf(this.state.id_msg.board_id)<this.state.board_id_list.length-1){
            this.post('init_board',this.state.board_id_list[this.state.board_id_list.indexOf(this.state.id_msg.board_id)+1],this.state.id_msg.channel_id)
            this.setState({
                callCards:new Initial().callCards,
                playCards:new Initial().playCards,
                topInfo:new Initial().topInfo,
                topInfo2:new Initial().topInfo2,
                cards:null,
                call:true,
                play:false,
                callDirect:null,
                currentDirect:null,
                dummy:null,
                dummyCardsNum:null,
                myCardsNum:null,
                modal:false,
            })
        }
        if(this.state.board_id_list.indexOf(this.state.id_msg.board_id)===this.state.board_id_list.length-1){
            this.render(<span>比赛结束</span>)
        }
        this.setState({ modal: false, }); 
    }

    render(){
        return(
            <div>
                <TopInfo topInfo2={this.state.topInfo2} topInfo={this.state.topInfo}/>  {/*展示顶部信息*/}
                {/* 上 */}
                <Row style={{marginBottom:10}}>
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>{this.state.playerInfo.topDirect}</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>{this.state.playerInfo.topName}{this.state.call&&this.state.callDirect===this.state.playerInfo.topDirect?'该你叫牌啦！':null}{this.state.play&&this.state.topInfo2.declarer===this.state.playerInfo.topDirect?' 庄家':null}{this.state.currentDirect===this.state.playerInfo.topDirect?'★':null}</Col>
                    {this.state.play&&this.state.dummy===this.state.playerInfo.topDirect?<CardsR cards={this.state.dummyCardsNum?this.state.dummyCardsNum:null} post={this.post}></CardsR>:null}
                </Row>
                <Row>
                {/* 左 */}
                    <Col span={2}>
                        <Row style={{height:300,writingMode: 'vertical-lr'}}>
                            <Col span={24} style={{height:60,background:'#0f0'}}>{this.state.playerInfo.leftDirect}</Col>
                            <Col span={24} style={{height:240,background:'#ff0'}}>{this.state.playerInfo.leftName}{this.state.call&&this.state.callDirect===this.state.playerInfo.leftDirect?'该你叫牌啦！':null}{this.state.play&&this.state.topInfo2.declarer===this.state.playerInfo.leftDirect?' 庄家':null}{this.state.currentDirect===this.state.playerInfo.leftDirect?'★':null}</Col>
                        </Row>
                    </Col>
                    {this.state.play&&this.state.dummy===this.state.playerInfo.leftDirect?<CardsC cards={this.state.dummyCardsNum?this.state.dummyCardsNum:null} post={this.post}></CardsC>:null}
                {/* 叫牌 or 打牌 */}
                    {this.state.call&&!this.state.play ? <CallCard post={this.post} callCards={this.state.callCards} /> :null}
                    {this.state.play&&!this.state.call ? <PlayCard span={this.state.dummy===this.state.playerInfo.leftDirect||this.state.dummy==this.state.playerInfo.rightDirect?14:20} playCards={this.state.playCards}/> :null}
                {/* 右 */}
                    {this.state.play&&this.state.dummy===this.state.playerInfo.rightDirect?<CardsC cards={this.state.dummyCardsNum?this.state.dummyCardsNum:null} post={this.post}></CardsC>:null}
                    <Col span={2}>
                        <Row style={{height:300,writingMode: 'vertical-lr',float:'right'}}>
                            <Col span={24} style={{height:60,background:'#0f0'}}>{this.state.playerInfo.rightDirect}</Col>
                            <Col span={24} style={{height:240,background:'#ff0'}}>{this.state.playerInfo.rightName}{this.state.call&&this.state.callDirect===this.state.playerInfo.rightDirect?'该你叫牌啦！':null}{this.state.play&&this.state.topInfo2.declarer===this.state.playerInfo.rightDirect?' 庄家':null}{this.state.currentDirect===this.state.playerInfo.rightDirect?'★':null}</Col>
                        </Row>
                    </Col>
                </Row>
                {/* 下 */}
                <Row style={{marginTop:10}}>
                    <CardsR cards={this.state.myCardsNum?this.state.myCardsNum:null} post={this.post}></CardsR>
                    <Col span={4} style={{background:'#0f0',paddingLeft:10}}>{this.state.playerInfo.myDirect}</Col>
                    <Col span={20} style={{background:'#ff0',paddingLeft:10}}>{this.state.playerInfo.myName}{this.state.call&&this.state.callDirect===this.state.playerInfo.myDirect?'该你叫牌啦！':null}{this.state.play&&this.state.topInfo2.declarer===this.state.playerInfo.myDirect?' 庄家':null}{this.state.currentDirect===this.state.playerInfo.myDirect?'★':null}</Col>
                </Row>
                <PointModal onClose={this.onClose} modal={this.state.modal} board_id={this.state.id_msg.board_id}></PointModal>
            </div>
        )
    }
}