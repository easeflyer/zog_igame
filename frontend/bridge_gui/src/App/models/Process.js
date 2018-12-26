import Models from './model'
import boardStore from '../stores/board'
import session from '../User/session'
import {Etoeast} from '../common/util'
import Table from '../components/Table';
import tableStore from '../stores/tableStore';
window._boardStore = boardStore;
/**
 * sucGetMatch的data就是[2],需要的就是2这个值，table_id=2,每个桌子都有一个编号，就是table_id
 * table_id有两个作用：
 * 1. 供四个玩家打牌之间的通信，同一桌的玩家的table_id相同
 * 2. 查询成绩需要table_id
 */
/**
 * 叫牌阶段没有下一个玩家提示信息
 */
const NEXTPLAYER = {
    E:'S',
    S:'W',
    W:'N',
    N:'E'
}
export default class Process{

    // ********************************************没有用的函数，防止报错*******************************************************************
    failGetMatch=(data)=>{
        console.log('初始化失败')
    }
    failInit(data){console.log(data)}
    failPolling=()=>{return false}
    // ********************************************没有用的函数，防止报错*******************************************************************
    

    start=()=>{
        Models.get_matches(this.sucGetMatch,this.failGetMatch)
    }

    sucGetMatch=(data)=>{   //查询到所有未开始的table_id
    
        if(data.length){
            boardStore.table_id=data[0];
            Models.join_channel(this.sucChannel,this.failChannel,boardStore.table_id);    //根据桌号进入频道
        }
        else{
            //提示：未查询到待开始的比赛
            alert('您当前没有比赛，请稍后再试',2)
        }
    }

    sucChannel=(data)=>{    //查询公共频道号,board_id,私有频道号,  [2, Array(8), 5]
        const boardData = data.slice(-3); 
        if(data.length===3){ this.setBoardId(boardData) }
     
        if(data.length===4){ 
            // this.setState({lastState:data[0]});
            boardStore.lastState = data[0]
            if(data[0]==='All Done'){
                
                alert('您当前没有比赛，请稍后再试',2)
            }else if(data[0]['current_board']){
               
                this.setBoardId(boardData,data[0]['current_board'])
            }else{
                
                this.setBoardId(boardData)
            }
        }
    }

    setBoardId=(data,board_id)=>{
        boardStore.my_channel_id = data[2]; 
        boardStore.board_id_list = data[1];
        boardStore.channel_id = data[0];
        boardStore.board_id = board_id||data[1][0];
        boardStore.nth = boardStore.board_id_list.indexOf(this.board_id) + 1 ;
        Models.init_board(this.sucInit,this.failInit,boardStore.board_id,boardStore.channel_id);    //初始化牌桌，第三个参数表示牌号
    }

    sucInit=(data)=>{
          
        // {cards:"AQ93.T9632.T7.73 6.K7.K984.AQJ964 K42.AQ5.AJ3.KT85 JT875.J84.Q652.2",dealer:'E',players:[["111 1111 1111", "S", 7],["222 2222 2222", "N", 8],["333 3333 3333", "E", 9],["444 4444 4444", "W", 10]],vulnerable:"NS"}
            this.originData = data;
            boardStore.hands = data.cards.split(' ')
            boardStore.dealer = data.dealer
            console.log(session.get_name())
            data.players.forEach(item=>{    //存储‘我’的方位
                if(item[0]===session.get_name()){
                    boardStore.my.seat = item[1];
                }
            })
            // boardStore.my.cards = data.cards.split(' ')[['N','E','S','W'].indexOf(boardStore.my.seat)].split('.')
            boardStore.getMyCards();
            boardStore.deals=data.cards;
            if(boardStore.lastState){
                boardStore.re_init();
            }
            Models.polling(this.sucPolling,this.failPolling,boardStore.pollingId); 
        }

