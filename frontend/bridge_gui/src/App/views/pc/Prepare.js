import React, { Component } from 'react';
import './Prepare.css'
import {inject,observer} from 'mobx-react';
@inject('tableStore')
@observer
export default class Prepare extends Component {
    render() {
        const stat = Object.values(this.props.tableStore.state.user).map(e => e.ready);
        const state = ['准备', '就绪'];
        const ready = stat.map(element => element ? 'ready' : '');
        return (
            <div className='prepare'>
                <button key='0' className={ready[0] + ' pe'}
                    onClick={() => this.props.ready(0)}
                >{state[stat[0]]}
                </button>
                <button key='1' className={ready[1] + ' ps'}
                    onClick={() => this.props.ready(1)}
                >{state[stat[1]]}
                </button>
                <button key='2' className={ready[2] + ' pw'}
                    onClick={() => this.props.ready(2)}
                >{state[stat[2]]}
                </button>
                <button key='3' className={ready[3] + ' pn'}
                    onClick={() => this.props.ready(3)}
                >{state[stat[3]]}
                </button>
            </div>
        )
    }
}