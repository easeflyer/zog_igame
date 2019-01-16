/**
 * Game  是一局比赛，涉及到了比赛者，以及和比赛相关的其他信息。重点在于比赛。
 * Table 是一桌游戏的界面：重点在于 一桌
 * 
 * <TableView table={this} />
 *  把控制器直接给到 view 也就是说控制器的事件处理和 state 都给到了view
 *  event 和 state 就是  view 的输入数据。
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Sound from './Sound';
import TableView from '../views/pc/TableView'; // 包含 TableView.css
import ResultPanel from '../views/pc/ResultPanel';
import { inject, observer } from 'mobx-react';
import { TableModel } from '../stores/tableStore';
import { ACT0, ACT1, ACT2, ACT3 } from '../components/Card';
import Position from '../common/Position';
/**
 * Table 一桌游戏
 *      1 是牌桌的容器组件，或者说是控制器组件(MVC)
 *      2 state       ：数据由 模型计算提供。
 *      3 事件        ：处理函数,主要是触发 setState。
 *      4 通过 context api 把 state 保存起来（暂时没用到）
 *      5 调用 tableview 显示界面。
 * this.TableModel 是模型组件。
 *      所有数据计算，尤其是 state 的计算，都在这里进行。控制器调用。
 */
@inject('tableStore')
@observer
class Table extends Component {
    /**
     * 重构参考： 打牌的几个阶段，应该在规则里面，调入进来。
     * 属性列表：
     *  scene: 1 叫牌，2 打牌 3 claim 4 展示比分
     *  deals: 牌，除了自己的牌，其他人的牌应该不显示
     *  seat：ESWN 自己做在那个方位。
     *  csize: 牌的大小 手机 80像素比较合适。
     *  board：桌面上打出来的四张牌。用于清理桌面。
     * 
     * 其他：
     * 
     *  字体大小：fontSize:this.height * 0.04 + 'px'
     */
    constructor(props) {
        super(props);
        this.ref = {};
        //TableModel.seats.forEach(key => this.ref[key] = React.createRef())
        Position.SNames.split("").forEach(key => this.ref[key] = React.createRef());
        this.ref.board = React.createRef();
        this.timer = { stop: null, start: null }; // 用于控制 倒计时
    }

    /**
     * 完成挂载后，要计算 各个位置的坐标。
     * _initSeat 初始化 发牌位置 出牌位置等坐标
     */
    componentDidMount() {
        this._initSeat(); //
    }


    /**
    * 根据dom 定位 初始化 发牌位置 出牌位置 坐标
    * const center 为桌子中心
    * const seats  为四个发牌区域div 左上角坐标
    * 
    * 注意 控制器（本代码）里包含和 dom 打交道的代码。Model 里尽可能都是纯函数
    * 计算结果保存在 TableModel.seat 里面，包含发牌位置，和出牌位置
    * 把两个 dom 定位（xy） 发给模型用于计算。Model 中应该尽可能是纯函数
    * 计算结果保存到 TableModel.seat 里面，包含发牌位置，和出牌位置
    * TableModel.initSeat(center, seats)
    */
    _initSeat() {
        const center = {
            x: this.ref.board.current.offsetTop +
                this.ref.board.current.clientHeight / 2,
            y: this.ref.board.current.offsetLeft +
                this.ref.board.current.clientWidth / 2
        };
        const seats = {
            'E': { x: 0, y: 0 }, 'S': { x: 0, y: 0 },
            'W': { x: 0, y: 0 }, 'N': { x: 0, y: 0 },
        }
        for (let key in seats) {
            seats[key]['y'] = this.ref[key].current.offsetTop;
            seats[key]['x'] = this.ref[key].current.offsetLeft;
        }

        this.props.tableStore.initSeat(center, seats)
    }
    /**
     * 
     * 清理 出牌区域（4张牌）
     * 调用：
     * 输入：
     * 输出：
     */
    clearBoard = () => {
        this.props.tableStore.clearBoard();
        Sound.play('clear');
    }

