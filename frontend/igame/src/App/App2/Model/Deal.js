import { Toast } from 'antd-mobile';
import  Models  from '../../Models/Models'

// 请求赛事列表及相关操作
class DealList{
    constructor(callback) {
        this.callback = callback; 
        this.word='';
        this.list=null;
    }

    // 请求赛事列表，请求所有赛事信息，无返回值
    eventList = ()=>{       
        const json={
            'model': 'og.igame',
            'method': 'search2',
            'args': [[]],
            'kw': {},
        }
        
        const questEvent = (res)=>{
            if (res){
                this.callback(res);
            }else{
                return null;
            }
        }
        const m = Models.create();
        m.query('exec', json, questEvent);
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

// 请求用户列表信息
class DealUsers{
    constructor(callback){
        this.callback = callback;
    }

    users=()=>{
        const json={
            'model': 'og.igame',
            'method': 'get_users',
            'args': [[]],
            'kw': {},
        }
        const questFriends = (res)=>{
            if (res){
                console.log(res)
                this.callback(res);
            }else{
                return null;
            }
        }
        const m = Models.create();
        m.query('exec', json, questFriends);
    }
}



// 请求赛队列表信息
class DealTeams{
    constructor(callback){
        this.callback = callback;
    }

    myTeams=()=>{
        const json={
            'model': 'og.igame',
            'method': 'search2',
            'args': [[]],
            'kw': {},
        }
        const questTeam = (res)=>{
            if (res){
                this.callback(res);
                console.log('赛队列表数据请求成功')
            }else{
                return null;
            }
        }
        const m = Models.create();
        // m.query('exec', json, questTeam);
    }
}


// 报名请求
class DealSign{
    constructor(callback) {
        this.callback = callback; 
    }

    // 已有赛队报名，表单提交
    teamSign = (data)=>{
        console.log(data)
        const json={
            'model': 'og.igame.team',
            'method': 'create_team',
            'args': data,
            'kw': {},
        }
        const questTeam = (res)=>{
            if (res){
                // this.callback(res);
                console.log('创建队伍成功')
            }else{
                return null;
            }
        }
        const m = Models.create();
        m.query('exec', json, questTeam);
    }
}



export { DealList, DealTeams, DealUsers, DealSign}
