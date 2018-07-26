import React from 'react';
import { NavBar, WhiteSpace } from 'antd-mobile';
import { Icon } from 'antd';
import './OneTable.css';
import Game from '../../OdooRpc/Game';
import TotalTable from './OneTable/TotalTable';
export default class OneTable extends React.Component {
    state = ({
        data: null
    })
    componentWillMount() {
        //***********接口方法调用**************
        const m = new Game((data) => this.setState({ data: data }), () => console.log('没有拿到本轮排名数据'));
        m.table_result(this.props.match.id, this.props.thisOneRound[0], this.props.tableNumber[1], this.props.tableNumber[0])
        // gameId, roundId, match_id, number
    }
    render() {
        let data = [];
        if (this.state.data) {
          data =this.state.data
        }

        return (
            <div>
                <NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => this.props.showPage('OneCourseResult')}    //到一轮结果
                >第{this.props.tableNumber}桌
                </NavBar>
                <div className="teamName">
                    <p>法尔胜 VS 育贤海外队</p>
                </div>
                <div className="openhouse">开室</div>
                <div className="open">
                    <div className="openbox">
                        <div className="north">卢然 002216</div>
                        <div className="middle">
                            <div className="western"> 王建 002345 </div>
                            <div className="table">
                                <div className="tablebox">
                                    <div className="nor">N</div>
                                    <div className="wes">W</div>
                                    <div className="ease">E</div>
                                    <div className="sou">S</div>
                                </div>
                            </div>
                            <div className="east">王岩 010923</div>
                        </div>
                        <div className="south">刘彦 010918</div>
                    </div>
                </div>
                {/*与上面的内容样式相同 重复使用className*/}
                <div className="openhouse">闭室</div>
                <div className="open">
                    <div className="openbox">
                        <div className="north">刘妹 010920</div>
                        <div className="middle">
                            <div className="western">懂永灵 002223</div>
                            <div className="table">
                                <div className="tablebox">
                                    <div className="nor">N</div>
                                    <div className="wes">W</div>
                                    <div className="ease">E</div>
                                    <div className="sou">S</div>
                                </div>
                            </div>
                            <div className="east">古玲 010839</div>
                        </div>
                        <div className="south">周利华 011410</div>
                    </div>
                </div>
                <TotalTable data={data} />
                <WhiteSpace size='xl' />
                <h1>赛事名称：{this.props.match.name}</h1>
                <h1>赛事ID：{this.props.match.id}</h1>
                {/* <h1>轮次ID：{this.props.courseId[0]}</h1> */}
                <h1>轮次ID111：{this.props.thisOneRound[0]}</h1>
                <h1>number：{this.props.tableNumber[0]}</h1>
                <h1>match_id：{this.props.tableNumber[1]}</h1>

            </div>
        );
    }
}