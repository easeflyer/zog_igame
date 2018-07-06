import React, { Component } from 'react';
import settings from '../game/settings';
import Table from './Table';

/**
 * Game  是一局比赛，涉及到了比赛者，以及和比赛相关的其他信息。重点在于比赛。
 * Table 是一桌游戏的界面：重点在于 一桌
 */

class Game extends Component {
    constructor(props){
        super(props);
        this.width = window.screen.width;
        this.height = window.screen.height;
        console.log('width:'+this.width)
        console.log('height:'+this.height)
        if(this.width < 400) settings.scale = 0.5;
    }
    render(){
        return(
            <Table></Table>
        );
    }
}

//export default Table
export default Game