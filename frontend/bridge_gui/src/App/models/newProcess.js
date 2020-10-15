import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Position from '../common/Position';
import ODOO from '../libs/odoo-bridge-rpc/src';
import boardStore from '../stores/newBoard'
import tableStore from '../stores/tableStore'
import { cardString, Two, getUserCards, getCurOrLast, getUserCardsDeal, removeNull, changeSuitsOrder, fillCall } from '../common/util'
import Clock from '../libs/Clock';
import Sound from '../components/Sound';
import ResultPanel from '../views/pc/ResultPanel';
import Card, { ACT0, ACT1, ACT2, ACT3 } from '../components/Card';


// debug = true  start
const URL = {};
window.location.hash.split("?")[1].split("&").forEach(item=>{
  let a= item.split("=")
  URL[a[0]] = a[1]
})
console.log(URL)
// debug = true end
const {partner_id,player_id,table_id,userName} = URL
localStorage.setItem("tableId",table_id); // modei by ease 2020.08.25
localStorage.setItem("userName",userName)
localStorage.setItem("pwd",123)

const arr = [['E', 'east_id'], ['N', 'north_id'], ['S', 'south_id'], ['W', 'west_id']]
const arr1 = [['east_id', 'E'], ['north_id', 'N'], ['south_id', 'S'], ['west_id', 'W']]
const dirMap = new Map(arr);
const dirMap1 = new Map(arr1);
//每一个玩家在桌子上的方位
const ALLREADY = []
let TRICKS = '';
const seatMap = {
  "E": { N: 'E', E: 'S', S: 'W', W: 'N' },
  "S": { E: 'E', S: 'S', W: 'W', N: 'N' },
  "W": { S: 'E', W: 'S', N: 'W', E: 'N' },
  "N": { W: 'E', N: 'S', E: 'W', S: 'N' }
}
const Dummy = {
  E: 'W',
  S: 'N',
  W: 'E',
  N: 'S'
}

//const host = 'http://139.198.21.140:8069'
const host = 'https://139.198.21.140'
const db = 'TT'
const models = {
  'res.users': ['name', 'doing_table_ids'],
  'og.table': ['name', 'game_id', 'board_ids', 'channel_ids', 'west_id', 'north_id', 'east_id', 'south_id', 'table_player_ids'],
  'og.board': [
    "name", "deal_id", "table_id", "round_id",
    "phase_id", "game_id", "match_id", "host_id",
    "guest_id", "number", "vulnerable", "dealer",
    "hands", "sequence", "declarer", "contract",
    "openlead", "result", "ns_point", "ew_point",
    "host_imp", "guest_imp", "auction", "tricks",
    "last_trick", "current_trick", "ns_win", "ew_win",
    "claimer", "claim_result", "player", "state", 'cards'
  ],
  'bus.bus': ['name'],
  'mail.channel': ['name', 'channel_type'],
  'og.channel': ['name', 'table_id', 'type', 'mail_channel_id'],
  'mail.message': ['subject', 'body', 'subtype_id', 'message_type', 'author_id', 'date'],
  'og.deal': ['number', 'sequence', 'card_str'],
  'og.table.player': ['online', 'position', 'name']
}
var tables = null;
var table = null;
var boards = null;
var bd = null;
var seats = null;//{玩家真实方位：桌子上的方位}
const dir = ['W', 'N', 'E', 'S'];
const SUITS = {
  'S': ['S', 'H', 'C', 'D'],
  'H': ['H', 'S', 'D', 'C'],
  'C': ['C', 'H', 'S', 'D'],
  'D': ['D', 'S', 'H', 'C'],
}
const NTH = {
  'E': 0,
  'S': 1,
  'W': 2,
  'N': 3
};

const odoo = new ODOO({ host, db, models })


window.__ODOO = odoo;
const fields = {
  name: null,
  doing_table_ids: {
    game_id: null,
    name: null,
    west_id: null,
    north_id: null,
    east_id: null,
    south_id: null,
    table_player_ids: {
      position: null,
      online: null,
      name: null
    },
    board_ids: {
      name: null, table_id: null, round_id: null,
      phase_id: null, game_id: null, match_id: null, host_id: null,
      guest_id: null, number: null, vulnerable: null, dealer: null,
      hands: null, sequence: null, declarer: null, contract: null,
      openlead: null, result: null, ns_point: null, ew_point: null,
      host_imp: null, guest_imp: null, auction: null, tricks: null,
      last_trick: null, current_trick: null, ns_win: null, ew_win: null,
      claimer: null, claim_result: null, player: null, state: null,
      deal_id: { number: null, sequence: null, card_str: null }, cards: null
    }
  },
}

