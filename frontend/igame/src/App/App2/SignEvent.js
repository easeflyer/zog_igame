import React from 'react'
import EventNavBar from './EventNavBar'
import { WingBlank} from 'antd-mobile';
import SubmitSignForm from './SubmitSignForm'

export default class SignEvent extends React.Component{
    state={
        toast:false
    }

    backSpace= ()=>{
        this.props.backToDetail()
    }

    submitSignForm=(data)=>{
        console.log(data)
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
                <SubmitSignForm toast={this.state.toast} submitSignForm={this.submitSignForm}/>
            </WingBlank>
        )
    }
}