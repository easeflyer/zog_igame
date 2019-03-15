import React from 'react';
import { MCard, CCard,toArr } from '../card'
import { CHand as Hand } from '../hand'
import {flex_layout, delay} from '../../../libs/layout'

function gen3(i, j) {
  const style = {
    x: 15,
    y: 15,
    delay: i * 1000 + j * 100
  }
  return style;
}

/**
 * @param {*} s suit 4个花色
 * @param {*} r rank 13个牌点
 * @returns
 */
function gen2(s, r) {
  const base = { x: 1, y: 5 };    // 初始位置
  const offset = { x: 5, y: 10 }  // 间隔
  const style = {
    x: base.x + offset.x * r,
    y: base.y + offset.y * s
  }
  return style;
}




function CHand() {
  const suits = "SHDC";
  const deals = 'AT62.A6.JT6.QT85';
  const hand = new Hand();
  deals.split('.').forEach((suit, s) => {
    suit.split('').forEach((card) => {
      hand.add(new CCard(suits[s] + card));
    })
  })

  const cards = [hand.s, hand.h, hand.c, hand.d];
  
  const comCards = cards.map((suit, s) => Array.from(suit).map((c, r) => {
    return <MCard
      active={2}
      onClick={() => alert(c.name)}
      animation={gen3(s, r)}
      name={c.name}
      size={20}
      position={gen2(s, r)}
    />
  }))
  const comCards1 = Array.from(hand.hand).map((c,r)=>{
    return <MCard
      active={2}
      onClick={() => alert(c.name)}
      animation={gen3(10, r)}
      name={c.name}
      size={20}
      position={gen2(6, r)}
    />
  })


  console.log(hand);
  console.log(toArr("QJ98.A5.J853.QT4","SHCD"))
  console.log(toArr("QJ98","S"))
  return (
    <div>
      {comCards}
      <hr />
      {comCards1}
    </div>
  );
}



const Demo = props => <div>
  <CHand />
</div>




export default Demo;