import React from 'react'
import { Col} from 'antd';

export default class Cards extends React.Component{
    render(){
        return(
            <Col span={24} style={{paddingLeft:10,textAlign:'center'}}>{this.props.cards}</Col>
        )
    }
}