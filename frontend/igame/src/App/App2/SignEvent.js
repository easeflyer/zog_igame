import React from 'react'
import { WingBlank, Button } from 'antd-mobile';

import EventNavBar from './Common/EventNavBar'
import ExistTeamForm from './ExistTeamForm';
import NewTeamForm from './NewTeamForm';

export default class SignEvent extends React.Component{
    state={
        eventDetail:this.props.list[0], //要报名赛事的全部信息
        toast:false,
        exist:0 //0：选择报名方式，1：选择已有赛队进行报名，2：新建赛队并报名
    }

// 回到详情页 ★
    backSpace= ()=>{
        if(this.state.exist){
            this.setState({
                exist:0
            })
        }else{
            this.props.backToDetail()
        }
    }

// 选择已有赛队进行报名 ★
    selectExist=()=>{
        this.setState({
            exist:1
        })
    }

// 新建赛队并进行报名 ★
    selectNew=()=>{
        this.setState({
            exist:2
        })
    }

// 取消报名，返回选择报名方式页面 ★
    cancelSubmit=()=>{
        this.setState({
            exist:0
        })
    }
    
    render(){
        return(
            <WingBlank>
                <EventNavBar  left="left" eventName={this.state.eventDetail.name+' 报名'} clickArrow={this.backSpace} />
                {this.state.exist==0 ?
                    <div>
                        <Button type="primary" size="small" inline style={{float:'left',marginLeft:20, marginTop:30}} onClick={this.selectExist}>选择已有赛队报名</Button> 
                        <Button type="warning" size="small" inline style={{float:'right',marginRight:20, marginTop:30}} onClick={this.selectNew}>新建赛队报名</Button>
                    </div> :
                    null
                }
                {this.state.exist==1 ? 
                    !this.props.toast ? <ExistTeamForm eventDetail={this.state.eventDetail} stateTeams={this.props.stateTeams} cancelSubmit={this.cancelSubmit}/> : <p style={{textAlign:'center',marginTop:30}}>恭喜您，报名成功！</p>  : 
                    null  
                }    
                {this.state.exist==2 ? 
                    !this.props.toast ? <NewTeamForm eventDetail={this.state.eventDetail} stateFriends={this.props.stateFriends} cancelSubmit={this.cancelSubmit}/> : <p style={{textAlign:'center',marginTop:30}}>恭喜您，报名成功！</p> :
                    null
                }
            </WingBlank>
        )
    }
}