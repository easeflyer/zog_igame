import React from 'react';
import ReactDOM from 'react-dom';
import { Flex, WhiteSpace, List, InputItem, Toast, Button  } from 'antd-mobile';
import './Login.css'
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？

import { createForm } from 'rc-form';

const Item = List.Item;


export default class FlexExample extends React.Component{
   render () {
       return(
        <div className="flex-container">


            <Flex direction='column'>

                <img src={require("./963065731.jpg")} style={{width:360}}/>

                <WhiteSpace size="lg" />

                <BasicInputExampleWrapper toggleLogin={this.props.toggleLogin} />

                <WhiteSpace size="sm" />

                <p className='p'>登录即代表您已同意<a href='#'>《智赛桥牌隐私政策》</a></p>
                <WhiteSpace size="xl" />
                <WhiteSpace size="xl" />
                <WhiteSpace size="xl" />

                <Flex align="baseline">
                    <button className='btn1'>点击注册</button>
                    <p className='p1'>|</p>
                    <button className='btn1'>忘记密码</button>
                </Flex>

                <WhiteSpace size="lg" />
            </Flex>
        </div>
       );
   } 
}


class BasicInputExample extends React.Component {
    componentDidMount() {
    //   this.autoFocusInst.focus();
    }

    state = {
        // hasError: false,
        value: '',
    }
    onSubmit = () => {
        this.props.form.validateFields({ force: true }, (error) => {
            // console.log(this.props.form.getFieldsValue());//表单数据
            // this.props.toggleLogin()
            if (!error) {
                this.props.toggleLogin()
                console.log(this.props.form.getFieldsValue());//表单数据
                alert(888888)
            } else {
                Toast.info('您的输入不完整！');
                alert('555555');
                this.props.toggleLogin()
            }
        });
      }
    
    validateAccount = (rule, value, callback) => {
        if (value && value.replace(/\s/g, '').length < 11) {
          callback(new Error('Please enter 11 digits'));
        } else {
          callback();
        }
      }
    render() {
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <form>
            {/* <List > */}
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
                    placeholder="enter your phone"
                >手机号</InputItem>

                <InputItem
                    {...getFieldProps('password',{
                        
                    })}
                    type="password"
                    placeholder="******"
                >  密码</InputItem>

                <WhiteSpace size="xl" />
                <WhiteSpace size="xl" />

                <Item>
                    <button className='btn' onClick={this.onSubmit}>登录</button>
                </Item>
                {/* <Button type="ghost" inline style={{ marginLeft: '100px' }} className="am-button-borderfix">inline ghost</Button> */}
            {/* </List> */}
            </form>
        );
    }
  }
  
  const BasicInputExampleWrapper = createForm()(BasicInputExample);



  