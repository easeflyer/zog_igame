import Models from './model'
import tableStore from '../stores/tableStore'
import session from '../User/session'
import {Etoeast} from '../common/util'
window._tableStore = tableStore;
/**
 * sucGetMatch的data就是[2],需要的就是2这个值，table_id=2,每个桌子都有一个编号，就是table_id
 * table_id有两个作用：
 * 1. 供四个玩家打牌之间的通信，同一桌的玩家的table_id相同
 * 2. 查询成绩需要table_id
 */
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
            tableStore.table_id=data[0];
            Models.join_channel(this.sucChannel,this.failChannel,tableStore.table_id);    //根据桌号进入频道
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
        tableStore.my_channel_id = data[2]; 
        tableStore.board_id_list = data[1];
        tableStore.channel_id = data[0];
        tableStore.board_id = board_id||data[1][0];
        tableStore.nth = tableStore.board_id_list.indexOf(this.board_id) + 1 ;
        Models.init_board(this.sucInit,this.failInit,tableStore.board_id,tableStore.channel_id);    //初始化牌桌，第三个参数表示牌号
    }

    sucInit=(data)=>{
          
        // {cards:"AQ93.T9632.T7.73 6.K7.K984.AQJ964 K42.AQ5.AJ3.KT85 JT875.J84.Q652.2",dealer:'E',players:[["111 1111 1111", "S", 7],["222 2222 2222", "N", 8],["333 3333 3333", "E", 9],["444 4444 4444", "W", 10]],vulnerable:"NS"}
            this.originData = data;
            tableStore.cards['N'] = data.cards.split(' ')[0];
            tableStore.cards['E'] = data.cards.split(' ')[1];
            tableStore.cards['S'] = data.cards.split(' ')[2];
            tableStore.cards['W'] = data.cards.split(' ')[3];
            // this.dealer=data.dealer;
            // this.playerCards= []
            console.log(session.get_name())
            data.players.forEach(item=>{    //存储‘我’的方位
                if(item[0]===session.get_name()){
                    tableStore.myseat = item[1];
                    // let playerDirections =  tableStore.confirmDirection(this.myseat);
                    // this.state.user.east.directionNum=playerDirections.east
                    // this.state.user.south.directionNum=playerDirections.south
                    // this.state.user.west.directionNum=playerDirections.west
                    // this.state.user.north.directionNum=playerDirections.north
                }
            })
            tableStore.deals=data.cards;
            tableStore.state.user.east.name = 'E' + data.players.filter(item=>{if(item[1]==='E')return item})[0][0] ;
            tableStore.state.user.south.name ='S' + data.players.filter(item=>{if(item[1]==='S')return item})[0][0];
            tableStore.state.user.west.name ='W' + data.players.filter(item=>{if(item[1]==='W')return item})[0][0];
            tableStore.state.user.north.name ='N' + data.players.filter(item=>{if(item[1]==='N')return item})[0][0];
            // this.setState();
            // this.transfer(this.myseat);
           
            // if(this.state.lastState){
            //     this.re_init();
            // }
            Models.polling(this.sucPolling,this.failPolling,tableStore.pollingId); 
        }

        sucPolling=(data)=>{
           
            if(data.length && data.slice(-1)[0]['id']!==tableStore.pollingId && data[data.length-1].message.body.indexOf('data-oe-id')===-1){
                //准备遍历消息
                if(tableStore.delFirstMessage===1){
                    tableStore.delFirstMessage=0
                    tableStore.pollingId=data.slice(-1)[0]['id'];
                }else{
                    this.dealMsg(data);
                }
               
            } 
            // if(!this.state.toResult){
                Models.polling(this.sucPolling,this.failPolling,tableStore.pollingId)
            // }
        }
        dealMessageBody=(body)=>{
           
            if(body.substring(3,body.length-4)==='all ready'){
                tableStore.dealCards();
                tableStore.state.scene=1;// 去掉准备按钮
                // Sound.play('deal')
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
                // if(body.board_id&&body.name&&body.pos&&body.number){  //收到叫牌消息  
                //     this.setState({
                //         next:NEXTPLAYER[body.pos]
                //     })
                    
                //     this.timing(null,0,()=>{},true)   //提示下一个叫牌人
                //     this.validatePass(body)
                // }
                // if(body.dummy&&body.openlead&&body.declarer){   //收到叫牌结果信息   {dummy:'N',openlead:'W',declarer:'S',nextplayer:'W',contract:'1S'}
                //     ReactDOM.unmountComponentAtNode(document.querySelector('#clock'));
                //     this.setState({
                //         nextplayer:body.nextplayer,
                //         next:body.openlead
                //     })
                   
                //     this.timing(null,0,()=>{},true);
                //     this.playRules(body.nextplayer,null,null);      //根据打牌规则提示
                //     this.setState({
                //         cards:tableStore.state.cards,
                //         contract:body.contract,
                //         declarer:body.declarer,
                //         dummy:body.dummy,
                //         scene:2
                //     })
                // }
                // if(body.number&&body.rank&&body.card&&body.number!==this.state.playCardNumber ){    //收到打牌消息 {ns_win:0,number:1,rank:'5',pos:'W',suit:'C',nextplayer:'W',card:'C5',ew_win:0}
                //     this.state.playCardNumber = body.number
                //     // this.setState({lastTrick:false})
                //     if(this.state.lastTrick){this.lastTrick(false)};
                //     this.dummyCards = this.cards[this.state.dummy];       //拿到明手的牌
                //     // this.dummySeat = Table.seats[this.state.userdir.indexOf(this.state.dummy)]   //计算明手的方位
                //     if(body.number===1){this.testDummy(this.dummySeat,this.dummyCards)}
                //     if(body.number%4===1){  this.playSuit = body.suit; }
                //     this.body=body;
                //     //验证打牌规则，根据打牌规则进行提示
                //     this.playRules(body.nextplayer,this.playSuit,body.number);    
                //     if(body.pos===this.state.declarer){this.claimtrick = this.claimtrick-1;}       //计算当前庄家可claim的墩数
                    
                //     const playSeatCard = tableStore.state.cards[this.state.userdir.indexOf(body.pos)]     //拿到当前出牌人对应的牌，应为XXXXXXXXXXXXX
                //     const setItem = [body.pos,body.card];
                //     this.recoverTrick(setItem,'play',true);
                //     this.setState({
                //         cards: tableStore.state.cards,
                //         ew_win:body.ew_win,
                //         ns_win:body.ns_win,
                //         nextplayer:body.nextplayer,
                //         next:body.nextplayer
                //     })
                //     this.timing(null,0,()=>{},true);        //提示下一个出牌人  
                 
                //     if(body.number===52){   //当52张牌全部出完后，查询当前这幅牌的成绩
                //         console.log('52张牌已经打完')
                //         if(this.board_id_list.indexOf(this.board_id)<=this.board_id_list.length-1){
                //             Models.board_points(this.sucBoardPoints,this.failBoardPoints,this.board_id)
                //         }
                //     }
                // }
                // if(body.pos&&body.num&&body.board){   //收到庄家claim消息  {pos:'W', num:3, board:['SQ','ST']}
                //     this.setState({claimnum:body})
                //     if(this.myseat!==body.pos){
                //         //展示庄家的牌
                //         let claimCard = tableStore.state.cards[this.state.userdir.indexOf(body.pos)].splice(13-body.board.length,body.board.length);  
                //         claimCard.map((item1,index1)=>{
                //             item1.card = body.board[index1].split('')[1]+body.board[index1].split('')[0];
                //             tableStore.state.cards[this.state.userdir.indexOf(body.pos)].push(item1)
                //         })
                //         this.setState({
                //             scene:3,
                //             cards: tableStore.state.cards,
                //         });
                //     } 
                // }
                // if(body.pos&&body.agreeClaim){   //收到防守方是否同意
                //     const agreeClaimPos = tableStore.unifyDirection(body.pos);
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
                    tableStore.state.user[Etoeast(body.pos)].ready = 1;
                }
            }
        }
        dealMsg = (data) =>{
            
            data.forEach((dataItem)=>{
                tableStore.pollingId=dataItem['id'];
                let body = dataItem.message.body;
                this.dealMessageBody(body)
            })
        }


}