//----video start--------------------------
var vapi = "";
const defaultInterfaceConfig = {
  DEFAULT_REMOTE_DISPLAY_NAME: ' ',
  DEFAULT_LOCAL_DISPLAY_NAME: ' ',
  SHOW_JITSI_WATERMARK: false,
  JITSI_WATERMARK_LINK: 'https://uuu.org',
  SHOW_WATERMARK_FOR_GUESTS: false,
  SHOW_BRAND_WATERMARK: false,
  BRAND_WATERMARK_LINK: '',
  SHOW_POWERED_BY: false,
  SHOW_DEEP_LINKING_IMAGE: false,
  GENERATE_ROOMNAMES_ON_WELCOME_PAGE: true,
  DISPLAY_WELCOME_PAGE_CONTENT: false,
  DISPLAY_WELCOME_PAGE_TOOLBAR_ADDITIONAL_CONTENT: false,
  APP_NAME: 'odht Meet',
  NATIVE_APP_NAME: 'odht Meet',
  PROVIDER_NAME: 'odht',
  INVITATION_POWERED_BY: false,

  TOOLBAR_BUTTONS:[],
  DISABLE_FOCUS_INDICATOR: true,
  DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
  DISABLE_TRANSCRIPTION_SUBTITLES: true,

  CONNECTION_INDICATOR_DISABLED: true,
  VIDEO_QUALITY_LABEL_DISABLED: true,
  DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
}
function mountVideo(){
  const side = "NEWS".indexOf(tableStore.myseat) > 1 ? "WS" : "NE";
  const domain = 'meet.ushow.org';
  const options = {
    roomName: `odooht_igame_${window.localStorage.tableId}${side}`,  // 这里需要修改！
    parentNode: document.querySelector('#video'),
    configOverwrite: {},
    interfaceConfigOverwrite: defaultInterfaceConfig,
    userInfo:{
      email:'123@163.com',
      displayName:`${window.localStorage.userName}`
    }
  };
  const JitsiMeetExternalAPI = window.JitsiMeetExternalAPI;
  vapi = new JitsiMeetExternalAPI(domain, options);  
}
//----video end--------------------------



var tables = null;
var table = null;
var boards = null;
var bd = null;
var cbd = null; // count bd 一共有多少副牌
var user = null;
/**
 *
 *
 * @class Process
 */
class Process {
  constructor() {
    this.dealMsg = new Map();
    this.dealMsg.set('bid', this.dealBid.bind(this))
    this.dealMsg.set('play', this.dealPlay.bind(this))
    this.dealMsg.set('claim', this.dealClaim.bind(this))
    this.dealMsg.set('claim_ack', this.dealClaimAck.bind(this))
    this.dealMsg.set('join', this.dealJoin.bind(this))
    this.dealMsg.set('leave', this.dealLeave.bind(this))
  }
  sid = null;
  table_id = null;
  start = () => {
    this.login()// 先登录,得到比赛列表,取table_id   
  }

