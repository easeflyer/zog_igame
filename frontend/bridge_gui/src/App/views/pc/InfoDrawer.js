import { Drawer, Button } from 'antd';
import React from 'react'
import 'antd/dist/antd.css';
import BidPanel from './BidPanel'
import { inject, observer } from 'mobx-react';
import "./InfoDrawer.css"
import Card, { ACT3 } from '../../components/Card';

@inject('tableStore')
@observer
class InfoDrawer extends React.Component {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showDrawer}>
          信息面板
        </Button>
        <Drawer
          title="本局信息"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
          className="infoDrawer"
          width="45.2vh"
        >
          {this.props.tableStore.state.scene > -1 ? <BidPanel /> : null}
          {/* <p style={{position:"absolute",bottom:"40vh",width:"100%"}}><h4>上一墩</h4></p> */}
          <div className="ant-drawer-header" style={{position:"absolute",bottom:"32vh",width:"100%"}}><b>上一墩</b></div>
          <p><LastTricks /></p>
        </Drawer>
      </div>
    );
  }
}

/**
 * 这里需要注意 zIndex 是否给出。
 */
@inject('tableStore')
@observer
class LastTricks extends React.Component {
  render(){
    const bSize = this.props.tableStore.height;
    //const bSize = this.props.tableStore.center.x*2;
    const board = this.props.tableStore.board;
    const seatPos = this.props.tableStore.seat;
    const cards = board[1] && board[1].map((item,index)=>{
      // width:45.2vh 也就是 bSize*45.2%
      // const x = seatPos[item.seat][1].x - item.size / 2.9 - 170;
      // const y = seatPos[item.seat][1].y - item.size / 2.9
      const x = seatPos[item.seat][1].x - bSize/2 + bSize*0.252/2
      const y = seatPos[item.seat][1].y - bSize/2 + bSize*0.252/4
      const rotate = ('EW'.indexOf(item.seat) !== -1) ? -90:0;
      const offset = item.size * 0.7 / 2
      return  {
        card:item.card,
        size:item.size,
        position:{x:x,y:y},
        animation:{
          top:y,
          lef:x,
          duration:0,
          rotate:rotate,
          transformOrigin: `${offset}px ${offset}px`
        },
        active:item.active,
        onclick:()=>null,
        key:index,
        index:index,
        seat:item.seat,
        zIndex:item.zIndex
      }
    })
    const Cards = cards && cards.map((item,index)=>{
      return <Card
        active={item.active}
        onClick={item.onclick}
        key={item.key}
        index={item.key}
        seat={item.seat}
        animation={item.animation || ''}
        card={item.card}
        size={item.size}
        position={item.position}
        zIndex={item.zIndex}
        //zIndex={50+index}
      />
    }).slice(0)
    return(<div style={{border:"0px solid #FF0000",
      position:"absolute",
      width:"25.2vh",
      height:"20vh",
      bottom:"3vh",
      left:"10vh"}}>
      {Cards}
    </div>);
  }
}

export default InfoDrawer;