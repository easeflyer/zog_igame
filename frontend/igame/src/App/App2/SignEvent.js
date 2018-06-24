import React from 'react'
import EventNavBar from './Common/EventNavBar'
import { WingBlank} from 'antd-mobile';
import SignWay from './SignWay'

export default class SignEvent extends React.Component{
    state={
        toast:false
    }

    backSpace= ()=>{
        this.props.backToDetail()
    }

    submitExistTeamForm=(data)=>{
        console.log(data)
        this.setState({
            toast:true
        });
        this.props.submitExistTeamForm(data)
    }

    
    render(){
        let list=this.props.list;
        let page=this.props.page-1;
        let listItemDetails= list[page].info;
        
        return(
            <WingBlank>
                <EventNavBar  left="left" eventName={listItemDetails.eventName+'报名'} clickArrow={this.backSpace} />
                <SignWay toast={this.state.toast} submitExistTeamForm={this.submitExistTeamForm}/>
            </WingBlank>
        )
    }
}