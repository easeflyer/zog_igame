import Card from '../components/Card'  // 也应该从模型引入
import { ACT0, ACT1, ACT2, ACT3 } from '../components/Card'
import Models from '../models/model'
import { flexLayout } from '../libs/layout.js'
import { observable, computed, action, toJS } from 'mobx';
import Position from '../common/Position';
import Out from '../views/pc/Output';
// import Modals from '../models/model';
import Board from './board'
//import Claim from '../views/pc/Claim';
/**
 * TableModel 游戏桌 数据Model
 * 
 * 这个类主要用于 数据的计算，用来构造新的 state
 * 这里不含有任何 React 的组件。
 * Table.js 也就是 Table 控制器（容器）类调用本类
 * 
 * 输入：
 * 输出：HEAD
 * 
 * 
 * 其他参考：
 *    innerWidth，innerHeight
 *    获取窗口的高度与宽度(不包含工具条与滚动条):
 */
//* active define 0,1,2,3  0 灰色不能点，1 亮色不能点，2 亮色能点, 3 亮色能点突出
// const ACT0 = 0;                             // initCards
// const ACT1 = { D: 1, L: 2, LC: 3, LCO: 4 }  // dealCards
// const ACT2 = 5;                             // play() in board
// const ACT3 = 6;                             // out of Screen

class TableModel {
  _tableId = null;
  width = window.innerWidth;
  height = window.innerHeight;
  board = [[]]; // 出牌区域的四张牌
  seat = {}
  zindex = 10;
  myseat = 'S'               // 用户坐在 南
  //deals = 'XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX XXX.XX.XXXX.XXXX';
  deals = 'AT62.A6.JT6.QT85 XXX.XX.XXXX.XXXX QJ4.Q4.A9743.A43 XXX.XX.XXXX.XXXX';
  //@observable uiState = {} // 未启用。
  @observable bidState = {showBid:false,showBlock:false};
  @observable state = {
    cards: null, // 考虑这里不用 cards 只用必要的数字
    scene: 0,     // 0 准备阶段 1 叫牌阶段 2 出牌阶段 3 claim 等待，4 claim 确认
    calldata: { first: 'W', call: [], note: null }, // todo 补充 calldata 4列（东西南北）若干行的数组参考 call 方法
    user: {},
    lastTrick: false,  // 最后一墩牌是否显示
    //playseat:null, // 倒计时解决
    debug: false,
    unPlayCardNumber: null,
    claim: { seat: "W", msg: null },
    contract: '', // 暂时没用
    winEW: '',
    winSN: '',
    vulnerable:'EW',//局况
    declarer:'',//逻辑方位 庄家
  }
  dummySeat = "W"; // 固定界面方位，非逻辑方位
  dealer ='E';  //固定方位
  logicDealer=''//逻辑方位
  @observable curCall = '';  // 当前叫品，用于bidpanel 显示。
  // boardState = {
  //   boardId: null,
  //   contract: null,
  //   claim: { seat: null, value: null },
  //   result: null,
  //   curTrick: [],    // 桌面上的两张牌
  //   dealer: null,    // 第一个叫牌的人
  //   declarer: null,  // 庄家
  //   dummy: null,     // 明手
  //   ewWin: null,
  //   nsWin: null,
  //   player: null,
  //   unPlayedCards: null, // 什么样的数据结构？？
  // }
  // _boardId = null;
  // _contract = null;
  // _claim = {seat:null,value:null};
  @observable _result = "";

  constructor() {
    // this.state.user = {
    //   E: { ready: 0, name: '张三', face: '/imgs/face1.png', rank: '大师', seat: 'E' },
    //   S: { ready: 0, name: '李四', face: '/imgs/face2.png', rank: '专家', seat: 'S' },
    //   W: { ready: 0, name: '王五', face: '/imgs/face1.png', rank: '王者', seat: 'W' },
    //   N: { ready: 0, name: '赵六', face: '/imgs/face2.png', rank: '钻石', seat: 'N' }
    // };
    this.state.user = {
      E: { ready: 0, name: '张三', face: '/imgs/face1.png', rank: '大师', seat: 'E' },
      S: { ready: 0, name: '', face: '', rank: '', seat: '' },
      W: { ready: 0, name: '', face: '', rank: '', seat: '' },
      N: { ready: 0, name: '', face: '', rank: '', seat: '' }
    };
    //this.state.user = {N:null,E:null,S:null,W:null};
    const seat = Position.SNames.split('');
    seat.forEach(key => this.seat[key] = [{ x: 0, y: 0 }, { x: 0, y: 0 }]);
    //this.initCards(this.deals);
    window.___tableStore = this;
    window.toJS = toJS;
  }
  set tableId(data) {
    this._tableId = data;
    Board.tableId = data;
    // 设置 board.js  的 tableId;
  }
  get tableId() {
    return this._tableId;
  }

  get result() {
    if (this._result) return this._result;
    else return "N3D +2 NS 600";
  }
  // 横屏取高度，竖屏取宽度
  @computed get size() {
    return this.height > this.width ? this.width : this.height;
  }
  @computed get csize() {
    /*  短路语法 牌的大小 可以计算在下面的函数内。
        可以考虑用 vh 改造，所有计算都按照比例计算。
        横屏取 高度，竖屏取宽度。（正方形桌面的边长）
    */
    return this._csize || (() => {
      return this.size * 0.18;
    })()
  }
  /**
   * 初始化 state 
   * 每局开始的时候调用。给state 赋初值。
   */
  initState(){
    this.board=[[],[]];
    // this.state.cards = [];
    this.state.scene = 0;
    this.state.calldata = { first: '', call: [], note: null };
    this.state.claim = { seat: '', msg: null };
    this.state.contract = '';
    this.state.winEW = '';
    this.state.winSN = '';
    this.state.vulnerable = '';
    this.dummySeat = '';
    this.curCall = '';
  }

