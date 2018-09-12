/**
 * 输入：
 *    width     牌桌宽度（高度同理） 有了宽度，就有了扑克的宽度。w*0.18
 *    length    多少张牌
 *    separate  每几张扩大间隔。
 * 
 * 输出：
 *    扑克整体左上角定位
 *    所有扑克定位（xy）数组 更新 animation
 * 
 * 参考：
 *    csize =  width * 0.18
 *    sepY  =  csize*0.15  sepX =  csize*0.39   
 *    csize 牌的长度 csize*0.7 牌的宽度
 *    sepOffset = 逐渐增加的宽度值 0.05 是一个比例。需要乘 csize
 *    cwidth 一手牌整体宽度
 *    left 一手牌 举例牌桌左侧的举例
 */
function flexLayout(width, length, separate) {
  const csize = width * 0.18                  
  const sepOffset = Math.floor((13 - length) / separate) * 0.05
  const offset = csize * ( 0.22 + sepOffset );
  const cwidth = offset * (length-1) + csize * 0.7;
  const left = (width - cwidth) / 2;
  return Array(length).fill(0).map( (item,index) => item + left + index*offset);
}

/**
 * 单元测试
 */
function test_flexLayout(){
  const width = 463;
  const length = 13;
  const separate = 15;
  console.log("flexLayout:",flexLayout(width,length,separate))
}
//test_flexLayout();

export {flexLayout};