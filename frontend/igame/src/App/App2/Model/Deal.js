import { Modal,Toast } from 'antd-mobile';
import  Models  from '../../Models/Models'
const alert = Modal.alert;

class DealSign{
    constructor(callback) {
        this.callback = callback; 
    }

// 已有赛队报名，表单提交
    existTeamSign = (data)=>{
        const form = {
            eventName:data.eventName,
            teamId:data.teamId,
           
        }
        console.log(form)
        const signExistCB = (res)=>{
            console.log(res)
            if (res){
                this.callback();
            }else{
                Toast.fail('报名失败，请稍后重试',1);
            }
        }
        const m = Models.create();
        m.query('exec',form,signExistCB);
    }
}

class DealList{

// 请求赛队列表
    eventList = ()=>{
        const json={
            'model': 'og.igame',
            'method': 'search2',
            'args': [],
            'kw': {},
        }
        console.log(json)
        const questEvent = (res)=>{
            console.log(res)
            if (res){
                return res;
            }else{
                // Toast.fail('网络繁忙，请稍后重试',1);
                return null;
            }
        }
        const m = Models.create();
        m.query('exec',json,questEvent);
    }
}

export {DealSign, DealList}