  /**
   * 从 this.deals 字符串转换成 ui用的 cards 数组
   * 
   * 为渲染输出做准备，返回到 this.cards
   * deals：[XXXXXXXXXXXXX,QJ98.A5.J853.QT4,XXXXXXXXXXXXX,XXXXXXXXXXXXX]
   * 备注：
   * Card.suits.slice(0);  返回新数组。 因为要对花色进行交换。
   * this._swDC() 为了岔开颜色显示。交换 方片和梅花的牌。
   */

  initCards(sdeals) {
    let suits = Card.suits.slice(0);            //['S', 'H', 'D', 'C'];
    //this._swDC(suits);
    const deals = sdeals.split(' ');
    console.log(deals)
    let index = 0;                              // 复位index 可以让四个人的牌同时发出来
    const cards = [[], [], [], []];             // 初始化二维数组 保存四个方位的牌
    deals.forEach((item, index1) => {           // index1 是方位编号
      const suit = item.split('.')
      //this._swDC(suit);
      suit.forEach((s, index2) => {           // index2 四个花色  s 'QJ98' 牌点字串
        for (var i = 0; i < s.length; i++) {
          cards[index1].push({
            onclick: () => false,             // onclick 必须是个函数
            active: ACT0,
            index: index,
            key: index,
            seat: Position.SNames[index1],  // 这张牌是那个方位的 动画位置需要
            //table: this,
            size: this.csize,                // 牌的大小
            card: suits[index2] + s[i],       //s[i]  5D
            position: { x: this.height / 2, y: this.height * 2 }     // 考虑一个默认位置。
          });
          index++;
        }
      });
    });
    this.state.cards = cards;
  }
  @action.bound
  toggleBid(showBlock=true) {
    this.hideLastTrick();
    //this.showBid = !this.showBid;
    this.bidState.showBid = !this.bidState.showBid;
    this.bidState.showBlock = showBlock;
  }
/**
   * 发牌
   * 
   * 算法注解：
   *  1） 东西方向牌是横向的，因此要确定旋转的圆心。旋转后保证左上角坐标就是牌
   *      的左上角如果按照中心旋转则还需要计算偏移量。利用 transformOrigin
   *  2） 出牌的位置 东西南北 四个位置之前计算好的。
   *  3） xy+5 目的是避免靠近牌桌边缘。
   *  4） delay 是每张牌发出来的延迟时间。按照牌编号进行计算。出牌时应清零
   *  5） '02'.indexOf(index) 东西的牌 rotate 旋转90度
   *  6） .onclick=this.onclick(item2) onclick 函数引用
   *      this.onclick(item2) 仍然返回一个函数 用来处理点击事件，传入item2
   *  7)  if(item1.active !== 0) return; 只有active ==0 的牌被发出来。
   * sepY 纵向扑克间隔
   * sepX 横向扑克间隔
   * 
   * active define 0,1,2,3  0 灰色不能点，1 亮色不能点，2 亮色能点, 3 亮色能点突出
   * ACT000  ACT100 ACT110 ACT111 (考虑编码)
   * 
   * 
   * 
   * 输入参数：play 是出牌的 事件处理方法。传递进来用于绑定到牌上
   * 输出：this.state.cards
   */
  @action.bound
  dealCards() {
    //this.deals = 'XXX.XX.XXXX.XXXX XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX';
    // this.deals = 'K34.J3.Q742.K832 XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX'
    // this.initCards(this.deals);
    const cards = this.state.cards;
    // const sepY = this.csize * 0.15;
    // const sepX = this.csize * 0.25;
    const size = this.height > this.width ? this.width : this.height;
    const offset = this.csize * 0.7 / 2
    cards.forEach((item, index) => {
      let rotate = 0;
      let seat = Position.SNames[index]
      let [x, y] = [this.seat[seat][0].x, this.seat[seat][0].y]
      if ('EW'.indexOf(seat) !== -1) rotate = -90;
      x = x + size / 16 / 5;
      y = y + size / 16 / 5; // margin
      item.forEach((item1, index1) => {
        if (item1.active !== 0) return;
        cards[index][index1].animation = {
          top: y,
          left: x,
          delay: (item1.key % 13) * 80,
          duration: 300,
          rotate: rotate,
          transformOrigin: `${offset}px ${offset}px`
        }
        cards[index][index1].active = ACT1.L; // 测试用
      });
      item = this.resetCards(item, seat)
    })
    this.state.cards = cards;
    return cards;
  }

