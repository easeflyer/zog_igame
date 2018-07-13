import Models from './OdooRpc';
import session from '../User/session';
// const HOST = 'http://124.42.117.43:8069';
const HOST = 'http://192.168.0.112:8069';
window.last = null

export default class Polling extends Models {

    polling(last = null){
        last = window.last + 1;
        const url = HOST + '/longpolling/igame?session_id='+session.get_sid();
        const data = {'channels':[], 'last':last}
        console.log(last)
        return this.m.jsonrpc(url,data);
    }
}