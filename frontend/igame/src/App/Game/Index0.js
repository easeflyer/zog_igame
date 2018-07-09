import React from 'react'
import  { WingBlank,WhiteSpace} from 'antd-mobile'
import { Form, Input, Button } from 'antd';
import $ from 'jquery';
import Index from './Index'

class LoginTest extends React.Component{
    state={
        login:localStorage && localStorage.session,
    }

    onClick=()=>{
        let myDirect = null;
        this.props.form.getFieldValue('user')==='201'? myDirect='N':null;
        this.props.form.getFieldValue('user')==='202'? myDirect='E':null;
        this.props.form.getFieldValue('user')==='203'? myDirect='S':null;
        this.props.form.getFieldValue('user')==='204'? myDirect='W':null;
        $.post('http://192.168.0.20:8989/login', 
               { 'user': this.props.form.getFieldValue('user') } ,
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
        const {getFieldProps, getFieldDecorator} = this.props.form;
        return(
            <WingBlank>
                <WhiteSpace/>
                {this.state.login? <Index />:
                    <Form onSubmit={this.onClick}>
                        <Input placeholder='输入用户名' {...getFieldProps('user')}></Input>
                        <Button  type="primary" style={{paddingLeft:10, paddingRight:10, marginRight:10}} htmlType="submit">提交</Button>
                    </Form>
                }
            </WingBlank>
        )
    }
}

const LoginForm = Form.create()(LoginTest);

export default LoginForm;