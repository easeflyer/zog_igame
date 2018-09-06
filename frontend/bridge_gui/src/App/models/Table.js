import Card from '../game/Card'  // 也应该从模型引入
class TableModel {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.deals = 'XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX XXX.XX.XXXX.XXXX';
    this.state = {
      cards: null,
    }
    this.initCards();
  }
  get csize() {
    /*  短路语法 牌的大小 可以计算在下面的函数内。
        可以考虑用 vh 改造，所有计算都按照比例计算。
    */
    return this._csize || (() => {
        return this.height * 0.18;
    })()
}

  initCards() {
    const suits = Card.suits                    //['S', 'H', 'D', 'C'];
    const deals = this.deals.split(' ')
    let index = 0;                              // 复位index 可以让四个人的牌同时发出来
    const cards = [[], [], [], []];             // 初始化二维数组 保存四个方位的牌
    //deals. [XXXXXXXXXXXXX,QJ98.A5.J853.QT4,XXXXXXXXXXXXX,XXXXXXXXXXXXX]
    // 注意避免用 X 暴露花色的数量
    deals.forEach((item, index1) => {
      const suit = item.split('.')
      suit.forEach((s, index2) => {           // index2 四个花色  s 'QJ98' 牌点字串
        //cards[index1][index2] = [];
        for (var i = 0; i < s.length; i++) {
          cards[index1].push({
            onclick: () => false,              // onclick 必须是个函数
            active: 0,
            index: index,
            key: index++,
            seat: TableModel.seats[index1],       // 这张牌是那个方位的
            //table: this,
            size: this.csize,                // 牌的大小
            card: s[i] + suits[index2],       //s[i]
            position: { x: this.height / 2, y: this.height * 2 }     // 考虑一个默认位置。
          })
        }
      });
    });
    // console.log('cards.......333.............')
    // console.log(cards)
    this.state.cards = cards;
  }
}
TableModel.seats = ['east', 'south', 'west', 'north']
TableModel.seatscn = ['东', '南', '西', '北']

/**
 * 直接实例化，因为一局游戏只有一个桌子。
 */
export default new TableModel();