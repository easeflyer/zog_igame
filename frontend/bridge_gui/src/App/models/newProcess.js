import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Position from '../common/Position';
import ODOO from '../libs/odoo-bridge-rpc/src';
import boardStore from '../stores/newBoard'
import tableStore from '../stores/tableStore'
import {cardString,Two,getUserCards,getCurOrLast,getUserCardsDeal,removeNull,changeSuitsOrder} from '../common/util'
import Clock from '../libs/Clock';
import Sound from '../components/Sound';
import ResultPanel from '../views/pc/ResultPanel';
import Card,{ACT0,ACT1,ACT2,ACT3} from '../components/Card';
const arr = [['E','east_id'],['N','north_id'],['S','south_id'],['W','west_id']]
const arr1 = [['east_id','E'],['north_id','N'],['south_id','S'],['west_id','W']]
const dirMap = new Map(arr);
const dirMap1 = new Map(arr1);
//每一个玩家在桌子上的方位

let TRICKS = '';
const seatMap = {
    "E":{N:'E',E:'S',S:'W',W:'N'},
    "S":{E:'E',S:'S',W:'W',N:'N'},
    "W":{S:'E',W:'S',N:'W',E:'N'},
    "N":{W:'E',N:'S',E:'W',S:'N'}
}
const Dummy={
  E:'W',
  S:'N',
  W:'E',
  N:'S'
}

const host = 'http://192.168.1.8:8069'
const db = 'TT'
const models = {
  'res.users': ['name', 'doing_table_ids'],
  'og.table': ['name', 'game_id', 'board_ids', 'channel_ids','west_id', 'north_id','east_id','south_id'],
  'og.board': [
    "name", "deal_id", "table_id", "round_id",
    "phase_id", "game_id", "match_id", "host_id",
    "guest_id", "number", "vulnerable", "dealer",
    "hands", "sequence", "declarer", "contract",
    "openlead", "result", "ns_point", "ew_point",
    "host_imp", "guest_imp", "auction", "tricks",
    "last_trick", "current_trick", "ns_win", "ew_win",
    "claimer", "claim_result", "player", "state",
  ],
  'bus.bus': ['name'],
  'mail.channel': ['name', 'channel_type'],
  'og.channel': ['name', 'table_id', 'type', 'mail_channel_id'],
  'mail.message': ['subject', 'body', 'subtype_id', 'message_type', 'author_id', 'date'],
}
var tables = null;
var table = null;
var boards = null;
var bd = null;
var seats=null;//{玩家真实方位：桌子上的方位}
const dir = ['W','N','E','S'];
const SUITS = {
  'S' : ['S','H','C','D'],
  'H' : ['H','S','D','C'],
  'C' : ['C','H','S','D'],
  'D' : ['D','S','H','C'],
}
const odoo = new ODOO({ host, db, models })

const fields = {
  name: null,
  doing_table_ids: {
    game_id: null,
    name: null,
    west_id: null, 
    north_id: null,
    east_id: null,
    south_id: null,
    board_ids: {
      name: null, deal_id: null, table_id: null, round_id: null,
      phase_id: null, game_id: null, match_id: null, host_id: null,
      guest_id: null, number: null, vulnerable: null, dealer: null,
      hands: null, sequence: null, declarer: null, contract: null,
      openlead: null, result: null, ns_point: null, ew_point: null,
      host_imp: null, guest_imp: null, auction: null, tricks: null,
      last_trick: null, current_trick: null, ns_win: null, ew_win: null,
      claimer: null, claim_result: null, player: null, state: null,
    }
  },
}

