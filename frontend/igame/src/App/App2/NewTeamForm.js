import React from 'react'
import DealUser from './Model/DealUser'
import { Form, Input, Select, Button} from 'antd';
import {Toast} from 'antd-mobile'
const FormItem = Form.Item;
const Option = Select.Option;

class FormForSign extends React.Component{
    state={
        userList: new DealUser()
    }

    onSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields(
            (err) => {
              if (!err) {
                  this.props.submitNewTeamForm(this.props.form.getFieldsValue());
                console.info('success');
              }else{
                Toast.fail('验证失败，请重新填写表单', 1);
              }
            },
          );
    }

    cancelNewTeamForm=()=>{
        this.props.cancelNewTeamForm();
    }

    validateTeamName = (rule, value, callback) => {
        let pattern=/[A-Za-z0-9_\-\u4e00-\u9fa5]+/;
        if(value){
            if(pattern.test(value) && value.length > 2 && value.length <= 10){
                callback();
              } else {
                callback(new Error('长度为3-10个字符，只能包含中文、数字、字母'));
              }
        }else{
            callback();
        }
    }

    validateContactName = (rule, value, callback) => {
        let pattern=/[\u4e00-\u9fa5]+/;
        if(value){
            if( pattern.test(value) && value.length > 1 && value.length <= 4){
                callback();
              } else {
                callback(new Error('长度为2-6个中文字符'));
              }
        }else{
            callback();
        }
    }

    validateTel = (rule, value, callback) => {
        let pattern=/0?(13|14|15|18)[0-9]{9}/;
        if(value){
            if(  pattern.test(value) ){
                callback();
            } else {
                callback(new Error('输入格式不正确'));
            }
        }else{
            callback();
        }
        
    }

    validateMail = (rule, value, callback) => {
        let pattern=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
        if(value){
            if( pattern.test(value) ){
                callback();
            } else {
                callback(new Error('输入格式不正确'));
            }
        }else{
            callback();
        }
    }

    render(){
        const {getFieldProps, getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const allUserList = this.state.userList.list[0].userInfo.friendList;
            allUserList.forEach((item)=>{
                item.select=true;
            });
        return(          
            <Form layout="vertical" onSubmit={this.onSubmit}>
                    <FormItem label="项目"  style={{marginBottom:0}}>
                        {getFieldDecorator('event', {
                            rules: [{ required: true ,message:'请选择参赛项目' }],
                        })(
                            <Select placeholder="选择参赛项目" style={{ width: 250 }}>
                                <Option value="团体公开赛">团体公开赛</Option>
                                <Option value="青年赛">青年赛</Option>
                                <Option value="中年赛">中年赛</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem label="队伍名称" style={{marginBottom:0}}>
                         {getFieldDecorator('team', {
                            rules: [
                                { required: true},
                                { validator: this.validateTeamName }
                            ],
                        })(
                            <Input placeholder="填写队伍名称" style={{ width: 250 }}/>
                        )}
                    </FormItem>
                    <FormItem label="领队"  style={{marginBottom:0}} >   
                        {getFieldDecorator('leader', {
                            rules: [{ required: true ,message:'请选择一名领队'}],
                        })(
                            <Select placeholder="姓名" showSearch={true} style={{ width: 250 }} onSelect={this.onLeaderSelect}>
                                {allUserList.map((item,index) =>
                                    <Option key={index} value={item.name} disabled={false}>姓名：{item.name}，赛事证号：{item.eventId}</Option>
                                )}
                            </Select>   
                        )} 
                    </FormItem>
                    <FormItem label="教练"  style={{marginBottom:0}}>  
                        {getFieldDecorator('coach', {
                            rules: [{ required: true ,message:'请选择一名教练'}],
                        })( 
                            <Select placeholder="姓名" showSearch={true} style={{ width: 250 }}>
                                {allUserList.map((item,index) =>
                                    <Option key={index} value={item.name} disabled={false}>姓名：{item.name}，赛事证号：{item.eventId}</Option>
                                )}
                            </Select>   
                        )} 
                    </FormItem>
                    <FormItem label="队员(4-6人)"  style={{marginBottom:0}}>   
                        {getFieldDecorator('player', {
                            rules: [{ required: true , message:'请选择队员'}],
                        })(
                            <Select mode="multiple" placeholder="姓名" showSearch={true} style={{ width: 250 }}>
                                {allUserList.map((item,index) =>
                                    <Option key={index} value={item.name}>姓名：{item.name}，赛事证号：{item.eventId}</Option>
                                )}
                            </Select>  
                        )}
                    </FormItem>               
                    <FormItem label="联系人" style={{ marginBottom:0}}>
                        {getFieldDecorator('contacts', {
                            rules: [
                                { required: true },
                                { validator: this.validateContactName }
                            ],
                        })(
                           <Input placeholder="填写联系人姓名" style={{ width: 250 }}/> 
                        )}
                    </FormItem>
                    <FormItem label="电话" style={{ marginBottom:0}}>
                        {getFieldDecorator('tel', {
                            rules: [
                                { required: true },
                                { validator: this.validateTel }
                            ],
                        })(
                            <Input placeholder="填写联系电话" style={{ width: 250 }}/> 
                        )}
                    </FormItem>
                    <FormItem label="邮箱" style={{ marginBottom:0}}>
                        {getFieldDecorator('mail', {
                            rules: [
                                { required: true },
                                { validator: this.validateMail }
                            ],
                        })(
                            <Input placeholder="填写联系人邮箱" style={{ width: 250 }}/> 
                        )}
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style={{paddingLeft:10, paddingRight:10, marginRight:10}} htmlType="submit">提交</Button>
                        <Button type="danger" style={{paddingLeft:10, paddingRight:10}} onClick={this.cancelNewTeamForm}>取消</Button>
                    </FormItem>
                </Form>      
        )
    }
}


const SignForm = Form.create()(FormForSign);

export default SignForm;