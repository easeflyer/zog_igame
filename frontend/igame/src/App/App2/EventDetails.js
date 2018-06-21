import React from 'react'
import { WingBlank, NavBar, Icon } from 'antd-mobile';

export default class EventDetails extends React.Component{
    backSpace=()=>{
        this.props.backToList();
    }

    render(){
        let list=this.props.list;
        let page=this.props.page-1;
        let listItemDetails= list[page].info;
        return(
            <WingBlank>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.backSpace}
                >
                    {listItemDetails.eventName}
                </NavBar>
                <img src="http://p2.so.qhimgs1.com/bdr/_240_/t01d5f9d7ac8f536b6e.jpg" style={{display:'block', margin:'0 auto', marginBottom:30}}/>
                <p>{listItemDetails.eventName}</p>
                <p>比赛时间：</p>
                <p style={{marginLeft:30}}>{listItemDetails.eventTime}</p>
                <p>主办单位：</p>
                <p style={{marginLeft:30}}>{listItemDetails.organizer}</p>
                <p>赞助单位：</p>
                <p style={{marginLeft:30}}>{listItemDetails.sponsors}</p>
                <p>裁判：</p>
                <p style={{marginLeft:30}}>{listItemDetails.referee}</p>
                <p>仲裁：</p>
                <p style={{marginLeft:30}}>{listItemDetails.arbitration}</p>
                <p>报名时间：</p>
                <p style={{marginLeft:30}}>{listItemDetails.signingTime}</p>
            </WingBlank>
        )
    }
}