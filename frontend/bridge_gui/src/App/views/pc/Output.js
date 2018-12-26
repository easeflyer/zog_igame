/**
 * Output 是对外输出的统一出口。
 * 可以从界面 view 组件直接调用。
 * 或者其他地方直接调用。
 */
import tableStore from '../../stores/tableStore'
import Process from '../../models/newProcess'
const Output = {
  ckLogin:()=>{
    console.log("用户已经登录。")
  },
  // 叫牌
  call:(calling) => {
    console.log('output:',calling);
    if(calling==='PASS'){
      calling = 'Pass'
    }
    Process.bid(tableStore.myseat,calling)
  },
  play:(data) => {
    console.log(data.card);
    Process.play(tableStore.myseat,data.card)
  },
  claim:(seat,num)=>{
    console.log(seat,"摊牌",num);
  },
  claimConfirm:(value)=>{
    const msg = value ? "同意": "拒绝";
    console.log(msg);
  }
}

export default Output;