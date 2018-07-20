import React from 'react'
import Session from '../User/session'
const direct = [ 'N' ,'E','S','W',]
const suitWord = ['S','H','D','C']
const pass = [];

let count=0;

export default class Func{
    constructor(props){
        this.props=props
    }
    // 要发送的消息整理成‘5H’或‘H5’的格式
    transfer=(val,num,y=true)=>{
        if(y){
            if(val.split('')[num]==="♠"){val=val.split('')[0]+'S'}
            if(val.split('')[num]==="♥"){val=val.split('')[0]+'H'}
            if(val.split('')[num]==="♦"){val=val.split('')[0]+'D'}
            if(val.split('')[num]==="♣"){val=val.split('')[0]+'C'}
        }else{
            if(val.split('')[num]==="♠"){val='S'+val.split('')[0]}
            if(val.split('')[num]==="♥"){val='H'+val.split('')[0]}
            if(val.split('')[num]==="♦"){val='D'+val.split('')[0]}
            if(val.split('')[num]==="♣"){val='C'+val.split('')[0]}
        }
        return val;
    }
    //要显示的消息整理成5♥的格式
    re_transfer=(val,num1,num2,y)=>{
        let add = y ? `\n` :''; 
        if(val.split('')[num1]==='S'){val = val.split('')[num2]+add+'♠'}
        if(val.split('')[num1]==='H'){val = val.split('')[num2]+add+'♥'}
        if(val.split('')[num1]==='D'){val = val.split('')[num2]+add+'♦'}
        if(val.split('')[num1]==='C'){val = val.split('')[num2]+add+'♣'}
        return val;
    }
    //整理牌的格式 
    arrange_my_cards=(cards)=>{   
        let  cardMy=[];
        cards.split('.').map(i=>{
            cardMy.push(i.split(''));
        })
        return cardMy
    }

    //初始化牌桌
    sucPost(data){
        console.log(data)
        if(data.cards&&data.players){   //初始化牌桌
            let i=null, s = null;
            data.players.map((item,index)=>{ if(item[0]===Session.get_name()){i=index} });
            direct.map((item,index)=>{ if(data.players[i][1]===item){s=index} });
            const init_board={
                cards:data.cards.split(' '),
                deal:true,
                call:true,
                play:false,
                myCardsNum:this.arrange_my_cards(data.cards.split(' ')[s]),
                callDirect:data.dealer,
                playerInfo:{
                    myDirect:data.players[i][1],
                    myName:data.players[i][0],
                    topDirect:direct[direct.indexOf(data.players[i][1])+2]||direct[direct.indexOf(data.players[i][1])-2],
                    topName:data.players.filter(item=>{
                                return item[1]===direct[direct.indexOf(data.players[i][1])+2]||item[1]===direct[direct.indexOf(data.players[i][1])-2]
                            })[0][0],
                    rightDirect:direct[direct.indexOf(data.players[i][1])-1]||direct[direct.indexOf(data.players[i][1])+3],
                    rightName:data.players.filter(item=>{
                                return item[1]===direct[direct.indexOf(data.players[i][1])-1]||item[1]===direct[direct.indexOf(data.players[i][1])+3]
                            })[0][0],
                    leftDirect:direct[direct.indexOf(data.players[i][1])+1]||direct[direct.indexOf(data.players[i][1])-3],
                    leftName:data.players.filter(item=>{
                                return item[1]===direct[direct.indexOf(data.players[i][1])+1]||item[1]===direct[direct.indexOf(data.players[i][1])-3]
                            })[0][0],
                }
            }
            return init_board
        }
    }

    onCall=(data)=>{
        let call_result = false;
        pass.push(data.name)
        if(pass.length>=3){
            let length = pass.length;
            if(pass[length-1]==='Pass'&&pass[length-2]==='Pass'&&pass[length-3]==='Pass'){
                call_result=true
            }   
        }
        return call_result
    }

