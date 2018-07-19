import React from 'react'
import {Table} from 'antd';
import {WingBlank,NavBar,Icon,WhiteSpace} from 'antd-mobile'
import './table.css'
const columns = [{
    title: '副数',
    dataIndex: 'number',
    key: 'number',
  }, {
    title: '发牌',
    dataIndex: 'dealer',
    key: 'dealer',
  }, {
    title: '局况',
    dataIndex: 'vulnerability',
    key: 'vulnerability',
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
    dataIndex: 'openLeader',
    key: 'openLeader',
  },{
    title: '结果',
    dataIndex: 'result',
    key: 'result',
  },{
    title: 'ES',
    dataIndex: 'es_point',
    key: 'es_point',
  },{
    title: 'NW',
    dataIndex: 'nw_point',
    key: 'nw_point',
  }];
//   [number,dealer,vulnerability,contract,declarer,openLeader,result,es_point,nw_point]
export default class PointResult extends React.Component{
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
                />
			</WingBlank>
        )
    }
}

const dataSource = [{
    key: '1',
    number:1,
    dealer:'N',
    vulnerability:'双方无局',
    contract:'2♣',
    declarer:'S',
    openLeader:'E',
    result:'+2',
    es_point:580,
    nw_point:0
  },{
    key: '2',
    number:2,
    dealer:'E',
    vulnerability:'双方无局',
    contract:'7♠',
    declarer:'N',
    openLeader:'W',
    result:'-1',
    es_point:0,
    nw_point:580
  },{
    key: '3',
    number:3,
    dealer:'W',
    vulnerability:'双方无局',
    contract:'1♦',
    declarer:'W',
    openLeader:'S',
    result:'+3',
    es_point:580,
    nw_point:0
  }];
  
  
  
