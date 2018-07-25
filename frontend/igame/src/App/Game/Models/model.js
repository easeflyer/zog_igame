import Board from '../../OdooRpc/Board'
import OdooModel from '../../OdooRpc/OdooRpc'
import Channel from '../../OdooRpc/Channel'

class Models{
    static deals(sucChannel,failChannel){
        // E               S                W                N
        // S.H.D.C
        const JoinChannel = new Channel(sucChannel,failChannel);
        JoinChannel.join_channel(1);   // 6 : table_id

        // return ['T76543.4.K72.863 QJ98.A5.J853.QT4 A2.Q986.AQT.KJ97 K.KJT732.964.A52', 
        // 'Q74.K963.J7.KQJ8 AJ52.J52.A2.AT95 986.AT74.KT85.62 KT3.Q8.Q9643.743',
        // '986.J5.AJT93.KT7 Q2.A732.8642.J94 K3.KT8.Q75.A8653 AJT754.Q964.K.Q2',
        // 'A63.A954.AT4.Q52 QT84.QJ7.K832.AT J95.K862.J97.643 K72.T3.Q65.KJ987']
    }
    static init_board=(success,error,board_id,channel_id)=>{
        const  board= new Board(success,error); 
        board.init_board(board_id,channel_id)  //初始化牌桌
        // method==='bid'? board.bid(this.state.id_msg.board_id,this.state.playerInfo.myDirect,...data,this.state.id_msg.channel_id) : null;    //发送叫牌消息
        // method==='bid'&&this.state.playerInfo.myDirect===this.state.callDirect ? board.bid(this.state.id_msg.board_id,this.state.playerInfo.myDirect,...data,this.state.id_msg.channel_id) : null;    //发送叫牌消息
        // method==='call_result' ? board.call_result(this.state.id_msg.board_id,this.state.id_msg.channel_id) : null;    //查询叫牌结果
        // method==='play'&&((this.state.currentDirect!==this.state.dummy&&this.state.currentDirect===this.state.playerInfo.myDirect)||
        // (this.state.currentDirect===this.state.dummy&&this.state.topInfo2.declarer===this.state.playerInfo.myDirect)) ? board.play(this.state.id_msg.board_id,this.state.playerInfo.myDirect,...data,this.state.id_msg.channel_id) : null;       //发送打牌消息
        // method==='table_points'?board.table_points(6):null    //查询8副牌的成绩
    } 

    static polling=(success,error,pollingId)=>{
        const Poll = new OdooModel(success,error);
        Poll.poll(pollingId);
    }

    static bid=(success,error,board_id,pos,card,channel_id)=>{
        const board= new Board(success,error); 
        board.bid(board_id,pos,card,channel_id);
    }

    static call_result=(success,error,board_id,channel_id)=>{
        const board= new Board(success,error); 
        board.call_result(board_id,channel_id);
    }

    static play=(success,error,board_id,mydir,card,channel_id)=>{
        const board= new Board(success,error); 
        // ((this.state.currentDirect!==this.state.dummy&&this.state.currentDirect===this.state.playerInfo.myDirect)||
        // (this.state.currentDirect===this.state.dummy&&this.state.topInfo2.declarer===this.state.playerInfo.myDirect)) ?
         board.play(board_id,mydir,card,channel_id);
        //   : null;       //发送打牌消息
    }

    static board_points=(success,error,board_id)=>{
        const  board= new Board(success,error); 
        board.board_points(board_id);
    }
    

    /**
     * 获得明手的牌，根据规则进行判断。
     * todo:正确的牌
     */
    static openDummy(){
        return {seat:'north',cards:'K.KJT732.964.A52'}
    }
    /**
     * 获得上一墩牌，这里应该进行必要的判断。不能随便获得。
     * [东，南，西，北]
     */
    static lastTrick(){
        return [{index:1,card:'7S'},
                {index:14,card:'9S'},
                {index:28,card:'2S'},
                {index:41,card:'KS'}]
    }
    static getResult(){
        return "N3D +2 NS 600";
    }
}

export default Models