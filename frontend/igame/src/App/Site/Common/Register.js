<<<<<<< HEAD
// import React from 'react';
// import ReactDOM from 'react-dom';

import { Modal, Toast } from 'antd-mobile';
import { session, Models } from '../Models/Models';

class SiteRegister {
    // 注册 callback 登录成功后调用外部的 callback 函数
    constructor(callback) {
        //this.hasLogin = false;
        this.callback = callback;
    }
    /**
     * show register window, call handeRegister callback function
     * handeRegister responsible for register and invoking callbacks from outside registration
     */
    register(){
        const prompt = Modal.prompt;
        prompt(
            '注册新用户',
            '请输入注册信息',
            this.handRegister,
            'login-password',
            null,
            ['请输入用户名', '请输入密码'],
            'ios' //android
        );
    }
    //用户名和密由 prompt 调用时提供。

    handRegister = (user,password) => {
        console.log('11...........')
        console.log(`user:${user},password:${password}`)
        const json = {
            'server':'T1',
            'user':user,
            'password':password
        }
        console.log(json)
        const cb = (data)=>{
            console.log('2..........')
            console.log(data)
            // if (data.sid){
            if (data){   
                // session.set_sid(data.sid);       *****这里还需要再做处理*****
                Toast.success('注册成功，您可以登录了！',1);
                this.callback();
            }else{
                Toast.fail('注册失败，请稍后重试！',1);
            }
        }


        const m = Models.create();
        m.query('register',json,cb)

    }



}

export { SiteRegister };

=======
import React from 'react';
import ReactDOM from 'react-dom';

import { Modal, Button, WingBlank, WhiteSpace, Toast } from 'antd-mobile';

class Register {
    constructor(callback) {
        this.callback = callback;
    }

    register(){
        const prompt = Modal.prompt;
        prompt(
            'Register',
            'Please input login information',
            (register, password) => console.log(`register: ${register}, password: ${password}`),
            'login-password',
            null,
            ['Please input name', 'Please input password'],
        );
    }
}

export default Register;

// const prompt = Modal.prompt;

// const App = () => (
//   <WingBlank size="lg">
//     <WhiteSpace size="lg" />
//     <Button onClick={() => prompt('input name', 'please input your name',
//       [
//         {
//           text: 'Close',
//           onPress: value => new Promise((resolve) => {
//             Toast.info('onPress promise resolve', 1);
//             setTimeout(() => {
//               resolve();
//               console.log(`value:${value}`);
//             }, 1000);
//           }),
//         },
//         {
//           text: 'Hold on',
//           onPress: value => new Promise((resolve, reject) => {
//             Toast.info('onPress promise reject', 1);
//             setTimeout(() => {
//               reject();
//               console.log(`value:${value}`);
//             }, 1000);
//           }),
//         },
//       ], 'default', null, ['input your name'])}
//     >promise</Button>

//     <WhiteSpace size="lg" />
//     <Button onClick={() => prompt('defaultValue', 'defaultValue for prompt', [
//       { text: 'Cancel' },
//       { text: 'Submit', onPress: value => console.log(`输入的内容:${value}`) },
//     ], 'default', '100')}
//     >defaultValue</Button>

//     <WhiteSpace size="lg" />
//     <Button onClick={() => prompt(
//       'Password',
//       'Password Message',
//       password => console.log(`password: ${password}`),
//       'secure-text',
//     )}
//     >secure-text</Button>

//     <WhiteSpace size="lg" />
//     <Button onClick={() => prompt(
//       'Password',
//       'You can custom buttons',
//       [
//         { text: '取消' },
//         { text: '提交', onPress: password => console.log(`密码为:${password}`) },
//       ],
//       'secure-text',
//     )}
//     >custom buttons</Button>

//     <WhiteSpace size="lg" />
//     <Button onClick={() => prompt(
//       'Login',
//       'Please input login information',
//       (login, password) => console.log(`login: ${login}, password: ${password}`),
//       'login-password',
//       null,
//       ['Please input name', 'Please input password'],
//     )}
//     >login-password</Button>

//     <WhiteSpace size="lg" />
//   </WingBlank>
// );


// ReactDOM.render(<App />, mountNode);
>>>>>>> upstream/develop
