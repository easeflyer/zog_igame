import { ACT0, ACT1, ACT2, ACT3 } from '../components/card'
import Models from '../models/model';
import Agent from '../models/agent';
//import Card from '../components/Card';
import { flexLayout } from '../libs/layout.js'
import { observable, computed, action } from 'mobx';


/**
 * TODO：两个触发因素：1 UI主动事件比如鼠标点击。  2）轮训获得消息
 * 
 * TODO：
 * 根据 uistate 以及 桥牌逻辑，写出所有 数据改变的函数。
 * 改变数据全部由函数解决。
 * 这个类应该包含两部分函数。
 * 1）业务处理，改变 state 数据。
 * 2）调用agent网络代理，获得新数据。然后调用业务处理函数。
 * 
 * 
 * 
 * todo：根据 uistate 以及 桥牌逻辑，写出所有 数据改变的函数。
 * send 自己准备。
 * recieve 别人准备。
 * 返回用户是否all ready。
 * 初始化board 牌局初始信息。
 * 
 * 发牌：收到牌例进行更新state。分配四个玩家的牌
 * 重新发牌。
 * 叫牌，网络问题，取消上次叫牌。
 * 叫牌完毕
 * 首攻
 * 打牌，网络错误，取消打牌
 * 摊牌，确认摊牌
 * 摊牌撤销。allReady
 * 游戏结束：保留成绩，结束标志。
 * 
 * 
 * 
 * 
 */



/**
 * BzState 也就是业务逻辑 State
 * UiState 衍生自 BzState 观察此State 的变化自动变化。
 * BzState 数据结构参照 PBN
 */
const suits = ['S','H','D','C'];
Array.prototype.remove= function(removeItem){
   var ind =  this.indexOf(removeItem);
   if(ind != -1){
     this.splice(ind,1)
   }
}
class Board {
  constructor(){
    this.Reload = new Map();
    this.Reload.set('start playing ',()=>{alert("start play")});//进入房间，所有玩家没有点击准备，重连
    this.Reload.set('calling ready',this._Reload_ready); //准备阶段重连
    
    this.Reload.set('playing',this._Reload_playing);//打牌阶段重连
    this.Reload.set('biding',this._Reload_biding); //叫牌阶段重连
  }
 @observable pbn = {
    event: '国际大赛',
    site: '石家庄赛区',
    date: '2018.10.1',
    board: '1',
    west: '张一',
    north: '王二',
    east: '李三',
    south: '赵四',
    dealer: 'N',
    vulnerable: 'None',
    deal: 'N:.63.AKQ987.A9732 A8654.KQ5.T.QJT6 J973.J98742.3.K4 KQT2.AT.J6542.85',
    scoring: "IMP",
    declarer: "",
    contract: "",
    result: null,
    /* cards 字符串
                    S
                    H 6 3
                    D A K Q 9 8 7
                    C A 9 7 3 2
    S K Q 10 2                      S A 8 6 5 4
    H A 10                          H K Q 5
    D J 6 5 4 2                     D 10
    C 8 5                           C Q J 10 6
                    S J 9 7 3
                    H J 9 8 7 4 2
                    D 3
                    C K 4   
    */
    cards: "",

    auction: {
      first: 'N',
      call: [],
      note: ["note1", "note2"]
    },
    /**
    first 为 W 意味着所有数据顺序为：W N E S
    tricks
    [
      ['SK =1=' H3 S4 S3]
      [C5 C2 =2= C6 CK]
      [S2 H6 S5 S7]
    ]
     */
    play: {
      first: 'W',
      tricks: [
        ['SK =1=', 'H3' ,'S4', 'S3'],
        ['C5', 'C2 =2=', 'C6', 'CK'],
        ['S2','H6','S5','S7']
      ],
      note: ['note1', 'note2']
    }
  }
  // ---------------------------------------------------------------------------
  // 下面为 app 应用增加的 字段。上面的都是 pbn 必要的字段
  // ---------------------------------------------------------------------------
  tableId = null;
  /**
   * 当前手里的牌
   */
  hands = [
    ['SK', 'SQ', 'ST', 'S2', 'HA', 'HT',],
    [],
    [],
    [],
  ];
  pollingId=1;
  delFirstMessage=1;
  lastState=null;
  passNum=0;
  // 当前墩，参考 play.tricks 顺序参考 play.first
  @observable curTrick = [];
  // get player = () =>{

  // 准备状态，用户是否已经准备好。
  @observable ready = { west: 1, north: false, east: false, south: false }
  conn = {
    public_channel: 1,
    private_channel: 2
  }
  @observable my = {
    username: '张三丰',
    seat: 'south',
    cards:[],
  }
  @observable activePlayer = ''
  //===========================================================================
  // 以下为方法
  //===========================================================================



  /**
   * sendReady()
   * 1）点击准备
   * 切换玩家的准备状态，并且发送给服务器。
   */
  sendReady() {
    const mySeat = this.my.seat;
    const ready = !this.ready[mySeat]
    Agent.Board.sendReady(ready).then(
      () => console.log('准备成功。'),
      () => console.log('准备失败，需要重置本地状态')
    );

  }
  /**
   * 设置本地准备状态
   * @param {*} position 
   * @param {*} readyOrNot 
   */
  setReady(position, readyOrNot) {
    this.ready[position] = readyOrNot;
  }