  @action.bound
  play(index) {
    const _play = function () {
      const card = this.getCardByIndex(index);
      if (card.active == ACT1.LC) {
        this._preplay(card);
      } else if (card.active == ACT1.LCO) {
        this._play(card);
        //Sound.play('play');
        //if (this.board[0].length == 4) setTimeout(this.clearBoard, 1000)
      } else return;
    }
    return _play.bind(this);
  }
  /**
   * 扣着的牌 play
   * @param {*} seat  "NESW"
   * @param {*} card  "C2"
   */
  @action.bound
  dplay(seat, card) {
    //seat === this.dummySeat 
    const cards = this.state.cards;
    let ucard = null;//null 修改成{}

    if (seat === this.dummySeat){
      for (let c of cards[Position.SNames.indexOf(seat)]){
        if(c.card === card) {
          ucard = c;
          this._play(ucard);
          break;
        }
      }
    }else{
      // 非明手摊牌时 也是明手
      for (let c of cards[Position.SNames.indexOf(seat)]) {
        if (c.card === card) {
          ucard = c;
          this._play(ucard);
          return;
        }
      }
      for (let c of cards[Position.SNames.indexOf(seat)]) {
        if (c.active === ACT1.L) {
          ucard = c;
          ucard.card = card;
          this._play(ucard);
          return;
        }
      }
    }
  }


  /**
   * 点击一张牌 突出显示
   * 被点击的牌突出显示，其他牌都恢复原样
   * 
   * 输入输出都是基于 this.state.cards
   * 输入：点击牌的引用（注意是引用）
   * 输出：点击的牌的 top,left 调整
   *      所有其他牌的 top,left 调整
   */
  @action.bound
  _preplay(item) {
    this.state.cards.forEach((item) => item.forEach((item) => {
      if (item.active === ACT1.LCO) { // active=4 突出的牌 active=3 回复原样
        item.active = ACT1.LC;
        switch (item.seat) {
          case 'E': item['animation']['left'] += 20; break;
          case 'S': item['animation']['top'] += 20; break;
          case 'W': item['animation']['left'] -= 20; break;
          case 'N': item['animation']['top'] -= 20; break;
          default: break;
        }

      }
    }))

    item.active = ACT1.LCO;
    switch (item.seat) {
      case 'E': item['animation']['left'] -= 20; break;
      case 'S': item['animation']['top'] -= 20; break;
      case 'W': item['animation']['left'] += 20; break;
      case 'N': item['animation']['top'] += 20; break;
      default: break;
    }
    item['animation']['delay'] = 0;
  }
  // @action.bound
  // handlePlay(item) {
  //   if (item.active == 2) {
  //     this.preplay(item);
  //   } else if (item.active == 3) {
  //     this.play(item);
  //     //Sound.play('play');
  //     if (this.board.length == 4) setTimeout(this.clearBoard, 1000)
  //   } else return;

  // }

  /** 
   * 出牌 打出去
   * 首先要进行 preplay 然后才能 play
   * 
   * 输入：item 当前点击的牌的引用
   * 输出：item 位置调整，this.board 出牌区域的牌 调整。
   * 
   * if(window.event != undefined) Out.play(item);
   * 只有 点击打出去的牌 才会执行 Out.play();
   */
  @action.bound
  _play = (item) => {
    // if(item.active != 3) return; // 只有突出的牌能打出去。
    // if (this.board[0].length === 4) return false;
        // 已经打出去的牌
    if (this.board[0].length === 4) {setTimeout(this._play.bind(this,item),1100);return;};
    // item.active = ACT2;debugger
    // this.board[0].push(item);
    //console.log(this.board)
    // item['animation']['left'] = this.seat[item.seat][1].x;
    // item['animation']['top'] = this.seat[item.seat][1].y;
    // item['animation']['delay'] = 0;
    // item['zIndex'] = this.zindex++;
    // this.board[0].push(item);
    // if (this.board[0].length === 4) setTimeout(this.clearBoard, 1000);
    this._setCardACT2(item,true)

    this.resetTable(); // 牌恢复为不可点击状态 ACT1.L

    const seatIndex = Position.SNames.indexOf(item.seat);
    //const seatIndex = Position.SNames.indexOf(item.seat);
    let cards = this.state.cards[seatIndex];
    cards = this.resetCards(cards, item.seat, true);
    // if (window.event != undefined)
    { Out.play(item) };

  }

  /**
   * userCards 0-3  NESW
   * @param {*} userCards 
   * @param {*} board  0 当前墩，1上一墩
   */
  // restore1(userCards,board){
  //   debugger;
  //   const cards = this.state.cards;
  //   this.board = board;
  //   cards.forEach((ucards,index)=>{
  //     ucards.forEach((card)=>{
  //       // 如果不在用户手中

  //       if(userCards[index].indexOf(card.card) === -1){
  //         // 1） 如果在当前墩
  //         if(board[0].indexOf(card.card)){ // index 越大 zindex 越大
  //           this._setCardACT2(card);
  //         // 2） 如果已经飞走
  //         }else{
  //           this._setCardACT3(card);
  //         }
  //       }
  //     });
  //   });
  // }
  /**
   * 准备阶段断线重连
   * 该谁 叫牌，该谁打牌？
   */
  @action.bound
  restore(data) {
    this['restore' + data.scene](data);
  }

  @action.bound
  restore0(data) {
    this.state.scene = data.scene;
    this.state.user = data.user;
  }
  @action.bound
  restore1(data) {
    this.restore0(data); this.state.cards = [];
    this.initCards(data.deals);
    this.dealCards();
    this.curCall = data.curCall;
    this.state.contract = data.contract;
    this.state.calldata = data.calldata;

  }
  @action.bound
  restore2(data) {  //  注意这里需要先发牌才能恢复。
    this.restore1(data);
    this.dummySeat = data.dummySeat;
    this.state.winEW = data.winEW;
    this.state.winSN = data.winSN;
    // this.initCards(data.deals);
    // this.dealCards();
    this.restore_2(data.userCards, data.board);
  }
  @action.bound
  restore3(data) {
    this.restore2(data);
    this.state.claim = data.claim;
  }

