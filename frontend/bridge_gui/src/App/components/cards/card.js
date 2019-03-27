import React from 'react';
import './style/cards.less';
import Motion from './Motion';
import Conf from './conf';

const UNIT = Conf.unit;
const SCALE = Conf.card.scale;                          // 牌的长宽比
const BDARK = Conf.card.bdark;                          // brightness DARK 0.6
const BLIGHT = Conf.card.blight;                        // brightness LIGHT 1;



class CCard{
  active = 1;
  size = Conf.card.size;
  name = null;
  position = {x:null,y:null};
  animation = {};
  zIndex = 0;
  onClick=()=>{};

  constructor(name){
    this.name = name;
  }

}
/**
 * 把字符串转换为一维数组
 * @param deal  QJ98.A5.J853.QT4
 * @param order "SHDC"
 * @example 
 * console.log(toArr("QJ98.A5.J853.QT4","SHCD"));
 * console.log(toArr("QJ98","S"))
 */
function toArr(deal,order){
  let arr = [];
  deal.split('.').forEach((suit,s)=>suit.split('').forEach((c)=>arr.push(order[s]+c)));
  return arr;
}



/**
 * 动态扑克
 * props 说明
 *      animation   和 TweenOne 的 animation 同步
 *      position    非动画定位
 *      size        大小
 *      name        5S 黑桃5
 *      zIndex      叠放顺序
 *      onClick     点击绑定到图片上, onclick() 函数执行返回的是一个函数引用。
 *      active      0,1,2  0 灰色不能点，1 亮色不能点，2 亮色能点, 3 亮色能点突出
 */
function MCard({
  name,
  animation,
  position={x:0,y:0},
  size=20,
  zIndex=0,
  onClick=()=>{},
  active=1
}){
  const brightness = active ? BLIGHT : BDARK ;
  animation['brightness'] = brightness;
  const top = position.y + UNIT;
  const left = position.x + UNIT;
  const style={zIndex,top,left,position:'absolute'}
  return (
    <div style={style} onClick={onClick}>
      <Motion animation={animation} style={{position:'absolute'}}>
        <Card name={name} size={size} />
      </Motion>
    </div>
  );
}




/**
 * 静态扑克组件
 * 图片采用 css 背景
 * name第二个字符为 X 的时候是背面。其余正面
 *
 * @param {*} { name, size } name:C2, size:20
 * @returns
 */
function Card({ name, size }) {
  const height = !size ? "100%" : `${size}${UNIT}`;
  const width =  !size ? "100%" : `${size*SCALE}${UNIT}`;
  const style = { height, width };
  const card = name.slice(-1) == 'X' ? 'back' : name;
  return <div className={`card${card}`} style={style}></div>;
}





export { MCard, Card, CCard, toArr };


/*
优化思路：
把扑克最常用的功能。最通用的功能，都设计出来。
其他那些 不同玩法，有不同规则的不写。

比如，再增加和完善布局算法。增加特殊布局方式。双击出牌的设置。
模拟发牌的demo。根据某个数组，选中可以出的牌。
各种选中牌的方式。考虑数据结构的优化。
牌的大小 尺寸优化。
*/