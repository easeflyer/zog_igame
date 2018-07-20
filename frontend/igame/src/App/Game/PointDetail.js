import React from 'react'
import {Table} from 'antd';
import {WingBlank,WhiteSpace,NavBar,Icon,} from 'antd-mobile'
import './table.css'
import Func from './Func'
const DealFunc = new Func();
const call=[{
    title: '北',
    dataIndex: 'N',
    key: 'N',
  },{
    title: '东',
    dataIndex: 'E',
    key: 'E',
  },{
    title: '南',
    dataIndex: 'S',
    key: 'S',
  },{
    title: '西',
    dataIndex: 'W',
    key: 'W',
  },]
  const play=[,{
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
  let i =0;
export default class PointDetail extends React.Component{
	state={
		callData:[{
			key:0,
			N:'',
			E:'',
			S:'',
			W:'',
		}],
		playData:[]
	}
	componentDidMount(){
		let calls =null;
		this.props.Detail.calls.map(item=>{  //[1, "E", "1S"],[2, "S", "Pass"], [3, "W", "Pass"]，[4, "N", "Pass"]
			calls = DealFunc.call_cards(item[1],item[2],this.state.callData);
		})
		let plays = this.state.playData
		this.props.Detail.plays.map((item,index)=>{
			if(item[0]%4===0){
				plays.push( DealFunc.playOrder(this.props.Detail.plays,i))
				i++
			}
		})
		this.setState({ callData:calls, playData:plays })
	}
	onLeftClick=()=>{
		this.props.toPointResult()
	}
    render(){
        return(
            <WingBlank>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.onLeftClick}
                >第一副牌详情</NavBar>
                <WhiteSpace/>
                <Table 
                dataSource={this.state.callData} 
                columns={call}
                size="middle"
                title={() => '叫牌过程'}
                />
                <Table 
                dataSource={this.state.playData} 
                columns={play}
                size="middle"
                title={() => '出牌顺序'}
                />
            </WingBlank>
        )
    }
}
