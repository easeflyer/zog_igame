import React,{useState,useCallback} from 'react';
import { MCard, CCard,toArr } from '../card'
import { CHand as Hand } from '../hand'
import {flex_layout, delay} from '../../../libs/layout'







/**
 * 测试案例。
 * 
 * 利用 flex_layout 对一手牌进行布局计算。
  * @returns
 */
function CHand() {
  const suits = "SHDC";
  const deals = 'AT62.A6.JT6.QT85';
  const hand = new Hand();
  deals.split('.').forEach((suit, s) => {
    suit.split('').forEach((card) => {
      hand.add(new CCard(suits[s] + card));
    })
  })

  const cards = [...hand.s, ...hand.h, ...hand.c, ...hand.d];
  
  flex_layout(cards,70,2,'x');
  delay(cards);

  const comCards1 = cards.map((c,r)=>{
    return <MCard
      active={2}
      onClick={() => alert(c.name)}
      animation={c.animation}
      name={c.name}
      size={20}
    />
  })

  console.log(hand);
  console.log(toArr("QJ98.A5.J853.QT4","SHCD"))
  console.log(toArr("QJ98","S"))
  return (
    <div>
      {comCards1}
    </div>
  );
}



const Demo = props => <div style={{
  position:'absolute',
  left:'20vh',
  top:'20vh',
  width:'70vh',
  height:'20.1vh',
  border:'1px solid red'
  }}>
  <CHand />
</div>




export default Demo;