/**
 * TableView 组件
 *    输入参数：table
 *    输出：加载各个界面元素，显示界面。
 * 
 * Debug 纯视图组件
 */
import React from 'react';
import Debug from './Debug'
import Claim from './Claim'
import BidPanel from './BidPanel'
import { Imps, Seats, Tricks } from './Headers'
import Prepare from './Prepare'
import UserTags from './UserTag'
import Timer from './Timer'
import Card from '../../components/Card';
import './TableView.css'
import { inject, observer } from 'mobx-react';
/**
 * 用来模拟 table 对象保证 tableview 组件可独立测试。
  */
const _tableObj = {
  cards: [],
  state: {
    scene: 0,
    calldata: [['1C', '2C', 'PASS', 'PASS'], ['3H', 'PASS', 'PASS', '4NT'], ['PASS', 'PASS', 'PASS', '']],
    user: {
      E: { ready: 0, name: '张三', face: '/imgs/face1.png', rank: '大师' },
      S: { ready: 0, name: '李四', face: '/imgs/face2.png', rank: '专家' },
      W: { ready: 0, name: '王五', face: '/imgs/face1.png', rank: '王者' },
      N: { ready: 0, name: '赵六', face: '/imgs/face2.png', rank: '钻石' }
    },
  },
  ref: { E: null, S: null, W: null, N: null },
  openDebug: e => null,
  debug: e => null,
  lastTrick: e => null,
  timer: { stop: e => null, start: e => null },
  claim: e => null,
  bid: e => null,
}


/**
 * TableView 的用途
 * 增加 TableView 的目的是 把 牌桌的排版进行单独设置。增加view1,2,3
 * 本代码原本是在 Table 的 render 里写的。
 * 完整 copy 到这里，然后替换 this 为 props.table 进行简单的替换完成。
 * 
 * 单元测试：
 * 开启：//const table = _tableObj;
 */
class TableView extends React.Component {
  /* 这里应该对 props 做处理，提高 view 的独立性。
    换句话说，这里对入口数据进行判断。如果入口数据有错误，照样正常显示view
    比如用模拟数据。
  */
  render() {
    console.log('******************')

    const props = this.props;
    const table = props.table;
    const tableStore = props.tableStore;

    const cards = Card.createComponents(table.props.tableStore.state.cards);
    const stat = Object.values(table.props.tableStore.state.user).map(e => e.ready);

    return (
      <div>
        {(table.props.tableStore.state.scene == 1) ?
          <div className='panel'>
            <BidPanel />
          </div> : null
        }
        <div id='table' className='table'>
          <div id='header' className='header'>
            <div className='re imps'><Imps /></div>
            <div onClick={table.openDebug} className='re seats'><Seats vul='EW' /></div>
            <div onClick={table.lastTrick.bind(table)} className='re tricks'><Tricks /></div>
            <div className='re time'>
              <Timer
                name='Timer'
                handle={table.timer}
                time='1:2:5'
                callback={() => console.log('计时结束')} />
            </div>
            <button onClick={table.claim} className="claimbtn disable">摊牌</button>
            <button onClick={() => table.timer.stop()} onDoubleClick={() => table.timer.start()} className="calljudge">呼叫裁判</button>
            <button onClick={table.lastTrick.bind(table)} className="lasttrick">上一墩牌</button>
            <button onClick={table.bid.bind(table)} className="showbid">显示叫牌</button>

            {/* <div className='re' id='lastTrick'>上墩牌</div>*/}
            {/* 注意比赛结果会挂载到下面的div */}
            <div id='result'></div>
            <div id='sound'></div>
          </div>

          <div id='body' className='body'>
            {table.props.tableStore.state.lastTrick ? <div id='lastTrick' className='lastTrick'>33333</div> : null}
            {table.props.tableStore.state.scene == 3 ?
              <Claim number='8' onSubmit={table.handleClaim} />
              : null}
            <div id='clock'></div>
            <div id='north' className='north' ref={table.ref.N}></div>
            <div id='east' className='east' ref={table.ref.E}></div>
            <div id='south' className='south' ref={table.ref.S}></div>
            <div id='west' className='west' ref={table.ref.W}></div>
            <div id='board' className='board' ref={table.ref.board}>
              <UserTags user={table.props.tableStore.state.user} myseat={table.props.tableStore.myseat} />
              {table.props.tableStore.state.scene == 0 ? <Prepare stat={stat} ready={table.handleReady} /> : null}
            </div>
            {cards}
          </div>
          {table.props.tableStore.state.debug ? <Debug o={table} /> : null}

          <div id='footer' className='footer'>
            <div id='video'></div>
            <div id='userlist'>
              <table>
                <tr>
                  <td>队员1</td><td></td><td>等级</td>
                </tr>
                <tr>
                  <td>队员2</td><td></td><td>等级</td>
                </tr>
                <tr>
                  <td>队员3</td><td></td><td>等级</td>
                </tr>
                <tr>
                  <td>队员4</td><td></td><td>等级</td>
                </tr>
              </table>

            </div>
            <div id='message' className='message'>
              <div id='msg'>聊天窗口</div>
              <div>
                <input id='msginput' type='text' defaultValue='请输入……' />
                {/* <input id='msgbtn' type='button' value='发送' onClick={table.testChat} /> */}
              </div>
            </div>
            <div id='advertising'></div>
          </div>
          <div id='ad'></div>
        </div>

      </div >
    );
  }

}

const ObTableView = inject('tableStore')(observer(TableView));
export default ObTableView;