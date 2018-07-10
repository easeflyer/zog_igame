import React from 'react';
import { Row, Col } from 'antd';
import {  List  } from 'antd-mobile';

const Item = List.Item;

const Separator = ()=>(
    <div style={{
        backgroundColor: '#F5F5F9',
        height: 8,
        borderTop: '1px solid #ECECED',
        borderBottom: '1px solid #ECECED',  }}>
    </div>
);

export default class MatchTeam extends React.Component{
    state = {
        datas:null,
    }
    componentWillMount(){
        // const matchId = this.props.match.id;    //这里应该想后台发送赛事id(matchId),获取赛事的参赛队伍
        
        //这里的data假定是从数据库取回来的比赛数据
        // const data = this.props.match.type==='team' ? (<h1>队式赛......</h1>) : (<h1>参赛队......</h1>);

        const datas = [
            {number:'12',
            ranking:'2',
            name:'白鲨1队',
            member:[{id:1,name:'蒋周伟',others:'56%'},{id:1,name:'蒋周伟',others:'56%'},
                    {id:1,name:'蒋周伟',others:'56%'},{id:1,name:'蒋周伟',others:'56%'},],
            pay:true},
            {number:'25',
            ranking:'3',
            name:'白鲨2队',
            member:[{id:1,name:'张三',others:'56%'},{id:1,name:'李四',others:'56%'},
                    {id:1,name:'李四',others:'56%'},{id:1,name:'李四',others:'56%'},],
            pay:false},
            {number:'32',
            ranking:'1',
            name:'白鲨5队',
            member:[{id:1,name:'王麻子',others:'56%'},{id:1,name:'王麻子',others:'56%'},
                    {id:1,name:'王麻子',others:'56%'},{id:1,name:'王麻子',others:'56%'},],
            pay:true},
        ]

        const data1 =datas.map((item,index)=>{ //后端数据完善后这里还需作调整
            return(
                <Item key={index} >
                    
                    <Row  type="flex" justify="center">
                        <Col span={8}> <span>编号</span> </Col>
                        <Col span={16}> <span>{item.number}</span> </Col>
                    </Row>
                    <Row>
                        <Col span={8}> <span>名次</span> </Col>
                        <Col span={16}> <span>{item.ranking}</span> </Col>
                    </Row>
                    <Row>
                        <Col span={8}> <span>队名</span> </Col>
                        <Col span={16}> <span>{item.name}</span> </Col>
                    </Row>
                    <Row> 
                        <Col span={8}> <span>教练/领队</span> </Col>
                        <Col span={16}> <span>没有</span> </Col>
                    </Row>
                    <Row>
                        <Col span={8}> <span>队员</span> </Col>
                        <Col span={16}> 
                            {item.member.map((v,i)=>{return<Row key={i}>
                                <Col span={8}><span>{v.id}</span></Col>
                                <Col span={8}><span>{v.name}</span></Col>
                                <Col span={8}><span>{v.others}</span></Col>
                            </Row>})}
                        </Col>
                        
                    </Row>  
                    <Row style={{textAlign:'center',color:'#fff',background:item.pay?'blue':'red' }} >
                        {item.pay?'已交费':'未交费'}
                    </Row>
                </Item>
            )
        })
        
        this.setState({
            datas:data1,
        })
    }
    render() {
        return(
            <div>
                <Separator />
                <Item style={{background:'aquamarine',fontSize:24}} >{this.props.match.type==='team'?'队式赛':'其他'}</Item>
                {this.state.datas}
                {/* <h1>还没有数据......</h1> */}
            </div>
        );
    }
}


