import React from 'C:/Users/admini/AppData/Local/Microsoft/TypeScript/2.9/node_modules/@types/react'
import  { WingBlank,WhiteSpace} from '../../../node_modules/_antd-mobile@2.2.0@antd-mobile'
import { Form, Input, Button } from '../../../node_modules/_antd@3.6.3@antd';
import $ from 'jquery';
import SSE from './SSE'

class LoginTest extends React.Component{
    state={
        login:false,
        value:''
    }

    onClick=(e)=>{
        this.setState({
            value:e.target.value
        })
        let myDirect = null;
        e.target.value==='201'? myDirect='N':null;
        e.target.value==='202'? myDirect='E':null;
        e.target.value==='203'? myDirect='S':null;
        e.target.value==='204'? myDirect='W':null;
        // $.post('http://124.42.117.43:8989/login', 
        $.post('http://192.168.0.20:8989/login', 
               { 'user': e.target.value} ,
               (data)=>{
                   localStorage.session = data;
                   localStorage.user = myDirect;
                   this.setState({
                        login:true,
                    })
                }
            );
    }

    render(){
        return(
            <WingBlank>
                <WhiteSpace/>
                {this.state.login? <SSE />:
                    <div><p>请登录: </p><Input placeholder='请输入用户名'   onPressEnter={this.onClick}/></div>
                 } 
            </WingBlank>
        )
    }
}


export default LoginTest;
