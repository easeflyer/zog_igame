import React, { Component } from 'react';
//import settings from '../game/settings';
import Card from './Card'
import './Table.css'
import Models from '../models/model'

/**
 * Game  是一局比赛，涉及到了比赛者，以及和比赛相关的其他信息。重点在于比赛。
 * Table 是一桌游戏的界面：重点在于 一桌
 */
class Table extends Component {
    state = {
        cards: null // 考虑这里不用 cards 只用必要的数字
    }
    /**
     * 重构参考： 打牌的几个阶段，应该在规则里面，调入进来。
     * 属性列表：
     *  scene: 1 叫牌，2 打牌 3 claim 4 展示比分
     *         1 
     *  deals: 牌，除了自己的牌，其他人的牌应该不显示
     *  seat：ESWN 自己做在那个方位。
     *  csize: 牌的大小 手机 80像素比较合适。
     */
    constructor(props) {

        super(props);
        this.width = window.screen.width;
        this.height = window.screen.height;
        this.css = {
            table: {
                width: this.width,
                height: this.height,
            },
            header: {
                width: this.width,
                height: this.width * 0.2,
            },
            body: {
                width: this.width,
                height: this.width,
            },
            footer: {
                width: this.width,
                height: '40px',
            },
            east: {
                top: this.width * 0.2,
                width: this.width * 0.2,
                height: this.width * 0.6,
            },
            south: {
                width: this.width,
                height: this.width * 0.2,
            },
            west: {
                top: this.width * 0.2,
                width: this.width * 0.2,
                height: this.width * 0.6,
            },
            north: {
                width: this.width,
                height: this.width * 0.2,
            },
            re: {
                width: this.width*0.19,
                height: this.width*0.19,
            },
            board: {
                width: this.width * 0.6,
                height: this.width * 0.6,
                top: this.width * 0.2,
                left: this.width * 0.2,
            }
    
        }
        this.cards = [];
        this.zindex = 10;
        this.center = null; // 桌子的中心 {x,y}
        this._csize = null; // 牌的大小
        this.deals = 'XXXXXXXXXXXXX QJ98.A5.J853.QT4 XXXXXXXXXXXXX XXXXXXXXXXXXX'
        this.deals = Models.deals()[0];
        this.myseat = 'S'               // 用户坐在 南
        this.seat = {
            'east': [{ x: 0, y: 0 }, { x: 0, y: 0 }],  // seat 用于记录坐标 
            'south': [{ x: 0, y: 0 }, { x: 0, y: 0 }], // 第一个xy 是 四个区域左上角坐标
            'west': [{ x: 0, y: 0 }, { x: 0, y: 0 }],  // 第二个xy 是 出牌4个区域坐标。
            'north': [{ x: 0, y: 0 }, { x: 0, y: 0 }]   // 也就是牌出到什么地方。
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
            return this.width * 0.18;
        })()
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
    */
    _initSeat() {
        const center = { x: 0, y: 0 };
        center.x = this.ref.board.current.offsetTop +
            parseInt(this.ref.board.current.style.height.slice(0, -2)) / 2
        center.y = this.ref.board.current.offsetLeft +
            parseInt(this.ref.board.current.style.width.slice(0, -2)) / 2
        this.center = center;
        // console.log('center......')
        // console.log(center)
        const offset = this.csize * 0.7 / 2
        for (let key in this.seat) {
            this.seat[key][0]['y'] = this.ref[key].current.offsetTop;
            this.seat[key][0]['x'] = this.ref[key].current.offsetLeft;

            if (key == 'east') {
                this.seat[key][1]['y'] = center.y - offset
                this.seat[key][1]['x'] = center.x - offset
            } else if (key == 'south') {
                //this.seat[key][1]['y'] = center.y + offset - this.csize / 2;
                this.seat[key][1]['y'] = center.y - offset
                this.seat[key][1]['x'] = center.x - this.csize * 0.7 / 2;
            } else if (key == 'west') {
                this.seat[key][1]['y'] = center.y - offset
                this.seat[key][1]['x'] = center.x + offset - this.csize;
            } else {
                this.seat[key][1]['y'] = center.y + offset - this.csize;
                this.seat[key][1]['x'] = center.x - this.csize * 0.7 / 2;
            }
        }
    }

