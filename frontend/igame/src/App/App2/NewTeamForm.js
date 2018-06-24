import React from 'react'
import DealUser from './Model/DealUser'
import { Form, Input, Select, Button, Checkbox  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

class FormForSign extends React.Component{
    state={
        userList: new DealUser()
    }

    onCheckChange=()=>{
        console.log(this.props.form.getFieldsValue())
    }

    onSubmit=(e)=>{
        e.preventDefault();
        this.props.submitNewTeamForm(this.props.form.getFieldsValue());
    }

    render(){
        const {getFieldProps, getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const allUserList = this.state.userList.list[0].userInfo;

        const checkList = allUserList.friendList;

        return(
            
            <Form layout="vertical" onSubmit={this.onSubmit}>
                    <FormItem label="项目"  style={{marginBottom:0}} >
                        <Select placeholder="选择参赛项目" style={{ width: 120 }} {...getFieldProps('eventName')}>
                            <Option value="团体公开赛">团体公开赛</Option>
                            <Option value="青年赛">青年赛</Option>
                            <Option value="中年赛">中年赛</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="队伍名称" style={{marginBottom:0}} >
                        <Input placeholder="填写队伍名称" style={{ width: 120 }} {...getFieldProps('teamName')}/>
                    </FormItem>
                    <FormItem label="领队"  style={{marginBottom:0}} >   
                        <Select placeholder="姓名" style={{ width: 250 }} {...getFieldProps('leaderName')}>
                            {allUserList.friendList.map((item,index) =>
                                <Option key={index} value={item.name}>姓名：{item.name}，赛事证号：{item.eventId}</Option>
                            )}
                        </Select>    
                    </FormItem>
                    <FormItem label="教练"  style={{marginBottom:0}} >   
                        <Select placeholder="姓名" style={{ width: 250 }} {...getFieldProps('coachName')}>
                            {allUserList.friendList.map((item,index) =>
                                <Option key={index} value={item.name}>姓名：{item.name}，赛事证号：{item.eventId}</Option>
                            )}
                        </Select>    
                    </FormItem>
                    <FormItem label="队员"  style={{marginBottom:0}} >   
                        <Checkbox />
                    </FormItem>
                    <FormItem style={{ marginBottom:0}}>
                        <span>联系人：</span><Input placeholder="填写联系人姓名" style={{ width: 120 }}/> 
                    </FormItem>
                    <FormItem style={{ marginBottom:0}}>
                        <span>电话：</span><Input placeholder="填写联系电话" style={{ width: 120 }}/> 
                    </FormItem>
                    <FormItem style={{ marginBottom:0}}>
                        <span>邮箱：</span><Input placeholder="填写联系人邮箱" style={{ width: 120 }}/> 
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style={{paddingLeft:10, paddingRight:10, marginRight:10}} htmlType="submit">提交</Button>
                        <Button type="danger" style={{paddingLeft:10, paddingRight:10}}>取消</Button>
                    </FormItem>
                </Form>      
        )
    }
}


const SignForm = Form.create()(FormForSign);

export default SignForm;