  /**
   * 
   * 
   * 输入参数：
   * @param {*} userCards  0-1 NESW
   * 用户手里的牌
   * @param {*} board [0] 当前墩，[1] 上一墩
   * 参考: debug.js o.restore
   * 
   * 输出：
   * this.state.cards   调整牌数组。调整 active 的值等。
   * this.board         调整board 赋值当前墩和上一墩。
   * 
   */
  restore_2(userCards, board1) {
    const openSeat = 'S' + this.dummySeat;
    const cards = this.state.cards; // 这里应该从原始牌初始化。因为 state.cards 状态不确定
    this.board = [[], []];
    let cardNum = 0;
    // 1） 飞走不在手里的牌。
    userCards.forEach((uCards, uindex) => {
      if (openSeat.indexOf(Position.SNames[uindex]) !== -1) {
        cards[uindex].forEach((card) => {
          // 不在手里的牌 全部 飞走
          window.___card = card;
          // window.___uindex = uindex;
          if (uCards.indexOf(card.card) === -1) this._setCardACT3(card)
        });
      } else {
        cardNum = 13 - uCards.length;
        for (let i = 0; i < cardNum; i++) {
          // 不在手里的牌飞走 因为是暗牌因此从0开始飞走
          this._setCardACT3(cards[uindex][i]);
        }
      }
    });

    // 2) 设置当前墩和上一墩
    board1[0].forEach((ucard) => {
      const seatIndex = Position.SNames.indexOf(ucard.seat);
      // 暗牌处理
      if (openSeat.indexOf(ucard.seat) === -1) {
        cards[seatIndex][0].card = ucard.card;
        this._setCardACT2(cards[seatIndex][0]);
        //this.board[0].push(cards[seatIndex][0]);
        // 明牌处理
      } else {  // 赋值了多次。
        for (let card of cards[seatIndex]) {
          //cards[seatIndex].forEach((card)=>{
          //if(card.card === ucard.card) this._setCardACT2(card);
          if (card.card.slice(-1) === 'X') {
            card.card = ucard.card;
            this._setCardACT2(card);
            break;
          }
          //this.board[0].push(card);
        };
      }
    }, this);

    board1[1].forEach((ucard) => {
      const seatIndex = Position.SNames.indexOf(ucard.seat);
      // 暗牌处理
      if (openSeat.indexOf(ucard.seat) === -1) {
        cards[seatIndex][1].card = ucard.card;
        this._setCardACT3(cards[seatIndex][1]);
        this.board[1].push(cards[seatIndex][1]);
        // 明牌处理
      } else {
        for (let card of cards[seatIndex]) {
          //cards[seatIndex].forEach((card)=>{
          // if(card.card === ucard.card){
          //   this._setCardACT3(card);
          //   this.board[1].push(card);
          // }

          if (card.card.slice(-1) === 'X') {
            card.card = ucard.card;
            this._setCardACT3(card);
            this.board[1].push(card);
          }

        };
      }
    }, this);

    Position.SNames.split('').forEach((seat, index) => {
      this.resetCards(this.state.cards[index], seat);
    })



  }

  // restore_3(userCards, board1) {
  //   const openSeat = this.myseat + this.dummySeat;
  //   const cards = this.state.cards; // 这里应该从原始牌初始化。因为 state.cards 状态不确定
  //   this.board = [[], []];
  //   let cardNum = 0;
  //   // 1） 飞走不在手里的牌。
  //   userCards.forEach((uCards, uindex) => {
  //     if (openSeat.indexOf(Position.SNames[uindex]) !== -1) {
  //       cards[uindex].forEach((card) => {
  //         // 不在手里的牌 全部 飞走
  //         window.___card = card;
  //         // window.___uindex = uindex;
  //         if (uCards.indexOf(card.card) === -1) this._setCardACT3(card)
  //       });
  //     } else {
  //       cardNum = 13 - uCards.length;
  //       for (let i = 0; i < cardNum; i++) {
  //         // 不在手里的牌飞走 因为是暗牌因此从0开始飞走
  //         this._setCardACT3(cards[uindex][i]);
  //       }
  //     }
  //   });

  //   // 2) 设置当前墩和上一墩
  //   board1[0].forEach((ucard) => {
  //     const seatIndex = Position.SNames.indexOf(ucard.seat);
  //     // 暗牌处理
  //     if (openSeat.indexOf(ucard.seat) === -1) {
  //       cards[seatIndex][0].card = ucard.card;
  //       this._setCardACT2(cards[seatIndex][0]);
  //       //this.board[0].push(cards[seatIndex][0]);
  //       // 明牌处理
  //     } else {
  //       cards[seatIndex].forEach((card) => {
  //         if (card.card === ucard.card) this._setCardACT2(card);
  //         //this.board[0].push(card);
  //       });
  //     }
  //   }, this);

