import React from 'react'
import {WingBlank,NavBar,Icon,Flex} from 'antd-mobile'

export default class Table extends React.Component{
    render(){
        return(
            <WingBlank>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                >Table</NavBar>
                <div style={openBar}>开室</div>
                <div>
                    <Flex>
                        <Flex.Item>卢燕 002216</Flex.Item>
                    </Flex>
                </div>
            </WingBlank>
        )
    }
}

const openBar = {
    height:'30px',
    background:'green',
    textAlign:'center',
    lineHeight:'30px'
}