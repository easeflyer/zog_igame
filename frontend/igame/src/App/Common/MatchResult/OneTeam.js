import React from 'react';
import { NavBar, WhiteSpace } from 'antd-mobile';
import { Icon, Table } from 'antd';

const columns = [{
    title: "轮次",
    dataIndex: "rounds"
}, {
    title: "对阵方",
    dataIndex: "opponent"
}, {
    title: "IMPs",
    dataIndex: "IMPs"
}, {
    title: "VPs",
    dataIndex: "Vps"
}]
export default class OneTeam extends React.Component {
    render() {
        // 初始化表格数据
        let data = [];
        data = [
            { "rounds": "vs 北京", "opponent": "vs 北京", "IMPs": "6:13", "VPs": "6.12 : 13.88" },
            { "rounds": "vs 北京", "opponent": "vs 北京", "IMPs": "6:13", "VPs": "6.12 : 13.88" },
            { "rounds": "vs 北京", "opponent": "vs 北京", "IMPs": "6:13", "VPs": "6.12 : 13.88" },
            { "rounds": "vs 北京", "opponent": "vs 北京", "IMPs": "6:13", "VPs": "6.12 : 13.88" }
        ]
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.showPage('OneCourseResult')}    //到一轮结果
                >{this.props.team[1]}
                </NavBar>
                <WhiteSpace size='xl' />
                <Table
                    columns={columns}
                    dataSource={data}
                />
                <h1>赛事名称：{this.props.match.name}</h1>
                <h1>赛事ID：{this.props.match.id}</h1>
                <h1>轮次ID：{this.props.thisOneRound[0]}</h1>
                {/* <h1>轮次ID：{this.props.courseId[0]}</h1> */}
                <h1>队伍ID：{this.props.team[0]}</h1>

            </div>
        );
    }
}