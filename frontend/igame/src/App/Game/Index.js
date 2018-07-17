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
        msg:new Initial().msg,
        board_id_list:null,
        init_board:false,
        pollingId:1,
        id_msg:{
            channel_id:null,
            board_id:null,
        }
    }
    
    componentDidMount(){
        this.polling()

        const JoinChannel = new Channel(this.sucChannel,this.failChannel);
        JoinChannel.join_channel(6);   // 6 : table_id
    }
    polling(){
        const Poll = new Models(this.sucPolling,this.failPolling);
        Poll.poll(this.state.pollingId);
    }
 
    sucPolling=(data)=>{
        if (data.length){
            this.setState({
                pollingId:data.slice(-1)[0]['id']
            })
            let body = data[data.length-1].message.body;    //"<p>{'board_id': 44, 'number': 1, 'name': u'1S', 'pos': u'S'}</p>"
            body = body.replace(/u'/g,"'").replace(/ /g,'')
            body = eval('('+body.substring(3,body.length-4)+')')
        }
        // this.polling()
        console.log(data)
    }

    sucChannel=(data)=>{   //加入比赛聊天频道成功
        //[42, 39, 40, 41, 42, 43, 44, 45]] [channel_id,[board_id1,board_id2,board_id3...]]
        let board_id=this.state.id_msg.board_id,board_id_list=this.state.board_id_list;
        if(board_id_list&&board_id_list.indexOf(board_id)<board_id_list.length){
            this.setState({
                channel_id:data[0],
                board_id:board_id_list[board_id_list.indexOf(board_id)+1]
            })
        }else{
            this.setState({
                board_id_list:data[1].length,
                init_board:true,
                id_msg:{
                    channel_id:data[0],
                    board_id:data[1][0],
                }
            })
        }
    }

    render(){
        return(
            <div>
                <TopInfo />  {/*展示顶部信息*/}
                <PlayerInfo init_board={this.state.init_board} id_msg={this.state.id_msg}/> {/*展示用户信息*/}
            </div>
        )
    }
}