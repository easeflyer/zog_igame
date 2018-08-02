import Models from './OdooRpc';
export default class My extends Models {
    constructor(...args) {
        super(...args);
        this.model = 'res.users';
        // this.model = 'og.igame';
    }
    /*
    参数： 无
    返回值： {[]}
     */



    personal_info() {
        //查询第几副牌
        this.exec('personal_info', {}, []);
        // const obj = this.with_model('res.users');  //模型名
        // obj.exec('personal_info', {},[]);
        /**
        * params:
        * return:
       */
    }
    bind_phone() {
        //绑定修改手机号

    }

    email(email) {
        //邮箱绑定修改
        this.exec('email', {}, email);
    }

    nick_name(nickname) {
        //修改姓名
        this.exec('nick_name', {}, nickname);
    }

    //发送验证码
    sms_verification(phone) {
        this.exec('sms_verification', {}, phone);
    }
    //验证码
    verification_code(code1) {
        this.exec('verification_code', {}, code1);
    }

    //保存手机号
    bind_phone(login, code1) {
        this.exec('bind_phone', {}, login, code1)
    }

}