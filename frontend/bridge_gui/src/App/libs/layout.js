import { sep } from "upath";
import Conf from "../components/cards/conf";
/**
 * 2019.3.14 新思路
 * 
 * 布局函数库重新设计。
 * 物料：card, hand, table 
 * 而layout 就是从以上对象中取出对应的值，然后重置他们的布局属性。
 * 
 * 
 * 
 * 布局 函数库。
 * 
 * todo:
 * 这里函数暂时与扑克无关，纯粹数学计算。
 * 考虑另外封装，专门针对扑克布局的函数库。
 */


/**
 * 重新整理手里的牌（调整间距）
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
function resetCards(cards, seatIndex, resetDelay = false) {
  const pos = [0, 2].indexOf(seatIndex) == -1 ? 'left' : 'top';
  let length = 0;
  let ps = 0;
  cards.forEach(card => card.active == 2 && length++)
  const layout = flexLayout(this.height, length, 2)
  return cards.map((card, index) => {
    if (card.active == 2) {
      ps = layout.shift();
      card['animation'][pos] = ps;
      card['animation']['duration'] = 600;
      if (resetDelay) card['animation']['delay'] = ps;
      //if (resetDelay) card['animation']['delay'] = 0;
    }
    return card;
  })
}

function suitLayoutCards(cards, seatIndex) {
  //const rotate = [0, 2].indexOf(seatIndex) == -1 ? '0' : '-90';
  const rotate = 0;
  let preCard = cards[0];
  let offsetTop = 0;
  let offsetLeft = 0;
  let seat = ['east', 'south', 'west', 'north'][seatIndex];
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





/**
 * 输入：
 *    width     牌桌宽度（高度同理） 有了宽度，就有了扑克的宽度。w*0.18
 *    length    多少张牌
 *    separate  每几张扩大间隔。
 * 
 * 输出：
 *    扑克整体左上角定位
 *    所有扑克定位（x 或 y）数组 更新 animation 一维数组
 * 
 * 参考：
 *    csize =  width * 0.18
 *    sepY  =  csize*0.15  sepX =  csize*0.39   
 *    csize 牌的长度 csize*0.7 牌的宽度
 *    sepOffset = 逐渐增加的宽度值 0.05 是一个比例。需要乘 csize
 *    cwidth 一手牌整体宽度
 *    left 一手牌 举例牌桌左侧的举例
 * 
 * 算法描述：
 *    1 发牌区域总宽度
 *    2 根据牌间距，算出牌总宽度。
 *    3 算出牌居中左侧的left数值。
 *    4 逐个增加间距即可。
 * 
 *    间距调整，根据牌每隔n张，计算出少于几张时 增加几倍递增宽度。
 */
function flexLayout1(width, length, separate) {
  const csize = width * 0.18
  const sepOffset = Math.floor((13 - length) / separate) * 0.05
  const offset = csize * (0.22 + sepOffset);
  const cwidth = offset * (length - 1) + csize * 0.7;
  const left = (width - cwidth) / 2;
  return Array(length).fill(0).map((item, index) => item + left + index * offset);
}
// width 牌桌宽度，length 多少张牌, 每少几张牌扩大间隔
function flexLayout(width, length, separate) {
  const csize = width * 0.18
  const sepOffset = Math.floor((13 - length) / separate) * 0.05
  const offset = csize * (0.22 + sepOffset);
  const cwidth = offset * (length - 1) + csize * 0.7;
  const left = (width - cwidth) / 2;
  return Array(length).fill(0).map((item, index) => item + left + index * offset);
}

/*** 分割线
 *  
 * 以下为重构添加的布局函数
 ×××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××××*/

/**
 *
 *
 * @param {*} cards     传递的是 cards 数组的引用
 * @param {*} pos       定位的基础 x,y
 * @param {*} range     布局空间的宽度或高度
 * @param {*} separate  间隔几张牌 调整宽度
 * @param {*} dir       方向 x,y 横向或者纵向
 * @returns
 */
function flex_layout(cards, range, separate, dir) {
  if (!(cards && range && separate)) return false;
  const base = cards[0].size;
  const length = cards.length;
  const layout = flex(base, range, length, separate);
  const animPos = ['left','top'];
  const pos = dir.toLowerCase()=='x' ? 0 : 1;  
  let ps=0;
  return cards.map((card) => {
    ps = layout.shift();
    card['animation'][animPos[pos]] = ps+Conf.unit;
    card['animation']['duration'] = 600;
    //if (resetDelay) card['animation']['delay'] = 0;
  })
}
/**
 * 设置一手牌的 动画延迟。
 *
 * @param {*} cards             牌的数组引用
 * @param {number} [base=0]     基础延迟毫秒
 * @param {number} [offset=100] 间隔毫秒
 */
function delay(cards,base=0,offset=100){
  cards.forEach((card,i)=>card['animation']['delay'] = base + offset * i);
}

/**
 *
 * @param {*} base      基础尺寸（牌的宽度）
 * @param {*} width     容器宽度
 * @param {*} length    多少个布局对象
 * @param {*} separate  间隔扩大（每多少张牌扩大间隔）
 * @returns
 * 注意：当card 高度 为20时 width 不小于 67，否则将离开范围。此算法有待优化
 */
function flex(base, width, length, separate) {
  // sepOffset  额外增加的空间 百分比
  // offset     实际牌间距
  // cwidth     所有牌的实际宽度
  // left       所有牌居中，left 定位值
  const sepOffset = Math.floor((13 - length) / separate) * 0.05;
  const offset = base * (0.22 + sepOffset);
  const cwidth = offset * (length - 1) + base * 0.7;
  const left = (width - cwidth) / 2;
  return Array(length).fill(0).map((item, index) => item + left + index * offset);
}



/**
 * 单元测试
 ******************************************************************************/
function test_flexLayout() {
  const width = 463;
  const length = 13;
  const separate = 15;
  console.log("flexLayout:", flexLayout(width, length, separate))
}
//test_flexLayout();
function testFunc(a, b) {
  return a + b;
}
export { testFunc }
export { flexLayout, resetCards, suitLayoutCards, flex_layout, delay };



