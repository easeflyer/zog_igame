import { ACT0, ACT1, ACT2, ACT3 } from '../components/Card'
import Models from '../models/model';
import Agent from '../models/agent';
import Card from '../components/Card';
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
class Board {
  pbn = {
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
    declarer: "S",
    contract: "5HX",
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
    /**
    call:
      [
        [1D      1S   3H =1= 4S]
        ['4NT =2=' X    Pass   Pass]
        [5C      X    5H     X]
        [Pass    Pass Pass]
      ]
     */
    auction: {
      first: this.dealer,
      call: [],
      note: ["note1", "note2"]
    },
    /**
    first 为 W 意味着所有数据顺序为：W N E S
    tricks
    [
      ['SK =1=' H3 S4 S3]
      [C5 C2 C6 CK]
      [S2 H6 S5 S7]
    ]
     */
    play: {
      first: 'W',
      tricks: [],
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
  // 当前墩，参考 play.tricks 顺序参考 play.first
  curTrick = ['D4', 'DK', 'H5', '-'];
  // get player = () =>{

  // 准备状态，用户是否已经准备好。
  ready = { west: false, north: false, east: false, south: false }
  conn = {
    public_channel: 1,
    private_channel: 2
  }
  my = {
    username: '张三丰',
    seat: 'south',
  }

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
    return Object.values(this.ready)
      .reduce((previousValue, currentValue) => previousValue && currentValue);
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
}

export default new Board();