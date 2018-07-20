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


const test =[

[1, "S", "C6"]
,[2, "W", "C4"]
,[3, "N", "C3"]
, [4, "E", "C2"]
, [5, "S", "CT"]
,[6, "W", "C8"]
,[7, "N", "C5"]
,[8, "E", "C7"]
,[9, "S", "CJ"]
,[10, "W", "D4"]
,[11, "N", "C9"]
,[12, "E", "CQ"]
,[13, "E", "CK"]
,[14, "S", "DT"]
,[15, "W", "D6"]
,[16, "N", "D3"]
,[17, "E", "CA"]
,[18, "S", "DQ"]
,[19, "W", "D8"]
,[20, "N", "D5"]
,[21, "E", "D2"]
,[22, "S", "H3"]
,[23, "W", "DK"]
,[24, "N", "D7"]
,[25, "W", "DA"]
, [26, "N", "DJ"]
,[27, "E", "D9"]
,[28, "S", "H5"]
, [29, "W", "H2"]
, [30, "N", "H4"]
, [31, "E", "H6"]
,[32, "S", "H7"]
,[33, "S", "HJ"]
,[34, "W", "HT"]
,[35, "N", "HK"]
,[36, "E", "H8"]
,[37, "N", "HA"]
,[38, "E", "H9"]
,[39, "S", "S5"]
,[40, "W", "HQ"]
,[41, "S", "S2"]
,[42, "W", "S7"]
,[43, "N", "S6"]
,[44, "E", "S3"]
,[45, "W", "S8"]
,[46, "N", "S9"]
, [47, "E", "S4"]
,[48, "S", "SQ"]
,[49, "S", "SA"]
,[50, "W", "ST"]
,[51, "N", "SK"]
,[52, "E", "SJ"]

]