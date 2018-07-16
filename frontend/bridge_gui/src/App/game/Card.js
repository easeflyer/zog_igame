import React from 'react';
import { Motion, spring } from "react-motion"; // 用 ant-motion 替代
import TweenOne from 'rc-tween-one';

/**
 * props 说明
 *      animation   和 TweenOne 的 animation 同步
 *      left，top   非动画定位
 *      size        大小
 *      card        5S 黑桃5
 */
class Card extends React.Component {
    /**
     * left: 目标定位 x
     * top: 目标定位 目标定位 y
     * delay: 延迟
     * rotate: 角度
     * duration: 动画总时间
     */
    render() {

        return (
            <TweenOne
                animation={{
                    ...this.props.animation,
                    ease: 'easeOutQuint',        // 缓动参数 参考蚂蚁手册 easeOutExpo
                    //onComplete: this.toc         // 恢复 delay 为立即相应
                }}
                style={{
                    position: 'absolute',
                    left: `${this.props.left}px`,
                    top: `${this.props.top}px`,
                    height: this.props.size * 1,
                    width: this.props.size * 0.7,
                }}
            >

                    <img
                        src={`/cards/${this.props.card}.svg`}
                        style={{ width: "100%", height: "100%" }}
                    />
            </TweenOne>
        )
    }
}
Card.suits = ['S', 'H', 'D', 'C'];
export default Card