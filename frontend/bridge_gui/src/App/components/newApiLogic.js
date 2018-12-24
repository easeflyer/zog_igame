import React from 'react';
import { inject, observer } from 'mobx-react';
import Process from '../models/newApiProcess';
import health from '../libs/health'
import style from './logicPlay.css';

@inject('newBoardStore')
@observer
class LogicPlay extends React.Component {

  componentDidMount(){
      this.process = new Process()
    this.process.start()
  }
  play = ()=>{
    var a = document.getElementById('play')
    this.process.play(this.props.newBoardStore.my.seat,a.value)
    a.value=''
  }
  bidCall = ()=>{
    var a = document.getElementById('call')
    console.log(a.value)
    this.process.bid(this.props.newBoardStore.my.seat,a.value)
    a.value=''
  }
  claim = ()=>{
    var a = document.getElementById('claim')
    alert(typeof parseInt(a.value) )
    this.process.claim(this.props.newBoardStore.my.seat,parseInt(a.value))
    a.value=''
  }
  claimack1 = ()=>{
    this.process.claim_ack(this.props.newBoardStore.my.seat,1)
  }
  claimack0 = ()=>{
    this.process.claim_ack(this.props.newBoardStore.my.seat,0)
  }
  render(){
    const {auction,play,contract,declarer} = this.props.newBoardStore.pbn;
    const {hands,curTrick,my,ready,handleReady,activePlayer,claim,gameState} = this.props.newBoardStore;
    const {call} = auction;
    return(
      <div className='lbody'>
        
        <table width='400' id='bid'>
            <tr>
              <th>N</th><th>E</th><th>S</th><th>W</th>
            </tr>
            {call.map((item)=>{
              return (
                <tr>
                 <td>{item}</td>
                </tr>
              )
            })}
          </table>

        <div className='lready'>
          <div className={style.red}>准备状态</div>
          <div>east:{ready.east}</div>
          <div>south:{ready.south}</div>
          <div>west:{ready.west}</div>
          <div>north:{ready.north}</div>
        </div>
       <div className='activePlayer'>当前：{activePlayer}</div>
        <div className='lcurrent'>
              <div>首攻：{play.first}</div>
              {curTrick.map((item)=>{
                return (
                  <div>{item}</div>
                )
              })}
          </div>
 
        <div className='ltricks'>
            <div>本局信息</div>
             <div>庄家：{declarer}</div>
             <div>contract:{contract}</div>
             <div>游戏进度：{gameState}</div>
             <div>摊牌:{claim.owner} , {claim.number}</div>
             <div>是否同意摊牌:{claim.state} </div>
          </div>
           
        <div className='lmy'>
            <button onClick={handleReady}>发送准备消息</button>
            <div>{my.seat}:{my.username}</div>
            <div>
              {my.cards.map((item,index)=>{
                return (
                  <span style={{padding:"10px"}}>{item}</span>
                )
              })}
            </div>
            <div>
              <input id='call'/><button onClick={this.bidCall}>叫牌</button>
            </div>
            <div>
              <input id='play'/><button onClick={this.play}>打牌</button>
            </div>
            <div>
              <input id='claim'/><button onClick={this.claim}>摊牌</button>
            </div>
            <div>
              <button onClick={this.claimack1}>同意摊牌</button>
              <button onClick={this.claimack0}>拒绝摊牌</button>
            </div>
          </div>
      
       
      </div>
    )
  }
}
  

export default LogicPlay;