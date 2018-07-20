import React from 'react'
import {Table} from 'antd';
import {WingBlank,NavBar,Icon,WhiteSpace} from 'antd-mobile'
import './table.css'
import Board from '../OdooRpc/Board'
import PointDetail from './PointDetail';
const columns = [{
    title: '副数',
    dataIndex: 'number',
    key: 'number',
	render: text => <a href="javascript:;">{text}</a>,
  }, {
    title: '发牌',
    dataIndex: 'dealer',
    key: 'dealer',
  }, {
    title: '局况',
    dataIndex: 'vulnerable',
    key: 'vulnerable',
  },{
    title: '定约',
    dataIndex: 'contract',
    key: 'contract',
  },{
    title: '定约者',
    dataIndex: 'declarer',
    key: 'declarer',
  },{
    title: '首攻',
    dataIndex: 'openlead',
    key: 'openlead',
  },{
    title: '结果',
    dataIndex: 'result',
    key: 'result',
  },{
    title: 'EW',
    dataIndex: 'ew_point',
    key: 'ew_point',
  },{
	  title: 'NS',
	  dataIndex: 'ns_point',
	  key: 'ns_point',
	}];
let dataSource=[];
export default class PointResult extends React.Component{
	state={
		result:null
	}
	componentWillMount(){
		const  board= new Board(this.sucResult,this.failResult); 
		board.table_points(6);   //params: [table_id]
	}
	sucResult=(data)=>{
		this.setState({
			result:data
		})
		data.map((item,index)=>{
			dataSource.push({
				key: index,
				number:index+1,
				dealer:item.dealer,
				vulnerable:item.vulnerable,
				contract:item.result?item.result.split(' ')[1]:'-',
				declarer:item.result?item.result.split(' ')[0]:'-',
				openlead:item.openlead?item.openlead:'-',
				result:item.result?item.result.split(' ')[2]:'-',
				ew_point:item.ew_point?item.ew_point:'-',
				ns_point:item.ns_point?item.ns_point:'-',
			})
		})
		this.forceUpdate()
	}
	failResult(){}

	searchResultDetail=(record)=>{
		let oneResult = null;
		this.state.result.filter((item,index)=>{
			if(index===record.key){
				oneResult = item;
				return oneResult;
			}
		});
		this.props.searchOneResult(oneResult);
	}

    render(){
        return(
          	<WingBlank>
             	<NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => console.log('onLeftClick')}
				>本局累计得分</NavBar>
				<WhiteSpace/>
                <Table 
                dataSource={dataSource} 
                columns={columns}
				size="middle"
				onRow={(record) => {
					console.log()
					return {
					  onClick: () => {this.searchResultDetail(record)},       // 点击行
					};
				  }}
                />
			</WingBlank>
        )
    }
}
