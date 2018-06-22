import React from 'react'
import EventNavBar from './EventNavBar'
import { WingBlank} from 'antd-mobile';
import SignFormCommit from './SignForm'

export default class SignEvent extends React.Component{
    state={
        toast:false
    }

    backSpace= ()=>{
        this.props.backToDetail()
    }

    submitSignForm=()=>{
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
                <EventNavBar  left="left" eventName={listItemDetails.eventName+'报名'} clickArrow={this.backSpace} submitSignForm={this.submitSignForm}/>
                {!this.state.toast ? <SignFormCommit /> : <div>恭喜您，报名成功！</div> }     
            </WingBlank>
        )
    }
}