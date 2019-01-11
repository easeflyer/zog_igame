/**
 * todo： bidBlock, bidCard 应该 重新封装成按钮。然后有尺寸和颜色参数。
 *        考虑本组件复杂度，提高后应该进行 mvc 改造。
 *        或者根据新睿桥牌 改造叫牌过程。
 */

import React, { Component, Fragment } from 'react';
import Motion from '../../libs/Motion'
import './BidPanel.css'
import { inject, observer } from 'mobx-react';
import { toJS, autorun,reaction } from 'mobx';
import Position from '../../common/Position';
import Out from '../pc/Output';

/**
 * BidPanel 叫牌面板
 * 
 * 输入：只有 props.calldata={table.state.calldata} active='1'
 * 输出：暂时只有 state 的变化。未形成任何输出。
 *      考虑应该 由 handleConfirm 事件，形成“最终叫品”
 */
@inject('tableStore')
@observer
class BidPanel extends Component {
  state = {
    bidblocks: [],
    bidcards: [],
    active: 1,
    calling: ""
  }
  /**
   * 
   * this.atDisposer = reaction() 查看 mobx 的手册。
   * 因为使用 autorun 自动观察了当前组件bidpanel 的state 因此出现点击 bidBlock
   * 时执行了 initpanel 的情况。initPanel 应该只在 cruCall 变的时候执行。
   * 因此这里使用了 reaction 更加精确的控制。自动执行。
   */
  constructor(props) {
    super(props)
    this.width = window.screen.width;window.__BID = this
    const suits = ['NT', 'S', 'H', 'D', 'C'];
    const rank = [1, 2, 3, 4, 5, 6, 7];
    const bids = rank.map((i) => suits.map((j) => i + j))
    console.log(bids)
    //this.state.calling = "";
    const bidblocks = bids.map((e, i) => e.map((e1, i1) => {
      //let active = (i<5 && i1<3) ? 1:0;
      return { name: e1, active: 1 }
    }))
    this.state.bidcards = [
      { name: 'PASS', active: 1 }, { name: 'ALERT', active: 1 },
      { name: 'X', active: 1 }, { name: 'XX', active: 1 },]
    // console.log('bbb................')
    // console.log(bidblocks)
    this.state.bidblocks = bidblocks;
    this.ref = React.createRef();
    debugger;
    //this.atDisposer = autorun(this.initPanel);  // 是否可以通过生命周期函数
    this.atDisposer = reaction(
      () => this.props.tableStore.curCall, 
      (data, reaction) => { this.initPanel(data) }, 
      {fireImmediately:true} // 这里 上面的函数立即执行一次。可查看mobx 手册
    )
    // 通过 props 修改不会引发重新渲染。
    this.initPanel()
  }
  componentWillUnmount() {
    this.atDisposer();
  }
  /**
   * 处理 叫牌点击事件。
   * 如果 item 是 row,col 则调用 _bidblock() 否则调用 _bidcard
   */
  handleCall = (item) => {
   
    //this.atDisposer();
    if ('row' in item) {
      this._bidblock(item);
    } else {
      this._bidcard(item);
    }
 
    //this.at = autorun(this.initPanel);
  }

  // getCallData() {
  //   //window.__calldata = toJS(this.props.tableStore.state.calldata);
  //   return this.props.tableStore.state.calldata;
  // }

