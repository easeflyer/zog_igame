import React from 'react';
import { NavBar, WhiteSpace, Toast } from 'antd-mobile';
import { Icon } from 'antd';
import GradeDatumTable from './DatumTable/GradeDatumTable';
import Game from '../../OdooRpc/Game';
export default class Datum extends React.Component {
    state = ({
        // data: []
        tableNum: null,
        host: null,
        guest: null,
        gradeArr: null,
        directionArr: null,
    })
    componentWillMount() {
        //***********接口方法调用**************
        console.log(1111111111111111111111111)
        console.log(this.props.thisOneRound)
        console.log('this.props.match_ids')
        console.log(this.props.match_ids)
        console.log('[this.props.match_ids[1]]')
        console.log(this.props.match_ids[1])
        const m = new Game((data) => this.success(data), () => console.log('没有拿数据'));
        m.search_round_table_score(this.props.match.id, this.props.thisOneRound[0], this.props.match_ids[0])
    }

    gerUpDatas = (index) => {
        //升序排序
        let tableNum = 1;
        const match_ids = index.sort();
        if (this.state.tableNum) {
            tableNum = this.state.tableNum;
        }
        let tablleArr = []
        //整合桌号和match_id
        match_ids.map((child, index) => {
            tablleArr[index] = { tableNum: tableNum, match_ids: child }
            tableNum + 1
        })
        if (tableNum >= 0) {
            this.setState({
                tableNum: tableNum - 1
            })
        } else {
            return Toast.info('已经是最后一轮了！')
        }

    }
    gerDownDatas = (index) => {
        //升序排序
        const match_ids = index.sort();
        let tableNum = 1;
        if (this.state.tableNum.table_num) {
            tableNum = this.state.tableNum.table_num;
        }
        let tablleArr = []
        //整合桌号和match_id
        match_ids.map((child, index) => {
            tablleArr[index] = { tableNum: tableNum, match_ids: child }
            tableNum + 1
        })
        if (tableNum <= match_ids.length) {
            this.setState({
                tableNum: tableNum + 1
            })
        } else {
            return Toast.info('已经是第一轮了！')
        }
    }
    success = (data) => {
        let tableNum = ''; //桌号
        let host = '';    //主场
        let guest = '';   //客场
        let gradeArr = []; //成绩数组
        let directionArr = []; //人员方位
        if (data) {
            data.map((child, index) => {
                switch (index) {
                    case 0:
                        tableNum = child[0].table_num;
                    case 1:
                        host = child[1].host;
                    case 2:
                        guest = child[2].guest;
                    case 3:
                        gradeArr = child[3];
                    case 4:
                        directionArr = child[4];
                    default:
                        break;
                }
            })
        }
        this.setState({
            tableNum: tableNum,
            host: host,
            guest: guest,
            gradeArr: gradeArr,
            directionArr: directionArr
        })
    }

    render() {
        let table_num = 1;
        if (this.state.tableNum) {
            table_num = this.state.tableNum
        }
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.showPage('OneCourseResult')}    //到一轮结果
                >排位赛第{table_num}桌
                <div style={{ width: 35 }} >
                        <Icon type="caret-up" style={{ fontSize: 5, display: 'block' }} onClick={() => this.gerUpDatas(this.props.match_ids[1])} />
                        <Icon type="caret-down" style={{ fontSize: 5, display: 'block' }} onClick={() => this.gerDownDatas(this.state.match_ids[0])} />
                    </div>
                </NavBar>
                <GradeDatumTable
                    gradeArr={this.state.gradeArr}
                    directionArr={this.state.directionArr}
                    host={this.state.host}
                    guest={this.state.guest}
                />
                <WhiteSpace size='xl' />
                <h1>赛事名称：{this.props.match.name}</h1>
                <h1>赛事ID：{this.props.match.id}</h1>
                {/* <h1>轮次ID：{this.props.courseId[0]}</h1> */}
                <h1>轮次ID：{this.props.thisOneRound[0]}</h1>

            </div>
        );
    }
}