  login = async (params) => {
    const p = {
      login: localStorage.getItem('userName'),
      password: localStorage.getItem('pwd'),
    }
    console.log(p)
    console.log(window.location)
    const newParams = params || p;
    const sid = await odoo.login(newParams);
    //alert(sid) // modi by ease disable alert form
    if (sid) {
      this.sid = sid;
      this.getGameList();
    }
    console.log(this.table_id)


  }
  getGameList = async () => {
    const user = await odoo.user(fields)
    const data = user.look(fields);
    console.log(data)
    tables = user.attr('doing_table_ids')

    // 一个牌手可能有多个比赛，每个比赛的doing_table，牌手选择比赛进入比赛
    // const tableData = tables.look(fields.doing_table_ids)
    //  this.table_id =  tableData[0]['game_id']['id'];       
    this.getIntoTable()  //进入桌子，开始游戏
  }
  getIntoTable = async (gameId) => {
    if (!this.sid) {
      alert('你还没有登陆！')
      return
    }
    // 当前牌桌
    // table = tables.get_doing_table(gameId);
    const tableCls = odoo.env('og.table');
    const tableId = parseInt(table_id) ;
    table = await tableCls.browse(tableId, fields.doing_table_ids)
    console.log(table, tableCls.env('og.table.player')._records)
    const data = table.look({
      west_id: null,
      north_id: null,
      east_id: null,
      south_id: null,
      table_player_ids: {
        position: null,
        online: null,
        name: null
      }
    })
    console.log('WNES：', data)
    // const table_player_Cls = odoo.env('og.table.player')
    // const table_players = table_player_Cls.look({
    //   position:null,
    //   online:null,
    //   name:null,id:null
    // },)
    // console.log(table_players)
    const player_info = data.table_player_ids;
    console.log(player_info)
    for (let item in player_info) {

      if (player_info[item]['name'] == localStorage.getItem('userName')) {
        var mySeat = player_info[item]["position"];
        tableStore.myseat = mySeat;
        mountVideo();
        //alert(mySeat)  // modi by ease disable alert form
        seats = seatMap[mySeat]
        console.log(seats)
        player_info.forEach((item)=>{
          if(item.online){
            const dir = item.position;console.log(dir)
            ALLREADY.push(1)
            tableStore.userLogin(dir, { ready: 0, name: data[dirMap.get(dir)]['name'], face: '/imgs/face1.png', rank: '王者', seat: dir });
          }
        }) 
        // tableStore.userLogin('S', { ready: 0, name: data[dirMap.get('S')]['name'], face: '/imgs/face1.png', rank: '王者11', seat: 'S' });
        // tableStore.userLogin('E', { ready: 0, name: data[dirMap.get('E')]['name'], face: '/imgs/face1.png', rank: '王者', seat: 'E' });
        // tableStore.userLogin('W', { ready: 0, name: data[dirMap.get('W')]['name'], face: '/imgs/face1.png', rank: '王者', seat: 'W' });
        // tableStore.userLogin('N', { ready: 0, name: data[dirMap.get('N')]['name'], face: '/imgs/face1.png', rank: '王者', seat: 'N' });
        user = {
          'S': { ready: 0, name: data[dirMap.get('S')]['name'], face: '/imgs/face1.png', rank: '王者11', seat: 'S' },
          'E': { ready: 0, name: data[dirMap.get('E')]['name'], face: '/imgs/face1.png', rank: '王者', seat: 'E' },
          'W': { ready: 0, name: data[dirMap.get('W')]['name'], face: '/imgs/face1.png', rank: '王者', seat: 'W' },
          'N': { ready: 0, name: data[dirMap.get('N')]['name'], face: '/imgs/face1.png', rank: '王者', seat: 'N' }
        }
      }
    }
    console.log(table)
    if(vapi != "") vapi.executeCommand('toggleFilmStrip');// hide small video
    this.getBoard(data)// 拿到相关数据：玩家 牌
    // // 启用长连接
    const Bus = odoo.env('bus.bus')
    Bus.start_poll(this.before_poll, this.after_poll)
    odoo.env('og.table').call('leave',[2, {partner_id:54,player_id:24}])
    window.onbeforeunload = function () {
      alert("leave")
      // odoo.env('og.table').call('leave',[2, {partner_id:54,player_id:24}])
      Bus.longpoll_stop = true
      return "1";
    }
  }
  getBoard = async (player) => {

    if (!this.sid) {
      alert('你还没有登陆！')
      return
    }
    console.log(table)
    boards = table.attr('board_ids')
    console.log(boards)
    const data = boards.look(fields.doing_table_ids.board_ids)
    console.log(data)
    // 当前正在进行的board  下面解构语法必须分开写，否则报错
    const bdo = boards.get_doing_board();
    [bd,cbd] = bdo;
    console.log(bd)
    const Records = boards.look(fields.doing_table_ids.board_ids).filter(item => {
      return item.state === "done";
    })

    // 读取到的牌桌数据
    console.log(Records)
    const recordList = [];
    Records.forEach((item) => {
      let record = {}
      record.auction = this.call2Record(item.auction);
      record.cards = this.card2Record(item.deal_id.card_str, player);
      record.tricks = this.trick2Record(item.tricks);
      let result = {}
      result.sequence = item.sequence;
      result.result = `${item.declarer} ${item.contract}`;
      // ew_point: 0,ns_point: 50,nsimp:'',ewimp:1
      result.ew_point = item.ew_point;
      result.ns_point = item.ns_point;

      recordList.push(record)
      tableStore.record_result.push(result)
    })
    console.log(recordList)
    tableStore.record = recordList

    tableStore.initState()
    this.recover()

  }