    call_cards=(direct,card,dataSource)=>{   //展示叫牌信息
        let calls=dataSource;
        if(direct==='N'){
            if(!calls[count].N&&!calls[count].E&&!calls[count].S&&!calls[count].W){ calls[count].N=this.re_transfer(card,1,0,false);}else{ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].N=this.re_transfer(card,1,0,false);}
        }
        if(direct==='E'){
            if(!calls[count].E&&!calls[count].S&&!calls[count].W){ calls[count].E=this.re_transfer(card,1,0,false);}else{ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].E=this.re_transfer(card,1,0,false);}
        }
        if(direct==='S'){
            if(!calls[count].S&&!calls[count].W){ calls[count].S=this.re_transfer(card,1,0,false);}else{ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].S=this.re_transfer(card,1,0,false);}
        }
        if(direct==='W'){
            if(!calls[count].W){ calls[count].W=this.re_transfer(card,1,0,false);}else{ count++; calls.push({ key:count, N:'', E:'', S:'', W:'',}); calls[count].W=this.re_transfer(card,1,0,false);}
        }
        return calls
    }

    play_card=(body,dummy,myCardList,dummyCardList,playerInfo,playCards,topInfo)=>{
        if(body.pos===playerInfo.myDirect){
            let j = suitWord.indexOf(body.card.split('')[0]);
            myCardList.map((item,index)=>{
                if(index===j){
                    item.splice(item.indexOf(body.card.split('')[1]),1)
                }
            })
        }
        if(body.pos===dummy){
            let j = suitWord.indexOf(body.card.split('')[0]);
            dummyCardList.map((item,index)=>{
                if(index===j){
                    item.splice(item.indexOf(body.card.split('')[1]),1)
                }
            })
        }
        body.pos===playerInfo.topDirect?playCards.currentCardT=this.re_transfer(body.card,0,1,true):null;
        body.pos===playerInfo.myDirect?playCards.currentCardB=this.re_transfer(body.card,0,1,true):null;
        body.pos===playerInfo.leftDirect?playCards.currentCardL=this.re_transfer(body.card,0,1,true):null;
        body.pos===playerInfo.rightDirect?playCards.currentCardR=this.re_transfer(body.card,0,1,true):null;
        playCards.currentPiers.push({pos:body.pos,card:body.card})
        if(body.number%4===0){
            playCards.currentCardT=null;
            playCards.currentCardB=null;
            playCards.currentCardL=null;
            playCards.currentCardR=null;
            playCards.currentPiers=[];
            topInfo.piersSN=body.ns_win;
            topInfo.piersEW=body.ew_win;
        }
        return [myCardList,dummyCardList,playCards,topInfo]
    }

    playOrder=(data,i)=>{   //展示出牌顺序
        let piers = data.slice(4*i,4*(i+1));
        let plays;
        if(piers[0][1]==='S'){
            plays={
                key:i,
                pier:i+1,
                east:'',
                south:this.re_transfer(piers[0][2],0,1,false),
                west:this.re_transfer(piers[1][2],0,1,false),
                north:this.re_transfer(piers[2][2],0,1,false),
                east_next:this.re_transfer(piers[3][2],0,1,false),
                south_next:'',
                west_next:'',
            }
        }
        if(piers[0][1]==='W'){
            plays={
                key:i,
                pier:i+1,
                east:'',
                south:'',
                west:this.re_transfer(piers[0][2],0,1,false),
                north:this.re_transfer(piers[1][2],0,1,false),
                east_next:this.re_transfer(piers[2][2],0,1,false),
                south_next:this.re_transfer(piers[3][2],0,1,false),
                west_next:'',
            }
        }
        if(piers[0][1]==='N'){
            plays={
                key:i,
                pier:i+1,
                east:'',
                south:'',
                west:'',
                north:this.re_transfer(piers[0][2],0,1,false),
                east_next:this.re_transfer(piers[1][2],0,1,false),
                south_next:this.re_transfer(piers[2][2],0,1,false),
                west_next:this.re_transfer(piers[3][2],0,1,false),
            }
        }
        if(piers[0][1]==='E'){
            plays={
                key:i,
                pier:i+1,
                east:this.re_transfer(piers[0][2],0,1,false),
                south:this.re_transfer(piers[1][2],0,1,false),
                west:this.re_transfer(piers[2][2],0,1,false),
                north:this.re_transfer(piers[3][2],0,1,false),
                east_next:'',
                south_next:'',
                west_next:'',
            }
        }
        return plays
    }
}