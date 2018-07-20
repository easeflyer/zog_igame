import React from 'react';
import { NavBar, WhiteSpace, Toast } from 'antd-mobile';
import { Icon, Row, Col, Pagination, Table } from 'antd';
import Game from '../../OdooRpc/Game';
import './OneCourseResult.css';

//表头样式
const titleTeam = (<p className="titleSty">
    <span>主队</span>
    <br />
    <span>客队</span>
</p>);
const titleIMPSMOD = (<div className="titleSty">
    <span>IMPS</span>
    <hr style={{ textAlign: "center", "marginTop": 0 }} />
    <span>主队</span>
    <br />
    <span>客队</span>
</div>);
const titleVPSMOD = (<div className="titleSty">
    <span>IMPS</span>
    <hr style={{ textAlign: "center", "marginTop": 0 }} />
    <span>主队</span>
    <br />
    <span>客队</span>
</div>);

export default class OneCourseResult extends React.Component {
    state = {
        gameId: this.props.match.id,

        thisRoundId: this.props.courseId[0],
        roundName: this.props.courseId[1],
        roundNumber: this.props.courseId[2],

        list: null,
        dealNumber: null,

        data: [] //用于存放获取到的用与表格的数值
    }
    componentWillMount() {
        const m = new Game(this.success, this.error);
        m.search_round_details(this.state.gameId, this.props.courseId[0]);
    }
    toOneTable = (index) => {
        this.props.showPage('OneTable')
        this.props.setTableNumber(index)
    }
    toOneBoard = (index) => {
        this.props.showPage('OneBoard')
        this.props.setBoardId(index)
    }
    toOneTeam = (index) => {
        this.props.showPage('OneTeam')
        this.props.setTeam(index)
    }
    gerDatas = (index) => {
        if (index === 0) {
            return Toast.info('已经是第一轮了！')
        }
        if (index > this.state.roundNumber) {
            return Toast.info('已经是最后一轮了！')
        }
        this.setState({
            thisRoundId: index,
        })
        const m = new Game(this.success, this.error);
        m.search_round_details(this.state.gameId, index);
    }
    success = (datas) => {
        const data = [      //测试数据，连上服务器后更改success方法的参数为data，并注释掉这段数据就好
            { namtch_id:1, round_name: 'GG', deal: 6, close_id: 2, open_id: 2, number: 1, IMPS: { host_imp: 0.00, guest_imp: 0.00 }, VPS: { host_vp: 10.00, guest_vp: 10.00 }, team: { host_name: "牛的一比", host_id: 1, guest_name: "tthf", guest_id: 2 } },
            { namtch_id:2, round_name: 'GG', deal: 6, close_id: 2, open_id: 2, number: 2, IMPS: { host_imp: 0.00, guest_imp: 0.00 }, VPS: { host_vp: 10.00, guest_vp: 10.00 }, team: { host_name: "bagsad", host_id: 3, guest_name: "gththt", guest_id: 4 } },
            { namtch_id:3, round_name: 'GG', deal: 6, close_id: 2, open_id: 2, number: 3, IMPS: { host_imp: 58, guest_imp: 12 }, VPS: { host_vp: 10.00, guest_vp: 10.00 }, team: { host_name: "casgasdg", host_id: 5, guest_name: "名字整的好长好长好长啊", guest_id: 6 } },
            { namtch_id:4, round_name: 'GG', deal: 6, close_id: 2, open_id: 2, number: 4, IMPS: { host_imp: 0.00, guest_imp: 0.00 }, VPS: { host_vp: 10.00, guest_vp: 10.00 }, team: { host_name: "dadgdggd", host_id: 7, guest_name: "thi", guest_id: 8 } },
            { namtch_id:5, round_name: 'GG', deal: 6, close_id: 2, open_id: 2, number: 5, IMPS: { host_imp: 0.00, guest_imp: 0.00 }, VPS: { host_vp: 10.00, guest_vp: 10.00 }, team: { host_name: "dsae", host_id: 9, guest_name: "j", guest_id: 0 } }
        ]
        let setDealNumber = length => Array.from({ length }, (v, k) => <a style={{ margin: '0px 5px' }} key={k + 1} onClick={() => this.toOneBoard(k + 1)} >{k + 1}</a>)

        // this.props.setCourseId([this.state.thisRoundId, data[0].round_name, this.state.roundNumber])  ???????????????????????????

        // 先判断是否为空
        if (data) {
            this.setState({
                data: data,
                dealNumber: setDealNumber(data[0].deal),
            })
        }
    }
    error = () => {
        console.log('has error!')
    }

