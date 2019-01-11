import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import './Claim.css';
import { inject, observer } from 'mobx-react';
import Out from './Output';
/**
* props
* number 剩余数字
* active 点击状态
* myclaim 是否自己　claim   true,false
*/
@inject('tableStore')
@observer
class Claim extends Component {

    state = {
        number: 0,
        value: 0,
        submit: 0
    }

    handleClick = (value) => {
        console.log('ccc...')
        this.setState({
            value: value
        })
    }
    // componentDidMount() {
    //     this.state.number = this.props.tableStore.getUnPlayCardNumber();
    // }
    handleSubmit = (value) => {
        if (value === 2) {
            this.setState({
                submit: 1
            })
            //this.props.onSubmit();
            const seat = this.props.tableStore.myseat;
            const num = this.state.value;
            Out.claim(seat, num);
        } else {
            Out.claimConfirm(value);
        }
    }
    handleSubmit1 = () => {

    }

    myClaim() {
        const number = this.props.tableStore.getUnPlayCardNumber();
        const cblocks = Array(number + 1).fill('').map((_, index) =>
            <Cblock key={index} number={index}
                active={this.state.value == index + 1 ? 0 : 1}
                onClick={this.state.submit ? null : this.handleClick.bind(this, index + 1)} />
        )
        return (
            <div id='myclaim' className='claim'>
                <b>剩下还可赢：</b><br />
                {cblocks}
                {this.state.submit ?
                    <button disabled='true'>等待确认..</button> :
                    <button onClick={this.handleSubmit.bind(this, 2)}>　确　认　</button>
                }
            </div>
        );
    }

    oClaim() {
        const claimMsg = this.props.tableStore.state.claim.msg;
        const dummySeat = this.props.tableStore.dummySeat;
        return (
            <div id='otherclaim' className='claim'>
                <br />
                {claimMsg}
                {dummySeat == 'S' ? <div><i><br />等待确认..</i></div>:
                    <div>
                        <button onClick={this.handleSubmit.bind(this, 1)}>同意</button>
                        <button onClick={this.handleSubmit.bind(this, 0)}>拒绝</button>
                    </div>
                }
            </div>
        );
    }
    render() {
        const myClaim = this.myClaim();
        const otherClaim = this.oClaim();
        return (
            this.props.tableStore.state.claim.seat == this.props.tableStore.myseat
                ? myClaim : otherClaim
        )
    }
}






class Cblock extends Component {
    /**
     * 参考 bidblocks
     * props.number 数字
     */
    render() {
        const animation = (this.props.active == 0) ?
            { brightness: 0.6 } : { brightness: 1 }
        return (
            <TweenOne
                animation={{
                    ...animation,
                    duration: 100,
                    ease: 'easeOutQuint',       // 缓动参数 参考蚂蚁手册 easeOutExpo
                }}
                className='cblock'
            >

                <div className='cn1' onClick={this.props.onClick} style={{ backgroundColor: '#eeeeee' }}>
                    {this.props.number}
                </div>
            </TweenOne>
        );
    }
}


export default Claim;