  /**
   * 处理 pass,alert,x,xx
   * 这4个选项应该只能点击一个。
   */
  _bidcard = (item) => {
    if (!this.state.active) return false;
    // console.log('bidcards.........item...........')
    // console.log(item)
    if (item.name == 'ALERT') {
      this.state.bidcards[1].active = !this.state.bidcards[1].active;
    } else {
      this.state.bidcards.forEach((e) => {
        if (e.name == item.name) e.active = 0;
        else e.active = 1;
      })
      this.state.bidblocks.map((item) => {
        return item.map((i) => {
          i.active = 1;
          return i;
        });
      })
    }

    let calling = this.state.calling;
    if (item.name == 'ALERT') {
      if (this.state.calling.indexOf('ALERT') == -1) calling += ' ' + item.name;
    } else calling = item.name;
    this.setState({
      bidblocks: this.state.bidblocks,
      bidcards: this.state.bidcards,
      calling: calling
    })
  }
  /**
   * 叫牌
   * item 点击的叫品 行列坐标。{row, col}
   * 点击某个叫品，其他叫品要联动（active=0/1）
   */
  _bidblock = (item) => {

    // alert(item.row+"--"+item.col);
    // window.___bidblocks = this.state.bidblocks;
    if (!this.state.active) return false;
    // console.log('item........................')
    // console.log(item)
    const bidblocks = this.state.bidblocks;
    for (let i = 0; i < bidblocks.length; i++) {
      for (let j = 0; j < bidblocks[i].length; j++) {
        if (i < item.row || (i == item.row && j >= item.col))
          if (bidblocks[i][j].active != null) bidblocks[i][j].active = 0;
        if (i > item.row || (i == item.row && j < item.col))
          if (bidblocks[i][j].active != null) bidblocks[i][j].active = 1;

      }
    }
    this.state.bidcards.map((item) => {
      item.active = 1;
      return item;
    })
    //console.log('...item...',item,this.state.bidblocks[item.row][item.col]);  
    this.setState({
      bidblocks: this.state.bidblocks,
      bidcards: this.state.bidcards,
      calling: this.state.bidblocks[item.row][item.col].name
    })
  }
  /**
   * 确认提交
   * 这里应该 补充 确认后，叫品是什么。比如：this.bid 记录最后叫品。
   */
  handleConfirm = () => {
    // 调用 聊天打牌 发送数据
    Out.call(this.state.calling);
    this.setState({
      calling: ''
    })
  }

  handleReset = () => {
    this.setState({
      bidblocks: this.state.bidblocks.map((item) => {
        return item.map((i) => {
          if (i.active != null) i.active = 1;
          return i;
        });
      }),
      bidcards: this.state.bidcards.map((item) => {
        item.active = 1;
        return item;
      })
    });
  }

