import React from 'react';
import { inject, observer } from 'mobx-react';
import Process from '../models/Process'

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
  render(){
    const {call,play} = this.props.boardStore.pbn;
    const {hands,curTrick,my,ready,handleReady} = this.props.boardStore;
    
    return(
      <div className='_body'>
        
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

        <div className='_ready'>
          <div>准备状态</div>
          <div>east:{ready.east}</div>
          <div>south:{ready.south}</div>
          <div>west:{ready.west}</div>
          <div>north:{ready.north}</div>
        </div>
        <div className='_current'>
              <div>首攻：{play.first}</div>
              {curTrick.map((item)=>{
                return (
                  <div>{item}</div>
                )
              })}
          </div>
 
        <div className='_tricks'>
            <div>打牌记录</div>
            <table width='400'>
              {play.tricks.map((row)=>{
                return (
                  <tr>
                    {row.map((item)=>{
                      return (
                        <td>{item}</td>
                      )
                    })}
                  </tr>
                )
              })}
            </table>
          </div>
           
        <div className='_my'>
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
              <input id='bid'/><button>叫牌</button>
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