  get_done_Board = async () => {

    boards = table.attr('board_ids')

    const dbd = boards.get_done_board()

    const bd2 = dbd[1].look(fields.doing_table_ids.board_ids)
    console.log(bd2)
  }

  before_poll = () => {
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
        const { method, info, args } = bd_msg;

        this.dealMsg.get(method)(info, args)
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
  /**
   * 向服务器发送叫牌消息 
   * @param {string} player 发出请求的玩家的真实方位
   * @param {string} bid  玩家的叫牌内容
   * @memberof Process
   */
  bid = async (player, bid, isAlert, msg) => {
    const res = await bd.bid(player, bid, isAlert, msg)
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

  test2 = async () => {    
        
        odoo.env('og.table').call('leave',[2, {partner_id:52,player_id:20}])
        }
test3 = async () => {    

  odoo.env('og.table').call('sit_down',[2, {partner_id:52,team_id:1,pos:'W'}])
  }
  /**
   * 进入游戏页面执行的函数，用来初始化 或 恢复 游戏内容
   *
   * @memberof Process
   */
  recover() {
    if (!bd) {
      alert('游戏已经结束');
      return;
    }
    const bd2 = bd.look(fields.doing_table_ids.board_ids)
    console.log(bd2)  //得到当前游戏的全部内容

    const { state, dealer, auction, player, declarer, hands, current_trick, last_trick, tricks, contract, claim_result, vulnerable, sequence } = bd2;
    TRICKS = tricks;

    if (declarer) tableStore.dummySeat = seats[Dummy[declarer]];
    tableStore.dealer = seats[dealer];
    tableStore.logicDealer = dealer;
    tableStore.sequence = sequence;
    tableStore.cbd = cbd;
    tableStore.state.declarer = declarer;
    tableStore.state.claimAble = false;
    if (contract) {
      if ('SHCD'.indexOf(contract[1]) != -1) {
        Card.suits = SUITS[contract[1]]

      }
    }
    if (vulnerable == 'BO') {
      tableStore.state.vulnerable = 'BOTH';
    } else if (vulnerable == 'NS' || vulnerable == 'EW') {
      if (vulnerable.indexOf(tableStore.myseat) != -1) {
        tableStore.state.vulnerable = 'SN';
      } else {
        tableStore.state.vulnerable = 'EW';
      }
    } else {
      tableStore.state.vulnerable = vulnerable;
    }
    var deals = cardString(tableStore.myseat, bd2.hands);
    let { call, note, curCall } = this.transformAuctionData(bd2.auction, tableStore.myseat)
 console.log(bd2.auction,call)
    call = eval(bd2.auction);
    console.log(deals)
    tableStore.initCards(deals);
    //setTimeout(() => {
      console.log(ALLREADY)
      if(ALLREADY.length ===4 || call.length>0){
    
        tableStore.dealCards();
        Sound.play('deal');
      } 
      this.timing(bd2.player, 999, () => { })
      if ('SN'.indexOf(seats[bd2.player]) != -1) {
        window.__Timer.start('sn');
      } else {
        window.__Timer.start('ew');
      }

      tableStore.state.calldata.first = dealer;
      if (state == 'bidding') {

        let { call, note, curCall } = this.transformAuctionData(bd2.auction, tableStore.myseat)
        tableStore.state.calldata.call = call;
        tableStore.state.calldata.note = note;
        tableStore.curCall = curCall;
        tableStore.toggleBid();
        if (bd2.player == tableStore.myseat && ALLREADY.length===4) {
          tableStore.bidState.showBlock = true
        } else {
          tableStore.bidState.showBlock = false
        }
      }
      tableStore.state.claim.seat = declarer;
      if (state == 'playing' || state == 'openlead') {

        if (state == 'playing') {
          tableStore.state.claimAble = true;
          var cur = getCurOrLast(seats, JSON.parse(current_trick));
          var last = getCurOrLast(seats, JSON.parse(last_trick));
          let allData = {
            scene: 2,
            dummySeat: seats[Dummy[declarer]],
            deals: getUserCardsDeal(tableStore.myseat, Dummy[declarer], hands),
            userCards: getUserCards(tableStore.myseat, Dummy[declarer], hands),
            user: user,
            board: [cur, last],
            calldata: {
              first: dealer,
              call: call,
              note: note
            }
          };

          tableStore.restore(allData);
        } else {
          tableStore.dummySeat = seats[Dummy[declarer]];
        }

        //验证打牌规则
        //1. 确定花色
        var suit = null;
        var current = JSON.parse(current_trick)
        current = removeNull(current)
        if (current.length == 4 || current.length == 0) {
          suit = 'SHDC'
        } else {
          suit = current[0][0];
        }
        if (player == Dummy[declarer]) {
          //如果当前该明手玩家出牌，则庄家替明手出牌
          if (tableStore.myseat == declarer) {
            let cards = tableStore.selectCards(seats[Dummy[declarer]], suit, [ACT1.L]);
            if (cards.length == 0) {
              cards = tableStore.selectCards(seats[Dummy[declarer]], 'SHDC', [ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });

            } else {
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
              var reg = new RegExp(suit, "g");
              var a = 'SHDC'.replace(reg, "");
              cards = tableStore.selectCards(seats[Dummy[declarer]], a, [ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.D, onclick: tableStore.play });
            }
          }
        } else {
          if (player == tableStore.myseat) {
            let cards = tableStore.selectCards("S", suit, [ACT1.L]);
            if (cards.length == 0) {
              cards = tableStore.selectCards("S", 'SHDC', [ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });

            } else {
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
              var reg = new RegExp(suit, "g");
              var a = 'SHDC'.replace(reg, "");
              cards = tableStore.selectCards("S", a, [ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.D, onclick: tableStore.play });
            }
          }
        }
        tableStore.setTricks(bd2.ew_win, bd2.ns_win, bd2.contract)
      }
      if (state == 'claiming' || state == 'claiming.RHO' || state == 'claiming.LHO') {
        tableStore.state.claimAble = true;
        var cur = getCurOrLast(seats, JSON.parse(current_trick));
        var last = getCurOrLast(seats, JSON.parse(last_trick));
        let allData = {
          scene: 3,
          claim: {
            seat: declarer,
            msg: `庄家声称还赢 ${claim_result} 墩`
          },

          dummySeat: seats[Dummy[declarer]],
          deals: getUserCardsDeal(tableStore.myseat, Dummy[declarer], hands),
          userCards: getUserCards(tableStore.myseat, Dummy[declarer], hands),
          user: user,
          board: [cur, last],
          calldata: {
            first: dealer,
            call: call,
            note: note
          }
        };
        tableStore.restore(allData);

        tableStore.setTricks(bd2.ew_win, bd2.ns_win, bd2.contract)

        var suit = null;
        var current = JSON.parse(current_trick)
        current = removeNull(current)
        if (current.length == 4 || current.length == 0) {
          suit = 'SHDC'
        } else {
          suit = current[0][0];
        }
        if (player == Dummy[declarer]) {
          //如果当前该明手玩家出牌，则庄家替明手出牌
          if (tableStore.myseat == declarer) {
            let cards = tableStore.selectCards(seats[Dummy[declarer]], suit, [ACT1.L]);
            if (cards.length == 0) {
              cards = tableStore.selectCards(seats[Dummy[declarer]], 'SHDC', [ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });

            } else {
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
              var reg = new RegExp(suit, "g");
              var a = 'SHDC'.replace(reg, "");
              cards = tableStore.selectCards(seats[Dummy[declarer]], a, [ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.D, onclick: tableStore.play });
            }
          }
        } else {
          if (player == tableStore.myseat) {
            let cards = tableStore.selectCards("S", suit, [ACT1.L]);
            if (cards.length == 0) {
              cards = tableStore.selectCards("S", 'SHDC', [ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });

            } else {
              tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
              var reg = new RegExp(suit, "g");
              var a = 'SHDC'.replace(reg, "");
              cards = tableStore.selectCards("S", a, [ACT1.L]);
              tableStore.setCardsState(cards, { active: ACT1.D, onclick: tableStore.play });
            }
          }
        }
        tableStore.state.calldata.first = dealer;
        tableStore.state.calldata.call = call;
        tableStore.state.calldata.note = note;
      }
    //}, 1000)
  }

  dealJoin(info,msg){
    
    let dir = msg[0]
    console.log(msg[0],user[dir])
    tableStore.userLogin(dir, { ready: 0, name: user[dir]['name'], face: '/imgs/face1.png', rank: '王者', seat: dir });
    if(!ALLREADY.includes(dir)){
      ALLREADY.push(dir);
      if(ALLREADY.length ===4 ){
        tableStore.dealCards();
        Sound.play('deal');
      }
    } 
  }
  dealLeave(info,msg){
    let dir = msg[0]
    console.log(msg[0],user[dir])
    tableStore.userLogin(dir, { name: "", face: ''});
  }
  /**
   * 处理叫牌信息
   * @param {object} info 牌局的所有信息
   * @memberof Process
   */
  dealBid(info, msg) {

    if (info.player === tableStore.myseat || info.state === 'openlead' || msg[0] === tableStore.myseat) {
      if (info.player) {
        this.timing(info.player, 999, () => { });
        if ('SN'.indexOf(seats[info.player]) != -1) {
          window.__Timer.start('sn');
        } else {
          window.__Timer.start('ew');
        }
        if (info.player == tableStore.myseat) {
          tableStore.bidState.showBlock = true
        } else {
          tableStore.bidState.showBlock = false
        }
      }

      boardStore.pbn.auction.call = eval(info.auction);
      boardStore.gameState = info.state;
      let { call, note, curCall } = this.transformAuctionData(info.auction, tableStore.myseat)
      tableStore.state.calldata.call = call;
      tableStore.state.calldata.note = note;
      tableStore.curCall = curCall;
      if (info.state == 'openlead') {
        let cards = null;
        tableStore.bidState.showBlock = false
        setTimeout(() => {
          tableStore.state.scene = 2;
          tableStore.bidState.showBid = false
        }, 1500)
        tableStore.state.declarer = info.declarer;
        tableStore.dummySeat = seats[Dummy[info.declarer]];
        const declarer = info.declarer;
        const contract = info.contract;
        tableStore.state.contract = contract
        if (contract) {
          if ('SHCD'.indexOf(contract[1]) != -1) {
            Card.suits = SUITS[contract[1]]
          }
        }
        var deals = cardString(tableStore.myseat, info.hands);
        tableStore.initCards(deals, false);
        tableStore.dealCards();
        if (info.player == tableStore.myseat) {
          cards = tableStore.selectCards("S", 'SHDC', [ACT1.L]);
          tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
        }


      }
      if (info.state == 'done') {
        tableStore.bidState.showBid = false
        //显示结果
        var result = 'Allpass';
        tableStore._result = result;
        const result1 = document.querySelector('.result');
        if (!result1)
          ReactDOM.render(<ResultPanel />, document.querySelector('#result'))
      }

    }

  }
  /**
   * 处理打牌信息
   * @param {object} info 牌局的所有信息
   * 
   */
  dealPlay(info, args) {
    //处理过的消息不再处理d

    if (TRICKS.indexOf(args[1]) != -1) return;
    const { current_trick, declarer, tricks } = info;
    tableStore.state.claim.seat = declarer;
    TRICKS = tricks;
    var myseat = tableStore.myseat;// 自己的真实方位
    var dummy = Dummy[info.declarer];// 明手的真实方位
    var player = seats[args[0]] //桌子方位的玩家打了一张牌
    //判断是不是第一张牌
    var curTrick = JSON.parse(info.current_trick)
    var lastTrick = JSON.parse(info.last_trick);
    curTrick = removeNull(curTrick)
    lastTrick = removeNull(lastTrick)
    var hands = JSON.parse(info.hands)
    var ind = dir.indexOf(dummy)
    
    if (myseat != dummy) {
      if (lastTrick.length == 0 && curTrick.length == 1) {
       
        tableStore.state.claimAble = true;
        var hand = changeSuitsOrder(hands[ind], Card.suits);
        tableStore.openDummy(seats[dummy], hand);
      }
    }
    if (args[0] == dummy) {
      if (myseat != info.declarer) {
        tableStore.dplay(player, args[1]);
      }
    } else {
      if (player != 'S') {
        tableStore.dplay(player, args[1]);
      }
    }

    tableStore.setTricks(info.ew_win, info.ns_win, info.contract)
    if (info.player) {
      this.timing(info.player, 999, () => { })
      if ('SN'.indexOf(seats[info.player]) != -1) {
        window.__Timer.start('sn');
      } else {
        window.__Timer.start('ew');
      }
    }

    if (info.state == 'done') {
      window.__Timer.stop()
      tableStore.state.scene = 5;
      //显示结果
      var result = '';
      if (info.point > 0) {
        result = info.result2 + " +" + info.point
      } else {
        result = info.result2 + " " + info.point
      }
      tableStore._result = result;
      const result1 = document.querySelector('.result');
      if (!result1)
        ReactDOM.render(<ResultPanel />, document.querySelector('#result'));
    }
    var suit = null;
    var current = JSON.parse(current_trick)
    current = removeNull(current)
    if (current.length == 4 || current.length == 0) {
      suit = 'SHDC'
    } else {
      suit = current[0][0];
    }
    if (info.player == Dummy[declarer]) {
      //如果当前该明手玩家出牌，则庄家替明手出牌
      if (tableStore.myseat == declarer) {
        let cards = tableStore.selectCards(seats[Dummy[declarer]], suit, [ACT1.L]);
        if (cards.length == 0) {
          cards = tableStore.selectCards(seats[Dummy[declarer]], 'SHDC', [ACT1.L]);
          tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });

        } else {
          tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
          var reg = new RegExp(suit, "g");
          var a = 'SHDC'.replace(reg, "");
          cards = tableStore.selectCards(seats[Dummy[declarer]], a, [ACT1.L]);
          tableStore.setCardsState(cards, { active: ACT1.D, onclick: tableStore.play });
        }
        //最后一张牌自动出
        var unplayCards = tableStore.selectCards(seats[Dummy[declarer]], 'SHDC', [ACT1.D, ACT1.L, ACT1.LC, ACT1.LCO]);
        if (unplayCards.length == 1) {
          setTimeout(() => {
            tableStore.dplay(seats[Dummy[declarer]], unplayCards[0]['card'])
          }, 1200)

        }
      }
    } else {
      if (info.player == tableStore.myseat) {
        let cards = tableStore.selectCards("S", suit, [ACT1.L]);
        if (cards.length == 0) {
          cards = tableStore.selectCards("S", 'SHDC', [ACT1.L]);
          tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });

        } else {
          tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
          var reg = new RegExp(suit, "g");
          var a = 'SHDC'.replace(reg, "");
          cards = tableStore.selectCards("S", a, [ACT1.L]);
          tableStore.setCardsState(cards, { active: ACT1.D, onclick: tableStore.play });
        }
        var unplayCards = tableStore.selectCards('S', 'SHDC', [ACT1.D, ACT1.L, ACT1.LC, ACT1.LCO]);
        if (unplayCards.length == 1) {
          setTimeout(() => {
            tableStore.dplay('S', unplayCards[0]['card'])
          })

        }
      }
    }

    if (boardStore.gameState == 'done') {
      alert('done')
    }
    //自动打最后一张牌

  }
  /**
   *处理 庄家摊牌
   * @param {object} info 牌局的所有信息
   * @param {object} args 玩家 和 玩家的操作
   * @memberof Process
   */
  dealClaim(info, args) {
    console.log(info, args)
    let claimMsg = `庄家声称还赢 ${args[1]}墩`;
    if (args[0] != tableStore.myseat) {
      tableStore.claim(args[0], claimMsg)
    }
    var hands = JSON.parse(info.hands)
    var ind = dir.indexOf(info.declarer)
    if (args[0] != tableStore.myseat) {
      //庄家亮牌
      var hand = changeSuitsOrder(hands[ind], Card.suits)
      tableStore.openDummy(seats[info.declarer], hand, Card.suits.join(''));
    }

  }
  /**
   * 处理玩家 同意 或 拒绝 摊牌的消息
   * @param {object} info 牌局的所有信息
   * @param {object} args 玩家 和 玩家的操作
   * @memberof Process
   */
  dealClaimAck(info, args) {
    console.log(111);

    if (info.state == 'playing') {
      tableStore.state.scene = 2;
    }
    if (info.state == 'done') {
      tableStore.state.scene = 5;
      //显示结果
      var result = '';

      if (info.point > 0) {
        result = info.result2 + " +" + info.point
      } else {
        result = info.result2 + " " + info.point
      }
      tableStore._result = result;
      const result1 = document.querySelector('.result');
      if (!result1)
        ReactDOM.render(<ResultPanel />, document.querySelector('#result'));
    }
  }
  /**
   * 修改闹钟的位置
   * @param {string} seat 闹钟所在的方位
   * @param {number} time 闹钟计时的上限
   * @param {function} callback 闹钟达到计时上限后，执行的函数
   * @memberof Process
   */
  transformAuctionData(auction, myseat) {
    let callArrs = eval(auction);

    let note = [];
    let nth = 1;
    let call = [];
    let curCall = '';
    if (callArrs.length == 0) return { call, note, curCall };
    const PARTNER = { E: "W", W: "E", S: "N", N: "S" }
    callArrs.forEach(item => {
      if (item[2] === "False" || PARTNER[item[0]] === myseat) {
        call.push(item[1])
      } else {
        call.push(item[1] + ` =${nth}=`);
        note.push(`约定叫${nth++}: ${item[3]}`)
      }
    });
    let fillNum = fillCall(callArrs[0][0], myseat)
    call = new Array(fillNum).fill("-").concat(call);

    for (let i = 0; i < call.length; i++) {
      if (call[call.length - 1 - i] != 'Pass' && call[call.length - 1 - i] != 'x' && call[call.length - 1 - i] != 'xx') {
        curCall = call[call.length - i - 1];
        break;
      }
    }
    call = Two(call, 4);
    if (curCall.includes("NT")) {
      curCall = curCall.slice(0, 3)
    } else {
      curCall = curCall.slice(0, 2)
    }

    return { call, note, curCall }
  }
  timing(player, time, callback) {
    let seat = seats[player]
    const unseat = new Position(seat).lshift(1).sn;
    ReactDOM.unmountComponentAtNode(document.querySelectorAll('.clock')[0]);
    ReactDOM.unmountComponentAtNode(document.querySelectorAll('.clock')[1]);
    ReactDOM.unmountComponentAtNode(document.querySelectorAll('.clock')[2]);
    ReactDOM.unmountComponentAtNode(document.querySelectorAll('.clock')[3]);
    const { myseat } = tableStore
    if (player === myseat) {
      ReactDOM.render(
        <Clock time={time} callback={callback} />,
        document.querySelector('.' + seat + 'clock')
      )
    }
    if (myseat === tableStore.state.declarer && player === Dummy[myseat]) {
      ReactDOM.render(
        <Clock time={time} callback={callback} />,
        document.querySelector('.' + seat + 'clock')
      )
    }
  }
  card2Record(cards_str, player) {
    const cardInfo = [];
    const cardArr = cards_str.split(" ");
    if (!player) return [] //解决下一副bug
    cardInfo.push({
      name: player.north_id.name,
      card: cardArr[0].split(".")
    })
    cardInfo.push({
      name: player.east_id.name,
      card: cardArr[1].split(".")
    })
    cardInfo.push({
      name: player.south_id.name,
      card: cardArr[2].split(".")
    })
    cardInfo.push({
      name: player.west_id.name,
      card: cardArr[3].split(".")
    })
    return cardInfo
  }
  call2Record(auction) {
    let auctionRecord = [];
    auction = eval(auction);
    auction.forEach((item) => {
      auctionRecord.push(item[1])
    })
    let dealer = auction[0] ? auction[0][0] : [];
    if (dealer === "E") auctionRecord.unshift("-")
    if (dealer === "S") {
      auctionRecord.unshift("-")
      auctionRecord.unshift("-")
    }
    if (dealer === "W") {
      auctionRecord.unshift("-")
      auctionRecord.unshift("-")
      auctionRecord.unshift("-")
    }
    auctionRecord = Two(auctionRecord, 4);
    return auctionRecord;
  }
  trick2Record(tricks) {
    tricks = eval(tricks);
    console.log(tricks)
    tricks = tricks.map((item) => {
      return JSON.parse(item)
    })
    // tricks = JSON.parse(tricks)
    return tricks
  }
}
export default new Process();
