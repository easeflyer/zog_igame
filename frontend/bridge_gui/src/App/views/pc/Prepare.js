import React, { Component } from 'react';
import './Prepare.css'
import {inject,observer} from 'mobx-react';
import {rotateSeat} from '../../common/util'
@inject('tableStore')
@observer
export default class Prepare extends Component {
    render() {
        const stat = Object.values(this.props.tableStore.state.user).map(e => e.ready);
        const state = ['准备', '就绪'];
        const ready = stat.map(element => element ? 'ready' : '');
        const ArrPrepare = [
            <button key='0' className={ready[0]}
                    onClick={() => this.props.ready(0)}
                >{state[stat[0]]}
                </button>,
                <button key='1' className={ready[1] }
                    onClick={() => this.props.ready(1)}
                >{state[stat[1]]}
                </button>,
                <button key='2' className={ready[2]}
                    onClick={() => this.props.ready(2)}
                >{state[stat[2]]}
                </button>,
                <button key='3' className={ready[3]}
                    onClick={() => this.props.ready(3)}
                >{state[stat[3]]}
                </button>
        ]
        rotateSeat(ArrPrepare,this.props.tableStore.myseat)
        return (
            <div className='prepare'>
                {ArrPrepare}
            </div>
        )
    }
}