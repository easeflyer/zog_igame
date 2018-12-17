import React from 'react';
import { inject, observer } from 'mobx-react';
import Process from '../models/Process';
import health from '../libs/health'
import style from './logicPlay.css';
@inject('boardStore')
@observer
class LogicPlay extends React.Component {

  componentDidMount(){
    new Process().start()
  }
  play = ()=>{
    var a = document.getElementById('play')
    this.props.boardStore.play(a.value)
    a.value=''
  }
  bidCall = ()=>{
    var a = document.getElementById('call')
    console.log(a.value)
    this.props.boardStore.bidCall(a.value)
    a.value=''
  }
  render(){
    const {call,play,contract,declarer} = this.props.boardStore.pbn;
    const {hands,curTrick,my,ready,handleReady,activePlayer,} = this.props.boardStore;
    
    return(
      <div className='lbody'>
        
        <table width='400' id='bid'>
            <tr>
              <th>N</th><th>E</th><th>S</th><th>W</th>
            </tr>
            {call.map((row)=>{
              return (
                <tr>
                  {row.map((item)=>{
                    return (<td>{item}</td>)
                  })}
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
          </div>
      
       
      </div>
    )
  }
}
  

export default LogicPlay;