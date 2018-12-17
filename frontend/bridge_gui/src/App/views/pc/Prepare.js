import React, { Component } from 'react';
import './Prepare.css'
import { inject, observer } from 'mobx-react';
import Position from '../../common/Position';
//import { rotateSeat } from '../../common/util'
@inject('tableStore')
@observer
export default class Prepare extends Component {
    /**
     * 四个按钮的顺序为：ESWN
     * <button className="ready" ready(0)>准备/就绪</button>
     * 四个按钮方位定位是死的。具体对应的玩家 利用 position 进行转圈。
     */
    render() {
        const state = ['准备', '就绪'];
        const clsName = ['', 'ready'];
        const user = this.props.tableStore.state.user;

        const myseat = this.props.tableStore.myseat;
        const lsto = new Position('S').lsto(myseat);
        const ArrPrepare = "ESWN".split('').map((seat) => {
            const pos = new Position(seat).lshift(lsto);
            const ready = user[pos.sn].ready;
            const cls = clsName[ready];
            return <button key='0' className={cls}
                onClick={() => this.props.ready(pos.sn)}>
                {state[ready]}</button>
        });
        return (
            <div className='prepare'>
                {ArrPrepare}
            </div>
        )
    }
}
