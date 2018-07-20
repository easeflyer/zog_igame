import React from 'react';
import { NavBar, WhiteSpace } from 'antd-mobile';
import { Icon, Row, Col, Table } from 'antd';

const columns = [{
    title: '排名',
    children: [{
        title: "名次",
        dataIndex: "ranking",
        width: "15%",
    }, {
        title: "参赛队",
        dataIndex: "team",
        width: "35%",
    }, {
        title: "VPs",
        dataIndex: "VPs",
        width: "20%",
    }, {
        title: "罚分",
        dataIndex: 'penaltyPoints',
        width: "20%",
    }]
}]

const data = [
    { ranking: 1, team: "杭州锦江队", VPs: "20.00", penaltyPoints: "" },
    { ranking: 2, team: "天津凯莱英红队", VPs: "20.00", penaltyPoints: "" },
    { ranking: 3, team: "山东大学", VPs: "20.00", penaltyPoints: "" },
    { ranking: 4, team: "山西晋", VPs: "20.00", penaltyPoints: "" },
    { ranking: 5, team: "杭州", VPs: "20.00", penaltyPoints: "" }
]

export default class OneCourseRanking extends React.Component {
    render() {
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.toMatchDetails()}    //返回轮次页
                >{this.props.courseId[1]}排名(每轮排名)
                </NavBar>
                <WhiteSpace size='sm' />
                <Row>
                    <Col span={12} >
                        <div style={{ border: '1px solid gray', textAlign: 'center', padding: 10 }} onClick={() => this.props.showPage('OneCourseResult')} >对阵结果</div>
                    </Col>
                    <Col span={12} >
                        <div style={{ border: '1px solid gray', textAlign: 'center', padding: 10 }} >赛队排名</div>
                    </Col>
                </Row>
                <WhiteSpace size='sm' />
                <Table
                    columns={columns}
                    dataSource={data}
                    size="small"
                    pagination={false}
                />,
                {/*
                <h1>赛事名称：{this.props.match.name}</h1>
                <h1>赛事ID：{this.props.match.id}</h1>
                <h1>轮次ID：{this.props.courseId[0]}</h1>*/}
            </div>
        );
    }
}