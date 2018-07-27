import React, { Component } from 'react';
import './Prepare.css'
export default class Prepare extends Component {
    componentWillReceiveProps(newProps){
        console.log(newProps)
    }
    render() {
        // const stat = this.props.stat;
        const state = ['准备', '就绪']
        // const ready = stat.map(element => element ? 'ready' : '');
        const ready = ''
        // console.log(ready)
        return (
            <div className='prepare'>
                <button key='0' className={ ' pe'}
                    // disabled
                    // onClick={() => this.props.ready()}
                >
                {this.props.readyState.east?'就绪':'准备'}
                {/* {state[this.props.stat[0]]} */}
                </button>
                <button key='1' className={ ' ps'}
                    disabled={this.props.readyState.south}
                    onClick={() => this.props.handleReady()}
                    >
                {this.props.readyState.south?'就绪':'准备'}
                {/* {state[this.props.stat[1]]} */}
                </button>
                <button key='2' className={' pw'}
                    // disabled
                    // onClick={() => this.props.ready()}
                    >
                {this.props.readyState.west?'就绪':'准备'}
                {/* {state[this.props.stat[2]]} */}
                </button>
                <button key='3' className={' pn'}
                    // disabled
                    // onClick={() => this.props.ready()}
                >
                {this.props.readyState.north?'就绪':'准备'}
                {/* {state[this.props.stat[3]]} */}
                </button>
            </div>
        )
    }
}