  //   board1[1].forEach((ucard) => {
  //     const seatIndex = Position.SNames.indexOf(ucard.seat);
  //     // 暗牌处理
  //     if (openSeat.indexOf(ucard.seat) === -1) {
  //       cards[seatIndex][1].card = ucard.card;
  //       this._setCardACT3(cards[seatIndex][1]);
  //       this.board[1].push(cards[seatIndex][1]);
  //       // 明牌处理
  //     } else {
  //       cards[seatIndex].forEach((card) => {
  //         if (card.card === ucard.card) {
  //           this._setCardACT3(card);
  //           this.board[1].push(card);
  //         }
  //       }, this);
  //     }
  //   }, this);

  //   Position.SNames.split('').forEach((seat, index) => {
  //     this.resetCards(this.state.cards[index], seat);
  //   })



  // }
  /**
   * 设置一张牌为 已经飞走了。
   * @param {} card 
   */
  _setCardACT3(card) {
    card['animation']['left'] = this.size / 2;
    card['position']['x'] = this.size / 2;
    card['animation']['top'] = -this.size * 2;
    card['position']['y'] = -this.size * 2;
    card['animation']['delay'] = 0;
    card.active = ACT3;
    //this.board[1].push(card);
  }

  /**
   * 把牌设置为 打在桌面上。
   * @param {*} card 
   * @param {boolean} isAnim true 有动画普通打牌 false 无动画断线重连
   * 
   */
  _setCardACT2(card, isAnim = false) {
    card.active = ACT2;    // 已经打出去的牌
    card['animation']['left'] = this.seat[card.seat][1].x;
    card['animation']['top'] = this.seat[card.seat][1].y;
    card['animation']['delay'] = 0;
    card['zIndex'] = this.zindex++;
    this.board[0].push(card);

    if (isAnim) {
      if (this.board[0].length === 4) setTimeout(this.clearBoard, 1000);
    } else {
      card['position']['x'] = this.seat[card.seat][1].x;
      card['position']['y'] = this.seat[card.seat][1].y;
      if (this.board[0].length === 4) this.clearBoard();
    }
  }


  // restore1(userCards,board){
  //   const cards = this.state.cards;
  //   this.board = board;




  //   cards.forEach((ucards,index)=>{
  //     ucards.forEach((card)=>{
  //       // 如果不在用户手中
  //       if(userCards[index].indexOf(card.card) === -1){
  //         // 1） 如果在当前墩
  //         if(board[0].indexOf(card.card)){ // index 越大 zindex 越大
  //           card.active = ACT2;    // 已经打出去的牌
  //           card['animation']['left'] = this.seat[card.seat][1].x;
  //           card['animation']['top'] = this.seat[card.seat][1].y;
  //           card['animation']['delay'] = 0;
  //           card['zIndex'] = this.zindex++;            
  //         // 2） 如果已经飞走
  //         }else{
  //           card.animation.left = this.size / 2;
  //           card.animation.top = -this.size * 2;
  //           card.active = ACT3;            
  //         }
  //       }
  //     });
  //   });
  // }



  /**
   * 清理桌面上的牌
   * 定位参考：
   *  -this.size * 0.2;  计分位置
   * 
   * board[i].active = ACT3;  飞到桌面以外。                      
   * board.unshift([]); 四张牌飞走后，当前墩为空。
   */
  //model
  @action.bound
  clearBoard() {
    //if(this.board.length < 4) return false;
    const board = this.board;
    for (let i = 0; i < board[0].length; i++) {
      board[0][i].animation.left = this.size / 2;
      board[0][i].animation.top = -this.size * 2;
      board[0][i].active = ACT3;
    };
    board.unshift([]);
    this.state.cards = Object.assign([], this.state.cards);
  }

  /**
   * 所有牌回复到 亮色，不可点击。
   * 也就是出牌后的状态。
   */
  @action.bound
  resetTable() {
    const cards = this.selectCardsByAct([ACT1.D, ACT1.LC]);
    window.___cards1 = cards;
    this.setCardsState(cards, { active: ACT1.L });
  }


  /**
   * 通过  actlist 选中特定的牌。
   * 比如选中：[ACT0,ACT1] 的所有牌。
   */
  selectCardsByAct(actlist) {
    const cards = this.state.cards;
    let destCards = [];
    cards.forEach((ucards) => {
      ucards.forEach((card) => {
        if (actlist.indexOf(card.active) !== -1) destCards.push(card);
      });
    });
    return destCards;
    // return cards.map((ucards,index)=>{
    //   return ucards.map((card)=>{
    //     if(actlist.indexOf(card.active)!==-1) return card;
    //   });
    // });

    // if(actlist.indexOf(card.active)!==-1) return card;
  }

  /**
   * 根据用户和花色选出指定的牌对象数组
   * @param {*} user 用户 NESW
   * @param {*} suit 花色
   * 
   * active = [ACT1.L,ACT1.D];
   */
  selectCards(userSeats, suit, active = "0123456") {
    const cards = this.state.cards;
    const seats = userSeats.split('');
    let destCards = [];
    seats.forEach((seat) => {
      const seatIndex = new Position(seat).in;
      cards[seatIndex].forEach((card, i) => {
        if (suit.indexOf(card.card.slice(0, 1)) !== -1 &&
          active.indexOf(card.active) != -1) destCards.push(card);
      });
    });
    return destCards;
  }
  /**
   * 通过 index n/52 获得card 的引用。
   * cardIndexOf 重复函数
   * @param {*} index 
   */
  getCardByIndex(index) {
    const cards = this.state.cards;
    const user = Math.floor(index / 13);
    const i = index % 13;
    return cards[user][i];
  }

