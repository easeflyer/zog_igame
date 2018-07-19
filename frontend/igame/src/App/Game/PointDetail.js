import React from 'react'
import {Table} from 'antd';
import {WingBlank,WhiteSpace,NavBar,Icon,} from 'antd-mobile'
import './table.css'
const columns=[{
    title: '北',
    dataIndex: 'north',
    key: 'north',
  },{
    title: '东',
    dataIndex: 'east',
    key: 'east',
  },{
    title: '南',
    dataIndex: 'south',
    key: 'south',
  },{
    title: '西',
    dataIndex: 'west',
    key: 'west',
  },]
  const columns2=[,{
    title: '墩',
    dataIndex: 'pier',
    key: 'pier',
  },{
    title: '东',
    dataIndex: 'east',
    key: 'east',
  },{
    title: '南',
    dataIndex: 'south',
    key: 'south',
  },{
    title: '西',
    dataIndex: 'west',
    key: 'west',
  },{
    title: '北',
    dataIndex: 'north',
    key: 'north',
  },{
    title: '东',
    dataIndex: 'east_next',
    key: 'east_next',
  },{
    title: '南',
    dataIndex: 'south_next',
    key: 'south_next',
  },{
    title: '西',
    dataIndex: 'west_next',
    key: 'west_next',
  }]
export default class PointDetail extends React.Component{
    render(){
        return(
            <WingBlank>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
                >第一副牌详情</NavBar>
                <WhiteSpace/>
                <Table 
                dataSource={callData} 
                columns={columns}
                size="middle"
                title={() => '叫牌过程'}
                />
                <Table 
                dataSource={playData} 
                columns={columns2}
                size="middle"
                title={() => '出牌顺序'}
                />
            </WingBlank>
        )
    }
}

const callData = [{
    key:'1',
    north:'',
    east:'',
    south:'3♠',
    west:'Pass'
},{
    key:'2',
    north:'Pass',
    east:'Pass',
    south:'',
    west:''
}];
const playData = [{
    key:'1',
    pier:1,
    east:'',
    south:'3♠',
    west:'4♠',
    north:'5♠',
    east_next:'6♠',
    south_next:'',
    west_next:'',
},{
    key:'2',
    pier:2,
    east:'A♦',
    south:'3♦',
    west:'J♦',
    north:'T♦',
    east_next:'',
    south_next:'',
    west_next:'',
}];