  /**
   * 通过 curCall 初始化 bidPanel 隐藏无效的叫品。
   */
  initPanel = (data) =>{
    //const curCall = "4NT";//this.props.tableStore.curCall;
    const curCall = data;
    //const showBlock = this.props.tableStore.bidState.showBlock;
    
    const bidblocks = this.state.bidblocks;
    const suits = ['NT', 'S', 'H', 'D', 'C'];
    if (curCall) {
      bidblocks.splice(0, curCall.slice(0, 1) - 1 - (7 - bidblocks.length));
      if (curCall.slice(1) == "NT") bidblocks.splice(0, 1) // 如果是 nt 直接删除本行
      else bidblocks[0].forEach((item, index) => {
        if (index >= suits.indexOf(curCall.slice(1))) item.active = null;
      })
    }
    this.setState({ bidblocks: bidblocks })
  }
  getCallRows() {
    //debugger;
    const { first, call, note } = this.props.tableStore.state.calldata;
    if (!first) return [];
    const lsto = new Position('N').lsto(first);
    const pos = [
      new Position('N').lshift(lsto).cn,
      new Position('E').lshift(lsto).cn,
      new Position('S').lshift(lsto).cn,
      new Position('W').lshift(lsto).cn,
    ];
    const header = <tr>
      <td>&nbsp;</td><td>{pos[0]}</td><td>{pos[1]}</td><td>{pos[2]}</td><td>{pos[3]}</td>
    </tr>

    const rows = call.map((item, index) => {
      //console.log(item)
      let call = null; // 用于处理 "2H =1="
      return <tr key={index}>
        <td key='0'>&nbsp;{index + 1}</td>
        {item.map((item1, index1) => {
          call = item1.split(' ');
          if (!call[0]) return ' ';
          if (call.length == 2) {
            call[1] = call[1].slice(1, 2);
            return (
              <td title={note[call[1] - 1]} key={index + index1 + 1} className='alertTd'>
                <img className='suit' src={`/cards/bids/${call[0]}.svg`} />
              </td>
            );
          }
          return (
            <td key={index + index1 + 1}>
              <img className='suit' src={`/cards/bids/${call[0].toUpperCase()}.svg`} />
            </td>
          );
        })}
      </tr>
    })
    return (
      <table>
        <thead>
          {header}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
  render() {
    //this.initPanel();  //zsx修改：解决根据叫品，隐藏部分叫牌
    console.log('ffff:' + this.width)
    const bidblocks = this.state.bidblocks.map((e1, i1) => e1.map((e2, i2) => {

      //if (e2.active == 0) animation['brightness'] = 0.6;

      return <BidBlock key={e2.name} name={e2.name}
        active={e2.active}
        onclick={this.handleCall.bind(this, { row: i1, col: i2 })} />
    }))

    // 叫牌记录。
    const rows = this.getCallRows();
    const showBlock = this.props.tableStore.bidState.showBlock;
    const bidCards = <Fragment>
      <BidCard name='PASS' active={this.state.bidcards[0].active}
        onclick={this.handleCall.bind(this, { name: 'PASS' })}
      />
      <BidCard name='X' active={this.state.bidcards[2].active}
        onclick={this.handleCall.bind(this, { name: 'X' })}
      />
      <BidCard name='XX' active={this.state.bidcards[3].active}
        onclick={this.handleCall.bind(this, { name: 'XX' })}
      />
      <BidCard name='ALERT' active={this.state.bidcards[1].active}
        onclick={this.handleCall.bind(this, { name: 'ALERT' })}
      />
    </Fragment>

    const opPad = <Fragment>
      {bidblocks}
      {bidCards}
      <button onClick={this.handleConfirm}>确认</button>
      <button onClick={this.handleReset}>重置</button>
      <div className='calling'>{this.state.calling}</div>
    </Fragment>

    return (
      <div id='bidpanel' className='bidpanel' ref={this.ref}>
        <div>
          {rows}
        </div>
        {showBlock ? opPad : null}
      </div>
    );
  }
}
/**
 * 输入： 
 *    props.name    : 3NT 叫品
 *    props.active  : 0,1 是否可点击
 *    props.onclick : 由父组件做点击处理
 * 输出：
 *    props.onclick : 通过事件 影响 state.bidblocks，state.bidcards
 */
class BidBlock extends Component {
  render() {
    const suit = this.props.name.slice(-1);
    const bgcolor = {
      T: '#eeeeee', S: '#eeeeFF', H: '#FFeeee'
      , D: '#ffffee', C: '#eeffee'
    };
    //const bgcolor = { T: '#eeeeee', S: '#eeeeee', H: '#eeeeee'
    //  , D: '#eeeeee', C: '#eeeeee' };
    const style = {
      backgroundColor: `${bgcolor[suit]}`,
    }
    let animation = { brightness: 0 };
    let onclick = this.props.onclick;
    if (this.props.active == null) {
      animation['opacity'] = 0;
      onclick = (e) => e.preventDefault();
    }
    if (this.props.active == 0) animation['brightness'] = 0.6;
    if (this.props.active == 1) animation['brightness'] = 1;

    return (
      <Motion animation={animation} className='bidblock'>
        <div className='cn1' onClick={onclick} style={style}>
          <img className='suit' src={`/cards/bids/${this.props.name}.svg`} />
        </div>
      </Motion>
    );
  }
}
/**
 * 输入：
 *    props.name    ：PASS,ALERT,X,XX
 *    props.active  ：1 （亮，可点）0 （灰，点中）
 * 输出：
 * 
 * 
 * todo：他应该接收一个 props 函数，接收输出。也就是被点击后的状态。
 *      通过 props 接收也可以，通过 context api 接收也可以。
 */
class BidCard extends Component {
  render() {
    const bgcolor = { PASS: '#88FF88', X: '#FF8888', XX: '#FF3333', ALERT: '#8888FF' };
    // const width = { PASS: '23.3vh', X: '11.4vh', XX: '11.4vh', ALERT: '11.4vh' };
    const width = { PASS: '17.35vh', X: '8.5vh', XX: '8.5vh', ALERT: '8.5vh' };
    const style = {
      backgroundColor: `${bgcolor[this.props.name]}`,
      width: `${width[this.props.name]}`,
    }
    let animation = {};
    if (this.props.active == 0)
      animation && (animation['brightness'] = 0.6);
    if (this.props.active == 1) {
      animation && (animation['brightness'] = 1);
    }
    return (
      <Motion animation={animation} className='bidcard'>
        <div className='cn1' onClick={this.props.onclick} style={style}>
          <img className='suit' src={`/cards/bids/${this.props.name}.svg`} />
        </div>
      </Motion>
    );
  }
}

export default BidPanel;