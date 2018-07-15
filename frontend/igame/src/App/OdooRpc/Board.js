import Models from './OdooRpc';
export default class Board extends Models {
    constructor(...args){
        super(...args);
        this.model='og.board';
    }
    /*
    参数： 无
    返回值： {[]}
     */
    init_board(...data){
        this.exec('init_board',{},...data);
    }
    bid(...data){         //发送叫牌信息
        this.exec('bid',{},...data);
        /*
         * params:[board_id,pos,call,channel_id]
         * return:[
                {name:call,pos:pos,number:num}
                // 叫的牌，叫牌方位，第n次叫牌
            ]
         */
    }
    call_result(...data){    //查询叫牌结果
        this.exec('call_result',{},...data);
        /*
         * params:[board_id,channel_id]
         * return:[
                // {name:call,pos:pos,number:num}
            ]
         */
    }
    play(...data){       //发送打牌消息
        this.exec('play',{},...data);
        /*
         * params:[board_id,pos,card,channel_id]
         * return:[
                {number:int, card:str, pos:str, ns_wh:int, ew_win:int}
            ]
         */
    }

}