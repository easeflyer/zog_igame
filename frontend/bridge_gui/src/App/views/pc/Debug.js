/**
 * todo： 仔细考虑下 TableModel 的设计。静态属性的问题。
 * import { TableModel } from '../models/Table';
 * import TableModels from '../models/Table';
 * 如何打开 debug 步骤

1 game.js   debug=true
2 newProcess.js  //注释掉 debug = true  start  - end
3 table.js  openDebug = ()   return false;  打开注释
 
* 
 * 
 */

import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import Models from '../../models/model'
import { TableModel } from '../../stores/tableStore';
import Card,{ACT0,ACT1,ACT2,ACT3} from '../../components/Card';
import Clock from '../../libs/Clock';
import Position from '../../common/Position';
//import { tokensToRegExp } from 'path-to-regexp';
import {restoreData,callData1,callData2} from '../../stores/mockdata';

/**
 * props.o  
 * 就是 调用 Debug 组件的父组件 Table
 * 我们为了测试 Table 把 Table 传递进来，然后进行测试。
 * 
 * 注意在 render 定义方法，可能造成重复定义的问题。以为是测试用例，暂且这样
 */
export default class Debug extends Component {
    render() {
        const o = this.props.o;  // o 是 table.js

        /**
         * 从上级组件 传递古来 Table 实例。
         * 然后给 Table 实例添加了一些测试用例。
         * 如果不添加本 测试代码。这些方法就不会加载给 Table
         */
        // =====  测试用例开始 =================================================
        /**
         * TODO：把这个组件移出去。单独测试。
         * 给某一个座位倒计时
         * 为了降低组件的耦合性。将本组件动态挂载到 DOM 上。
         * 利用 unmountComponentAtNode 进行卸载。
         * p, offset 都是闹钟出现位置的微调。
         * 
         * seat [east,west,south,north]
         * time 倒计时妙数
         * callback 倒计时结束回调。
         */
        o.timing11 = function (seat, time, callback) {
            const height = this.props.tableStore.height;
            ReactDOM.unmountComponentAtNode(document.querySelector('#clock'));
            const p = height * 0.18;
            const offset = {
                E: { x: p, y: 0 },
                S: { x: 0, y: p },
                W: { x: -p * 0.66, y: 0 },
                N: { x: 0, y: -p * 0.66 }
            }

            const top = this.props.tableStore.seat[seat][1]['y'] + offset[seat].y;
            const left = this.props.tableStore.seat[seat][1]['x'] + offset[seat].x;
            const style = {
                position: 'absolute',
                top: top,
                left: left,
                width: '8%'
            }
            const clock = (
                <div style={style}>
                    <Clock time={time} callback={callback} />
                </div>
            );
            ReactDOM.render(
                clock,
                document.querySelector('#clock')
            )
        }
        o.timing = function (seat, time, callback) {
            const unseat = new Position(seat).lshift(1).sn;
            ReactDOM.unmountComponentAtNode(document.querySelector('.'+unseat+'clock'));
            ReactDOM.un
            ReactDOM.render(
                <Clock time={time} callback={callback} />,
                document.querySelector('.'+seat+'clock')
            )
        }
        o.testClock = function () {
            this.timing('E', 10,
                () => this.timing('S', 10,
                    () => this.timing('W', 10,
                        () => this.timing('N', 10,
                            () => console.log('倒计时结束！')
                        )
                    )
                )
            )
        }
        /**
         * 测试出牌
         * 简单测试，已无实际用途。
         */
        o.test1 = function () {
            const cards = this.state.cards;
            cards[0][0].animation = {
                top: 200,
                left: 200,
            }
            this.setState({
                cards: cards
            })
        }
        /**
         * 设置牌的 active 状态。
         * 把编号 在nums里 的牌设置成 active 状态
         * nums 是一个数组
         * active 是目标状态。*      
         * active     0,1,2,3  0 灰色不能点，1 亮色不能点，2 亮色能点, 3 亮色能点突出
         */
        o.testActive = function () {
            // 52 张牌 对应 东南西北 四个人的牌
            const nums = [
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
                13, 14, 15, 16, //17, 18, 19, 20, 21, 22, 23, 24, 25,
                26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
                39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]
            this.props.tableStore.setActive(nums, 0);

        }
        o.showTableId = () => {
            alert(o.props.tableStore.tableId);
        }
        o.test3 = function () {
            this.clearBoard();
        }
        /**
         * 打开明手的牌。
         * 从 Models 获得数据。
         * 修改 seat 方位可以打开不同方位的牌。
         */
        o.testDummy = function (){
            o.openDummy();
        }
        o.testDummy1 = function (seat1) {
            const seat = seat1;
            let index = 0
            const dCards = Models.openDummy().cards.split('.');
            let cards = o.props.tableStore.state.cards[TableModel.seats.indexOf(seat)];
            console.log('seatnumber:',dCards);
            dCards.forEach((item1, index1) => {
                item1.split('').forEach((item2, index2) => {
                    // 这里。
                    cards[index].card = item2 + Card.suits[index1]
                    cards[index].onclick = o.play(cards[index]);
                    index++;
                })
            })
            //this.state.cards[Table.seatsen.indexOf(seat)] = cards;
            // this.setState({
            //     cards: o.props.tableStore.state.cards
            // })
            //this.props.tableStore.state.cards = 
            console.log('openDummy..............')
            console.log(o.props.tableStore.state.cards)

        }
        /**
     * 测试上以墩牌的显示
     */
        o.testLastTrick = function () {
            this.lastTrick(false);
            // if(this._showLastTrick) this._showLastTrick = false;
            // else this._showLastTrick = true;
            // this.lastTrick(this._showLastTrick);
        }
        /**
       * 叫牌测试
       */
        o.testBid1 = function(){
            o.props.tableStore.state.calldata = callData1;
        }
        o.testBid2 = function(){
            o.props.tableStore.state.calldata = callData2;
        }

        // 准备废弃
        // o.testBid2 = function () {
        //     const bids = [{ seat: 'W', bid: 'A1C' }, { seat: 'N', bid: 'PASS' },
        //     { seat: 'E', bid: 'PASS' }, { seat: 'S', bid: '2H' },
        //     { seat: 'W', bid: 'PASS' }, { seat: 'N', bid: 'PASS' },
        //     { seat: 'E', bid: 'A3C' }, { seat: 'S', bid: 'PASS' },
        //     { seat: 'W', bid: 'PASS' }, { seat: 'N', bid: '3H' },
        //     { seat: 'E', bid: 'PASS' }, { seat: 'S', bid: 'PASS' },
        //     { seat: 'W', bid: 'A3S' }, { seat: 'N', bid: 'PASS' },
        //     { seat: 'E', bid: 'PASS' }, { seat: 'S', bid: 'PASS' }]

        //     const bids1 = [{ seat: 'west', bid: 'A1C' }, { seat: 'north', bid: 'PASS' },
        //     { seat: 'east', bid: 'PASS' }, { seat: 'south', bid: '2H' },
        //     { seat: 'west', bid: 'PASS' }, { seat: 'north', bid: 'PASS' },
        //     { seat: 'east', bid: 'A3C' }, { seat: 'south', bid: 'PASS' },
        //     { seat: 'west', bid: 'PASS' }, { seat: 'north', bid: '3H' },
        //     { seat: 'east', bid: 'PASS' }, { seat: 'south', bid: 'PASS' },
        //     { seat: 'west', bid: 'A3S' }, { seat: 'north', bid: 'PASS' },
        //     { seat: 'east', bid: 'PASS' }, { seat: 'south', bid: 'PASS' }]            
        //     bids.forEach((item) => {
        //         o.props.tableStore.call(item.seat, item.bid)
        //     })
        //     console.log('calldata111....')
        //     //console.log(this.state.calldata)
        //     o.setState({
        //         calldata: o.props.tableStore.state.calldata
        //     })
        // }

        o.testUsersReady = function () {
            const login = (seat, uname) => {
                this.state.user[seat].name = uname;
                this.setState({ user: this.state.user })
            }
            setTimeout(login.bind(this, 'east', '张三丰'), 1000)
            setTimeout(login.bind(this, 'south', '李四'), 2000)
            setTimeout(login.bind(this, 'west', '王五'), 3000)
            setTimeout(login.bind(this, 'north', '赵六'), 4000)
        }

        o.testChat = function () {
            const elMsg = document.querySelector('#message')
            const elSay = document.querySelector('#say')
            elMsg.innerHTML =
                "<div>" + o.props.tableStore.myseat + ':' + elSay.value + "</div>" + elMsg.innerHTML
        }

        // 给所有牌添加可点击，可以测试出牌
        o.addClick = function () {
            // 南 方块 可点击。
            const tableStore = o.props.tableStore;
            //let cards = tableStore.selectCards([0,1,2,3], 'SHDC');
            let cards = tableStore.selectCardsByAct([ACT1.L]);
            tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
        }

        // 部分牌可点击
        o.addClick1 = function () {
            // 南 方块 可点击。
            const tableStore = o.props.tableStore;
            let cards = tableStore.selectCards("S", 'D');console.log(cards)
            tableStore.setCardsState(cards, { active: ACT1.LC, onclick: tableStore.play });
            // 其他牌都不可点击
            cards = tableStore.selectCards("NEW", 'SHDC');
            tableStore.setCardsState(cards, {active: ACT1.L, onclick: tableStore.play});
            cards = tableStore.selectCards("S", 'SHC');
            tableStore.setCardsState(cards, {active: ACT1.D, onclick: tableStore.play,});
            //o.props.tableStore.addClick2Cards(cards, 0);
        }


        // 测试 出牌的位置。左上角坐标。用于参考。
        o.testSeat = function () {
            const top = o.props.tableStore.seat['south'][1]['y'];
            const left = o.props.tableStore.seat['south'][1]['x'];

            const style = {
                position: 'absolute',
                border: '1px solid red',
                width: '5px',
                top: top,
                left: left,
                height: '5px'
            };
            const dv1 = <div id="testDiv" style={style}></div>;
            const testDiv = document.querySelector('#testDiv');
            if (testDiv) ReactDOM.unmountComponentAtNode(document.querySelector('#clock'));
            else ReactDOM.render(dv1, document.querySelector('#clock'))

        }
        // 
        // o.restore1 = function (){
        //     // const deals = 'K34.J3.Q742.K832 XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX';
        //     const cards = o.props.tableStore.dealCards();
        //     const userCards = [
        //         ['SK','S3','S4','HJ','H3','DQ','D4','D2','CK','C8','C3'],
        //         ['SX','SX','SX','HX','HX','HX','DX','DX','DX','CX','CX','CX'],
        //         ['SQ','SJ','S9','S8','HA','H5','DJ','D8','D3','CT','C4'],
        //         ['SX','SX','SX','SX','SX','HX','HX','HX','HX','DX','CX'],
        //     ];
        //     // 出牌顺序同下标顺序,(业务方位？)
        //     const board = [
        //         [{seat:'S',card:'D5'},{seat:'W',card:'D6'},{seat:'N',card:'D7'}],
        //         [{seat:'W',card:'C6'},{seat:'N',card:'C2'},{seat:'E',card:'C7'},{seat:'S',card:'CQ'}],
        //     ];
        //     o.props.tableStore.restore_2(userCards,board);

        // }
        /**
         * scene: 0 准备阶段，1 叫牌阶段，2 打牌阶段，3 摊牌阶段
         * restoreData 模拟数据
         */
        o.restore = function(){
            const data = restoreData;
            //data.scene = 3;
            //o.props.tableStore['restore'+data.scene](data);
            o.props.tableStore.restore(data);
            window.___board = o.props.tableStore.board;

        }


        o.dplay = function(){
            o.props.tableStore.dplay('E','S2');
        }

        o.wLogin = function(){
            o.props.tableStore.userLogin('S',{ ready: 0, name: '王五', face: '/imgs/face1.png', rank: '王者', seat: 'S' });
            o.props.tableStore.userLogin('W',{ ready: 0, name: '王五', face: '/imgs/face1.png', rank: '王者', seat: 'W' });
        }
        o.initcards = function(){
            //const deals = "K34.J3.Q742.K832 XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX";
            const deals = "...XXXXXXXXXXXXX 43.5..XXXXXXXXXX 7...AXXXXXXXXXXX ...XXXXXXXXXXXXX"
            o.props.tableStore.initCards(deals);

            //setTimeout(o.dplay,5000);
        }
        
        // =====  测试用例结束 =================================================

        return (
            <div className='debug' style={{ position: 'absolute',bottom:'0px' }}>
                <button onClick={o.testUsersReady}>登录</button>&nbsp;
                <button onClick={o.wLogin}>西玩家登录</button>&nbsp;
                <button onClick={o.initcards}>准备牌</button>&nbsp;
                <button onClick={o.deal}>发牌</button>&nbsp;
                <button onClick={o.testSeat}>出牌位置显示</button>&nbsp;
                <button onClick={o.test1.bind(o)}>出牌</button>&nbsp;
                <button onClick={o.addClick1}>阻止出牌</button>&nbsp;
                <button onClick={o.test3.bind(o)}>清理桌面</button>&nbsp;
                <br />
                <button onClick={o.testDummy.bind(o, 'east')}>明手东</button>&nbsp;
                <button onClick={o.testDummy.bind(o, 'west')}>明手西</button>&nbsp;
                <button onClick={o.testDummy.bind(o, 'north')}>明手北</button>&nbsp;
                <button onClick={o.timer.start.bind(o,'ew')}>东西计时</button>&nbsp;
                <button onClick={o.timer.start.bind(o,'sn')}>南北计时</button>&nbsp;
                <br />
                <button onClick={o.bid.bind(o)}>显示叫牌</button>&nbsp;
                <button onClick={o.testBid1.bind()}>叫牌</button>&nbsp;
                <button onClick={o.testBid2.bind()}>叫牌1</button>&nbsp;
                <button onClick={o.testClock.bind(o)}>倒计时</button>&nbsp;
                <button onClick={o.testLastTrick.bind(o)}>上一墩牌</button>&nbsp;
                <br />
                <button onClick={o.restore}>断线重连</button>&nbsp;
                <button onClick={o.addClick}>牌可点击</button>&nbsp;
                <button onClick={o.showResult}>显示结果</button>&nbsp;
                <button onClick={o.showTableId}>显示桌号</button>&nbsp;
                <button onClick={o.dplay}>东出牌</button>&nbsp;
                <button onClick={o.initCards}>初始化</button>&nbsp;

            </div>
        )
    }
}