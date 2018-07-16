export default class Initial{
    constructor(){
        this.state={};
        this.state.contract='1S';//定约
        this.state.deal=false; //是否发牌
        this.state.call=false; //是否处于叫牌状态
        this.state.play=false;  //是否处于打牌状态
        this.state.channel_id=null;//频道ID
        this.state.board_id=null;  //board id
        this.state.border_id_num=null;
        this.state.cards=null;   //四个方位的牌
        this.state.dataSource=[{  //叫牌表格
            key:0,
            N:'',
            E:'',
            S:'',
            W:'',
        }];
        this.state.pass=[];  //叫牌过程
        this.state.declarer=null; //庄家方位 
        this.state.dummy=null;  //明手方位
        this.state.myDirect=null; //我所在方位
        this.state.myName=null;  
        this.state.topDirect=null; //对家
        this.state.topName=null; //对家
        this.state.rightDirect=null; //右侧
        this.state.rightName=null; //右侧
        this.state.leftDirect=null; //左侧
        this.state.leftName=null; //左侧
        this.state.myCardsNum=null;//我的牌，全数字
        this.state.dummyCardsNum=null;//我的牌，全数字
        this.state.callDirect=null; //当前应该哪个方位叫牌  ** 
        this.state.openLeader=null; //首攻  
        this.state.currentDirect=null; //当前应该哪个方位打牌 
        this.state.currentCardB=null; // 我，当前出的牌 
        this.state.currentCardT=null; // 我的对家，当前出的牌 
        this.state.currentCardL=null; // 左侧，当前出的牌 
        this.state.currentCardR=null; // 右侧，当前出的牌 
        this.state.piersCount=0; // 墩，计数  ** 
        this.state.allPiers=[];  // 所有墩  ** 
        this.state.currentPiers=[]; // 当前墩 
        this.state.scoreSN=0;  //SN方位得分  ** 
        this.state.scoreEW=0;  //EW方位得分  ** 
        this.state.piersSN=0;  //  ** 
        this.state.piersEW=0;   //  ** 
        this.state.claimCount=0;;
    }
}