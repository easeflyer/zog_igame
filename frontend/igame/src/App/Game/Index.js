import React from 'react'
import { Row, Col, Table,Input } from 'antd';
import Session from '../User/session'
import Initial from './Initial'
import TopInfo from './TopInfo'
import PlayerInfo from './PlayerInfo'

import Board from '../OdooRpc/Board'
import Channel from '../OdooRpc/Channel'
import Models from '../OdooRpc/OdooRpc'

export default class PokerTable extends React.Component{
    state={
        board_id_list:null,
        init_board:false,
        topInfo2:null
    }
  
    setTopInfo2=(declarer,contract)=>{
        this.setState({
            topInfo2:{
                declarer:declarer,
                contract:contract
            }
        })
    }

    render(){
        return(
            <div>
                <TopInfo topInfo2={this.state.topInfo2}/>  {/*展示顶部信息*/}
                <PlayerInfo setTopInfo2={this.setTopInfo2}  /> {/*展示用户信息*/}{/*init_board={this.state.init_board} id_msg={this.state.id_msg}*/}
            </div>
        )
    }
}