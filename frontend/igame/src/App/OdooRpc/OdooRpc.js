import session from '../User/session';

const HOST = 'http://192.168.0.20:8069';
class OdooRpc {
    static create(success,error) {
        if (OdooRpc.models === null) {
            OdooRpc.models = new OdooRpc();
        }
        OdooRpc.models.success=success;
        OdooRpc.models.error=error;
        return OdooRpc.models;
    }
    jsonrpc(url,data){
        const data1 = {
            "jsonrpc":"2.0",
            "method":"call",
            "id":Math.floor(Math.random()*100),
            "params":data
        }
        fetch(url,{
            method:'POST',
            body:JSON.stringify(data1),
            headers:new Headers({
                'Content-Type':'application/json'
            })
        }).then(res=>res.json()
        ).catch(error=>console.error('Error:',error)
        ).then(response => {
            console.log(response.result);
            if (response.result){
            // m.result = response.result;
                this.success(response.result)
            }else{
                this.error(response.result)
            }
        });
    }
}
// 静态属性。ES6 
OdooRpc.models = null;

class Models{       //用于被继承，来接受回调函数success，error
    constructor(success,error){
        this.success=success;
        this.error=error;
        this.m = OdooRpc.create(this.success,this.error)
    }
    exec (method,kw={},...args){
        const url = HOST+'/json/api?session_id='+session.get_sid();
        const data = {
            'model':this.model,
            'method':method,
            'args':args,
            'kw':kw,
        }
        return this.m.jsonrpc(url,data)
    }
}
export default Models;