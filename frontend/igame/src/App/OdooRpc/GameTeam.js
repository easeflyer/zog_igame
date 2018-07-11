import Models from './OdooRpc';

export default class GameTeam extends Models{
    constructor(...args){
        super(...args);
        this.model='og.igame.team';
    }
    get_teams(){            //获取我的赛队列表
        this.exec('get_teams',{},[]);
    }
    create_team(...data){   //创建赛队（报名）
        this.exec('create_team',{},...data);
    }
    get_own_teams(){        //?请求赛队列表
        this.exec('get_own_teams',{},[]);
    }
}