  allReady() {
    // return Object.values(this.ready)
    //   .reduce((previousValue, currentValue) => previousValue && currentValue);
    this.activePlayer=this.dealer;
  }
  /**
   * 名称：初始化 board
   * 流程：用户进入 game 路径后，根据tableid 获得 board 初始信息。
   * 输出：board 获得牌局初始信息，包括牌的信息。
   */
  async init() {
    const board = await Agent.Board.getBoard(this.tableId);
    // 如果 board.state 断线，则执行 reset 方法。回复游戏状态。
    Object.assign(this.pbn, board);
    this.conn = board.conn;
  }
  /**
   * 断线，或者强制恢复。
   */
  async resetBoard() {
    // await 
  }

  /**
   * 发牌
   * aaa.bbb.ccc.ddd
   */
  deal() {
    const arrDeal = this.deal.split(' ');
    this.hands = arrDeal.map((hand) => {
      if (hand === '-') return Array(13).fill('X');
      const arrSuit = hand.split('.');
      return arrSuit.map(() => {

      });
    });
  }
  getMyCards(){
   var arrCards = this.hands[['N','E','S','W'].indexOf(this.my.seat)].split('.');
   arrCards.forEach((item,index) => {
     item.split('').forEach((cardNum)=>{
       this.my.cards.push(suits[index]+cardNum)
     })
   });

  }
  play(card){
    Models.play(this.sucPlay,this.failPlay,this.board_id,this.my.seat,card);
    this.playedCard=card
    this.my.cards.remove(this.playedCard)
  }
  /**
   * 10986
   */
  sucPlay=(data)=>{
    console.log(data)
    Models.sendplay(()=>{},()=>{}, this.board_id, data, this.channel_id);  //查询出牌结果
  }
  recievePlay=(body)=>{
    console.log(this.curTrick.length)
    if(this.curTrick.length===4){
      this.curTrick=[]
    }
    this.curTrick.push(body.card)
    this.activePlayer = body.nextplayer;
    
  }

  @action.bound
  _Reload_playing(){
    this.my.cards=[];
    this.lastState.unplayed_card.forEach((item)=>{
      if(item.indexOf(this.my.seat) !=-1){
        this.my.cards.push(item[1])
      }
    })
    this.lastState.current_trick.forEach((item)=>{
      this.curTrick.push(item[2])
    })
   this.pbn.declarer = this.lastState.declarer;
   this.pbn.contract = this.lastState.contract;
   this.activePlayer = this.lastState.player;
  }
 
  @action.bound
  _Reload_ready(){
    this.ready.east = this.lastState['east_ready'];
    this.ready.south = this.lastState['south_ready'];
    this.ready.west = this.lastState['west_ready'];
    this.ready.north = this.lastState['north_ready'];
    const isAllReady = Object.values(this.ready).every((item)=>{
      console.log(item);
      return item==='R';
    })
    if (isAllReady){
      this.activePlayer = this.dealer;
    }
  }
  @action.bound
  _Reload_biding=()=>{
    //bidder表示该谁叫牌了
    const {bidder,call_info}= this.lastState;
    this.activePlayer = bidder;
    call_info.forEach((item)=>{
     
      this.saveCall(item[2]);
    })
  }
  re_init(){
    
    const {state} = this.lastState;
    
    this.Reload.get(state)();
  }
  handleReady = () => {     //收到牌手的准备消息
    Models.call_ready(this.sucReady,this.failReady,this.board_id,this.my.seat);
}
sucReady=(data)=>{

    this.ready[this.my.seat]='ready' ;
    const msg = {
        pos: this.my.seat,
        state: 'ready',
        next_board:'',
    }
    Models.send_message(this.sucSend,()=>{},this.channel_id,msg);
}
sucSend=(data)=>{
    return false
}
bidCall=(card)=>{   //牌手的叫牌事件，发送叫牌消息
      
  Models.bid(()=>{alert(1)},()=>{},this.board_id,this.my.seat,card,this.channel_id);
}
saveCall=(data)=>{
  const {call} = this.pbn;
  
   if(data=="Pass"){
     this.passNum+=1;
   }else{
     this.passNum=0;
   }
  call.forEach((item,index)=>{
    if(item.length<4){
      item.push(data)
    }else if(index==call.length-1){
      call.push([data]);
    }
  })
  if(call[0][0]=="Pass"){
    if(this.passNum==4){
      alert("下一局")
    }
  }else{
    if(this.passNum==3){
      
      Models.call_result(()=>{},()=>{},this.board_id,this.channel_id);
    }
  }   
}

/**
 * {'declarer': 'N', 'openlead': 'E', 'nextplayer': 'E', 'dummy': 'S', 'contract': '2H'}
 */
handleBidResult=(data)=>{
  this.pbn.declarer = data.declarer;
  this.pbn.play.first = data.openlead;
  this.pbn.contract = data.contract;
  this.activePlayer = data.openlead;
}
}
export default new Board();
