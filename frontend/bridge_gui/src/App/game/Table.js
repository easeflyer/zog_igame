import React, { Component } from 'react';
import ReactDOM from 'react-dom';
//import settings from '../game/settings';
import Card from './Card'
//import BidPanel from './BidPanel'
import Clock from './Clock'
import { Imps, Seats, Tricks } from './Headers'
import Prepare from './Prepare'
//import Claim from './Claim'
//import Debug from './Debug'
//import './Table.css'
import Models from '../models/model'
import Sound from './Sound'
import TableView from './TableView' // 包含 TableView.css

/**
 * Game  是一局比赛，涉及到了比赛者，以及和比赛相关的其他信息。重点在于比赛。
 * Table 是一桌游戏的界面：重点在于 一桌
 */
class Table extends Component {
    state = {
        cards: null, // 考虑这里不用 cards 只用必要的数字
        scene: 0,     // 0 准备阶段 1 叫牌阶段 2 出牌阶段 3 claim 等待，4 claim 确认
        calldata: [], // todo 补充 calldata 4列（东西南北）若干行的数组参考 call 方法
        user: {
            east: { ready: 0, name: '张三', face: '/imgs/face1.png', rank: '大师' },
            south: { ready: 0, name: '李四', face: '/imgs/face2.png', rank: '专家' },
            west: { ready: 0, name: '王五', face: '/imgs/face1.png', rank: '王者' },
            north: { ready: 0, name: '赵六', face: '/imgs/face2.png', rank: '钻石' }
        },
        lastTrick: false,
        //playseat:null, // 倒计时解决
        debug: false,
    }
    /**
     * 重构参考： 打牌的几个阶段，应该在规则里面，调入进来。
     * 属性列表：
     *  scene: 1 叫牌，2 打牌 3 claim 4 展示比分
     *         1 
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
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        console.log(this.height * 0.2)
        // this.calldata = [['1C','2C','PASS','PASS'],['3H','PASS','PASS','4NT'],
        //                 ['PASS','PASS','PASS','']]
        this.board = []; // 桌面上的四张牌
        this.cards = [];
        this.claimseat = 'east'; // east,south...
        this.zindex = 10;
        this.timer = { stop: null, start: null }; // 用于控制 倒计时
        this.center = null; // 桌子的中心 {x,y}
        this._csize = null; // 牌的大小
        this.deals = 'XXX.XX.XXXX.XXXX QJ98.A5.J853.QT4 XXX.XX.XXXX.XXXX XXX.XX.XXXX.XXXX'
        //this.deals = Models.deals()[0];
        this.myseat = 'west'               // 用户坐在 南
        this.seat = {
            east: [{ x: 0, y: 0 }, { x: 0, y: 0 }],  // seat 用于记录坐标 
            south: [{ x: 0, y: 0 }, { x: 0, y: 0 }], // 第一个xy 是 四个区域左上角坐标
            west: [{ x: 0, y: 0 }, { x: 0, y: 0 }],  // 第二个xy 是 出牌4个区域坐标。
            north: [{ x: 0, y: 0 }, { x: 0, y: 0 }]   // 也就是牌出到什么地方。
        }
        // ref 用来记录 四个发牌位置的div引用
        this.ref = {};
        for (let key in this.seat) this.ref[key] = React.createRef()
        this.ref.board = React.createRef();
        //this.state.cards = this.initDeals() // 把以上牌初始化放到桌子上(不发牌)
        this.state.cards = this.initCards() // 把以上牌初始化放到桌子上(不发牌)
    }
    /**
     * 通过计算获得 Card 的 size
     */
    get csize() {
        // 短路语法 牌的大小 可以计算在下面的函数内。
        return this._csize || (() => {
            return this.height * 0.18;
        })()
    }
    _shift(seat) {
        const offset = Table.seats.indexOf(this.myseat) - 1
        const index = Table.seats.indexOf(seat)
        return Table.seats[(index + offset) % 4]
        //return 
    }