    /**
     * 打出一张牌 TODO: 最值得优化的一个函数。
     * @param {index} 52张牌的编号0 - 51
     */
    play = (index) => {
        const _play = function () {
            const card = this.props.tableStore.getCardByIndex(index);
            if (card.active == ACT1.LC) {
                this.props.tableStore.preplay(card);
            } else if (card.active == ACT1.LCO) {
                this.props.tableStore.play(card);
                Sound.play('play');
                if (this.props.tableStore.board.length == 4) setTimeout(this.clearBoard, 1000)
            } else return;
        }
        return _play.bind(this);
    }

    /**
     * 触发 claim
     * 考虑增加参数为 seat
     */
    claim = () => {
        //this.props.tableStore.claim('E',3);
        this.props.tableStore.claim('S', '东（E）玩家摊牌，定约：3NT + 3');
        // Sound.play('claim');
    }

    /**
     * seat 界面方位。
     */
    openDummy = () => {
        const seat = "E";
        const cards = ['SQ', 'SJ', 'S9', 'S8', 'HA', 'H5', 'DJ', 'D8', 'D3', 'CT', 'C4', 'CT', 'C4'];
        this.props.tableStore.openDummy(seat, cards);
    }
    /**
     * 预留发送 数据接口
     */
    handleClaim = () => {
        console.log('发送　claim 请求。');
        console.log('接收到，同意设置　scene=4,不同意，设置为２');
    }
    /**
     * 用户准备
     * 
     * 接受一个用户编号。考虑修改为座位
     * 
     * 输入：0-3 代表 四个位置
     * 输出：
     *      this.state.user[seat].ready = 1; 某个用户准备好
     *      this.state.scene = 1; 场景切换
     *      this.deal() 发牌
     *      setState 触发渲染
     */
    handleReady = (se) => {
        //this.TableModel.userReady(se);
        this.props.tableStore.userReady(se);
        if (this.props.tableStore.userAllReady()) {
            this.props.tableStore.state.scene = 1;
            this.deal();
        }
    }
    /**
     * 发牌
     * 调用：
     * 输出：TableModel.dealCards() 返回 cards 的位置和出牌绑定
     */
    deal = () => {
        this.props.tableStore.initCards(this.props.tableStore.deals)
        setTimeout(this.props.tableStore.dealCards,10);
        Sound.play('deal')
    }

    showResult = () => {
        const result = document.querySelector('.result');
        if (!result)
            ReactDOM.render(<ResultPanel />, document.querySelector('#result'))
    }

    /**
     * 显示上一墩牌
     * 桌面上始终52张牌，因此要显示上一墩牌，需要调整某些牌的位置。
     * cards: this.TableModel.lastTrick(show),
     */
    lastTrick = () => {
        //this.props.tableStore.showLastTrick();
        this.props.tableStore.toggleLastTrick();
    }
    /**
     * 视频接口
     * @param {*} channel  频道名
     */
    _initVideo(channel) {
        // eslint-disable-next-line
        var api = streamApi();
    }
    /**
     * 是否调试模式
     * {table.state.debug ? <Debug o={table} /> : null}
     */
    openDebug = () => {
        const debug = this.props.tableStore.state.debug;
        this.props.tableStore.state.debug = !debug;
    }
    /**
     * 显示叫牌
     * 根据 场景 scene 决定是否显示叫牌。
     */
    bid = () => {
        this.props.tableStore.toggleBid();
    }

    /**
     * 重新链接 复盘
     */
    recovery = () => {
        this.props.tableStore.recovery();
    }
    reConnect = () => {
        this.props.tableStore.reConnect()
    }

    render() {
        return (
            <TableView table={this} />
        );
    }
}

// Table.seats = ['E', 'S', 'W', 'N'];
// Table.seatsen = ['east', 'south', 'west', 'north'];
// Table.seatscn = ['东', '南', '西', '北'];


export default Table;