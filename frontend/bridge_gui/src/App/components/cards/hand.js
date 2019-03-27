/*
Hand 抽象 思路：
Hand 就和人的手一样，只是把牌码好而已。便于找到合理的牌。进行操作。
换句话说 Hand 就是对 原始52张牌中的 13 张进行引用持有和操作。

功能列表：

1）通过一个 card 对象数组

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

  /**
   *删除有问题，添加也有问题。
   * 添加和删除的是对象的话。如何确定要删除的对象是谁？
   * 点击了某个对象，可以，如果是收到消息。要根据 字符串找到这个对象，就比较苦难了。
   * @param {*} card
   * @memberof CHand
   */
  del(card) {
    if(typeof(card)=='string') card = this.getCard(card);
    if(!card) return false;
    const suit = card.name.toLowerCase().slice(0, 1);
    this._hand.delete(card);
    this[`_${suit}`].delete(card);
  }
  /**
   * 输入牌字符串返回 card 对象
   *
   * @param {*} cardstring 如 C5，S9 等
   * @returns
   * @memberof CHand
   */
  getCard(cardstring){
    for(let c of this._hand) if(c.name== cardstring) return c;
    return false;
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