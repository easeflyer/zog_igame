import React from 'react';
import {MCard} from '../card'

function gen1(i, j) {
  return {
    top: 200 + i * 100,
    left: 200 + j * 50,
    delay: i * 1000 + j * 100
  }
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







const Demo1 = props => {
  const suits = "SHDC";
  const ranks = "23456789TJQKA";
  const arrCards = suits.split('').map((suit) => ranks.split("").map((rank) => suit + rank));
  console.log(arrCards);
  const comCards = arrCards.map((suit, s) => suit.map((c, r) => {
    return <MCard
      active={2}
      onClick={()=>alert(c)}
      animation={gen1(s, r)}
      name={c}
      size={20}
      //position={gen2(s, r)}
    //zIndex={100+i+j}
    />
  }))

  return comCards
}

const Demo = props => <div>
  <div style={{ position: "absolute", left: "10px" }}>
    <Demo1 />
  </div>
  {/* <div style={{position:"absolute",left:"600px"}}>
    <Demo1 anim={1} pos={0} />
  </div>   */}
</div>




export default Demo;