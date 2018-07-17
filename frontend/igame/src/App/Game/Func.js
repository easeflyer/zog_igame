import React from 'react'
import Session from '../User/session'
const direct = [ 'N' ,'E','S','W',]
const suitWord = ['S','H','D','C']

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
    // 处理发过来的牌：添加花色
    addColor=(cards)=>{
        let addCards=[[],[],[],[]],colorCards=[[],[],[],[]];
        cards.map((item,index)=>{
            if(index===0&&item.length!==0){
                item.map(i=>{
                    addCards[0].push(<span 
                        key={index+i} 
                        style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} 
                        // onClick={this.state.play&&
                        //     ((this.state.currentDirect!==this.state.dummy&&this.state.currentDirect===this.state.myDirect)||
                        //     (this.state.currentDirect===this.state.dummy&&this.state.declarer===this.state.myDirect))
                        //     ?this.click:null}
                        >
                        {i}{`\n`}{'♠'}
                        </span>)
                })
            }
            if(index===1&&item.length!==0){
                item.map(i=>{
                    addCards[1].push(<span 
                        key={index+i} 
                        style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5,color:'red'}} 
                        // onClick={this.state.play&&
                        //     ((this.state.currentDirect!==this.state.dummy&&this.state.currentDirect===this.state.myDirect)||
                        //     (this.state.currentDirect===this.state.dummy&&this.state.declarer===this.state.myDirect))
                        //     ?this.click:null}
                        >
                        {i}{`\n`}{'♥'}
                        </span>)
                })
            }
            if(index===2&&item.length!==0){
                item.map(i=>{
                     addCards[2].push(<span 
                        key={index+i} 
                        style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5,color:'red'}} 
                        // onClick={this.state.play&&
                        //     ((this.state.currentDirect!==this.state.dummy&&this.state.currentDirect===this.state.myDirect)||
                        //     (this.state.currentDirect===this.state.dummy&&this.state.declarer===this.state.myDirect))
                        //     ?this.click:null}
                        >
                        {i}{`\n`}{'♦'}
                        </span>)
                })
            }
            if(index===3&&item.length!==0){
                item.map(i=>{
                     addCards[3].push(<span 
                        key={index+i} 
                        style={{display:'inline-block',height:50,width:25,border:'1px solid #ddd',textAlign:'left',paddingLeft:5}} 
                        //  onClick={this.state.play&&
                        //     ((this.state.currentDirect!==this.state.dummy&&this.state.currentDirect===this.state.myDirect)||
                        //     (this.state.currentDirect===this.state.dummy&&this.state.declarer===this.state.myDirect))
                        //     ?this.click:null}
                        >
                        {i}{`\n`}{'♣'}</span>)
                })
            }
        })
        return addCards //两种格式：5♥  5h 
    }
    //初始化牌桌
    sucPost(data){
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
    
}