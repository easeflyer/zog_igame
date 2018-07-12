import React from 'react'
import  { WingBlank,WhiteSpace} from 'antd-mobile'
import { Form, Input, Button } from 'antd';
import $ from 'jquery';
import Index from './Index'

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
                {this.state.login? <Index />:
                    <div><p>请登录: </p><Input placeholder='请输入用户名'   onPressEnter={this.onClick}/></div>
                 } 
            </WingBlank>
        )
    }
}


export default LoginTest;
