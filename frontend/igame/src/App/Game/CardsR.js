import React from 'react'
import { Col} from 'antd';
import Func from './Func'
const DealFunc = new Func();

export default class Cards extends React.Component{

    click=(e)=>{
        let val = e.target.innerHTML;
        val=DealFunc.transfer(val,2,true);
        this.props.post('play',val)   //发送打牌信息
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
                        onClick={this.click}
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
                        onClick={this.click}
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
                        onClick={this.click}
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
                        onClick={this.click}
                        >
                        {i}{`\n`}{'♣'}</span>)
                })
            }
        })
        return addCards //两种格式：5♥  5h 
    }
    render(){
        return(
            <Col span={24} style={{paddingLeft:10,textAlign:'center'}}>{this.props.cards?this.addColor(this.props.cards):null}</Col>
        )
    }
}