/**
 * 输入：
 *    width     整体宽度（高度同理） 有了宽度，就有了扑克的宽度。w*0.18
 *    pinit     扑克整体左上角初始定位（xy） p position
 *    pdata     所有扑克定位（xy）数组
 *    separate  每几张扩大间隔。
 * 
 *    data:Array(13) = [n1,n2,n3,n4.....]
 *          十三张牌，也可能少.length
 * 
 * 
 * 输出：
 *    扑克整体左上角定位
 *    所有扑克定位（xy）数组 更新 animation
 * 
 * 参考：
 *    csize =  width * 0.18
 *    sepY  =  csize*0.15  sepX =  csize*0.39   
 * 
 */
function flexLayout(width, length, separate) {
  const csize = width * 0.18
  const sepOffset = Math.floor((13 - length) / separate) * 0.2
  const offset = csize * ( 0.25 + sepOffset );           // 牌间距
  const cwidth = offset * (length-1) + csize * 0.7;  // 牌整体宽度
  const left = (width - cwidth) / 2;                 // 左侧距离
  // console.log('csize:',csize,'sepOffset:',sepOffset,'offset:',
  //           offset,'cwidth:',cwidth,'left:',left);
  return Array(length).fill(0).map( (item,index) => item + left + index*offset)
}



function test_flexLayout(){
  const width = 463;
  const length = 13;
  const separate = 15;
  console.log("flexLayout:",flexLayout(width,length,separate))
}

//test_flexLayout();

export {flexLayout};