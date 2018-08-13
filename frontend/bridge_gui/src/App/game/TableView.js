import React from 'react';
import Debug from './Debug'
import Claim from './Claim'
import BidPanel from './BidPanel'
import Table from './Table'
import { Imps, Seats, Tricks } from './Headers'
import Prepare from './Prepare'
import UserTag from './UserTag'
import Timer from './Timer'
import './TableView.css'
/**
 * TableView 的用途
 * 增加 TableView 的目的是 把 牌桌的排版进行单独设置。增加view1,2,3
 * 本代码原本是在 Table 的 render 里写的。
 * 完整 copy 到这里，然后替换 this 为 this.props.table 进行简单的替换完成。
 */
export default class TableView extends React.Component {
    render() {
        // this.width = window.screen.width;
        // this.height = window.screen.height;
        this.width = this.props.table.width;
        this.height = this.props.table.height;

        this.css = {
            table: {
                // /*width: this.height,*/
                // width: this.width,
                // height: this.height,
                // fontSize: this.height * 0.04 + 'px'
            },
            panel: {
                // top: this.height * 0.32,
                // left: this.height * 0.2,
                // width: this.height * 0.6,
                // height: this.height * 0.6
            },
            header: {
                // width: this.height * 0.2,
                // height: this.height * 0.7,
            },
            body: {
                // width: this.height,
                // height: this.height,
                // fontSize: this.height * 0.04 + 'px'
            },
            footer: {
                // width: this.height * 0.4,
                // height: this.height,
            },
            east: {
                // top: this.height * 0.2,
                // width: this.height * 0.2,
                // height: this.height * 0.6,
            },
            south: {
                // width: this.height,
                // height: this.height * 0.2,
            },
            west: {
                // top: this.height * 0.2,
                // width: this.height * 0.2,
                // height: this.height * 0.6,
            },
            north: {
                // width: this.height,
                // height: this.height * 0.2,
            },
            board: {
                // width: this.height * 0.6,
                // height: this.height * 0.6,
                // top: this.height * 0.2,
                // left: this.height * 0.2,
            },
            result: {
                // width: this.height * 0.6,
                // height: this.height * 0.2,
                // top: this.height * 0.6,
                // left: this.height * 0.2,
                // zIndex: 1000,
                // textAlign: 'center',
                // fontSize: this.height * 0.06 + 'px',
            }

        }

        // 只要 table 和 cards 传入即可。
        const table = this.props.table;
        const cards = this.props.cards;
        const stat = Object.values(table.state.user).map(e => e.ready)
        return (
            <div>
                {(table.state.scene == 1) ?
                    <div className='panel'>
                        <BidPanel calldata={table.state.calldata} />
                    </div> : null
                }
                <div id='table' className='table'>
                    <div id='header' className='header'>
                        <div className='re imps'><Imps /></div>
                        <div onClick={table.openDebug} className='re seats'><Seats /></div>
                        <div onClick={table.testLastTrick} className='re tricks'><Tricks /></div>
                        <div onClick={table.testLastTrick} className='re time'>
                            <Timer
                                name='Timer'
                                handle={table.timer}
                                time='1:2:5'
                                callback={()=>console.log('计时结束')} />
                        </div>
                        <button onTouchEnd={table.claim} className="claimbtn disable">摊牌</button>
                        <button onClick={()=>table.timer.stop()} onDoubleClick={()=>table.timer.start()} className="calljudge">呼叫裁判</button>
                        <button onTouchEnd={table.claim} onClick={table.testLastTrick} className="lasttrick">上一墩牌</button>
                        <button onTouchEnd={table.claim} onClick={table.testBid} className="showbid">显示叫牌</button>

                        {/* <div className='re' id='lastTrick'>上墩牌</div>*/}
                        {/* 注意比赛结果会挂载到下面的div */}
                        <div id='result'></div>
                        <div id='sound'></div>
                    </div>

                    <div id='body' className='body'>
                        {table.state.lastTrick ? <div id='lastTrick' className='lastTrick'></div> : null}
                        {table.state.scene == 3 ? <Claim number='8' myclaim={table.claimseat == table.myseat} onSubmit={table.handleClaim} /> : null}
                        <div id='clock'></div>
                        <div id='east' className='east' ref={table.ref.east}></div>
                        <div id='west' className='west' ref={table.ref.west}></div>
                        <div id='south' className='south' ref={table.ref.south}></div>
                        <div id='north' className='north' ref={table.ref.north}></div>
                        <div id='board' className='board' ref={table.ref.board}>
                            <div className='userTag'><div className='seat'>
                                <UserTag user={table.state.user['east']} table={table} />
                                {/* {Table.seatscn[Table.seats.indexOf(table._shift('east'))]}: */}
                                {/* {table.state.user[table._shift('east')].name} */}
                            </div></div>
                            <div className='userTag'><div className='seat'>
                            <UserTag user={table.state.user['south']} table={table} />
                                {/* {Table.seatscn[Table.seats.indexOf(table._shift('south'))]}: */}
                                {/* {table.state.user[table._shift('south')].name} */}
                            </div></div>
                            <div className='userTag'><div className='seat'>
                            <UserTag user={table.state.user['west']} table={table} />
                                {/* {Table.seatscn[Table.seats.indexOf(table._shift('west'))]}: */}
                                {/* {table.state.user[table._shift('west')].name} */}
                            </div></div>
                            <div className='userTag'><div className='seat'>
                            <UserTag user={table.state.user['north']} table={table} />
                                {/* {Table.seatscn[Table.seats.indexOf(table._shift('north'))]}: */}
                                {/* {table.state.user[table._shift('north')].name} */}
                            </div></div>
                            {table.state.scene == 0 ? <Prepare stat={stat} ready={table.handleReady} /> : null}
                        </div>
                        {cards}
                    </div>
                    {table.state.debug ? <Debug o={table} /> : null}

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