    render() {
        //表格表头
        const columns = [{
            title: "桌",
            dataIndex: "number",
            width: "5%",
            render: (text) => {
                return (
                    <span>
                        <a
                            onClick={() => this.toOneTable(text)}
                        >
                            {text}
                        </a>
                    </span>
                )
            }
        }, {
            title: "完成",
            dataIndex: "deal",
            width: "5%"
        }, {
            title: titleTeam,
            dataIndex: "team",
            width: "50%",
            render: (text, row) => {
                return (
                    <div>
                        <span>
                            <a
                                onClick={() => this.toOneTeam(row.team.host_id, row.team.host_name)}
                            >
                                {text.host_name}
                            </a>
                        </span>
                        <hr />
                        <span>
                            <a
                                onClick={() => this.toOneTeam(row.team.guest_id, row.team.guest_name)}
                            >
                                {text.guest_name}
                            </a>
                        </span>
                    </div>
                )
            }
        }, {
            title: titleIMPSMOD,
            dataIndex: "IMPS",
            width: "20%",
            render: (text) => {
                return (
                    <div>
                        <span>{text.host_imp}</span>
                        <br />
                        <span>{text.guest_imp}</span>
                    </div>
                )
            }
        }, {
            title: titleVPSMOD,
            dataIndex: "VPS",
            width: "20%",
            render: (text) => {
                return (
                    <div>
                        <span>{text.host_vp}</span>
                        <br />
                        <span>{text.guest_vp}</span>
                    </div>
                )
            }
        }]

        //一共几副牌初始化
        let dealNumber = 0;
        if (this.state.dealNumber) {
            dealNumber = this.state.dealNumber.length;
        }

        return (
            <div className='table1'>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.toMatchDetails()} >
                    {this.state.roundNumber[1]}第{this.state.thisRoundId}轮
                    <div style={{ width: 35 }} >
                        <Icon type="caret-up" style={{ fontSize: 5, display: 'block' }} onClick={() => this.gerDatas(this.state.thisRoundId - 1)} />
                        <Icon type="caret-down" style={{ fontSize: 5, display: 'block' }} onClick={() => this.gerDatas(this.state.thisRoundId + 1)} />
                    </div>
                </NavBar>
                <WhiteSpace size='sm' />
                <Row>
                    <Col span={12} >
                        <div style={{ border: '1px solid gray', textAlign: 'center', padding: 10 }} >对阵结果</div>
                    </Col>
                    <Col span={12} >
                        <div style={{ border: '1px solid gray', textAlign: 'center', padding: 10 }} onClick={() => this.props.showPage('OneCourseRanking')} >赛队排名</div>
                    </Col>
                </Row>
                <WhiteSpace size='sm' />
                <Table
                    bordered
                    columns={columns}
                    dataSource={this.state.data}
                />
                <ul>
                    <li>点击桌号 查看计分表</li>
                    <li>点击队名 查看对阵记录</li>
                    <li><a onClick={() => this.props.showPage('Ranking_teamNumber')} >瑞士赛成绩表</a></li>
                    <li><a onClick={() => this.props.showPage('Ranking_scores')} >瑞士赛成绩表(按名次排序)</a></li>
                    <li><a onClick={() => this.props.showPage('Datum')} >Datum</a></li>
                    <li><h3>牌：{this.state.dealNumber}</h3></li>
                </ul>
            </div>
        );
    }
}