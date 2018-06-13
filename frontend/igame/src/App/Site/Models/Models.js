/**
 * 新建一个 服务器数据链接。
 * 这个链接应该是一个单例模式。
 * 第一次链接。创建链接，保存 sid。 以后每次链接，取出对象即可。
 * 
 * 使用方法：
 * 
 * const m = Models.create();
 * m.query('exec',json,callback) 根据不同的 type 调用不同的 api
 * 
 * 数据返回后将会调用 callback 函数。
 * 案例见：Text/Index2.js
 * 
 * 
 * 分析：
 *      Models 模块是 Site 子应用中 MVC 模式的 M 模型部分，和后台数据交互的代码都应该通过Models
 *      如果后期代码逐步扩大，可以增加 子模型代码，然后在这里引入。扩展 Models 的功能。
 * 
 */
import { session } from '../Common/Login'

class Models {

    /**
     * @param {*} type 'exec','login','userexec','adminexec' 对应不同的 api 接口执行权限不同。
     * 单例模式，如果已经有对象了，就直接取出来，无需重新实例化。
     */
    static create() {
        if (Models.models === null) {
            Models.models = new Models();
            return Models.models;
        } else {
            return Models.models;
        }
    }
    query(type = 'exec', json = {}, callback) {
        switch (type) {
            case 'exec':
                this.exec(json, callback);
                break;
            case 'login':
                this.login(json.callback);
                break;
        }
    }
    /**
     * exec 用来访问后台数据库 调用 odoo 的接口
     * @param {json} json 接口数据
     * @param {function} callback 外部传入的回调函数
     */
    exec(json, callback) {
        const url = Models.types['exec']
        json['sid'] = session.get_sid() // 添加上  session sid
        fetch(url, {
            method: 'POST', // or 'PUT'
            body: JSON.stringify(json), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(res => res.json())
            .catch(error => console.error('Error:', error))
            .then(response => {
                const body = response.result  // 注意这里如果数据库没有链接将报错。
                callback(body);
            });

    }

    login(json, callback) {
        const url = Models.types['login']

        fetch(url,{
            method:'POST', // or 'PUT'
            body:JSON.stringify(json), // data can be `string` or {object}!
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(data => {
            console.log(data)
            if (data.result.sid) {
                //this.hasLogin = true; // 貌似没用，可以去掉这个属性。有了回调函数就可以了。
                session.set_sid(data.result.sid)/////session??????
                Toast.success("登录成功！", 1);//////Toast?????
                this.callback();   // 调用外部传进来的 callback() 用于登录成功后修改 navbar 的样式。
            } else {
                //this.hasLogin = false;
                Toast.fail("登录失败，请检查后重试！", 1);
            }
        })

    }

}
// 静态属性。ES6 
Models.models = null;
Models.types = {
    'exec': 'http://192.168.0.11:8069/jsonrpc/exec',
    'login': 'http://192.168.0.11:8069/jsonrpc/login'
}

export default Models;