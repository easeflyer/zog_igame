import React from 'react'
import {WingBlank, Button, List} from 'antd-mobile'


export default class Waiting extends React.Component{


    render(){
        return(
            <WingBlank>
                <Button type="primary" onClick={this.onReady}> 准备</Button>
                <List renderHeader={() => 'Basic Style'} className="my-list">
                    <List.Item extra={'extra content'}>Title</List.Item>
                </List>
            </WingBlank>
        )
    }
}