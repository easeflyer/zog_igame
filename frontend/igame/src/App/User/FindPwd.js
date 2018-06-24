import React from 'react';
import { Flex, WhiteSpace, InputItem, Toast, Button, NavBar, List, Icon, WingBlank } from 'antd-mobile';
import './Login.css'
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import { createForm } from 'rc-form';
import Models from '../Models/Models';


const Item = List.Item;
const Brief = Item.Brief;
export default class FindPwdPage extends React.Component{
    state = {
        openCodePage:true
    }
    tooglePages = ()=>{
        this.setState({
            openCodePage:!this.state.openCodePage
        })
    }
    render () {
        return(
        this.state.openCodePage ? 
        <CodePage toLoginPage={this.props.toLoginPage} tooglePages={this.tooglePages} /> 
        :
        <SubmitNewPasswordPage tooglePages={this.tooglePages} toLoginPage={this.props.toLoginPage} />
        );
    } 
}

class CodeForm extends React.Component{
    onSubmit = () => {   //表单提交方法
        this.props.form.validateFields({ force: true }, (error) => {  //输入验证，符合规则才向后后端交数据
            var formData = this.props.form.getFieldsValue();  //表单数据
                // console.log(formData.password)
                // console.log(formData.password2)
            if (!error) {
                
            } else {
                Toast.fail('您的输入有误！');
            }
        });
    }
    getCode = () => {   //表单提交方法
        this.props.form.validateFields({ force: true }, (error) => {  //输入验证，符合规则才向后后端交数据
            var formData = this.props.form.getFieldsValue();  //表单数据
                // console.log(formData)
                // console.log(formData.password2)

                // console.log(error)
                console.log(error.phone)
            // if (!error) {
                
            // } else {
            //     Toast.fail('您的输入有误！');
            // }
        });
    }
    validateAccount = (rule, value, callback) => {  //手机号输入验证规则
        if (value && value.replace(/\s/g, '').length < 11) {
            callback(new Error('Please enter 11 digits'));
        } else {
            callback();
        }
    }
    validateCode = (rule, value, callback) => {  //手机号输入验证规则
        if (value && value.length != 4) {
            callback(new Error('请输入4位验证码'));
        } else {
            callback();
        }
    }
    render () {
        const { getFieldProps, getFieldError } = this.props.form;
        return(
        <form className="flex-container">
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.props.toLoginPage}
                >找回密码
            </NavBar>
            <Flex direction='column'>
                <WhiteSpace size="lg" />
                <Flex align="baseline">
                    <InputItem
                        {...getFieldProps('phone',{
                            rules: [
                                { required: true, message: '手机号尚未填写！' },
                                { validator: this.validateAccount },
                            ],
                        })}
                        clear
                        error={!!getFieldError('phone')}
                        onErrorClick={() => {
                            Toast.info(getFieldError('phone').join('、'));
                        }}
                        type="phone"
                        placeholder="请输入手机号"
                    >手机号</InputItem>
                    <p className='find-p' > | </p>
                    <Button type=""  className='code-btn' onClick={this.getCode} >获取验证码</Button>
                </Flex>
                <WhiteSpace size="lg" />
                <Flex align="baseline">
                    <InputItem
                        {...getFieldProps('code',{
                            rules: [
                                { required: true, message: '验证码不能为空！' },
                                { validator: this.validateCode },
                            ],
                        })}
                        clear
                        error={!!getFieldError('code')}
                        onErrorClick={() => {
                            Toast.info(getFieldError('code').join('、'));
                        }}
                        type="number"
                        placeholder="请输入验证码"
                    >验证码</InputItem>
                    <p style={{margin:'0px 70px'}} > </p>
                </Flex>
                <WhiteSpace size="xl" />
                <WhiteSpace size="xl" />
                <Flex align="baseline">
                    <Button type=""  className='next-btn' onClick={()=>this.props.tooglePages()} >下一步</Button>
                </Flex>
            </Flex>
        </form>
        );
    }
}
const CodePage = createForm()(CodeForm);

class SubmitNewPasswordPage extends React.Component{
    success = ()=>{
        this.props.toLoginPage(),
        this.props.tooglePages()
    }
    render () {
        return(
        <div className="flex-container">
            <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.props.tooglePages}
                >找回密码
            </NavBar>
            <Flex direction='column'>
                <WhiteSpace size="lg" />
                <InputItem
                    type="phone"
                    placeholder="请输入新的登录密码"
                >新密码</InputItem>
                <WhiteSpace size="sm" />
                <InputItem
                    type="phone"
                    placeholder="请确认新密码"
                >确认新密码</InputItem>
                <WhiteSpace size="sm" />
                <WingBlank size="lg"><p>密码由6-20位英文字母、数字、符号组成</p></WingBlank>
                <WhiteSpace size="xl" />
                <WhiteSpace size="xl" />
                <WhiteSpace size="xl" />
                <Button type=""  className='next-btn' onClick={()=>this.success()} >新密码确认</Button>
            </Flex>
        </div>
        );
    }
}