var tables = null;
var table = null;
var boards = null;
var bd = null;
var user=null;
 class Process{
    constructor(){
        this.dealMsg = new Map();
        this.dealMsg.set('bid',this.dealBid)
        this.dealMsg.set('play',this.dealPlay)
        this.dealMsg.set('claim',this.dealClaim)
        this.dealMsg.set('claim_ack',this.dealClaimAck)
    }
    sid=null;
    table_id=null;
    start=()=>{
        this.login()// 先登录,得到比赛列表,取table_id   
    }

    login = async (params) => {
        const p = {
          login: localStorage.getItem('userName'),
          password: localStorage.getItem('pwd'),
        }
        console.log(p)
        const newParams = params || p;
        const sid = await odoo.login(newParams);
        alert(sid)
        if (sid) {
         this.sid = sid;
          this.getGameList();
        }
        console.log(this.table_id)
       
        
      }
      getGameList = async () => {
        const user = await odoo.user(fields)
    
        tables = user.attr('doing_table_ids')
    
        // 一个牌手可能有多个比赛，每个比赛的doing_table，牌手选择比赛进入比赛
        const tableData = tables.look(fields.doing_table_ids)
         this.table_id =  tableData[0]['game_id']['id'];
         this.getIntoTable(this.table_id)  //进入桌子，开始游戏
      }
      getIntoTable = async (gameId) => {
        if (!this.sid) {
          alert('你还没有登陆！')
          return
        }
        // 当前牌桌
        table = tables.get_doing_table(gameId);
        const data = table.look({ west_id: null, north_id: null, east_id: null, south_id: null, })
        console.log('WNES：', data)
        for(let item in data ){
         
         if(data[item]['name']==localStorage.getItem('userName')) {
            var mySeat = dirMap1.get(item);
            tableStore.myseat = mySeat;
            alert(mySeat)
            seats= seatMap[mySeat]
            console.log(seats)
            tableStore.userLogin('S',{ ready: 0, name: data[dirMap.get('S')]['name'], face: '/imgs/face1.png', rank: '王者11', seat: 'S' });
            tableStore.userLogin('E',{ ready: 0, name: data[dirMap.get('E')]['name'], face: '/imgs/face1.png', rank: '王者', seat: 'E' });
            tableStore.userLogin('W',{ ready: 0, name: data[dirMap.get('W')]['name'], face: '/imgs/face1.png', rank: '王者', seat: 'W' });
            tableStore.userLogin('N',{ ready: 0, name: data[dirMap.get('N')]['name'], face: '/imgs/face1.png', rank: '王者', seat: 'N' });
            user={
              'S':{ ready: 0, name: data[dirMap.get('S')]['name'], face: '/imgs/face1.png', rank: '王者11', seat: 'S' },
              'E':{ ready: 0, name: data[dirMap.get('E')]['name'], face: '/imgs/face1.png', rank: '王者', seat: 'E' },
              'W':{ ready: 0, name: data[dirMap.get('W')]['name'], face: '/imgs/face1.png', rank: '王者', seat: 'W' },
              'N':{ ready: 0, name: data[dirMap.get('N')]['name'], face: '/imgs/face1.png', rank: '王者', seat: 'N' }
            }
         }
        }
        console.log(table)
        this.getBoard()// 拿到相关数据：玩家 牌 
        // // 启用长连接
        const Bus = odoo.env('bus.bus')
        Bus.start_poll(this.before_poll, this.after_poll)
        window.onbeforeunload=function(){
          Bus.longpoll_stop = true
          return "1";
        }
      }
      getBoard = async () => {

        if (!this.sid) {
          alert('你还没有登陆！')
          return
        }
    
        boards = table.attr('board_ids')
    
        // 当前正在进行的board
        bd = boards.get_doing_board()
        console.log(bd)
    
        // 读取到的牌桌数据
        tableStore.initState()
       this.recover()
       
      }

      get_done_Board = async () => {

        boards = table.attr('board_ids')

       const dbd = boards.get_done_board()
      
        const bd2 = dbd[1].look(fields.doing_table_ids.board_ids)
        console.log(bd2)
      }

      before_poll =  () => {
        console.log('before 0')
        // before_poll0(odoo)
      }

      after_poll = async (result) => {
        // 这个返回值暂时也没有用
        console.log('after:', result)
        // console.log('after:', result[0]['message']['subject'])
    
        // 收到消息后到消息模型取数据
        const Chn = odoo.env('mail.channel')
        let msg = null
        // 取到的消息数据可能有多条，做了循环处理
        do {
          msg = await Chn.poll('og_game_board')
          if (msg) {
            const bd_msg = odoo.env('og.board').poll(msg.attr('id'))
            // TODO：这是收到消息后的数据，自行渲染页面，包含牌桌信息和牌手动作
           
            console.log(bd_msg)
            const {method,info,args} = bd_msg;
          
            this.dealMsg.get(method)(info,args)
          }
        } while (msg)
    
        // 非打牌消息，聊天消息，待处理
        msg = null
        do {
          msg = await Chn.poll('channel')
          // const bd_msg = odoo.env('og.board').poll(msg.attr('id'))
          // console.log(bd_msg)
        } while (msg)
      }

      bid = async (player, bid) => {
        const res = await bd.bid(player, bid)
        console.log(res)
      }
      // 打牌
      play = async (player, card) => {
        const res = await bd.play(player, card)
        console.log(res)
      }
      // 摊牌
      claim = async (player, cl) => {
        const res = await bd.claim(player, cl);
        console.log(res)
      }
      // 同意/不同意 摊牌 (number=1表示同意)
      claim_ack = async (player, ack) => {
        const res = await bd.claim_ack(player, ack)
      }
     
      recover =()=>{ 
        if(!bd){
          alert('游戏已经结束');
          return;
        } 
        const bd2 = bd.look(fields.doing_table_ids.board_ids)
        console.log(bd2)  //得到当前游戏的全部内容
        
        const {state,dealer,auction,player,declarer,hands,current_trick,last_trick,tricks,contract,claim_result,vulnerable,sequence} = bd2;
        TRICKS = tricks;
        tableStore.dummySeat = seats[Dummy[declarer]];
        tableStore.dealer=seats[dealer];
        tableStore.logicDealer=dealer;
        tableStore.sequence = sequence;
        tableStore.state.declarer=declarer;
        if(contract){  
          if('SHCD'.indexOf(contract[1]) != -1){
            Card.suits = SUITS[contract[1]]  
           
          }
        }
        if(vulnerable == 'BO'){
          tableStore.state.vulnerable = 'BOTH';
        }else if(vulnerable == 'NS' || vulnerable == 'EW'){
          if(vulnerable.indexOf(tableStore.myseat) != -1){
            tableStore.state.vulnerable='SN';
          }else{
            tableStore.state.vulnerable='EW';
          }
        }else{
          tableStore.state.vulnerable = vulnerable;
        }
        var deals =cardString(tableStore.myseat,bd2.hands) ;
        var call=null;
        var callArr = [];
        call = JSON.parse(bd2.auction);
        console.log(deals)
        tableStore.initCards(deals);
        tableStore.dealCards();
        Sound.play('deal');
        this.timing(seats[bd2.player],999,()=>{})
        if('SN'.indexOf(seats[bd2.player])!=-1){
          window.__Timer.start('sn');
        }else{
          window.__Timer.start('ew');
        }
        
        tableStore.state.calldata.first = dealer;
        if(state=='bidding'){
         
          var curCall = ''

          
          console.log(typeof JSON.parse(bd2.auction))
          call = JSON.parse(bd2.auction); 
          console.log(Two(call))
          tableStore.state.calldata.call = Two(call);
          for(let i = 0 ;i<call.length;i++){
            if(call[call.length-1-i]!='Pass' && call[call.length-1-i]!='x' && call[call.length-1-i]!='xx'){
              curCall = call[call.length-i-1];
              break;
            }
          }
          tableStore.curCall = curCall;
          tableStore.toggleBid();
          if(bd2.player==tableStore.myseat){
            tableStore.bidState.showBlock = true
          }else{
            tableStore.bidState.showBlock = false
          }
        }
        tableStore.state.claim.seat= declarer;
        if(state=='playing' || state=='openlead'){
         
          if(state=='playing'){
            var cur = getCurOrLast(seats,JSON.parse(current_trick));
            var last = getCurOrLast(seats,JSON.parse(last_trick));
            let allData ={
              scene:2,
              dummySeat: seats[Dummy[declarer]],
              deals:getUserCardsDeal(tableStore.myseat,Dummy[declarer],hands),
              userCards: getUserCards(tableStore.myseat,Dummy[declarer],hands),
              user:user,
              board:[cur,last],
              calldata:{
                first: dealer,
                call:Two(call)
              }
            } ;
           tableStore.restore(allData);
          }else{
            tableStore.dummySeat=seats[Dummy[declarer]];
          }
        
         //验证打牌规则
         //1. 确定花色
         var suit= null;
         var current = JSON.parse(current_trick)
          removeNull(current)
          if(current.length==4 || current.length==0 ){
            suit='SHDC'
          }else{
            suit = current[0][0];
          }
         if(player==Dummy[declarer]){ 
          //如果当前该明手玩家出牌，则庄家替明手出牌
          if(tableStore.myseat==declarer){
            let cards = tableStore.selectCards(seats[Dummy[declarer]], suit,[ACT1.L]);
            if(cards.length==0){
              cards = tableStore.selectCards(seats[Dummy[declarer]], 'SHDC',[ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
             
            }else{
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
              var reg = new RegExp(suit,"g");
              var a = 'SHDC'.replace(reg,"");
              cards = tableStore.selectCards(seats[Dummy[declarer]], a,[ACT1.L]);
              tableStore.setCardsState(cards, {active: ACT1.D, onclick: tableStore.play});
            }
          }
        } else{
          if(player==tableStore.myseat){
            let cards = tableStore.selectCards("S", suit,[ACT1.L]);
            if(cards.length==0){
              cards = tableStore.selectCards("S", 'SHDC',[ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
             
            }else{
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
              var reg = new RegExp(suit,"g");
              var a = 'SHDC'.replace(reg,"");
              cards = tableStore.selectCards("S", a,[ACT1.L]);
              tableStore.setCardsState(cards, {active: ACT1.D, onclick: tableStore.play});
            }
          }
        }
        if("EW".indexOf(tableStore.myseat)!=-1){
          tableStore.setTricks(bd2.ew_win,bd2.ns_win,bd2.contract )
        }else{
          tableStore.setTricks(bd2.ns_win,bd2.ew_win,bd2.contract )
        }
        
        }
        if(state=='claiming' || state=='claiming.RHO' || state=='claiming.LHO'){
          var cur = getCurOrLast(seats,JSON.parse(current_trick));
            var last = getCurOrLast(seats,JSON.parse(last_trick));
            let allData ={
              scene:3,
              claim:{
                seat:declarer,
                msg:`庄家声称还赢 ${claim_result} 墩`
              },

              dummySeat: seats[Dummy[declarer]],
              deals:getUserCardsDeal(tableStore.myseat,Dummy[declarer],hands),
              userCards: getUserCards(tableStore.myseat,Dummy[declarer],hands),
              user:user,
              board:[cur,last],
              calldata:{
                first: dealer,
                call:Two(call)
              }
            } ;
           tableStore.restore(allData);
            if("EW".indexOf(tableStore.myseat)!=-1){
              tableStore.setTricks(bd2.ew_win,bd2.ns_win,bd2.contract )
            }else{
              tableStore.setTricks(bd2.ns_win,bd2.ew_win,bd2.contract )
            }
           var suit= null;
         var current = JSON.parse(current_trick)
          removeNull(current)
          if(current.length==4 || current.length==0 ){
            suit='SHDC'
          }else{
            suit = current[0][0];
          }
         if(player==Dummy[declarer]){ 
          //如果当前该明手玩家出牌，则庄家替明手出牌
          if(tableStore.myseat==declarer){
            let cards = tableStore.selectCards(seats[Dummy[declarer]], suit,[ACT1.L]);
            if(cards.length==0){
              cards = tableStore.selectCards(seats[Dummy[declarer]], 'SHDC',[ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
             
            }else{
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
              var reg = new RegExp(suit,"g");
              var a = 'SHDC'.replace(reg,"");
              cards = tableStore.selectCards(seats[Dummy[declarer]], a,[ACT1.L]);
              tableStore.setCardsState(cards, {active: ACT1.D, onclick: tableStore.play});
            }
          }
        } else{
          if(player==tableStore.myseat){
            let cards = tableStore.selectCards("S", suit,[ACT1.L]);
            if(cards.length==0){
              cards = tableStore.selectCards("S", 'SHDC',[ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
             
            }else{
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
              var reg = new RegExp(suit,"g");
              var a = 'SHDC'.replace(reg,"");
              cards = tableStore.selectCards("S", a,[ACT1.L]);
              tableStore.setCardsState(cards, {active: ACT1.D, onclick: tableStore.play});
            }
          }
        }
        tableStore.state.calldata.first = dealer;
        call = JSON.parse(bd2.auction); 
        tableStore.state.calldata.call = Two(call);
        }
      }
      dealBid = (info)=>{
        if(info.player){
          this.timing(seats[info.player],999,()=>{});
          if('SN'.indexOf(seats[info.player])!=-1){
            window.__Timer.start('sn');
          }else{
            window.__Timer.start('ew');
          }
          if(info.player==tableStore.myseat){
            tableStore.bidState.showBlock = true
          }else{
            tableStore.bidState.showBlock = false
          }
        }
        var call = null;
        var curCall = null;
        boardStore.pbn.auction.call = JSON.parse(info.auction);
        boardStore.gameState = info.state;
        call = JSON.parse(info.auction); 
          tableStore.state.calldata.call = Two(call);
          for(let i = 0 ;i<call.length;i++){
            if(call[call.length-1-i]!='Pass' && call[call.length-1-i]!='x' && call[call.length-1-i]!='xx'){
              curCall = call[call.length-i-1];
              break;
            }
          }
          tableStore.curCall = curCall;
          if(info.state=='openlead'){
            let cards =null;
            tableStore.state.scene = 2;
            tableStore.bidState.showBid = false
            tableStore.bidState.showBlock = false
            tableStore.state.declarer = info.declarer;
            const declarer = info.declarer;
            const contract = info.contract;
            tableStore.state.contract = contract
            if(contract){
              if('SHCD'.indexOf(contract[1]) != -1){
                Card.suits = SUITS[contract[1]]
              }
            }
            var deals =cardString(tableStore.myseat,info.hands) ;
            tableStore.initCards(deals);
            tableStore.dealCards();
            if(info.player==tableStore.myseat){
              cards = tableStore.selectCards("S", 'SHDC',[ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
            }
            
           
          }
          if(info.state=='done'){
            tableStore.bidState.showBid = false
            //显示结果
            var result = 'Allpass';
            tableStore._result = result;
            const result1 = document.querySelector('.result');
            if(!result1)
              ReactDOM.render(<ResultPanel />,document.querySelector('#result'))
          }
          
      }
      dealPlay = (info,args) => {
        //处理过的消息不再处理d
       
        if(TRICKS.indexOf(args[1])!=-1) return;
        const {current_trick,declarer,tricks} = info;
        tableStore.state.claim.seat= declarer;
        TRICKS=tricks;
        var myseat = tableStore.myseat;// 自己的真实方位
        var dummy = Dummy[info.declarer];// 明手的真实方位
        var player=seats[args[0]] //桌子方位的玩家打了一张牌
        //判断是不是第一张牌
        var curTrick = JSON.parse(info.current_trick)
        var lastTrick = JSON.parse(info.last_trick);
        removeNull(curTrick)
        removeNull(lastTrick)
        var hands = JSON.parse(info.hands)
        debugger
        var ind = dir.indexOf(dummy)
        if(myseat != dummy){
          if(lastTrick.length==0 && curTrick.length==1){
            var hand = changeSuitsOrder(hands[ind],Card.suits)
            tableStore.openDummy(seats[dummy],hand);
          }
        }
        if(args[0]==dummy){
          if(myseat!=info.declarer){
            tableStore.dplay(player,args[1]);
          }
        }else{
          if(player!='S'){
            tableStore.dplay(player,args[1]);
          }
        }
        if('EW'.indexOf(tableStore.myseat) !=-1){
          tableStore.setTricks(info.ew_win,info.ns_win,info.contract )
        }else{
          tableStore.setTricks(info.ns_win,info.ew_win,info.contract )
        }

        
       if(info.player){
        this.timing(seats[info.player],999,()=>{})
          if('SN'.indexOf(seats[info.player])!=-1){
            window.__Timer.start('sn');
          }else{
            window.__Timer.start('ew');
          }
       }
        
       if(info.state=='done'){
        window.__Timer.stop()
        tableStore.state.scene = 5;
        //显示结果
        var result = '';
        result=info.declarer +' ' + info.contract;
        if('EW'.indexOf(info.declarer)!=-1){
            var num = info.claim_result +  info.ew_win - info.contract[0] -6;
            if(info.ew_point){
              result = result + ' ' + num +' +' + info.ew_point;
            }else{
              result = result + ' ' + num +' -'+ info.ns_point
            }
        }else{
          var num = info.claim_result + info.ns_win - info.contract[0] -6;
          if(info.ns_point){
            result = result + ' ' + num +' +' + info.ns_point;
          }else{
            result = result + ' ' + num +' -'+ info.ew_point
          }
        }
       
        tableStore._result = result;
        const result1 = document.querySelector('.result');
        if(!result1)
          ReactDOM.render(<ResultPanel />,document.querySelector('#result'));
      }
        var suit= null;
        var current = JSON.parse(current_trick)
         removeNull(current)
         if(current.length==4 || current.length==0 ){
           suit='SHDC'
         }else{
           suit = current[0][0];
         }
        if(info.player==Dummy[declarer]){ 
         //如果当前该明手玩家出牌，则庄家替明手出牌
         if(tableStore.myseat==declarer){
           let cards = tableStore.selectCards(seats[Dummy[declarer]], suit,[ACT1.L]);
           if(cards.length==0){
             cards = tableStore.selectCards(seats[Dummy[declarer]], 'SHDC',[ACT1.L]);
             tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
            
           }else{
             tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
             var reg = new RegExp(suit,"g");
             var a = 'SHDC'.replace(reg,"");
             cards = tableStore.selectCards(seats[Dummy[declarer]], a,[ACT1.L]);
             tableStore.setCardsState(cards, {active: ACT1.D, onclick: tableStore.play});
           }
           //最后一张牌自动出
          var unplayCards = tableStore.selectCards(seats[Dummy[declarer]],'SHDC',[ACT1.D,ACT1.L,ACT1.LC,ACT1.LCO]);
          if(unplayCards.length==1){
            setTimeout(()=>{
              tableStore.dplay(seats[Dummy[declarer]],unplayCards[0]['card'])
            },1200)
            
          }
         }
       } else{
         if(info.player==tableStore.myseat){ 
           let cards = tableStore.selectCards("S", suit,[ACT1.L]);
           if(cards.length==0){
             cards = tableStore.selectCards("S", 'SHDC',[ACT1.L]);
             tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
            
           }else{
             tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
             var reg = new RegExp(suit,"g");
             var a = 'SHDC'.replace(reg,"");
             cards = tableStore.selectCards("S", a,[ACT1.L]);
             tableStore.setCardsState(cards, {active: ACT1.D, onclick: tableStore.play});
           }
           var unplayCards = tableStore.selectCards('S','SHDC',[ACT1.D,ACT1.L,ACT1.LC,ACT1.LCO]);
          if(unplayCards.length==1){
            setTimeout(()=>{
              tableStore.dplay('S',unplayCards[0]['card'])
            })
            
          }
         }
       }
       
        if(boardStore.gameState=='done'){
           alert('done')
        }
        //自动打最后一张牌
       
      }

      dealClaim = (info,args) =>{
        console.log(info,args)
        let claimMsg = `庄家声称还赢 ${args[1]}墩`;
        if(args[0] != tableStore.myseat){
          tableStore.claim(args[0],claimMsg)
        }
        var hands = JSON.parse(info.hands)
        var ind = dir.indexOf(info.declarer)
        if(args[0] != tableStore.myseat){
          //庄家亮牌
          var hand = changeSuitsOrder(hands[ind],Card.suits)
          tableStore.openDummy(seats[info.declarer],hand,Card.suits.join(''));
        }
        
      }
      dealClaimAck = (info,args) =>{
        console.log(111);
        
        if(info.state=='playing'){
          tableStore.state.scene = 2;
        }
        if(info.state=='done'){
          tableStore.state.scene = 5;
          //显示结果
          var result = '';
          result=info.declarer +' ' + info.contract;
          if('EW'.indexOf(info.declarer)!=-1){
              var num = info.claim_result + info.ew_win - info.contract[0] -6;
              if(info.ew_point){
                result = result + ' ' + num +' +' + info.ew_point;
              }else{
                result = result + ' ' + num +' -'+ info.ew_point
              }
          }else{
            var num = info.claim_result + info.ns_win - info.contract[0] -6;
            if(info.ns_point){
              result = result + ' ' + num +' +' + info.ns_point;
            }else{
              result = result + ' ' + num +' -'+ info.ns_point
            }
          }
         
          tableStore._result = result;
          const result1 = document.querySelector('.result');
          if(!result1)
            ReactDOM.render(<ResultPanel />,document.querySelector('#result'));
        }
      }
      timing = function (seat, time, callback) {
        const unseat = new Position(seat).lshift(1).sn;
        ReactDOM.unmountComponentAtNode(document.querySelectorAll('.clock')[0]);
        ReactDOM.unmountComponentAtNode(document.querySelectorAll('.clock')[1]);
        ReactDOM.unmountComponentAtNode(document.querySelectorAll('.clock')[2]);
        ReactDOM.unmountComponentAtNode(document.querySelectorAll('.clock')[3]);
        ReactDOM.render(
            <Clock time={time} callback={callback} />,
            document.querySelector('.'+seat+'clock')
        )
    }
}
export default new Process();