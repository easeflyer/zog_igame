/*
功能列表
根据数据初始化一手牌。
设置一手牌的花色顺序。
读取一个花色的牌

输入对象应该是 一个数组。因为 hand 不应该从字符串生成。
而应该去引用 52张牌中的 13张。 便于操作。


思路应该是：
1 从字符串 开始初始化。初始化的过程。分别建立多个对象（数组）
2 cards 记录 52个对象 然后 4个hand 分别记录四个人的 数组引用。
3 hand 对象可以有相应的方法。操作数组。
*/



import {CCard} from "./card";

class hand extends Object{
  order = "SHDC";
  _hand = [];

  /**
   *Creates an instance of hand.
   * hand 对象目的是为了操作 一手牌方便。本身不产生牌。
   * @param {*} hand 是个数组引用。
   * @memberof hand
   */
  constructor(hand){
    this._hand = hand;
    // 如果 hand 不为空 则 初始化 this.s h d c 否则不用初始化。
  }
  

  setOrder(order){
    this.order = order;
    // 调整牌的顺序
  }
}