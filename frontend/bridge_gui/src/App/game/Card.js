import React from 'react';
import { Motion, spring } from "react-motion"; // 用 ant-motion 替代
import TweenOne from 'rc-tween-one';

/**
 * react-motion 的参考看这里：https://npm.taobao.org/package/react-motion
 * 
 * 注意 Cards 动画效果。
 * 
 * 在组件内调用 setState 修改 x,y 是标准的方法。
 * 如果在父组件 通过修改 position 的方式也可以。
 * 但是问题是： 
 *      第二次渲染修改 props ？为什么理解为修改？ 而不是新建呢？
 *      猜想原因是：setState 做的判断。
 */

class Cards extends React.Component {
    state = {
        x: 0,
        y: 590, // 默认位置放在屏幕外边。 没有起作用。
        width: 80 * 0.7,
        height: 80,
        zIndex: 0
    }
    /**
     * @param {*} props 
     * 写清楚props  都有那些属性。
     * seat 这张牌是 那个方位的
     */
    constructor(props) {
        super(props);
        this.animation = {
            delay: 0,
        }

        this.suit = props.card.slice(1);
        this.pip = props.card.slice(0, 1);
        // props.size  80
        // props.card  5D
        // props.zIndex 负责牌的叠放顺序。
        this.state.width = props.size * 0.7
        this.state.height = props.size
        this.state.x = props.position.x
        this.state.y = props.position.y

        if(props.table) props.table.cards[props.index] = this;
        // console.log('console.log(props.position.x);')
        // console.log(props.position.x);
    }
    onclick = () => {
        console.log('thi.................')
        console.log(this);
        let x1 = 0, y1 = 0;
        const table = this.props.table;
        const key = this.props.seat; // 
        x1 = table.seat[key][1].x
        y1 = table.seat[key][1].y
        this.setState({
            x: x1, y: y1
            //x:this.props.table.
        });
    }
    //componentWillUpdate
    /**
     * 生命周期函数的使用
     * 注意这里 一定要用 nextProps 参数。如果直接写 this.props. 则接收到的是旧值
     * 下面 setState 的方式也是可行的。
     * 这里使用生命周期函数的原因是 render 里面没有直接使用 props 而是用的 state
     * 
     * TODO:此函数好像已经不建议了。应该更换。
     */
    componentWillReceiveProps(nextProps) {
        this.state.x = nextProps.position.x;
        this.state.y = nextProps.position.y;
        this.animation.delay = (nextProps.index%13) * 80  // 计算缓动 %13 为了4家同时发牌
    }
    toc = (e) => {
        this.animation.delay = 0;
    }
    render() {
        //console.log('render...............')
        // 设置 Motion 弹性 x,y 为目标坐标 考虑修改成 ant-motion 对应的
        const getSprings = (x, y) => {
            const springConfig = {
                stiffness: 250,  // 硬度
                damping: 28,     // 阻尼 68
                precision: 0.01
            };

            return {
                x: spring(x, springConfig),
                y: spring(y, springConfig)
            };
        };
        const getStyle = (x, y, width, height, zIndex) => ({
            // WebkitTransform: `translate3d(${x}px, ${y}px, 0)`,
            // transform: `translate3d(${x}px, ${y}px, 0)  rotate(${0}deg)`,
            position: "absolute",
            top: y,
            left: x,
            //animation-delay:0.3s,  // 这里写延迟动画没有意义。因为动画不是 css 产生的。
            //webkitAnimationDelay:`${this.props.index*0.8}s`, /* Safari 和 Chrome */
            width: `${width}px`,
            height: `${height}px`,
            zIndex: `${zIndex}`,
            transform: `rotate(${this.props.rotate}deg)`
        });
        let { index, card, size } = this.props;
        //if("SHDC".indexOf(this.suit) == -1) card = 'back';
        if (this.pip == 'X') card = 'back';
        return (
            /**
             * 解读
             * <Motion   style 负责目标坐标>
             * {回调函数{x,y}} 从当前坐标，逐渐移动到目标坐标。每次变化把数值发送给回调
             * 回调函数负责调整 <div> 的位置。
             * 
             * 最外层的 div 主要目的就是设置 zIndex 使得最后一张牌在最上面。
             */
            <div style={{ position: 'absolute', zIndex: this.props.table.zindex++ }}>
                <TweenOne
                    animation={{
                        x: this.state.x,
                        y: this.state.y,
                        //scale: 0.8,
                        delay: this.animation.delay,
                        rotate: this.props.rotate,  // 牌旋转到位。
                        duration: 300,
                        ease: 'easeOutQuint',        // 缓动参数 参考蚂蚁手册 easeOutExpo
                        onComplete: this.toc         // 恢复 delay 为立即相应
                    }}
                    //paused={props.paused}
                    style={{
                        position: 'absolute',
                        height: size * 1,
                        width: size * 0.7,
                        //transform: `rotate(${this.props.rotate}deg)` 牌不旋转到位。
                    }}
                //className="code-box-shape"
                >
                    <div
                        onClick={this.onclick}
                        id={'card'+this.props.index}
                        style={{
                            width: size * 0.7,
                            height: size * 1,
                            position: 'absolute',
                        }}
                    >
                        <img
                            src={`/cards/${card}.svg`}
                            style={{ width: "100%", height: "100%", zIndex: this.props.table.zindex++ }}
                        />
                    </div>
                </TweenOne>
            </div>
        )
    }
}
Cards.suits = ['S', 'H', 'D', 'C'];
export default Cards