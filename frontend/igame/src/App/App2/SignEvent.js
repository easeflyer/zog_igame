import React from 'react'
import EventNavBar from './EventNavBar'
import { WingBlank,Toast, Modal,} from 'antd-mobile';
import SignWay from './SignWay'
import {DealSign} from './Model/Deal'

const alert = Modal.alert;

export default class SignEvent extends React.Component{
    state={
        toast:false
    }

    backSpace= ()=>{
        this.props.backToDetail()
    }

    payPrompt=()=>{
        alert('', '参加团体赛需要交纳200元报名费,是否确认？', [
            { text: '取消', onPress: () => console.log('cancel') },
            { text: '确认', onPress: () => console.log('ok') },
          ])
    }

    submitExistTeamForm=(data)=>{
        // 请求报名
        // const Sign = new DealSign(this.payPrompt);
        // Sign.existTeamSign(data);

        // 是否支付弹窗
        // this.payPrompt();

        this.setState({
            toast:true
        }); 
    }

    submitNewTeamForm=(data)=>{
        this.setState({
            toast:true
        });      
    }
   
    render(){
        let list=this.props.list;
        let page=this.props.page-1;
        let listItemDetails= list[page].info;
        
        return(
            <WingBlank>
                <EventNavBar  left="left" eventName={listItemDetails.eventName+'报名'} clickArrow={this.backSpace} />
                <SignWay toast={this.state.toast} submitExistTeamForm={this.submitExistTeamForm} submitNewTeamForm={this.submitNewTeamForm} cancelTeamForm={this.backSpace}/>
            </WingBlank>
        )
    }
}