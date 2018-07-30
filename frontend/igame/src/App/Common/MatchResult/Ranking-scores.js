import React from 'react';
import { NavBar, WhiteSpace } from 'antd-mobile';
import { Icon, Table } from 'antd';
import Game from '../../OdooRpc/Game';
import './RankingScores.css'


export default class RankingByScores extends React.Component {
    state = ({
        data: [],
        filteredInfo: null,
        sortedInfo: null,
    })
     columns = [
        { title: '队号', width: 60, dataIndex: 'team_number', fixed: 'left' },
        { title: '队名', dataIndex: 'name', key: 'age', width: 60 },
        { title: '总分', dataIndex: 'score', key: '1', width: 60 },
        { title: '罚分', dataIndex: 'Penalty', key: '4', width: 60 },
        { title: '带分', dataIndex: 'band_score', key: '5', width: 60 },
        { title: '获胜轮数', dataIndex: 'win_round', key: '6', width: 60 },
        { title: '对手平均分', dataIndex: 'average_score_opp', key: '7', width: 60 },
        { title: 'IMP.Q', dataIndex: 'IMP.Q', key: '8' , width: 60 },
        { title: '排名', dataIndex: 'rank', key: '8', width: 60, fixed: 'right' }
    ];
    handleChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        this.setState({
          filteredInfo: filters,
          sortedInfo: sorter,
        });
      }
    
      clearFilters = () => {
        this.setState({ filteredInfo: null });
      }
    
      clearAll = () => {
        this.setState({
          filteredInfo: null,
          sortedInfo: null,
        });
      }
    
      setAgeSort = () => {
        this.setState({
          sortedInfo: {
            order: 'descend',
            columnKey: 'age',
          },
        });
      }
    componentWillMount() {
        //***********接口方法调用**************
        const m = new Game((data) => this.setState({ data: data }), () => console.log('没有拿数据'));
        m.search_game_score(this.props.match.id)
    }
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        const columns = [{
             title: '队号',
              width: 60,
               dataIndex: 'team_number',
                fixed: 'left',
                sorter: (a, b) => a.age - b.age,
                sortOrder: sortedInfo.columnKey === 'age' && sortedInfo.order,
             },{ title: '队名', dataIndex: 'name', key: 'age', width: 60 },
            { title: '总分', dataIndex: 'score', key: '1', width: 60 },
            { title: '罚分', dataIndex: 'Penalty', key: '4', width: 60 },
            { title: '带分', dataIndex: 'band_score', key: '5', width: 60 },
            { title: '获胜轮数', dataIndex: 'win_round', key: '6', width: 60 },
            { title: '对手平均分', dataIndex: 'average_score_opp', key: '7', width: 60 },
            { title: 'IMP.Q', dataIndex: 'IMP.Q', key: '8' , width: 60 },
            { title: '排名', dataIndex: 'rank', key: '8', width: 60, fixed: 'right' }
        ];
        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.showPage('OneCourseResult')}    //到一轮结果
                >{this.props.match.name}成绩表(按成绩)
                {/* >{this.props.courseId[1]}成绩表(按成绩) */}
                </NavBar>
                <Table
                    className='scoresTabls'
                    columns={columns}
                    dataSource={this.state.data}
                    scroll={{ x: 562 }}
                    pagination={false}
                    size="small"
                    bordered={true}

                />
                <WhiteSpace size='xl' />
                <h1>赛事名称：{this.props.match.name}</h1>
                <h1>赛事ID：{this.props.match.id}</h1>
                <h1>轮次ID111：{this.props.thisOneRound[0]}</h1>
                {/* <h1>轮次ID：{this.props.courseId[0]}</h1> */}

            </div>
        );
    }
}

