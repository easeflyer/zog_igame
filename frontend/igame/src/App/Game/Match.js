import React from 'react'
import { Row, Col, Table, Input } from 'antd';
import Session from '../User/session'

import Board from '../OdooRpc/Board'
import Channel from '../OdooRpc/Channel'
import Models from '../OdooRpc/OdooRpc'

const columns = [
    { title: 'N', dataIndex: 'N', key: 'N' },
    { title: 'E', dataIndex: 'E', key: 'E' },
    { title: 'S', dataIndex: 'S', key: 'S' },
    { title: 'W', dataIndex: 'W', key: 'W' },];

const dbl = ['Pass', 'X', 'XX',]
const suit = [
    ['1♠', '2♠', '3♠', '4♠', '5♠', '6♠', '7♠'],
    ['1♥', '2♥', '3♥', '4♥', '5♥', '6♥', '7♥'],
    ['1♦', '2♦', '3♦', '4♦', '5♦', '6♦', '7♦'],
    ['1♣', '2♣', '3♣', '4♣', '5♣', '6♣', '7♣'],
    ['1NT', '2NT', '3NT', '4NT', '5NT', '6NT', '7NT']
]
const direct = ['N', 'E', 'S', 'W',]
const suitWord = ['S', 'H', 'D', 'C']

let count = 0
let pollingId = 1
let boardId = 5   //sucChannel 修改board_id，重新发牌
export default class PokerTable extends React.Component {
    state = {
        contract: null,//定约
        deal: false, //是否发牌
        call: false, //是否处于叫牌状态
        play: false,  //是否处于打牌状态
        channel_id: null,//频道ID
        board_id: null,  //board id
        border_id_num: null,
        cards: null,   //四个方位的牌
        dataSource: [{  //叫牌表格
            key: count,
            N: '',
            E: '',
            S: '',
            W: '',
        }],
        pass: [],
        declarer: null, //庄家方位 
        dummy: null,  //明手方位
        myDirect: null, //我所在方位
        myName: null,
        topDirect: null, //对家
        topName: null, //对家
        rightDirect: null, //右侧
        rightName: null, //右侧
        leftDirect: null, //左侧
        leftName: null, //左侧
        myCardsNum: null,//我的牌，全数字
        dummyCardsNum: null,//我的牌，全数字
        callDirect: null, //当前应该哪个方位叫牌  ** 
        openLeader: null, //首攻  
        currentDirect: null, //当前应该哪个方位打牌 
        currentCardB: null, // 我，当前出的牌 
        currentCardT: null, // 我的对家，当前出的牌 
        currentCardL: null, // 左侧，当前出的牌 
        currentCardR: null, // 右侧，当前出的牌 
        piersCount: 0, // 墩，计数  ** 
        allPiers: [],  // 所有墩  ** 
        currentPiers: [], // 当前墩 
        scoreSN: 0,  //SN方位得分  ** 
        scoreEW: 0,  //EW方位得分  ** 
        piersSN: 0,  //  ** 
        piersEW: 0,   //  ** 
        claimCount: 0,
    }

    componentDidMount() {
        // 建立连接
        this.polling()
        //加入当前比赛的频道
        const JoinChannel = new Channel(this.sucChannel, this.failChannel);
        JoinChannel.join_channel(1);   // 6 : table_id
    }
    polling() {
        const Poll = new Models(this.sucPolling, this.failPolling);
        Poll.poll(pollingId);
    }

    sucChannel = (data) => {   //加入比赛聊天频道成功
        //[42,[44, 40, 41, 38, 43, 39, 45, 42]] [channel_id,[board_id1,board_id2,board_id3...]]
        this.setState({
            channel_id: data[0],
            board_id_num: data[1].length,
            board_id: data[1][0],
            // board_id:data[1][boardId],
        })
        this.post('init', this.state.board_id, this.state.channel_id)   //初始化牌桌
    }
    failChannel = () => { /*加入比赛聊天频道失败 */ }

