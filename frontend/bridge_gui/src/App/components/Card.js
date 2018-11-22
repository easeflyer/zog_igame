import React from 'react';
import Motion from '../libs/Motion'
//import TweenOne from 'rc-tween-one';
//* active define 0,1,2,3  0 灰色不能点，1 亮色不能点，2 亮色能点, 3 亮色能点突出
const ACT0 = 0;                             // initCards
const ACT1 = { D: 1, L: 2, LC: 3, LCO: 4 }  // dealCards
const ACT2 = 5;                             // play() in board
const ACT3 = 6;                             // out of Screen

/**
 * 一张牌 Card 的功能：
 *      初始位置：props.position
 *      如何动画：props.animation
 *      牌的名称：5S  XS 代表背面
 *      牌的状态：4个状态：0灰色不能点,1亮色不能点，2亮色能点，3亮色能点突出
 *      
 * 
 * props 说明
 *      animation   和 TweenOne 的 animation 同步
 *      position    非动画定位
 *      size        大小
 *      card        5S 黑桃5
 *      zIndex      叠放顺序
 *      onClick     点击绑定到图片上, onclick() 函数执行返回的是一个函数引用。
 *      active      0,1,2  0 灰色不能点，1 亮色不能点，2 亮色能点, 3 亮色能点突出
 * 
 * 关于动画：
 *      分装在 ../lib/Motion
 * 
 * 存在问题：
 * 
 *      X 代表扣着，可能暴露扣着牌的花色数量，比如：XHXHXH,XDXD,XSXSXS  
*/
class Card extends React.Component {
    handleClick = () => false;
    setActive(act) {
        switch (act) {
            case ACT1.D:
                this.props.animation && (this.props.animation['brightness'] = 0.6);
                break;
            case ACT1.L:
                this.props.animation && (this.props.animation['brightness'] = 1)
                break;
            case ACT1.LC:
            case ACT1.LCO:
                this.handleClick = this.props.onClick;
                this.props.animation && (this.props.animation['brightness'] = 1)
                break;
            case ACT2:
            case ACT3:
                this.handleClick = () => false;
                this.props.animation && (this.props.animation['brightness'] = 1)
                break;
            default:
                break;
        }
    }
    render() {
        // 非动画样式，如果有给出就调整，如果没有给出，就不变。
        const getStyle = () => {
            let style = { position: 'absolute' }
            if (this.props.position) {
                style['top'] = this.props.position.y + 'px'
                style['left'] = this.props.position.x + 'px'
            }
            if (this.props.size) {
                style['height'] = this.props.size * 1;
                style['width'] = this.props.size * 0.7;
            }
            return style;
        }
        // 根据 active 调整 card 的状态。影响显示和点击
        this.setActive(this.props.active);
        const card = this.props.card.slice(0, 1) == 'X' ?   // XH  XS XD 都是扣着的
            'back' : this.props.card;


        return (
            <div id={'card' + this.props.index}  // TODO: 这个div定位不理想，只是起到了 zIndex 作用。
                style={{
                    position: 'absolute',
                    zIndex: this.props.zIndex,
                }}
            >
                <Motion animation={this.props.animation} style={getStyle()}>
                    <img onClick={this.handleClick(`${this.props.index}`)}
                        alt={this.props.key}
                        src={`/cards/${card}.svg`}
                        style={{
                            position: 'absolute',
                            width: "100%",
                            height: "100%",
                            // zIndex: this.props.zIndex,
                        }}
                    />
                </Motion>
            </div>
        )
    }
}
/**
 * 用于从 模型的数组 cards 返回 React 组件数组。
 */
Card.createComponents = function (cards) {
    return cards.map((item1, index1) => {
        return item1.map((item2, index2) => {
            return <Card
                active={item2.active}
                onClick={item2.onclick}
                key={item2.key}
                index={item2.key}
                seat={item2.seat}
                animation={item2.animation || ''}
                card={item2.card}
                size={item2.size}
                position={item2.position}
                zIndex={item2.zIndex}
            />
        });
    });
}
Card.suits = ['S', 'H', 'D', 'C'];
/**
 * 
 * @param {*} deals 字符串 一手牌，比如：J95.K862.J97.643
 * 顺序为：黑桃，红桃，方片，梅花
 * @param {*} order 这张牌的序号基数 饕餮鱼
 */
// Card.crateCards = function(deals,order){
//     let index = order;
//     const suits = deals.split('.')
//     suits.map((item,index)=>{
//         item.split('').map((item1)=>{
//             return {
//                 onclick:()=>false,
//                 active:0,
//                 key:index++,

//             }
//         })
//     })
// }
export default Card
export {ACT0,ACT1,ACT2,ACT3}

// 其他参考：


    /**
    if(this.props.active == 3) {
        this.props.animation && ( this.props.animation.onComplete = () => {
            
            // 这张牌消失，非受控，不建议。
            // let cCard = document.querySelector('#card'+this.props.index);
            // cCard.style.display = 'none';
        } )
    }
    */
