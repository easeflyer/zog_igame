import React from 'react'
import { WingBlank, WhiteSpace } from 'antd-mobile';

export default class EventDetails extends React.Component{

    render(){
        let list=this.props.list;
        let page=this.props.page;
        return(
            <WingBlank>
                <img src="http://p2.so.qhimgs1.com/bdr/_240_/t01d5f9d7ac8f536b6e.jpg" style={{display:'block', margin:'0 auto', marginBottom:30}}/>
                <h2>{list[page].info.eventName}</h2>
            </WingBlank>
        )
    }
}