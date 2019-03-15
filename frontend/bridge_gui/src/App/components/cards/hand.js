/*
功能列表
根据数据初始化一手牌。
设置一手牌的花色顺序。
读取一个花色的牌

Hand 抽象 思路：

Hand 就和人的手一样，只是把牌码好而已。便于找到合理的牌。进行操作。
换句话说 Hand 就是对 原始52张牌中的 13 张进行引用持有和操作。

下面写 demo 试试看 Hand 的各种用法。

*/



import { CCard } from "./card";
import {flexLayout} from "../../libs/layout";

class CHand{
  order = "SHDC";
  style = "flex";
  direction = "h";  // horizontal or vertical
  /**
   *Creates an instance of hand.
   * hand 对象目的是为了操作 一手牌方便。本身不产生牌。
   * @param {*} hand 是个数组引用。
   * @memberof hand
   */
  constructor(hand=null) {
    this._hand = new Set([]);
    this._s = new Set([]);
    this._h = new Set([]);
    this._d = new Set([]);
    this._c = new Set([]);

    if (hand) hand.forEach((card)=>this.add(card));
  }
  /**
   * 添加一个 card 对象
   * @param {*} card 是一个 card 简单对象
   * @memberof hand
   */
  add(card) {
    const suit = card.name.toLowerCase().slice(0, 1);
    this._hand.add(card);
    this[`_${suit}`].add(card);
  }
  del(card) {
    const suit = card.name.toLowerCase().slice(0, 1);
    this._hand.delete(card);
    this[`_${suit}`].delete(card);
  }
  get s() { return this._s; }
  get h() { return this._h; }
  get d() { return this._d; }
  get c() { return this._c; }
  get hand(){ return this._hand }
  setOrder(order) {
    this.order = order;
  }
}

export {CHand}