import React from 'react';
import { NavBar, WhiteSpace, Toast } from 'antd-mobile';
import { Icon, Row, Col } from 'antd';
import Game from '../../OdooRpc/Game';

export default class OneCourseResult extends React.Component{
    state={
        gameId:this.props.match.id,

        thisRoundId:this.props.courseId[0],
        roundName:this.props.courseId[1],
        roundNumber:this.props.courseId[2],

        list:null,
        dealNumber:null,
    }
    componentWillMount(){
        const m = new Game(this.success,this.error);
        m.search_round_details(this.state.gameId,this.props.courseId[0]);
    }
    toOneTable=(index)=>{
        this.props.showPage('OneTable')
        this.props.setTableNumber(index)
    }
    toOneBoard=(index)=>{
        this.props.showPage('OneBoard')
        this.props.setBoardId(index)
    }
    toOneTeam=(index)=>{
        this.props.showPage('OneTeam')
        this.props.setTeam(index)
    }
    gerDatas=(index)=>{
        if(index===0){
            return Toast.info('已经是第一轮了！')
        }
        if(index>this.state.roundNumber){
            return Toast.info('已经是最后一轮了！')
        }
        this.setState({
            thisRoundId:index,
        })
        const m = new Game(this.success,this.error);
        m.search_round_details(this.state.gameId,index);
    }
    success=(datas)=>{          
        const data = [      //测试数据，连上服务器后更改success方法的参数为data，并注释掉这段数据就好
            {round_name:'GG', deal:6, close_id:2, open_id:2, number:1, IMPS:[{host_imp:0.00},{guest_imp:0.00}], VPS:[{host_vp:10.00},{guest_vp:10.00}], team:[{host_name: "牛的一比",host_id:1},{guest_name: "tthf",guest_id:2}]},
            {round_name:'GG', deal:6, close_id:2, open_id:2, number:2, IMPS:[{host_imp:0.00},{guest_imp:0.00}], VPS:[{host_vp:10.00},{guest_vp:10.00}], team:[{host_name: "bagsad",host_id:3},{guest_name: "gththt",guest_id:4}]},
            {round_name:'GG', deal:6, close_id:2, open_id:2, number:3, IMPS:[{host_imp:58},{guest_imp:12}], VPS:[{host_vp:10.00},{guest_vp:10.00}], team:[{host_name: "casgasdg",host_id:5},{guest_name: "名字整的好长好长好长啊",guest_id:6}]},
            {round_name:'GG', deal:6, close_id:2, open_id:2, number:4, IMPS:[{host_imp:0.00},{guest_imp:0.00}], VPS:[{host_vp:10.00},{guest_vp:10.00}], team:[{host_name: "dadgdggd",host_id:7},{guest_name: "thi",guest_id:8}]},
            {round_name:'GG', deal:6, close_id:2, open_id:2, number:5, IMPS:[{host_imp:0.00},{guest_imp:0.00}], VPS:[{host_vp:10.00},{guest_vp:10.00}], team:[{host_name: "dsae",host_id:9},{guest_name: "j",guest_id:0}]}
        ]
        const Items = (<tbody>
            {data.map((item, index) => {
                return (
                    <tr key={index} >
                        <td><a onClick={()=>this.toOneTable(item.number)} >{item.number}</a></td>
                        <td>{item.deal}</td>
                        <td style={{textAlign:'left'}}>
                            <div><a onClick={()=>this.toOneTeam([item.team[0].host_id,item.team[0].host_name])} >{item.team[0].host_name}</a></div>
                            <div><a onClick={()=>this.toOneTeam([item.team[1].guest_id,item.team[1].guest_name])} >{item.team[1].guest_name}</a></div>
                        </td>
                        <td>
                            <div>{item.IMPS[0].host_imp}</div>
                            <div>{item.IMPS[1].guest_imp}</div>
                        </td>
                        <td>
                            <div>{item.VPS[0].host_vp}</div>
                            <div>{item.VPS[1].guest_vp}</div>
                        </td>
                    </tr>
                );
            })}
            </tbody>);

        let setDealNumber = length =>Array.from({length}, (v, k) => <a style={{margin:'0px 5px'}} key={k+1} onClick={()=>this.toOneBoard(k+1)} >{k+1}</a>)
        this.setState({
            list:Items,
            dealNumber:setDealNumber(data[0].deal),
        })
        this.props.setCourseId([this.state.thisRoundId,data[0].round_name,this.state.roundNumber])
    }
    error=()=>{
        console.log('has error!')
    }
    render(){
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={()=>this.props.toMatchDetails()} >
                    {this.state.roundNumber[1]}第{this.state.thisRoundId}轮
                    <div style={{width:35}} > 
                        <Icon type="caret-up" style={{fontSize:5,display:'block'}} onClick={()=>this.gerDatas(this.state.thisRoundId-1)} />
                        <Icon type="caret-down" style={{fontSize:5,display:'block'}} onClick={()=>this.gerDatas(this.state.thisRoundId+1)} /> 
                    </div>
                </NavBar>
                <WhiteSpace size='sm' />
                <Row>
                    <Col span={12} >
                        <div style={{border:'1px solid gray',textAlign:'center',padding:10}} >对阵结果</div>
                    </Col>
                    <Col span={12} >
                        <div style={{border:'1px solid gray',textAlign:'center',padding:10}} onClick={()=>this.props.showPage('OneCourseRanking')} >赛队排名</div>
                    </Col>
                </Row>
                <WhiteSpace size='sm' />

                <table className='one_course' >
                    <thead>
                        <tr>
                            <td>桌</td>
                            <td>
                                <div>完</div>
                                <div>成</div>
                            </td>
                            <td style={{textAlign:'left'}}>
                                <div>主队</div>
                                <div>客队</div>
                            </td>
                            <td >
                                <div>IMPS</div><hr />
                                <div>主队</div>
                                <div>主队</div>
                            </td>
                            <td >
                                <div>VPS</div><hr />
                                <div>主队</div>
                                <div>主队</div>
                            </td>
                        </tr>
                    </thead>
                    {this.state.list}
                </table>
                <ul>
                    <li>点击桌号 查看计分表</li>
                    <li>点击队名 查看对阵记录</li>
                    <li><a onClick={()=>this.props.showPage('Ranking_teamNumber')} >瑞士赛成绩表</a></li>
                    <li><a onClick={()=>this.props.showPage('Ranking_scores')} >瑞士赛成绩表(按名次排序)</a></li>
                    <li><a onClick={()=>this.props.showPage('Datum')} >Datum</a></li>
                    <li><h3>牌：{this.state.dealNumber}</h3></li>
                </ul>
            </div>
        );
    }
}