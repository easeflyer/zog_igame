import React from 'react'
import {WingBlank, Button, List,WhiteSpace} from 'antd-mobile'


export default class Waiting extends React.Component{
    state={
        readyStatus:false,
        allStatus:[]
    }

    onReady=()=>{
        this.setState({
            readyStatus:true,
        })
        this.state.allStatus.push('201已就绪')
    }

    render(){
        return(
            <WingBlank>
            <WhiteSpace></WhiteSpace>
                <Button type="primary" onClick={this.onReady} disabled={this.state.readyStatus} size="small" inline> 准备</Button>
                <List renderHeader={() => '聊天区'}>
                    <List.Item >{this.state.allStatus}</List.Item>
                </List>
            </WingBlank>
        )
    }
}