import React, { Component } from 'react';
import settings from '../game/settings';


/**
 * Game  是一局比赛，涉及到了比赛者，以及和比赛相关的其他信息。重点在于比赛。
 * Table 是一桌游戏的界面：重点在于 一桌
 */
class Table extends Component {
    constructor(props){
        super(props);
        this.width = window.screen.width;
        this.height = window.screen.height;
        console.log('width:'+this.width)
        console.log('height:'+this.height)
        if(this.width < 400) settings.scale = 0.5;
    }
    render(){
        const style = {
            width:'800px',
            height:'600px',
            backgroundImage:'url(/imgs/bg1.png)'
        }
        return(
            <div id='table' style={style}>{this.props.children}</div>
        );
    }
}

//export default Table
export default Table