    /**
     * 完成挂载后，要计算 各个位置的坐标。
     */
    componentDidMount() {
        this._initSeat(); // 初始化 发牌位置 出牌位置等坐标
        //console.log(parseInt(center.y) - parseInt(this.csize) * 0.7 / 2)
    }
    /**
    * _initSeat 初始化 发牌位置 出牌位置的坐标。 
    * center   桌子的中心
    *          以body 为父元素计算。
    * offset   是四张牌叠放需要错开的空间。（长 - 宽）/ 2
    * this.seat[key][0] 四个座位发牌坐标xy
    * this.seat[key][1] 四个作为出牌坐标xy
    *          出牌坐标计算依据：1）扑克牌的中心点和左上角位置差固定。
    *          因此可以以中心点考虑四个方位的位移 再加减相同的 位置差即可。
    *          注：0.7 是扑克的横竖比例。
    * 
    * 采用 .css 确定尺寸后 被注释的语句 不起作用了。修改为 clientHeight
    *        this.ref.board.current.clientHeight / 2
    *        // parseInt(this.ref.board.current.style.height.slice(0, -2)) / 2
    * 
    */
    _initSeat() {
        const center = { x: 0, y: 0 };
        center.x = this.ref.board.current.offsetTop +
            this.ref.board.current.clientHeight / 2
        // parseInt(this.ref.board.current.style.height.slice(0, -2)) / 2
        center.y = this.ref.board.current.offsetLeft +
            this.ref.board.current.clientWidth / 2
        this.center = center;
        console.log('center......')
        // console.log(center)
        console.log(this.ref.board.current.clientHeight)
        const offset = this.csize * 0.7 / 2
        for (let key in this.seat) {
            this.seat[key][0]['y'] = this.ref[key].current.offsetTop;
            this.seat[key][0]['x'] = this.ref[key].current.offsetLeft;

            if (key == 'east') {
                this.seat[key][0]['y'] = this.seat[key][0]['y'] + this.height * 0.06
                // 下面是处理　牌的叠放顺序　联合参考：dealCards
                //this.seat[key][0]['y'] = this.seat[key][0]['y'] + this.height * 0.4
                this.seat[key][1]['y'] = center.y - offset
                this.seat[key][1]['x'] = center.x - offset * 0.8
            } else if (key == 'south') {
                this.seat[key][0]['x'] = this.seat[key][0]['x'] //+ this.height * 0.21
                //this.seat[key][1]['y'] = center.y + offset - this.csize / 2;
                this.seat[key][1]['y'] = center.y - offset * 0.8
                this.seat[key][1]['x'] = center.x - offset
            } else if (key == 'west') {
                this.seat[key][0]['y'] = this.seat[key][0]['y'] + this.height * 0.06
                this.seat[key][1]['y'] = center.y - offset
                this.seat[key][1]['x'] = center.x + offset * 0.8 - this.csize;
            } else if (key == 'north') {
                this.seat[key][0]['x'] = this.seat[key][0]['x'] //+ this.height * 0.21
                this.seat[key][1]['y'] = center.y + offset * 0.8 - this.csize;
                this.seat[key][1]['x'] = center.x - offset
            }
        }
    }

    /**
     * initCards 从 this.deals 初始化成 Cards 组件为渲染输出做准备，返回到 this.cards
     * TODO：把一手牌 变成
     */
    initCards() {
        const suits = Card.suits                    //['S', 'H', 'D', 'C'];
        const deals = this.deals.split(' ')
        let index = 0;                              // 复位index 可以让四个人的牌同时发出来
        const cards = [[], [], [], []];             // 初始化二维数组 保存四个方位的牌
        //deals. [XXXXXXXXXXXXX,QJ98.A5.J853.QT4,XXXXXXXXXXXXX,XXXXXXXXXXXXX]
        deals.forEach((item, index1) => {
            const suit = item.split('.')
            suit.forEach((s, index2) => {           // index2 四个花色  s 'QJ98' 牌点字串
                //cards[index1][index2] = [];
                for (var i = 0; i < s.length; i++) {
                    cards[index1].push({
                        onclick: () => false,              // onclick 必须是个函数
                        active: 0,
                        index: index,
                        key: index++,
                        seat: Table.seats[index1],       // 这张牌是那个方位的
                        //table: this,
                        size: this.csize,                // 牌的大小
                        card: s[i] + suits[index2],
                        position: { x: this.height / 2, y: this.height * 2 }     // 考虑一个默认位置。
                    })
                }
            });
        });
        console.log('cards.......333.............')
        console.log(cards)
        return cards;
    }
    /**
     * 清理桌面上的牌
     * 定位参考：
     *  -this.height * 0.2;  计分位置
     */
    clearBoard = () => {
        //if(this.board.length < 4) return false;
        const board = this.board;
        for (let i = 0; i < board.length; i++) {
            board[i].animation.left = this.height / 2;
            board[i].animation.top = -this.height * 2;
            //board[i].animation.rotate = 0;
            // board[i].animation.left = 100;
            // board[i].animation.top = 100;
            board[i].active = 3;
        }
        this.setState({
            cards: this.state.cards
        }, () => this.board = [])
        Sound.play('clear')
    }