  /**
   * 未完成。
   * @param {*} cards
   *    一维数组，值是card对象。
   * @param {*} active 
   * @param {*} handleClick 
   */
  addClick2Cards(cards, active, handleClick) {
    cards.forEach((item, index) => {
      cards[index].active = active;
      if (handleClick)
        cards[index].onclick = handleClick;
    });
  }
  /**
   * 好像可以覆盖上面的功能。
   */
  setCardsState(cards, state) {
    cards.forEach((card, i) => {
      console.log('card555:', card);
      Object.keys(state).forEach((key) => {
        //if(key=='onclick') card[key] = ()=>state[key](card);
        card[key] = state[key];
      });
      //cards[i] = Object.assign({}, card, state);
    });
  }


  /**
  * initSeat 初始化 发牌位置 出牌位置的坐标。 
  * center   桌子的中心
  *          以body 为父元素计算。
  * offset   是四张牌叠放需要错开的空间。（长 - 宽）/ 2
  * this.seat[key][0] 四个座位发牌坐标xy
  * this.seat[key][1] 四个作为出牌坐标xy
  * 
  *          出牌坐标计算依据：1）扑克牌的中心点和左上角位置差固定。
  *          因此可以以中心点考虑四个方位的位移 再加减相同的 位置差即可。
  *          注：0.7 是扑克的横竖比例。
  * 
  * 采用 .css 确定尺寸后 被注释的语句 不起作用了。修改为 clientHeight
  *        this.ref.board.current.clientHeight / 2
  *        // parseInt(this.ref.board.current.style.height.slice(0, -2)) / 2
  * 
  * 输入：center, seat
  * 输出：this.seat
  * 
  */
  initSeat(center, seats) {
    this.center = center;
    const offset = this.csize * 0.7 / 2
    for (let key in this.seat) {
      this.seat[key][0]['y'] = seats[key]['y'];
      this.seat[key][0]['x'] = seats[key]['x'];

      if (key === 'E') {
        this.seat[key][0]['y'] = this.seat[key][0]['y'] + this.size * 0.06
        // 下面是处理　牌的叠放顺序　联合参考：dealCards
        //this.seat[key][0]['y'] = this.seat[key][0]['y'] + this.size * 0.4
        this.seat[key][1]['y'] = center.y - offset
        this.seat[key][1]['x'] = center.x - offset * 0.8
      } else if (key === 'S') {
        this.seat[key][0]['x'] = this.seat[key][0]['x'] //+ this.size * 0.21
        //this.seat[key][1]['y'] = center.y + offset - this.csize / 2;
        this.seat[key][1]['y'] = center.y - offset * 0.8
        this.seat[key][1]['x'] = center.x - offset
      } else if (key === 'W') {
        this.seat[key][0]['y'] = this.seat[key][0]['y'] + this.size * 0.06
        this.seat[key][1]['y'] = center.y - offset
        this.seat[key][1]['x'] = center.x + offset * 0.8 - this.csize;
      } else if (key === 'N') {
        this.seat[key][0]['x'] = this.seat[key][0]['x'] //+ this.size * 0.21
        this.seat[key][1]['y'] = center.y + offset * 0.8 - this.csize;
        this.seat[key][1]['x'] = center.x - offset
      }
    }
  }
  /**
   * 重新整理手里的牌
   * 
   * 输入：
   *    cards       一手牌
   *    seatIndex   当前牌的方位号
   * 
   * 输出：
   *    cards       定位重新排列的一手牌
   * pos：left 上下 top 左右
   * flexLayout： 获得重新的布局分布 参数 2 每间隔2张牌 增大一些距离
   * Array.shift() 从开头弹出一个值
   */
  @action.bound
  resetCards(cards, seat, resetDelay = false) {
    const pos = "EW".indexOf(seat) == -1 ? 'left' : 'top';
    let length = 0;
    let ps = 0;
    cards.forEach(card => {
      if (card.active === ACT1.L || card.active === ACT1.LC)
        length++
    })
    const layout = flexLayout(this.size, length, 2)
    return cards.map((card, index) => {
      if (card.active === ACT1.L || card.active === ACT1.LC) {
        ps = layout.shift();
        card['animation'][pos] = ps;
        card['animation']['duration'] = 600;
        if (resetDelay) card['animation']['delay'] = ps;
        //if (resetDelay) card['animation']['delay'] = 0;
      }
      return card;
    })
  }

  /**
   * 按照花色布局 已可用，未启用
   * 
   * @param {*} cards 牌数组
   * @param {*} seatIndex 座位编号
   */
  suitLayoutCards(cards, seatIndex) {
    //const rotate = [0, 2].indexOf(seatIndex) == -1 ? '0' : '-90';
    const rotate = 0;
    let preCard = cards[0];
    let offsetTop = 0;
    let offsetLeft = 0;
    //let seat = Position.SNames[seatIndex];
    cards.map((card, index) => {
      if (card.card.slice(1, 2) != preCard.card.slice(1, 2)) {
        offsetTop += 40;
        offsetLeft = 0;
        card.animation['top'] += offsetTop;
        //card.animation['left'] += this.seat[seat][0].x
      } else {
        card.animation['left'] += offsetLeft;
        card.animation['top'] += offsetTop;
        offsetLeft += 25;
      }
      card.animation['rotate'] = rotate;
      preCard = card;
    })
  }


