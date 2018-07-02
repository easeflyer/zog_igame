import { Toast } from 'antd-mobile';
import  Models  from '../../Models/Models'

// model: og.igame , og.igame.team
// methods: search2(查询赛事列表) ,  get_users(查询所有用户) , create_team(创建赛队) , get_own_teams(查询我创建的赛队) , register_game(报名比赛)

class Currency{
    constructor(callback) {
        this.callback = callback; 
        this.word='';
        this.list=null;
    }
    currency = (method,data)=>{       
        const json={
            'model': 'og.igame',
            'method': method,
            'args': data,
            'kw': {},
        }
        const cb = (res)=>{
            if (res){
                this.callback(res);
            }else{
                return null;
            }
        }
        const m = Models.create();
        m.query('exec', json, cb);
    }
    // 按关键字搜索比赛
    searchList(list,word,callback){
        this.list = list;
        this.word = word;
        //在list中搜索
        if(!this.list){
            callback(null);
        }else{
            if(this.word){
                this.list = this.list.filter(item => {
                    return item.name.indexOf(this.word)!==-1 
                });
                callback(this.list);
            }else{
                callback(this.list);
            }
        }
    } 
}

export {Currency}