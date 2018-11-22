import Card from '../components/Card'  // 也应该从模型引入
import {ACT0,ACT1,ACT2,ACT3} from '../components/Card'
import Models from '../models/model'
import { flexLayout } from '../libs/layout.js'
import { observable, computed, action } from 'mobx';

class Board{
  event       = '国际大赛';
  site        = '石家庄赛区';
  date        =  '2018.10.1';
  board       = '1';
  west        = '张一';
  north       = '王二';
  east        = '李三';
  south       = '赵四';
  dealer      = 'N';
  vulnerable  = 'None';
  deal        = 'N:.63.AKQ987.A9732 A8654.KQ5.T.QJT6 J973.J98742.3.K4 KQT2.AT.J6542.85';
  scoring     = "IMP";
  declarer    = "S";
  contract    = "5HX";
  result      = null;

  /**
  call:
    [
      [1D      1S   3H =1= 4S]
      ['4NT =2=' X    Pass   Pass]
      [5C      X    5H     X]
      [Pass    Pass Pass]
    ]
   */
  auction = {
    first:this.dealer,
    call:[],
    note:["note1","note2"]
  };
  /**
  first 为 W 意味着所有数据顺序为：W N E S
  tricks
  [
    ['SK =1=' H3 S4 S3]
    [C5 C2 C6 CK]
    [S2 H6 S5 S7]
  ]
   */
  play = {
    first:'W',
    tricks:[],
    note:['note1','note2']
  };


  // 当前手里的牌
  hands = [
    ['SK','SQ','ST','S2','HA','HT',],
    [],
    [],
    [],
  ];

  // 当前墩，参考 play.tricks 顺序参考 play.first
  curTrick = ['D4','DK','H5','-'];
  // get player = () =>{

  // }


}