        sucPolling=(data)=>{
           
            if(data.length && data.slice(-1)[0]['id']!==boardStore.pollingId && data[data.length-1].message.body.indexOf('data-oe-id')===-1){
                //准备遍历消息
                if(boardStore.delFirstMessage===1){
                    boardStore.delFirstMessage=0
                    boardStore.pollingId=data.slice(-1)[0]['id'];
                }else{
                    this.dealMsg(data);
                }
               
            } 
            // if(!this.state.toResult){
                Models.polling(this.sucPolling,this.failPolling,boardStore.pollingId)
            // }
        }
        dealMessageBody=(body)=>{
            
            if(body.substring(3,body.length-4)==='all ready'){
                boardStore.allReady()
               
            }else if(body.substring(3,body.length-4)==='claim agreed'){
                    this.setState({scene:2});
                    this.addChatMsg('系统消息','庄家claim成功，正在为您计算本副牌成绩...')
                    Models.claim(this.sucClaim,this.failClaim,this.board_id,this.state.claimnum.pos,this.channel_id);
            }else{
                body = body.replace(/u'/g,"'").replace(/ /g,'')
                body = eval('('+body.substring(3,body.length-4)+')')
               
            
    
                if(body.pos&&body.send_msg){         //收到聊天消息  {pos:'W',send_msg:'msg'}
                    this.addChatMsg(body.pos,body.send_msg)
                }
                if(body.board_id&&body.name&&body.pos&&body.number){  //收到叫牌消息  
                    boardStore.activePlayer = NEXTPLAYER[body.pos]
                    
                    
                    boardStore.saveCall(body.name)
                }
                if(body.dummy&&body.openlead&&body.declarer){   //收到叫牌结果信息   {dummy:'N',openlead:'W',declarer:'S',nextplayer:'W',contract:'1S'}
                   boardStore.handleBidResult(body)
                }
                if(body.number&&body.rank&&body.card){    //收到打牌消息 {ns_win:0,number:1,rank:'5',pos:'W',suit:'C',nextplayer:'W',card:'C5',ew_win:0}
                   
                    
                    boardStore.recievePlay(body)
                }
                // if(body.pos&&body.num&&body.board){   //收到庄家claim消息  {pos:'W', num:3, board:['SQ','ST']}
                //     this.setState({claimnum:body})
                //     if(this.myseat!==body.pos){
                //         //展示庄家的牌
                //         let claimCard = boardStore.state.cards[this.state.userdir.indexOf(body.pos)].splice(13-body.board.length,body.board.length);  
                //         claimCard.map((item1,index1)=>{
                //             item1.card = body.board[index1].split('')[1]+body.board[index1].split('')[0];
                //             boardStore.state.cards[this.state.userdir.indexOf(body.pos)].push(item1)
                //         })
                //         this.setState({
                //             scene:3,
                //             cards: boardStore.state.cards,
                //         });
                //     } 
                // }
                // if(body.pos&&body.agreeClaim){   //收到防守方是否同意
                //     const agreeClaimPos = boardStore.unifyDirection(body.pos);
                //     if(body.agreeClaim==='false'){  //当有防守方拒绝claim时，继续打牌过程
                //         this.addChatMsg('系统消息',this.state.user[agreeClaimPos]['name']+' 拒绝庄家的claim请求，请继续打牌')
                //         this.setState({scene:2, claimnum:{pos:null, num:0}, claiming:0, claimingState:[]});
                //         if(this.state.playCardNumber%4===0){this.playRules(this.state.nextplayer,null,null);}
                //         else{this.playRules(this.state.nextplayer,this.playSuit,null);}
                //     }
                //     else if(body.agreeClaim==='true'){
                //         this.state.claimingState.push(body.pos)
                //         this.setState({claimingState:this.state.claimingState})
                //         this.addChatMsg('系统消息',this.state.user[agreeClaimPos]['name']+' 同意了庄家的claim请求')
                //     }
                // }
            
                if(body.pos&&body.state==='ready'){
                    boardStore.ready[Etoeast(body.pos)] = 'R';
                }
            }
        }
        dealMsg = (data) =>{
            
            data.forEach((dataItem)=>{
                boardStore.pollingId=dataItem['id'];
                let body = dataItem.message.body;
                this.dealMessageBody(body)
            })
        }


}