    post(m, ...data) {
        const board = new Board(this.sucPost, this.failPost);
        m === 'init' ? board.init_board(...data) : null;   //初始化牌桌
        m === 'call' ? board.bid(...data) : null;    //发送叫牌消息
        m === 'call_result' ? board.call_result(...data) : null;    //查询叫牌结果
        m === 'play' ? board.play(...data) : null;       //发送打牌消息
    }
    sucPost = (data) => {
        console.log(data)
        if (!this.state.deal && data.cards && data.players) {   //初始化牌桌
            //{cards: "942.AQT4.AT7.T32 J85.K85.9865.AQ4 AQT.7632.KQ432.9 K763.J9.J.KJ8765", players: Array(4), dealer: "S", vulnerable: "BO"}
            let i = null, s = null;
            data.players.map((item, index) => { if (item[0] === Session.get_name()) { i = index } })
            direct.map((item, index) => { if (data.players[i][1] === item) { s = index } })
            this.setState({
                cards: data.cards.split(' '),
                deal: true,
                call: true,
                play: false,
                myCardsNum: this.arrange_my_cards(data.cards.split(' ')[s]),
                myDirect: data.players[i][1],
                myName: data.players[i][0],
                callDirect: data.dealer,
                topDirect: direct[direct.indexOf(data.players[i][1]) + 2] || direct[direct.indexOf(data.players[i][1]) - 2],
                rightDirect: direct[direct.indexOf(data.players[i][1]) - 1] || direct[direct.indexOf(data.players[i][1]) + 3],
                leftDirect: direct[direct.indexOf(data.players[i][1]) + 1] || direct[direct.indexOf(data.players[i][1]) - 3],
                topName: data.players.filter(item => {
                    return item[1] === direct[direct.indexOf(data.players[i][1]) + 2] || item[1] === direct[direct.indexOf(data.players[i][1]) - 2]
                })[0][0],
                rightName: data.players.filter(item => {
                    return item[1] === direct[direct.indexOf(data.players[i][1]) - 1] || item[1] === direct[direct.indexOf(data.players[i][1]) + 3]
                })[0][0],
                leftName: data.players.filter(item => {
                    return item[1] === direct[direct.indexOf(data.players[i][1]) + 1] || item[1] === direct[direct.indexOf(data.players[i][1]) - 3]
                })[0][0],
            })
        }
    }
    failPost = () => { /*console.log('打牌fail')*/ }

