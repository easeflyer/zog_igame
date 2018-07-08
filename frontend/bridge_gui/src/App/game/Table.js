import React, { Component } from 'react';
import settings from '../game/settings';


/**
 * Game  是一局比赛，涉及到了比赛者，以及和比赛相关的其他信息。重点在于比赛。
 * Table 是一桌游戏的界面：重点在于 一桌
 */
class Table extends Component {
    constructor(props){
        /**
         * 重构参考： 打牌的几个阶段，应该在规则里面，调入进来。
         * 属性列表：
         *  scene: 1 叫牌，2 打牌 3 claim 4 展示比分
         *         1 
         * 
         */

        super(props);
        this.width = window.screen.width;
        this.height = window.screen.height;
        console.log('width:'+this.width)
        console.log('height:'+this.height)
        if(this.width < 400) settings.scale = 0.5;
    }
    render(){
        const css = {
            table:{
                position:'relative',
                width:this.width,
                height:this.height,
                backgroundImage:'url(/imgs/bg1.png)',
                backgroundSize:'100% 100%',
                backgroundAttachment:'fixed'
            },
            header:{
                width:this.width,
                height:'90px',
                backgroundColor:'#552211'
            },
            body:{
                position:'relative',
                width:this.width,
                height:this.height-130,
                //backgroundColor:'#552211'
            },
            footer:{
                position:'absolute',
                bottom:'0',
                width:this.width,
                height:'40px',
                backgroundColor:'#552211'
            },
            east:{
                position:'absolute',
                right:'0',
                top:'90px',
                width:'90px',
                height:this.width,
                backgroundColor:'#880000'
            },
            south:{
                position:'absolute',
                bottom:'0px',
                width:this.width,
                height:'90px',
                backgroundColor:'#eeeeee'
            },
            west:{
                position:'absolute',
                top:'90px',
                width:'90px',
                height:this.width,
                backgroundColor:'#008800'
            },
            north:{
                position:'absolute',
                top:'0',
                width:this.width,
                height:'90px',
                backgroundColor:'#008800'
            }
            
        }
        return(
            <div id='table' style={css.table}>
                <div id='header' style={css.header}></div>
                <div id='body' style={css.body}>
                    <div id='east' style={css.east}>east</div>
                    <div id='west' style={css.west}>west</div>
                    <div id='south' style={css.south}>south</div>
                    <div id='north' style={css.north}>north</div>
                </div>
                <div id='footer' style={css.footer}></div>
            </div>
        );
    }
}

//export default Table
export default Table