  // @action.bound
  // claim1(seat,num) {
  //   //this._claim.seat = this.myseat;
  //   //this.state.claim.seat = this.myseat;
  //   this.state.claim = {seat:seat,value:num};
  //   this.state.scene = 3;
  // }
  @action.bound
  claim(seat, claimMsg) {
    //this._claim.seat = this.myseat;
    // this.state.claim.seat = seat;
    this.state.claim.msg = claimMsg;
    this.state.scene = 3;
  }


  @action.bound
  getUnPlayCardNumber() {
    // const p = new Promise(this.fetchNumber);
    // const number =  await p;  
    //const number = 6;
    const cards = this.selectCards('S', 'SHDC', [ACT1.D, ACT1.L, ACT1.LC, ACT1.LCO])
    const number = cards.length;
    this.state.unPlayCardNumber = number;
    return number;
  }


  /** !! 弃用 用
   * 设置牌的 active 状态。
   * 把编号 在nums里 的牌设置成 active 状态
   * nums 是一个数组
   * active 是目标状态。*      
   * active define 0,1,2,3  0 灰色不能点，1 亮色不能点，2 亮色能点, 3 亮色能点突出
   * ACT0,  0
   * ACT1_D, ACT1_L, ACT1_LC, ACT1_LCO
   * ACT2
   * ACT3
   */
  // @action.bound
  // setActive = (nums: Array, active = 0) => {
  //   const cards = this.state.cards;
  //   cards.forEach((item) => item.forEach((item) => {
  //     if (nums.indexOf(item.index) != -1) item.active = active;
  //   }));
  //   this.state.cards = cards;
  //   //return cards;
  // } 1 qing 2 guan 3 tiao 4 chashou
  /**
   * 通过一张牌的索引，获得具体的 牌数据引用
   * this.state.cards 永远都是 52张牌
   * getCardByIndex重复函数
   */
  cardIndexOf(index) {
    const i1 = Math.floor(index / 13);  // 商数是座位 0-3
    const i2 = index % 13;              // 余数是 第几张牌
    return this.state.cards[i1][i2];
  }
  /**
   * 显示上墩牌
   * todo：明确了数据接口再改写。
   * 定位还存在问题。
   * 
   * 输入：this.state.lastTrick
   * 输出：this.state.cards
   *       this.state.lastTrick
   */
  @action
  lastTrick222 = () => {
    // 在模型里 应该先判断当前 trick 编号。然后决定是否能看lasttrick
    const show = !this.state.lastTrick;
    const lt = Models.lastTrick();
    let card = null;
    lt.forEach((item, index) => {
      card = this.cardIndexOf(item.index)
      //card.size = card.size * 0.8
      card['animation']['left'] = (show == true) ?
        this.seat[Position.SNames[index]][1].x - this.size / 2.9
        : this.size / 2;
      card['animation']['top'] = (show == true) ?
        this.seat[Position.SNames[index]][1].y - this.size / 2.9
        : -this.size * 2;
      //card['size'] = card['size'] * 0.7
      // card['animation']['rotate'] = 180;
      // card['position']['x'] = this.seat[Table.seatsen[index]][1].x;
      // card['position']['y'] = this.seat[Table.seatsen[index]][1].y;
      //card['animation'] = '';
      //card['animation']['delay'] = 0;
      card.active = ACT3; // 测试用
    })
    this.state.lastTrick = !this.state.lastTrick;
    return this.state.cards;
  }
  // @action
  // showLastTrick = (s = null) => {
  //   // 在模型里 应该先判断当前 trick 编号。然后决定是否能看lasttrick
  //   //debugger;
  //   const show = s !== null ? s : !this.state.lastTrick;
  //   const lt = this.board[1];
  //   window.___board1 = toJS(this.board);
  //   let card = null;
  //   lt.forEach((item, index) => {
  //     //card = this.cardIndexOf(item.index)
  //     //card.size = card.size * 0.8
  //     item['animation']['left'] = (show == true) ?
  //       this.seat[item.seat][1].x - this.size / 2.9
  //       : this.size / 2;
  //     item['animation']['top'] = (show == true) ?
  //       this.seat[item.seat][1].y - this.size / 2.9
  //       : -this.size * 2;
  //     //card['size'] = card['size'] * 0.7
  //     // card['animation']['rotate'] = 180;
  //     // card['position']['x'] = this.seat[Table.seatsen[index]][1].x;
  //     // card['position']['y'] = this.seat[Table.seatsen[index]][1].y;
  //     //card['animation'] = '';
  //     //card['animation']['delay'] = 0;
  //     item.active = ACT3; // 测试用
  //   })
  //   this.state.lastTrick = !this.state.lastTrick;
  //   //this.showBid = false;
  //   return this.state.cards;
  // }
  @action.bound
  toggleLastTrick() {
    this.showBid = false;
    this._setShowLastTrick(!this.state.lastTrick);
  }
  @action.bound
  showLastTrick() {
    this._setShowLastTrick(true);
  }
  @action.bound
  hideLastTrick() {
    this._setShowLastTrick(false);
  }
  @action
  _setShowLastTrick(isShow) {
    // 在模型里 应该先判断当前 trick 编号。然后决定是否能看lasttrick
    //debugger;
    const lt = this.board[1];
    window.___board1 = toJS(this.board);
    let card = null;
    if (lt) lt.forEach((item, index) => {
      //card = this.cardIndexOf(item.index)
      //card.size = card.size * 0.8
      item['animation']['left'] = (isShow == true) ?
        this.seat[item.seat][1].x - this.size / 2.9
        : this.size / 2;
      item['animation']['top'] = (isShow == true) ?
        this.seat[item.seat][1].y - this.size / 2.9
        : -this.size * 2;
      //card['size'] = card['size'] * 0.7
      // card['animation']['rotate'] = 180;
      // card['position']['x'] = this.seat[Table.seatsen[index]][1].x;
      // card['position']['y'] = this.seat[Table.seatsen[index]][1].y;
      //card['animation'] = '';
      //card['animation']['delay'] = 0;
      item.active = ACT3; // 测试用
    })
    this.state.lastTrick = isShow;
    //this.showBid = false;
    return this.state.cards;
  }