    /**
     * 发牌
     * 
     * 算法注解：
     *  1） 东西方向牌是横向的，因此要确定旋转的圆心。旋转后保证左上角坐标就是牌
     *      的左上角如果按照中心旋转则还需要计算偏移量。利用 transformOrigin
     *  2） 出牌的位置 东西南北 四个位置之前计算好的。
     *  3） xy+5 目的是避免靠近牌桌边缘。
     *  4） delay 是每张牌发出来的延迟时间。按照牌编号进行计算。出牌时应清零
     *  5） '02'.indexOf(index) 东西的牌 rotate 旋转90度
     *  6） .onclick=this.onclick(item2) onclick 函数引用
     *      this.onclick(item2) 仍然返回一个函数 用来处理点击事件，传入item2
     */
    dealCards() {
        const cards = this.state.cards;
        const offset = this.csize * 0.7 / 2
        cards.forEach((item, index) => {
            let rotate = 0;
            let seat = Table.seats[index]
            let [x, y] = [this.seat[seat][0].x, this.seat[seat][0].y]
            if ('02'.indexOf(index) != -1) rotate = -90;
            x = x + this.height / 16 / 5; y = y + this.height / 16 / 5; // margin
            item.forEach((item1, index1) => {

                cards[index][index1].animation = {
                    top: y,
                    left: x,
                    delay: (item1.key % 13) * 80,
                    duration: 300,
                    rotate: rotate,
                    transformOrigin: `${offset}px ${offset}px`
                }
                //cards[index][index1][index2].rotate = rotate;
                cards[index][index1].active = 2; // 测试用
                //cards[index][index1].onclick = this.play(item1)
                cards[index][index1].onclick = this.play.bind(this, item1)
                if ('02'.indexOf(index) != -1) y = y + this.csize * 0.15;
                else x = x + this.csize * 0.39;

            });
        })
        return cards;
    }
    /**
     *  点击一张牌
     * 如果状态是 2 就先弹出突出显示。再点击打出去。
     * 注意细节：每张 Card 内部有对 active 的判断。
     */
    play = (item) => {
        if (item.active == 2) this.preplay(item);
        else if (item.active == 3) this._play(item);
        else return;
    }

    /**
     * 点击一张牌 突出显示
     * 被点击的牌突出显示，其他牌都恢复原样
     */
    preplay = (item) => {
        this.state.cards.forEach((item) => item.forEach((item) => {
            if (item.active == 3) {
                item.active = 2;
                switch (item.seat) {
                    case 'east': item['animation']['left'] += 20; break;
                    case 'south': item['animation']['top'] += 20; break;
                    case 'west': item['animation']['left'] -= 20; break;
                    case 'north': item['animation']['top'] -= 20; break;
                }
        
            }
        }))

        item.active = 3;
        switch (item.seat) {
            case 'east': item['animation']['left'] -= 20; break;
            case 'south': item['animation']['top'] -= 20; break;
            case 'west': item['animation']['left'] += 20; break;
            case 'north': item['animation']['top'] += 20; break;
        }
        item['animation']['delay'] = 0;
        this.setState({
            cards: this.state.cards
        });
    }

