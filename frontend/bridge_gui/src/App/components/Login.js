import React,{Component} from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import 'antd/lib/form/style/css'
import 'antd/lib/input/style/css'
import 'antd/lib/icon/style/css'
import User from '../libs/odoo/OdooRpc/User';
import session from '../User/session';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, formData) => {
      if (!err) {
        console.log('Received values of form: ', formData);
        const successCallback = (data)=>{
            session.set_sid(data.sid);
            session.set_name(formData.phone);       //把用户名也保存到session里面
            alert("登录成功！");
            this.props.history.push('/game')
        }
        const errorCallback =()=>{
            alert('登录失败，请稍后重试！');
        }
        const m = new User(successCallback,errorCallback);
        m.login(formData.phone, formData.password );
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </FormItem>
      </Form>
    );
  }
}

 const  WrappedNormalLoginForm = Form.create()(NormalLoginForm);
 export default WrappedNormalLoginForm;