    /**
     * initCards 从 this.deals 初始化成 Cards 组件为渲染输出做准备，返回到 this.cards
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
                cards[index1][index2] = [];
                for (var i = 0; i < s.length; i++) {
                    cards[index1][index2][i] = {
                        onclick:()=>false,              // onclick 必须是个函数
                        active:0,
                        key: index++,
                        seat: Table.seats[index1],       // 这张牌是那个方位的
                        table: this,
                        size: this.csize,                // 牌的大小
                        card: s[i] + suits[index2],
                        position: { x: this.width/2, y: this.width*2 }     // 考虑一个默认位置。
                    }
                }
            });
        });
        //console.log(cards)
        return cards;
    }
    /**
     * 出牌
     * 
     * 算法注解：
     *  1） 东西牌是横向的，因此要确定旋转的圆心。旋转后保证左上角坐标就是牌的左上角
     *      如果按照中心旋转则还需要计算偏移量。
     *  2） 出牌的位置 东西南北 四个位置之前计算好的。
     *  3） xy+5 目的是避免靠近牌桌边缘。
     *  4） delay 是每张牌发出来的延迟时间。按照牌编号进行计算。出牌时应清零
     *  5） '02'.indexOf(index) 东西的牌 rotate 旋转90度
     *  6） .onclick=this.onclick(item2) onclick 函数引用
     *      this.onclick(item2) 仍然返回一个函数 用来处理点击事件，传入item2
     */
    dealCards() {
        const cards = this.state.cards;
        const offset = this.csize * 0.7/2
        cards.forEach((item, index) => {
            let rotate = 0;
            let seat = Table.seats[index]
            let [x, y] = [this.seat[seat][0].x, this.seat[seat][0].y]
            if ('02'.indexOf(index) != -1) rotate = -90;
            x = x + this.width/16/5; y = y + this.width/16/5; // margin
            item.forEach((item1, index1) => {
                item1.forEach((item2, index2) => {
                    cards[index][index1][index2].animation = {
                        top: y,
                        left: x,
                        delay: (item2.key % 13) * 80,
                        duration: 300,
                        rotate: rotate,
                        transformOrigin: `${offset}px ${offset}px`
                    }
                    cards[index][index1][index2].rotate = rotate;
                    cards[index][index1][index2].active = 2; // 测试用
                    cards[index][index1][index2].onclick=this.play(item2)
                    if ('02'.indexOf(index) != -1) y = y + this.csize*0.15;
                    else x = x + this.csize*0.2;
                });
            });
        })
        return cards;
    }
    /**
     * 出牌
     */
    play = (item) => {
        return () => {
            item['animation']['left'] = this.seat[item.seat][1].x;
            item['animation']['top'] = this.seat[item.seat][1].y;

            item['animation']['delay'] = 0;
            item['zIndex'] = this.zindex++
            this.setState({
                cards: this.state.cards
            })
        }
    }
    test2 = () => {
        console.log('test2.........................')
        const cards = this.state.cards;
        cards[1][1][0]['active']=2;                  // 测试用 2张牌可以出
        cards[1][1][1]['active']=2;
        cards[1][1][0]['animation']['delay']=0;                  // 测试用 2张牌可以出
        cards[1][1][1]['animation']['delay']=0;

        // cards[1][1][1]['position']['x']=180;
        // cards[1][1][1]['position']['y']=160;
        this.setState({
            cards:cards
        })
        //this.forceUpdate()
        // this.setState((preState,props)=>{
        //     return {
        //         cards:preState.cards
        //     }
        // })
    }

    /**
     * 测试出牌
     */
    test1 = () => {
        const cards = this.state.cards;
        cards[0][0][0].animation = {
            top: 200,
            left: 200,
        }
        this.setState({
            cards: cards
        })
    }
    /**
     * 发牌
     */
    deal = () => {
        const cards = this.dealCards()
        this.setState({
            cards: cards
        });
    }
    render() {
        const css = this.css;
        // cards 从 state.cards 遍历获得。不要重复构造，而所有操作只操作数据。
        const cards = this.state.cards.map((item1, index1) => {
            return item1.map((item2, index2) => {
                return item2.map((item3, index3) => {
                    return <Card
                        active={item3.active}
                        onClick={item3.onclick}
                        key={item3.key}
                        table={item3.table}
                        seat={item3.seat}
                        animation={item3.animation || ''}
                        card={item3.card}
                        size={item3.size}
                        position={item3.position}
                        zIndex={item3.zIndex}
                    />
                });
            });
        });
        return (
            /**
             * 设计分析：
             * 桌面布局写在一起，他们是固定不变的。
             * 而所有的card 不要到 布局的子元素里。这样看起来好像父子关系明确。
             * 但实际上：桌子 和 牌在不同的 zIndex 上。因此应该分开来写更加清晰。
             * 牌本身定位 不一定在桌子上，因此应该增加 最外层div
             * 
             * 定位：需要参考 布局的位置。可以取到布局的坐标。然后进行定位。
             *      注意父子组件的 position 设置。
             * 
             * <Card size='80' card='3S' rotate='0' position={{x:0,y:550}} />
             *      size        高度，宽=高×0.7
             *      card        具体那张牌 小写字母代表反面
             *      rotate      横向还是纵向摆放 0 纵向 90 横向
             *      position    定位，以父元素为参考进行绝对定位。
             * 
             */
            <div>
                <div id='table' className='table' style={css.table}>
                    <div id='header' className='header' style={css.header}>
                        <div className='re' style={css.re}>分数</div>
                        <div className='re' style={css.re}>方位</div>
                        <div className='re' style={css.re}>墩数</div>
                    </div>
                    <div id='body' className='body' style={css.body}>
                        <div id='east' className='east' style={css.east} ref={this.ref.east}>east</div>
                        <div id='west' className='west' style={css.west} ref={this.ref.west}>west</div>
                        <div id='south' className='south' style={css.south} ref={this.ref.south}>south</div>
                        <div id='north' className='north' style={css.north} ref={this.ref.north}>north</div>
                        <div id='board' className='board' style={css.board} ref={this.ref.board}>
                        </div>
                        {cards}
                    </div>

                    <button onClick={this.deal}>发牌</button>
                    <button onClick={this.test1}>test1</button>
                    <button onClick={this.test2}>test2</button>
                    <div id='test' style={{ position: 'relative' }}>测试区域</div>
                    <div id='footer' className='footer' style={css.footer}>footer</div>
                </div>
            </div >
        );
    }
}
Table.seats = ['east', 'south', 'west', 'north']
//export default Table
export default Table