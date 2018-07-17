import React from 'react';
import { NavBar, WhiteSpace, Flex} from 'antd-mobile';
import { Icon, Row, Col } from 'antd';
import Game from '../../OdooRpc/Game';


export default class OneCourseResult extends React.Component{
    state={
        gameId:this.props.match.id,
        roundId:this.props.courseId[0],
        list:null
    }
    componentWillMount(){
        const m = new Game(this.success,this.error);
        m.search_round_details(this.state.gameId,this.state.roundId);
    }
    success=(datas)=>{
        console.log('*****data*****')
        console.log(datas)


        const data = [

            {deal:6, close_id:2, open_id:2, number:1, IMPS:[{host_imp:0.00},{guest_imp:0.00}], VPS:[{host_vp:10.00},{guest_vp:10.00}], team:[{host_name: "牛的一比"},{guest_name: "tthf"}]},
            {deal:6, close_id:2, open_id:2, number:2, IMPS:[{host_imp:0.00},{guest_imp:0.00}], VPS:[{host_vp:10.00},{guest_vp:10.00}], team:[{host_name: "bagsad"},{guest_name: "gththt"}]},
            {deal:6, close_id:2, open_id:2, number:3, IMPS:[{host_imp:58},{guest_imp:12}], VPS:[{host_vp:10.00},{guest_vp:10.00}], team:[{host_name: "casgasdg"},{guest_name: "名字整的好长好长好长啊"}]},
            {deal:6, close_id:2, open_id:2, number:4, IMPS:[{host_imp:0.00},{guest_imp:0.00}], VPS:[{host_vp:10.00},{guest_vp:10.00}], team:[{host_name: "dadgdggd"},{guest_name: "thi"}]},
            {deal:6, close_id:2, open_id:2, number:5, IMPS:[{host_imp:0.00},{guest_imp:0.00}], VPS:[{host_vp:10.00},{guest_vp:10.00}], team:[{host_name: "dsae"},{guest_name: "j"}]}

            // {tableId:1, tableNumber:1, 牌的副数：8，赛队:[{主队：海外队},{客队:大陆队}], IMPs:[{主队:10},{客队:9}], VPs:[{主队:10.44},{客队:9.56}]},
        ]
        const Items = (<tbody>
            {data.map((item, index) => {
                return (
                    <tr key={index}>
                        <td>{item.number}</td>
                        <td>{item.deal}</td>
                        <td>
                            <div>{item.team[0].host_name}</div>
                            <div>{item.team[1].guest_name}</div>
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
            console.log(Items)
            this.setState({list:Items})


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
                    {this.props.courseId[1]}成绩
                    <div style={{width:35}} > 
                        <Icon type="caret-up" style={{fontSize:5,display:'block'}} />
                        <Icon type="caret-down" style={{fontSize:5,display:'block'}} /> 
                    </div>
                </NavBar>
                <WhiteSpace size='xl' />
                赛事名称：{this.props.match.name}
                赛事ID：{this.props.match.id}
                轮次ID：{this.props.courseId[0]}

                <Row>
                    <Col span={12} >
                        <div style={{border:'1px solid red',textAlign:'center'}} >对阵结果</div>
                    </Col>
                    <Col span={12} >
                        <div style={{border:'1px solid red',textAlign:'center'}} >赛队排名</div>
                    </Col>
                </Row>
                
                <table>
                    <thead>
                        <tr>
                            <td>桌</td>
                            <td>完成</td>
                            <td>
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


                赛队得分
                <button onClick={()=>this.props.showPage('OneCourseRanking')} >本轮排名</button>
                <button onClick={()=>this.props.showPage('Ranking_scores')} >排名表(按名次)</button>
                <button onClick={()=>this.props.showPage('Ranking_teamNumber')} >排名表(按序号)</button>
                <button onClick={()=>this.props.showPage('Datum')} >Datum</button>
                <button onClick={()=>this.props.showPage('OneBoard')} >1副牌</button>
                <button onClick={()=>this.props.showPage('OneTable')} >一桌牌</button>
                <button onClick={()=>this.props.showPage('OneTeam')} >一个队的成绩</button>

            </div>
        );
    }
}