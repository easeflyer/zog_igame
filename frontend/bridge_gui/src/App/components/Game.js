import React, { Component } from 'react';
import Table from './Table';
import GameModel from '../models/Game'
import Process from '../models/newProcess'
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Out from "../views/pc/Output";
import {cardImgs,imgPreLoad} from '../common/util'
/**
 * Game  是一局比赛，涉及到了比赛者，以及和比赛相关的其他信息。重点在于比赛。
 * Table 是一桌游戏的界面：重点在于 一桌
 */
@inject('tableStore')
@withRouter
@observer
class Game extends React.Component {
    constructor(props) {
        /**
         *  属性列表：
         *  屏幕大小
         */
        super(props);
        this.debug=true;
        this.init();// 屏蔽鼠标右键
        if(!this.debug) Process.start();
        window.__debug = this.debug;
        // this.width = window.screen.width;
        // this.height = window.screen.height;
        // console.log('width:' + this.width)
        // console.log('height:' + this.height)
        //if (this.width < 400) settings.scale = 0.5;

    }
    /**
     * 做一些初始化操作，比如屏蔽鼠标右键。
     * 屏蔽下来刷新等。
     */
    init() {
        // new Process().start()
        // 图片预加载
        // let cardImgs1 = cardImgs()
        // imgPreLoad(cardImgs());
        //window.__cardImgs = cardImgs1;

        this.props.tableStore.tableId = this.props.match.params.tableid;
        if (this.debug) return;  // 去掉本行
        window.document.oncontextmenu = function () {
            //alert('请不要点击鼠标右键！');
            return false;
        }
        document.ondragstart=(e)=>e.preventDefault(); // 屏蔽拖拽
        document.onselectstart=(e)=>e.preventDefault(); // 屏蔽选中
        //document.onclick=()=>alert(22);

        document.onkeydown = function (e) { // 屏蔽f5,f12 keycode == 116,123
            e = window.event || e;
            var keycode = e.keyCode || e.which;
            if ([116,123].indexOf(keycode) != -1) {  
                if (window.event) {// ie
                    try { e.keyCode = 0; } catch (e) { }
                    e.returnValue = false;
                } else {// firefox
                    e.preventDefault();
                }
            }
        }
    }
    /**
     * 检查用户登录 开启游戏
     */
    render(){
        //const gameModel = new GameModel();
        //const tableId = this.props.params.tableid;
        Out.ckLogin();
        // return <Table user={gameModel.user} />;
        return <Table />;
        // const table = new Table();
        // return table.test1();
        // unitTest
        //return <div style={{width:'80vh',height:'60vh',backgroundColor:'#eeeeee'}}></div>;
    }

}

//export default Table
export default Game