    /**
     * 出牌 打出去
     * 首先要进行 preplay 然后才能 play
     */
    _play = (item) => {
        // if(item.active != 3) return; // 只有突出的牌能打出去。
        item.active = 4;    // 已经打出去的牌
        if (this.board.length == 4) return false;
        this.board.push(item);
        //console.log(this.board)
        item['animation']['left'] = this.seat[item.seat][1].x;
        item['animation']['top'] = this.seat[item.seat][1].y;
        item['animation']['delay'] = 0;
        item['zIndex'] = this.zindex++
        this.setState({
            cards: this.state.cards
        })
        Sound.play('play');
        if (this.board.length == 4) setTimeout(this.clearBoard, 1000)
    }
    /**
     * 考虑增加参数为 seat
     */
    claim = () => {
        this.setState({
            scene: 3
        })
    }
    handleClaim = () => {
        console.log('发送　claim 请求。')
        console.log('接收到，同意设置　scene=4,不同意，设置为２')
    }
    /**
     * 接受一个用户编号。
     * 考虑修改为座位
     */
    handleReady = (se) => {
        const seat = Table.seats[se];
        this.state.user[seat].ready = 1;
        if (this._userAllReady()) {
            this.state.scene = 1;
            this.deal(); // 这里也有 setState 但是 它是异步的。只执行一次
        }
        this.setState({
            user: this.state.user,
            scene: this.state.scene
        })
    }
    _userAllReady() {
        const user = this.state.user;
        let ready = true;
        Object.values(user).forEach(el => {
            if (el.ready == 0) ready = false
        })
        return ready;
    }
    /**
     * 发牌
     */
    deal = () => {
        const cards = this.dealCards()
        this.setState({
            cards: cards
        });
        Sound.play('deal')
    }

