import Models from './OdooRpc';
const HOST = 'http://192.168.0.20:8069';

const DATABASE = 'TT';

export default class User extends Models {
    createData = (login,password)=>({
        'db':DATABASE,
        'login':login,
        'password':password,
    });

    login(login,password){
        const url = HOST+'/json/user/login';
        const data = this.createData(login,password);
        return this.m.jsonrpc(url,data)
    }
    register(login,password){
        const url = HOST+'/json/user/register';
        const data = this.createData(login,password);
        return this.m.jsonrpc(url,data)
    }
    resetPassword(login,password){
        const url = HOST+'/json/user/reset/password';
        const data = this.createData(login,password);
        return this.m.jsonrpc(url,data)
    }
}