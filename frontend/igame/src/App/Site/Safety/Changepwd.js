import React from 'react';

import { List, InputItem, Switch, Stepper, Range, Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import { Models,session } from '../Models/Models'
const Item = List.Item;

class BasicInput extends React.Component {
    // componentWillMount() {
    //     console.log('000 Component WILL MOUNT!渲染前调用,在客户端也在服务端');
    //     console.log(session.get_sid())
    //     const sid = session.get_sid()
    // }
  state = {
    value: 1,
  }
  onSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
        Toast.success("修改成功！",1);   //这里提交数据做处理
        this.props.onChange()
      } else {
        alert('您的输入不完整！');
      }
    });
  }
  validateAccount = (rule, value, callback) => {
    if (value && value.length > 4) {
      callback();
    } else {
      callback(new Error('至少4个字符'));
    }
  }
  render() {
    const { getFieldProps, getFieldError } = this.props.form;

    return (
    <form>
      <List
        renderHeader={() => '您正在修改密码，请谨慎操作'}
        renderFooter={() => getFieldError('account') && getFieldError('account')||getFieldError('password') && getFieldError('password').join(',')}
      >
        <InputItem
          {...getFieldProps('account', {
            // initialValue: 'little ant',
            rules: [
              { required: true, message: '输入不能为空' },
              { validator: this.validateAccount },
            ],
          })}
          clear
          error={!!getFieldError('account')}
          onErrorClick={() => {
            alert(getFieldError('account').join('、'));
          }}
          placeholder="请输入旧的密码"
          type='password'
        >旧密码</InputItem>

        <InputItem {...getFieldProps('password',{
            rules:[
                { required: true, message: '输入不能为空' },
                { validator: this.validateAccount },
            ],
        })} 
        clear
        error={!!getFieldError('password')}
        onErrorClick={() => {
            alert(getFieldError('password').join('、'));
        }}
        placeholder="请输入您的新密码" type="password"
        
        >新密码
        </InputItem>
        
       
        <Item>
          <Button type="primary" size="small" inline onClick={this.onSubmit}>提交</Button>
          <Button size="small" inline style={{ marginLeft: '2.5px' }} onClick={this.props.onChange}>取消</Button>
        </Item>
      </List>
    </form>);
  }
}

const BasicInputWrapper = createForm()(BasicInput);

class Changepwd extends React.Component {
    componentWillMount() {
        console.log('000 Component WILL MOUNT!渲染前调用,在客户端也在服务端');
        console.log(session.get_sid())
        const sid = session.get_sid()
    }
    render (){
        return(
            this.sid?'':<BasicInputWrapper onChange={this.props.onChange} />
        );
    }
}
export default Changepwd;
// ReactDOM.render(<BasicInputWrapper />, mountNode);