    sucPolling = (data) => {
        console.log(data)
        if (data.length) {
            pollingId = data.slice(-1)[0]['id'];
            let body = data[data.length - 1].message.body;    //"<p>{'board_id': 44, 'number': 1, 'name': u'1S', 'pos': u'S'}</p>"
            body = body.replace(/u'/g, "'").replace(/ /g, '')
            body = eval('(' + body.substring(3, body.length - 4) + ')')  //{board_id: 44, number: 1, name: '1S', pos: 'S'}

            if (body.board_id && body.name && body.pos && body.number) {  //收到叫牌消息   {board_id: 44, number: 1, name: '1S', pos: 'S'}
                this.setState({
                    callDirect: direct[direct.indexOf(body.pos) + 1] || direct[direct.indexOf(body.pos) - 3]
                })
                this.call_cards(body.pos, body.name)   //在页面展示叫牌信息
                this.state.pass.push(body.name)
                if (this.state.pass.length >= 3) {
                    let length = this.state.pass.length;
                    if (this.state.pass[length - 1] === 'Pass' && this.state.pass[length - 2] === 'Pass' && this.state.pass[length - 3] === 'Pass') {
                        this.post('call_result', this.state.board_id, this.state.channel_id); //查询叫牌结果
                    }
                }
            }
            if (body.dummy && body.openlead && body.declarer) {   //收到叫牌结果信息   {dummy:'N',openlead:'W',declarer:'S',nextplayer:'W',contract:'1S'}
                let m = direct.indexOf(body.dummy);
                this.setState({
                    call: false,
                    play: true,
                    openLeader: body.openlead,
                    currentDirect: body.openlead,
                    dummy: body.dummy,
                    declarer: body.declarer,
                    contract: body.contract,
                    dummyCardsNum: this.arrange_my_cards(this.state.cards[m]),
                })
            }
            if (body.number && body.rank && body.card) {   //收到打牌消息 {declarer_win:0,number:1,rank:'5',pos:'W',suit:'C',nextplayer:'W',card:'C5',opp_win:0}

                if (body.pos === this.state.myDirect) {
                    let j = suitWord.indexOf(body.card.split('')[0]);
                    this.state.myCardsNum.map((item, index) => {
                        if (index === j) {
                            item.splice(item.indexOf(body.card.split('')[1]), 1)
                        }
                    })
                }
                if (body.pos === this.state.dummy) {
                    let j = suitWord.indexOf(body.card.split('')[0]);
                    this.state.dummyCardsNum.map((item, index) => {
                        if (index === j) {
                            item.splice(item.indexOf(body.card.split('')[1]), 1)
                        }
                    })
                }
                body.pos === this.state.topDirect ? this.setState({ currentCardT: this.re_transfer(body.card, 0, 1, true) }) : null;
                body.pos === this.state.myDirect ? this.setState({ currentCardB: this.re_transfer(body.card, 0, 1, true) }) : null;
                body.pos === this.state.leftDirect ? this.setState({ currentCardL: this.re_transfer(body.card, 0, 1, true) }) : null;
                body.pos === this.state.rightDirect ? this.setState({ currentCardR: this.re_transfer(body.card, 0, 1, true) }) : null;
                this.state.currentPiers.push({ pos: body.pos, card: body.card })
                if (body.number % 4 === 0) {
                    setTimeout(() => {
                        this.setState({
                            currentCardT: null,
                            currentCardB: null,
                            currentCardL: null,
                            currentCardR: null,
                            currentPiers: [],
                            piersSN: body.ns_win,
                            piersEW: body.ew_win,
                        })
                    }, 2000)
                }
                this.setState({ currentDirect: body.nextplayer })
            }
        }
        this.polling();
    }
    failPolling = () => { console.log('fail') }

    //发送消息
    click = (e) => {
        let val = e.target.innerHTML;
        if (this.state.play) {//打牌时
            val = this.transfer(val, 2, false);
            this.post('play', this.state.board_id, this.state.myDirect, val, this.state.channel_id); //发送打牌信息
        }
        if (this.state.call) { //叫牌时
            val = this.transfer(val, 1, true);
            this.post('call', this.state.board_id, this.state.myDirect, val, this.state.channel_id);   //发送叫牌信息
        }
    }
    arrange_my_cards = (cards) => {   //整理牌的格式 
        let cardMy = [];
        cards.split('.').map(i => {
            cardMy.push(i.split(''));
        })
        return cardMy
    }
    call_cards = (direct, card) => {   //展示叫牌信息
        let calls = this.state.dataSource;
        if (direct === 'N') {
            if (!calls[count].N && !calls[count].E && !calls[count].S && !calls[count].W) { calls[count].N = this.re_transfer(card, 1, 0, false); } else { count++; calls.push({ key: count, N: '', E: '', S: '', W: '', }); calls[count].N = this.re_transfer(card, 1, 0, false); }
        }
        if (direct === 'E') {
            if (!calls[count].E && !calls[count].S && !calls[count].W) { calls[count].E = this.re_transfer(card, 1, 0, false); } else { count++; calls.push({ key: count, N: '', E: '', S: '', W: '', }); calls[count].E = this.re_transfer(card, 1, 0, false); }
        }
        if (direct === 'S') {
            if (!calls[count].S && !calls[count].W) { calls[count].S = this.re_transfer(card, 1, 0, false); } else { count++; calls.push({ key: count, N: '', E: '', S: '', W: '', }); calls[count].S = this.re_transfer(card, 1, 0, false); }
        }
        if (direct === 'W') {
            if (!calls[count].W) { calls[count].W = this.re_transfer(card, 1, 0, false); } else { count++; calls.push({ key: count, N: '', E: '', S: '', W: '', }); calls[count].W = this.re_transfer(card, 1, 0, false); }
        }
        this.setState({
            dataSource: calls
        });
    }

    // 处理发过来的牌：添加花色
    addColor = (cards) => {
        let addCards = [[], [], [], []], colorCards = [[], [], [], []];
        cards.map((item, index) => {
            if (index === 0 && item.length !== 0) {
                item.map(i => {
                    addCards[0].push(<span
                        key={index + i}
                        style={{ display: 'inline-block', height: 50, width: 25, border: '1px solid #ddd', textAlign: 'left', paddingLeft: 5 }}
                        onClick={this.state.play &&
                            ((this.state.currentDirect !== this.state.dummy && this.state.currentDirect === this.state.myDirect) ||
                                (this.state.currentDirect === this.state.dummy && this.state.declarer === this.state.myDirect))
                            ? this.click : null}
                    >
                        {i}{`\n`}{'♠'}
                    </span>)
                })
            }
            if (index === 1 && item.length !== 0) {
                item.map(i => {
                    addCards[1].push(<span
                        key={index + i}
                        style={{ display: 'inline-block', height: 50, width: 25, border: '1px solid #ddd', textAlign: 'left', paddingLeft: 5, color: 'red' }}
                        onClick={this.state.play &&
                            ((this.state.currentDirect !== this.state.dummy && this.state.currentDirect === this.state.myDirect) ||
                                (this.state.currentDirect === this.state.dummy && this.state.declarer === this.state.myDirect))
                            ? this.click : null}
                    >
                        {i}{`\n`}{'♥'}
                    </span>)
                })
            }
            if (index === 2 && item.length !== 0) {
                item.map(i => {
                    addCards[2].push(<span
                        key={index + i}
                        style={{ display: 'inline-block', height: 50, width: 25, border: '1px solid #ddd', textAlign: 'left', paddingLeft: 5, color: 'red' }}
                        onClick={this.state.play &&
                            ((this.state.currentDirect !== this.state.dummy && this.state.currentDirect === this.state.myDirect) ||
                                (this.state.currentDirect === this.state.dummy && this.state.declarer === this.state.myDirect))
                            ? this.click : null}
                    >
                        {i}{`\n`}{'♦'}
                    </span>)
                })
            }
            if (index === 3 && item.length !== 0) {
                item.map(i => {
                    addCards[3].push(<span
                        key={index + i}
                        style={{ display: 'inline-block', height: 50, width: 25, border: '1px solid #ddd', textAlign: 'left', paddingLeft: 5 }}
                        onClick={this.state.play &&
                            ((this.state.currentDirect !== this.state.dummy && this.state.currentDirect === this.state.myDirect) ||
                                (this.state.currentDirect === this.state.dummy && this.state.declarer === this.state.myDirect))
                            ? this.click : null}
                    >
                        {i}{`\n`}{'♣'}</span>)
                })
            }
        })
        return addCards //两种格式：5♥  5h 
    }

    // 要发送的消息整理成‘5H’或‘H5’的格式
    transfer = (val, num, y = true) => {
        if (y) {
            if (val.split('')[num] === "♠") { val = val.split('')[0] + 'S' }
            if (val.split('')[num] === "♥") { val = val.split('')[0] + 'H' }
            if (val.split('')[num] === "♦") { val = val.split('')[0] + 'D' }
            if (val.split('')[num] === "♣") { val = val.split('')[0] + 'C' }
        } else {
            if (val.split('')[num] === "♠") { val = 'S' + val.split('')[0] }
            if (val.split('')[num] === "♥") { val = 'H' + val.split('')[0] }
            if (val.split('')[num] === "♦") { val = 'D' + val.split('')[0] }
            if (val.split('')[num] === "♣") { val = 'C' + val.split('')[0] }
        }
        return val;
    }
    //要显示的消息整理成5♥的格式
    re_transfer = (val, num1, num2, y) => {
        let add = y ? `\n` : '';
        if (val.split('')[num1] === 'S') { val = val.split('')[num2] + add + '♠' }
        if (val.split('')[num1] === 'H') { val = val.split('')[num2] + add + '♥' }
        if (val.split('')[num1] === 'D') { val = val.split('')[num2] + add + '♦' }
        if (val.split('')[num1] === 'C') { val = val.split('')[num2] + add + '♣' }
        return val;
    }

    render() {
        // 叫牌所需花色及墩数
        let callSuitS = [];
        suit.map((items, i) => {
            items.map((item, index) => {
                callSuitS.push(<span key={item} style={{ display: 'inline-block', width: 35, height: 25, margin: 3, border: '1px solid #ccc', borderRadius: 3, textAlign: 'center' }} onClick={this.state.deal && this.state.call && this.state.callDirect === this.state.myDirect ? this.click : null}>{item}</span>)
            })
        })
        let callDbl = [];
        dbl.map((item, i) => {
            callDbl.push(<span key={item} style={{ display: 'inline-block', width: 35, height: 25, margin: 3, border: '1px solid #ccc', borderRadius: 3, textAlign: 'center' }} onClick={this.state.deal && this.state.call && this.state.callDirect === this.state.myDirect ? this.click : null}>{item}</span>)
        })

        return (
            <div>
                <Row >
                    <Col span={6} style={{ width: 70, margin: 5, textAlign: 'center', border: '1px solid #b0e0e6', borderRadius: 3 }}>
                        <Row>
                            <Col span={24}>IMPS</Col>
                        </Row>
                        <Row style={{ background: '#B0E0E6' }}>
                            <Col span={12}>NS:</Col>
                            <Col span={12}>{this.state.scoreSN}</Col>
                        </Row>
                        <Row style={{ background: '#B0E0E6' }}>
                            <Col span={12}>EW:</Col>
                            <Col span={12}>{this.state.scoreEW}</Col>
                        </Row>
                    </Col>
                    <Col span={6} style={{ height: 65, margin: 5 }}>
                        <div style={{ position: 'absolute', width: 20, height: 65, border: '1px solid #fff', background: '#20B2AA', zIndex: 1 }}>{this.state.piersSN}</div>
                        <div style={{ position: 'absolute', bottom: 0, width: 60, height: 20, paddingRight: 5, border: '1px solid #fff', background: '#20B2AA', textAlign: 'right' }}>{this.state.piersEW}</div>
                        <div style={{ position: 'absolute', right: 30, width: 35, height: 40, padding: '0 5px', borderRadius: 3, background: '#B0E0E6', textAlign: 'center' }}>{this.state.declarer ? this.re_transfer(this.state.contract, 1, 0, false) : null}{`\n`}{this.state.declarer ? this.state.declarer : null}</div>
                    </Col>
                    <Col span={6}>
                        <Row><span>Claim:</span></Row>
                        <Row><Input value={this.state.claimCount} onChange={(e) => this.setState({ claimCount: e.target.value })} onPressEnter={(e) => this.postMsg('claim' + this.state.claimCount)} disabled={!(this.state.currentDirect === this.state.myDirect)}></Input></Row>
                    </Col>
                </Row>
                {/* 上 */}
                <Row style={{ marginBottom: 10 }}>
                    <Col span={4} style={{ background: '#0f0', paddingLeft: 10 }}>{this.state.topDirect}</Col>
                    <Col span={20} style={{ background: '#ff0', paddingLeft: 10 }}>{this.state.topName} {this.state.call && this.state.callDirect === this.state.topDirect ? ' 该你叫牌啦' : null} {this.state.play && this.state.declarer === this.state.topDirect ? ' 庄家' : null}{this.state.currentDirect === this.state.topDirect ? '★' : null}</Col>
                    <Col span={24} style={{ display: this.state.play && this.state.dummy == this.state.topDirect ? 'inline-block' : 'none', paddingLeft: 10, textAlign: 'center' }}>{this.state.dummyCardsNum === null ? null : this.addColor(this.state.dummyCardsNum)}</Col>
                </Row>
                <Row>
                    {/* 左 */}
                    <Col span={2}>
                        <Row style={{ height: 300, writingMode: 'vertical-lr' }}>
                            <Col span={24} style={{ height: 60, background: '#0f0' }}>{this.state.leftDirect}</Col>
                            <Col span={24} style={{ height: 240, background: '#ff0' }}>{this.state.leftName} {this.state.call && this.state.callDirect === this.state.leftDirect ? ' 该你叫牌啦' : null} {this.state.play && this.state.declarer === this.state.leftDirect ? ' 庄家' : null}{this.state.currentDirect === this.state.leftDirect ? '★' : null}</Col>
                        </Row>
                    </Col>
                    <Col span={6} style={{ display: this.state.play && this.state.dummy === this.state.leftDirect ? 'inline-block' : 'none' }}>
                        <Row>
                            <Col span={24}>{this.state.dummyCardsNum === null ? null : this.addColor(this.state.dummyCardsNum)[0]}</Col>
                            <Col span={24}>{this.state.dummyCardsNum === null ? null : this.addColor(this.state.dummyCardsNum)[1]}</Col>
                            <Col span={24}>{this.state.dummyCardsNum === null ? null : this.addColor(this.state.dummyCardsNum)[2]}</Col>
                            <Col span={24}>{this.state.dummyCardsNum === null ? null : this.addColor(this.state.dummyCardsNum)[3]}</Col>
                        </Row>
                    </Col>
                    {/* 叫牌区 */}
                    <Col span={20} style={{ display: this.state.call && !this.state.play ? 'inline-block' : 'none' }}>
                        <Row>
                            <Table
                                columns={columns}
                                dataSource={this.state.dataSource}
                                size="small"
                                style={{ width: 210, }}
                                pagination={false}
                            />
                        </Row>
                        <Row style={{ marginTop: 20 }}>{callSuitS.slice(0, 7)}</Row>
                        <Row>{callSuitS.slice(7, 14)}</Row>
                        <Row>{callSuitS.slice(14, 21)}</Row>
                        <Row>{callSuitS.slice(21, 28)}</Row>
                        <Row>{callSuitS.slice(28, 35)}</Row>
                        <Row>{callDbl}</Row>
                    </Col>
                    {/* 打牌区 */}
                    <Col span={this.state.dummy === this.state.leftDirect || this.state.dummy == this.state.rightDirect ? 14 : 20} style={{ display: !this.state.call && this.state.play ? 'inline-block' : 'none', height: 200, textAlign: 'center', verticalAlign: 'middle' }}>
                        <Row>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <p style={{ width: 30, border: '1px solid #ddd', borderRadius: 5, background: '#ccc', textAlign: 'center', padding: 10, margin: '0 auto' }}>{this.state.currentCardT}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} style={{ textAlign: 'left' }}>
                                <p style={{ width: 30, border: '1px solid #ddd', borderRadius: 5, background: '#ccc', textAlign: 'center', padding: 10, margin: '0 auto' }}>{this.state.currentCardL}</p>
                            </Col>
                            <Col span={12} style={{ textAlign: 'right' }}>
                                <p style={{ width: 30, border: '1px solid #ddd', borderRadius: 5, background: '#ccc', textAlign: 'center', padding: 10, margin: '0 auto' }}>{this.state.currentCardR}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24} style={{ textAlign: 'center' }}>
                                <p style={{ width: 30, border: '1px solid #ddd', borderRadius: 5, background: '#ccc', textAlign: 'center', padding: 10, margin: '0 auto' }}>{this.state.currentCardB}</p>
                            </Col>
                        </Row>
                    </Col>
                    {/* 右 */}
                    <Col span={6} style={{ display: this.state.play && this.state.dummy == this.state.rightDirect ? 'inline-block' : 'none', textAlign: 'right' }}>
                        <Row>
                            <Col span={24}>{this.state.dummyCardsNum === null ? null : this.addColor(this.state.dummyCardsNum)[0]}</Col>
                            <Col span={24}>{this.state.dummyCardsNum === null ? null : this.addColor(this.state.dummyCardsNum)[1]}</Col>
                            <Col span={24}>{this.state.dummyCardsNum === null ? null : this.addColor(this.state.dummyCardsNum)[2]}</Col>
                            <Col span={24}>{this.state.dummyCardsNum === null ? null : this.addColor(this.state.dummyCardsNum)[3]}</Col>
                        </Row>
                    </Col>
                    <Col span={2}>
                        <Row style={{ height: 300, writingMode: 'vertical-lr', float: 'right' }}>
                            <Col span={24} style={{ height: 60, background: '#0f0' }}>{this.state.rightDirect}</Col>
                            <Col span={24} style={{ height: 240, background: '#ff0' }}>{this.state.rightName} {this.state.call && this.state.callDirect === this.state.rightDirect ? ' 该你叫牌啦' : null} {this.state.play && this.state.declarer === this.state.rightDirect ? ' 庄家' : null}{this.state.currentDirect === this.state.rightDirect ? '★' : null}</Col>
                        </Row>
                    </Col>
                </Row>
                {/* 下 */}
                <Row style={{ marginTop: 10 }}>
                    <Col span={24} style={{ paddingLeft: 10, textAlign: 'center' }}>{this.state.myCardsNum === null ? null : this.addColor(this.state.myCardsNum)}</Col>
                    <Col span={4} style={{ background: '#0f0', paddingLeft: 10 }}>{this.state.myDirect}</Col>
                    <Col span={20} style={{ background: '#ff0', paddingLeft: 10 }}>{this.state.myName} {this.state.call && this.state.callDirect === this.state.myDirect ? ' 该你叫牌啦' : null} {this.state.play && this.state.declarer === this.state.myDirect ? ' 庄家' : null}{this.state.currentDirect === this.state.myDirect ? '★' : null}</Col>
                </Row>
            </div>
        )
    }
}
