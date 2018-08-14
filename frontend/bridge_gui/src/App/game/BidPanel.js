import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import './BidPanel.css'
// let css1 = {
//     bidpanel: {
//         width: '100%',
//         height: '100%',
//         //fontSize: '22px'
//     },
// }

/**
 * 
 */
class BidPanel extends Component {
    state = {
        bidblocks: [],
        bidcards:[],
        active:1
    }
    constructor(props) {
        super(props)
        this.width = window.screen.width;
        const suits = ['NT', 'S', 'H', 'D', 'C'];
        const rank = [1, 2, 3, 4, 5, 6, 7];
        const bids = rank.map((i) => suits.map((j) => i + j))
        //console.log(bids)
        const bidblocks = bids.map((e, i) => e.map((e1, i1) => {
            //let active = (i<5 && i1<3) ? 1:0;
            return { name: e1, active: 1 }
        }))
        this.state.bidcards = [ {name:'PASS',active:1},{name:'ALERT',active:1},
                                {name:'X',active:1},{name:'XX',active:1},]
        console.log('bbb................')
        console.log(bidblocks)
        this.state.bidblocks = bidblocks;
        this.ref = React.createRef();

    }
    handleCall = (item) =>{
        if('row' in item){
            this._bidblock(item);
        }else{
            this._bidcards(item);
        }
    }

    /**
     * 处理 pass,alert,x,xx
     * 这4个选项应该只能点击一个。
     */
    _bidcards = (item) => {
        if(!this.state.active) return false;
        console.log('bidcards.........item...........')
        console.log(item)
        this.state.bidcards.forEach((e)=>{
            if(e.name==item.name) e.active=0;
            else e.active = 1;
        })
        console.log(this.state.bidcards)
        this.setState({
            bidcards:this.state.bidcards
        })
    }
    /**
     * 叫牌
     * item 点击的叫品 行列坐标。{row,col}
     * 点击某个叫品，其他叫品要联动（active=0/1）
     */
    _bidblock = (item) => {
        if(!this.state.active) return false;
        console.log('item........................')
        console.log(item)
        const bidblocks = this.state.bidblocks;
        for (let i = 0; i < bidblocks.length; i++) {
            for (let j = 0; j < bidblocks[i].length; j++) {
                if (i < item.row ||
                    (i == item.row && j >= item.col)) bidblocks[i][j].active = 0;
                if (i > item.row ||
                    (i == item.row && j < item.col)) bidblocks[i][j].active = 1;

            }
        }
        this.setState({
            bidblocks: this.state.bidblocks
        })
    }
    /**
     * 确认提交
     */
    handleConfirm = () =>{
        this.setState({
            active:0
        })
    }
    render() {
        console.log('ffff:' + this.width)
        const bidblocks = this.state.bidblocks.map((e1, i1) => e1.map((e2, i2) => {
            const animation = {}
            //if (e2.active == 0) animation['brightness'] = 0.6;
            animation['brightness'] = '';
            return <BidBlock key={e2.name} name={e2.name} animation={animation}
                active={e2.active}
                onclick={this.handleCall.bind(this, { row: i1, col: i2 })} />
        }))
        //console.log(bidblocks)
        const rows = this.props.calldata.map((item, index) => {
            console.log(item)
            return <tr key={index}>
                <td key='0'>&nbsp;{index + 1}</td>
                {item.map((item1, index1) => {
                    if (!item1) return ' ';
                    if (item1.slice(0, 1) == 'A') return (
                        <td key={index + index1 + 1} className='alertTd'>
                            <img className='suit' src={`/cards/bids/${item1.slice(1)}.svg`} />
                        </td>
                    );
                    return (
                        <td key={index + index1 + 1}>
                            <img className='suit' src={`/cards/bids/${item1.toUpperCase()}.svg`} />
                        </td>
                    );
                })}
            </tr>
        })
        return (
            <div id='bidpanel' className='bidpanel' ref={this.ref}>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <td>&nbsp;</td><td>东</td><td>南</td><td>西</td><td>北</td>
                            </tr>
                        </thead>
                        <tbody>
                            {rows}
                        </tbody>
                    </table>
                </div>
                {bidblocks}
                <BidCard name='PASS' active={this.state.bidcards[0].active}
                    onclick={this._bidcards.bind(this,{name:'PASS'})}
                />
                <BidCard name='ALERT' active={this.state.bidcards[1].active}
                    onclick={this._bidcards.bind(this,{name:'ALERT'})}
                />
                <BidCard name='X' active={this.state.bidcards[2].active}
                    onclick={this._bidcards.bind(this,{name:'X'})}
                />
                <BidCard name='XX' active={this.state.bidcards[3].active}
                    onclick={this._bidcards.bind(this,{name:'XX'})}
                />
                <button onClick={this.handleConfirm}>确认</button>
            </div>
        );
    }
}
/**
 * name 5D
 * size 大小比例
 * active 0,1  0不可点击
 */
class BidBlock extends Component {
    render() {
        const suit = this.props.name.slice(-1);
        const bgcolor = { T: '#eeeeee', S: '#ddddFF', H: '#FFdddd', D: '#ffffcc', C: '#ccffcc' };
        //const bgcolor = { T: '#eeeeee', S: '#eeeeee', H: '#eeeeee', D: '#eeeeee', C: '#eeeeee' };
        const style = {
            backgroundColor: `${bgcolor[suit]}`,
        }
        let animation = this.props.animation;
        if (this.props.active == 0)
            animation && (animation['brightness'] = 0.6);
        if (this.props.active == 1){
            animation && (animation['brightness'] = 1);
        }

        //console.log(animation);

        return (
            <TweenOne
                animation={{
                    ...animation,
                    ease: 'easeOutQuint',       // 缓动参数 参考蚂蚁手册 easeOutExpo
                }}
                className='bidblock'
            >

                <div className='cn1' onClick={this.props.onclick} style={style}>
                    <img className='suit' src={`/cards/bids/${this.props.name}.svg`} />
                </div>
            </TweenOne>
        );
    }
}

class BidCard extends Component {
    // state={
    //     active:1
    // }
    // onclick = ()=>{
    //     this.setState({
    //         active:!this.state.active
    //     })
    // }
    render() {
        const bgcolor = { PASS: '#88FF88', X: '#FF8888', XX: '#FF3333', ALERT: '#8888FF'};
        const width = { PASS: '23.3vh', X: '11.4vh', XX: '11.4vh', ALERT: '11.4vh'};
        const style = {
            backgroundColor: `${bgcolor[this.props.name]}`,
            width:`${width[this.props.name]}`,
        }
        let animation = {};
        if (this.props.active == 0)
            animation && (animation['brightness'] = 0.6);
        if (this.props.active == 1){
            animation && (animation['brightness'] = 1);
        }
        return (
            <TweenOne
                animation={{
                    ...animation,
                    ease: 'easeOutQuint',       // 缓动参数 参考蚂蚁手册 easeOutExpo
                }}
                className='bidcard'
            >
                <div className='cn1' onClick={this.props.onclick} style={style}>
                    <img className='suit' src={`/cards/bids/${this.props.name}.svg`} />
                </div>
            </TweenOne>
        );
    }
}


export default BidPanel;