    /**
     * 设置牌的 active 状态。
     * 把编号为 nums 的牌设置成 active 状态
     * nums 是一个数组
     * active 是目标状态。*      
     * active     0,1,2,3  0 灰色不能点，1 亮色不能点，2 亮色能点, 3 亮色能点突出
     */
    setActive = (nums: Array, active = 0) => {
        const cards = this.state.cards;
        cards.forEach((item) => item.forEach((item) => {
            if (nums.indexOf(item.index) != -1) item.active = active;
        }))
        this.setState({
            cards: this.state.cards
        })
    }
    /**
     * 给某一个座位倒计时
     * 为了降低组件的耦合性。将本组件动态挂载到 DOM 上。
     * 利用 unmountComponentAtNode 进行卸载。
     * p, offset 都是闹钟出现位置的微调。
     */
    timing = (seat, time, callback) => {
        ReactDOM.unmountComponentAtNode(document.querySelector('#clock'));
        const p = this.height * 0.18;
        const offset = {
            east: { x: p, y: 0 },
            south: { x: 0, y: p },
            west: { x: -p * 0.66, y: 0 },
            north: { x: 0, y: -p * 0.66 }
        }

        const top = this.seat[seat][1]['y'] + offset[seat].y;
        const left = this.seat[seat][1]['x'] + offset[seat].x;
        const style = {
            position: 'absolute',
            top: top,
            left: left,
            width: '10%'
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
    // /**
    //  * 打开明手的牌
    //  *  从 Models 获得 Dummy 的牌，并且显示出来
    //  *  如果无权获得，则什么都不做。
    //  * 
    //  * 返回：
    //  *  成功：牌打开
    //  *  失败：false 从 model 中调取数据，判断规则。
    //  */
    // // openDummy1 = () => {
    // //     const seat = 'north'
    // //     const dCards = Models.openDummy().cards.split('.');

    // //     const cards = this.state.cards;
    // //     cards[Table.seats.indexOf(seat)].forEach((item, index) => {
    // //         item.forEach((item1, index1) => {
    // //             let card = cards[Table.seats.indexOf(seat)][index][index1];
    // //             card.card = dCards[index].split('')[index1] + Card.suits[index]
    // //         });
    // //     })
    // //     console.log('openDummy..............')
    // //     console.log(cards)

    // // }
    /**
     * 通过一张牌的索引，获得具体的 牌数据引用
     * @param {*} index 
     */
    _cardIndexOf(index) {
        const i1 = Math.floor(index / 13);
        const i2 = index % 13;
        return this.state.cards[i1][i2];
    }

    /**
     * 显示上一墩牌
     * 数据格式：
     * {east:{index:1,card:'5D'}, south:{index:1,card:'5D'}....}
     */
    lastTrick1 = () => {
        ReactDOM.unmountComponentAtNode(document.querySelector('#lastTrick'));
        const lt = Models.lastTrick();
        const cards = lt.map((item, index) => {
            const rotate = ('02'.indexOf(index) > 0) ? 90 : 0
            return <Card
                active='1'
                card={item.card}
                key={index}
                index={index}
                size='80'
                animation={{
                    rotate: `${rotate}`
                }}
            // position={{
            //     x:this.seat[Table.seats[index]][1].x,
            //     y:this.seat[Table.seats[index]][1].y
            // }}
            />
        }
        )
        ReactDOM.render(
            cards,
            document.querySelector('#lastTrick')
        )

    }

    showResult = () => {
        const result = Models.getResult();
        const re = <div className='result'>
            <img src='/cards/medal.svg' width="20%" />
            <div style={{ lineHeight: this.height * 0.12 + 'px', }}>{result}</div>
            <button onClick={this.hideResult}>下一局</button>
        </div>;
        ReactDOM.unmountComponentAtNode(document.querySelector('#result'));
        ReactDOM.render(
            re,
            document.querySelector('#result')
        )

    }
    hideResult = () => {
        ReactDOM.unmountComponentAtNode(document.querySelector('#result'));
    }

    /**
     * 显示上墩牌
     * todo：明确了数据接口再改写。
     * 定位还存在问题。
     */
    lastTrick = () => {
        // 在模型里 应该先判断当前 trick 编号。然后决定是否能看lasttrick
        let show = true;
        if (this.state.lastTrick) show = false;
        //this.state.lastTrick = !this.state.lastTrick;

        //const show = true
        const lt = Models.lastTrick();
        let card = null;
        lt.forEach((item, index) => {
            card = this._cardIndexOf(item.index)
            //card.size = card.size * 0.8
            card['animation']['left'] = (show == true) ?
                this.seat[Table.seats[index]][1].x - this.height / 2.9
                : this.height / 2;
            card['animation']['top'] = (show == true) ?
                this.seat[Table.seats[index]][1].y - this.height / 2.9
                : -this.height * 2;
            //card['size'] = card['size'] * 0.7
            // card['animation']['rotate'] = 180;
            // card['position']['x'] = this.seat[Table.seats[index]][1].x;
            // card['position']['y'] = this.seat[Table.seats[index]][1].y;
            //card['animation'] = ''
            //card['animation']['delay'] = 0;
            card.active = 1; // 测试用
        })
        this.setState({
            cards: this.state.cards,
            lastTrick: !this.state.lastTrick
        })

    }
    /**
     * 叫牌
     * seat 座位
     * bid 叫品
     */
    call = (seat, bid) => {
        const calldata = this.state.calldata
        if (calldata.length == 0) {
            calldata.push(Array(4).fill(null))
            calldata[0][Table.seats.indexOf(seat)] = bid;
        } else if (seat == 'east') {
            calldata.push(Array(4).fill(null))
            calldata[calldata.length - 1][Table.seats.indexOf(seat)] = bid;
        } else {
            calldata[calldata.length - 1][Table.seats.indexOf(seat)] = bid;
        }
    }
    testUsersReady = () => {
        const login = (seat, uname) => {
            this.state.user[seat].name = uname;
            this.setState({ user: this.state.user })
        }
        setTimeout(login.bind(this, 'east', '张三丰'), 1000)
        setTimeout(login.bind(this, 'south', '李四'), 2000)
        setTimeout(login.bind(this, 'west', '王五'), 3000)
        setTimeout(login.bind(this, 'north', '赵六'), 4000)
    }

    testChat = () => {
        const elMsg = document.querySelector('#message')
        const elSay = document.querySelector('#say')
        elMsg.innerHTML =
            "<div>" + this.myseat + ':' + elSay.value + "</div>" + elMsg.innerHTML
    }
    /**
     * 叫牌测试
     */
    testBid1 = () => {
        const bids = [{ seat: 'west', bid: 'A1C' }, { seat: 'north', bid: 'PASS' },
        { seat: 'east', bid: 'PASS' }, { seat: 'south', bid: '2H' },
        { seat: 'west', bid: 'PASS' }, { seat: 'north', bid: 'PASS' },
        { seat: 'east', bid: 'A3C' }, { seat: 'south', bid: 'PASS' },
        { seat: 'west', bid: 'PASS' }, { seat: 'north', bid: '3H' },
        { seat: 'east', bid: 'PASS' }, { seat: 'south', bid: 'PASS' },
        { seat: 'west', bid: 'A3S' }, { seat: 'north', bid: 'PASS' },
        { seat: 'east', bid: 'PASS' }, { seat: 'south', bid: 'PASS' }]
        bids.forEach((item) => {
            this.call(item.seat, item.bid)
        })
        console.log('calldata111....')
        console.log(this.state.calldata)
        this.setState({
            calldata: this.state.calldata
        })
    }

    /**
     * 测试上以墩牌的显示
     */
    testLastTrick = () => {
        this.lastTrick(false);
        // if(this._showLastTrick) this._showLastTrick = false;
        // else this._showLastTrick = true;
        // this.lastTrick(this._showLastTrick);
    }
    /**
     * 打开明手的牌。
     * 从 Models 获得数据。
     * 修改 seat 方位可以打开不同方位的牌。
     */
    testDummy = (seat1) => {
        const seat = seat1;
        let index = 0
        const dCards = Models.openDummy().cards.split('.');
        let cards = this.state.cards[Table.seats.indexOf(seat)];
        dCards.forEach((item1, index1) => {
            item1.split('').forEach((item2, index2) => {
                // 这里。
                cards[index].card = item2 + Card.suits[index1]
                cards[index].onclick = this.play(cards[index]);
                index++;
            })
        })
        //this.state.cards[Table.seats.indexOf(seat)] = cards;
        this.setState({
            cards: this.state.cards
        })
        console.log('openDummy..............')
        console.log(this.state.cards)

    }
    openDebug = () => {
        this.setState({
            debug: !this.state.debug
        })
    }
    test3 = () => {
        this.clearBoard();
    }
    // 
    testActive = () => {
        // 52 张牌 对应 东南西北 四个人的牌
        const nums = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
            13, 14, 15, 16, //17, 18, 19, 20, 21, 22, 23, 24, 25,
            26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38,
            39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51]
        //const nums = [13,14,15,16];
        this.setActive(nums);
    }
    // 测试 闹钟组件 循环回调
    testClock = () => {
        this.timing('east', 2,
            () => this.timing('south', 2,
                () => this.timing('west', 2,
                    () => this.timing('north', 2,
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
    test1 = () => {
        const cards = this.state.cards;
        cards[0][0].animation = {
            top: 200,
            left: 200,
        }
        this.setState({
            cards: cards
        })
    }
    testBid = () => {
        if (this.state.scene != 1) this.state.scene = 1;
        else this.state.scene = 2;
        this.setState({
            scene: this.state.scene
        })
    }
    render() {
        const css = this.css;
        const stat = Object.values(this.state.user).map(e => e.ready)
        // cards 从 state.cards 遍历获得。不要重复构造，而所有操作只操作数据。
        const cards = this.state.cards.map((item1, index1) => {
            return item1.map((item2, index2) => {
                return <Card
                    active={item2.active}
                    onClick={item2.onclick}
                    //onClick={this.play(item3)}
                    key={item2.key}
                    index={item2.key}
                    //table={item3.table}
                    seat={item2.seat}
                    animation={item2.animation || ''}
                    card={item2.card}
                    size={item2.size}
                    position={item2.position}
                    zIndex={item2.zIndex}
                />

            });
        });
        return (
            <TableView table={this} cards={cards} />
        );
    }
}
Table.seats = ['east', 'south', 'west', 'north']
Table.seatscn = ['东', '南', '西', '北']
//export default Table
export default Table