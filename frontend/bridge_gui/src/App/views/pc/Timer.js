import React from 'react';
// import './Timer.css';
import style from './Timer.module.css'
console.log(style.timername)

export default class Timer extends React.Component {
    seats = '';
    state = {
        h: 0,
        m: 0,
        s: 0,
        ew:0,
        sn:0,
    }
    constructor(props) {
        super(props)
        this.timer = null;
        const time = this.props.time.split(':')
        this.state.h = time[0];
        this.state.m = time[1];
        this.state.s = time[2];
        if (this.props.handle) {
            this.props.handle.stop = this.stop;
            this.props.handle.start = this.start;
        }
    }

    componentDidMount() {
        this.start('ew');
    }

    start = (seats) => {
        this.seats = seats;
        if(!this.timer)this.timer = setInterval(this.dida, 1000)
    }

    stop = () => {
        clearInterval(this.timer);
    }
    dida = () => {
        this.state.s--;
        this.state[this.seats]++;
        if (this.state.s == -1) {
            this.state.s = 59;
            this.state.m--;
        }
        if (this.state.m == -1) {
            this.state.m = 59;
            this.state.h--;
        }
        if (this.state.h == -1) {
            this.state.h = 0;
            this.state.m = 0;
            this.state.s = 0;
            this.stop();
            this.props.callback();
        }
        this.setState({
            h: this.state.h,
            m: this.state.m,
            s: this.state.s
        });
    }
    getTime(sec){
        const date = new Date(sec * 1000); // 格式化成 居中美观。
        return date.getMinutes() + ':' + date.getSeconds();
    }
    render() {
        const fmt = (n) => n < 10 ? '0' + n : '' + n;
        return (
            <div>
                <div className='timername'>{this.props.name}</div>
                <div className='timer'>
                    <div>{fmt(this.state.h)}</div>
                    <div>{fmt(this.state.m)}</div>
                    <div>{fmt(this.state.s)}</div>
                </div>
                <div className='timer1'>
                东西&nbsp;{this.getTime(this.state.ew)}<br />
                南北&nbsp;{this.getTime(this.state.sn)}<br />
                </div>
            </div>
        );
    }
}
