import React, { Component } from 'react';
import ODOO from '../libs/odoo-bridge-rpc/src'
const arr = [['east_id','E'],['north_id','N'],['south_id','S'],['west_id','W']]
const dirMap = new Map(arr);
const host = 'http://192.168.1.8:8069'
const db = 'TT'
const models = {
  'res.users': ['name', 'doing_table_ids'],
  'og.table': ['name', 'game_id', 'board_ids', 'channel_ids','west_id', 'north_id','east_id','south_id'],
  // 'og.board': ['name', 'state', 'number', 'player', 'hands', 'dealer', 'auction'],
  // board模型字段全部取出，用不到的字段可以自行删除
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

const odoo = new ODOO({ host, db, models })
// const odoo = {}
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

class Index3 extends Component {
  state = {
    // sid: null,
  }

  login = async (params) => {
    const p = {
      login: localStorage.getItem('userName'),
      password: localStorage.getItem('pwd'),
    }
    console.log(p)
    const newParams = params || p;
    alert("before login")
    const sid = await odoo.login(newParams);
    alert(sid)
    if (sid) {
      this.setState({ sid });
      this.getGameList();
    }

  }

  // 获取game列表
  getGameList = async () => {
    const user = await odoo.user(fields)

    tables = user.attr('doing_table_ids')

    // 一个牌手可能有多个比赛，每个比赛的doing_table，牌手选择比赛进入比赛
    const tableData = tables.look(fields.doing_table_ids)
      debugger
    const gameList = (<div>
      {tableData.map((item, index) => {
        return (
          <button
            onClick={() => { this.getIntoTable(item.game_id.id) }}
            key={index}>{item.game_id.name}</button>
        );
      })}
    </div>);
    this.setState({ gameList: gameList })


    // const Bus = odoo.env('bus.bus')

    // Bus.start_poll(this.before_poll, this.after_poll)

  }

  // 长连接回调函数，暂时没有用到
  before_poll = async () => {
    console.log('before 0')
    // before_poll0(odoo)
  }

  // 长连接收到消息的回调函数，包含最新牌桌数据，和牌手做出的动作
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



  // 进入牌桌（传入gameID）
  getIntoTable = async (gameId) => {
    if (!this.state.sid) {
      alert('你还没有登陆！')
      return
    }
    // 当前牌桌
    table = tables.get_doing_table(gameId);
    const data = table.look({ west_id: null, north_id: null, east_id: null, south_id: null, })
    console.log('WNES：', data)
    for(let item in data ){
      
     if(data[item]['name']==localStorage.getItem('userName')) {
        var mySeat = dirMap.get(item);
        alert(mySeat)
     }
    }
    console.log(table)

    // 启用长连接
    const Bus = odoo.env('bus.bus')
    Bus.start_poll(this.before_poll, this.after_poll)
  }

  // 获取当前牌桌信息（页面初始时调用，后续的新数据从消息里面获取以更新页面）
  getBoard = async () => {

    if (!this.state.sid) {
      alert('你还没有登陆！')
      return
    }

    boards = table.attr('board_ids')

    // 当前正在进行的board
    bd = boards.get_doing_board()[0]
    console.log(bd)

    // 读取到的牌桌数据
    const bd2 = bd.look(fields.doing_table_ids.board_ids)
    console.log(bd2)



    const player = bd.attr('player')
    const state = bd.attr('state')

    // 获取随机叫牌数据，测试用
    const bid = await bd.get_random_call()
    console.log(player, state, bid)

    // const resss = await bd.bid(player, bid)
    // console.log(player, state, bid, resss)
  }



  // 叫牌
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
    const res = await bd.claim(player, cl)
    console.log(res)
  }
  // 同意/不同意 摊牌 (number=1表示同意)
  claim_ack = async (player, ack) => {
    const res = await bd.claim_ack(player, ack)
    console.log(res)
  }


  render() {
    return (
      <div>
        <h3 style={{ margin: 'auto', width: 22 }}>odooRPC</h3>
        <hr />
        <button onClick={() => this.login()}>登陆</button>
        <br />
        <br />
        {this.state.gameList}
        <br />
        <button onClick={() => this.getBoard()}>打牌/测试</button>
      </div>
    );
  }
}

export default Index3;
