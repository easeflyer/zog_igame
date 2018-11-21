import React, { Component } from 'react';
import TweenOne from 'rc-tween-one';
import './Claim.css';
import { inject, observer } from 'mobx-react';
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
        number: 4,
        value: 0,
        submit: 0
    }

    handleClick = (value) => {
        console.log('ccc...')
        this.setState({
            value: value
        })
    }
    componentDidMount() {
        this.props.tableStore.getUnPlayCardNumber();
    }
    handleSubmit = () => {
        this.setState({
            submit: 1
        })
        this.props.onSubmit();
    }
    handleSubmit1 = () => {

    }
    render() {
        const number = this.props.tableStore.state.unPlayCardNumber;
        const cblocks = Array(number).fill('').map((_, index) =>
            <Cblock key={index} number={index + 1}
                active={this.state.value == index + 1 ? 0 : 1}
                onClick={this.state.submit ? null : this.handleClick.bind(this, index + 1)} />
        )
        console.log(cblocks)
        const myClaim = <div id='myclaim' className='claim'>
            <h3>请选择你要Claim的墩数？</h3>
            {cblocks}
            {this.state.submit ?
                <button disabled='true' onClick={this.handleSubmit}>等待确认..</button> :
                <button onClick={this.handleSubmit}>　确　认　</button>
            }
        </div>
        const otherClaim = <div id='otherclaim' className='claim'>
            别人claim
            <button onClick={this.handleSubmit}>同意</button>
            <button onClick={this.handleSubmit}>拒绝</button>
        </div>

        return (
            this.props.tableStore.boardState.claim.seat == this.props.tableStore.myseat
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