  /**
   * 
   * @param {*} seat   界面方位。业务方位需要进行转换。
   * @param {*} dcards 明手的牌数组  ['SQ','SJ' ....
   */
  @action.bound
  openDummy(seat, dcards) { debugger
    // await 获得数据 然后更新 state
    if (!this.dummySeat) this.dummySeat = seat;
    const dummySeat = seat;
    let index = 0;
    //const dCards = Models.openDummy().cards.split('.');
    // let cards = this.state.cards[Position.SNames.indexOf(dummySeat)];
    let cards = this.selectCards(dummySeat, 'SHDC',[ACT1.L]);
    // console.log('seatnumber:', dCards);
    // dCards.forEach((item1, index1) => {
    //   item1.split('').forEach((item2, index2) => {
    //     // 这里。
    //     cards[index].card =  Card.suits[index1] + item2 
    //     //cards[index].onclick = o.play(cards[index]);
    //     index++;
    //   })
    // })

    dcards.forEach((card, index) => {
      cards[index].card = card;
    });

  }
  
  setTricks(ew=false,sn=false,contract=false){
    if(ew) this.state.winEW = ew;
    if(sn) this.state.winSN = sn;
    if(contract) this.state.contract = contract;
  }

  // @action.bound
  // openDummy() {
  //   // await 获得数据 然后更新 state
  //   const dummySeat = this.dummySeat;
  //   let index = 0;
  //   const dCards = Models.openDummy().cards.split('.');
  //   let cards = this.state.cards[Position.SNames.indexOf(dummySeat)];
  //   console.log('seatnumber:', dCards);
  //   dCards.forEach((item1, index1) => {
  //     item1.split('').forEach((item2, index2) => {
  //       // 这里。
  //       cards[index].card = item2 + Card.suits[index1]
  //       //cards[index].onclick = o.play(cards[index]);
  //       index++;
  //     })
  //   })
  // }




  /**
   * 输入：某个方位"E", this.myseat
   * 输出：另外一个方位
   */
  // _shift(seat) {
  //   const offset = Position.SNames.indexOf(this.myseat) - 1
  //   const index = Position.SNames.indexOf(seat)
  //   return Position.SNames[(index + offset) % 4]
  //   //return 
  // }
  /**
   * 把方片和梅花做一个交换。
   * @param {*} cards 四个花色的牌构成的。
   */
  _swDC(arr) {
    let sw = null;
    sw = arr[2]; arr[2] = arr[3]; arr[3] = sw;
    return arr;
  }
  // se 是方位 "NESW"
  @action.bound
  userReady(se) {
    this.state.user[se]['ready'] = 1
  }

  @action.bound
  userAllReady() {
    const user = this.state.user;
    let ready = true;
    Object.values(user).forEach(el => {
      if (el.ready == 0) ready = false
    })
    //if (ready) this.state.scene = 1;
    return ready;
  }
  @action.bound
  userLogin(seat, user) {
    this.state.user[seat] = user;
  }
  /**   -----------------------------------------------------
   * 叫牌
   * seat 座位
   * bid 叫品
   * 
   * 输入：方位（E）,叫品（3H 或者 A3H）
   * 输出：this.state.calldata 修改
   * 
   * 
   * 这里 push 的顺序考虑。
   */
  // @action.bound
  // call = (seat, bid) => {
  //   const calldata = this.state.calldata
  //   if (calldata.length == 0) {
  //     calldata.push(Array(4).fill(null))
  //     calldata[0][Position.SNames.indexOf(seat)] = bid;
  //   } else if (seat == 'E') {
  //     calldata.push(Array(4).fill(null))
  //     calldata[calldata.length - 1][Position.SNames.indexOf(seat)] = bid;
  //   } else {
  //     calldata[calldata.length - 1][Position.SNames.indexOf(seat)] = bid;
  //   }
  // }

  call = (data) => {
    this.state.calldata = data;
  }

  /**
   * 恢复牌局
   * 主要用于断线重连，或者和服务器数据不同步时执行。
   * 依据 this.boardState 恢复。
   */
  @action.bound
  recovery = () => {

  }

  reConnect = () => {
    Out.reConnect()
  }
  nextGame = () => {
    Out.nextGame()
  }
}
// Position.SNamesen = ['E', 'S', 'W', 'N'];
//Position.SNames = ['E', 'S', 'W', 'N'];
// Position.SNamescn = ['东', '南', '西', '北'];


/**
 * 直接实例化，因为一局游戏只有一个桌子。
 * Table.js 也就是 Table 控制器（容器）类调用本类
 */
export { TableModel };
export default new TableModel();