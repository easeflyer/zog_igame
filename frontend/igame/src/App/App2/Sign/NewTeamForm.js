import React from 'react'
import { Form, Input, Select, Button} from 'antd';
import {Toast} from 'antd-mobile'  

import {UserList,NewTeam, SignEvent } from '../Model/Deal'
import session from '../../User/session'

const FormItem = Form.Item;
const Option = Select.Option;


class FormForSign extends React.Component{
    state={
        eventDetail:this.props.eventDetail,//要报名赛事的全部信息
        myFriends:null,
        userList:null,
        userList2:null,
        mySelf:null,
    }

// 请求通讯录列表  ★
    componentWillMount(){
        // 每次打开报名页都重新请求
        const Users = new UserList(res => this.stateFriends(res));
        Users.users();
    }
    stateFriends=(res)=>{
        if(res){
            this.setState({
                myFriends:res,
                userList:res.filter(item => {return item.name !== session.get_name()}),
                userList2:res.filter(item => {return item.name !== session.get_name()}),
                mySelf: res.filter( item => {return item.name === session.get_name()})[0]
            });
        }
        console.log(this.state.myFriends)
        // this.props.stateFriends(res);
    }

// 创建新队伍（不设置人员身份），提交表单
    onSubmit=(e)=>{
        e.preventDefault();
        const newTeamForm = []
        this.props.form.validateFields(
            (err) => {
                if (!err) {
                    newTeamForm.push(this.props.form.getFieldValue('teamname'));
                    newTeamForm.push([]);
                    newTeamForm[1]=this.props.form.getFieldValue('player')
                    newTeamForm[1].push(this.props.form.getFieldValue('leader'));
                    newTeamForm[1].push(this.props.form.getFieldValue('coach'));

                    const createTeam = new NewTeam(res => this.newTeamSign(res));
                    createTeam.newTeam(newTeamForm);
                }else{
                    Toast.fail('验证失败，请重新填写表单', 2);
                }
            },
        );
    }

// 设置队伍人员身份，提交表单，发送报名请求
    newTeamSign=(res)=>{
        const teamSign = [];
        teamSign.push(this.state.eventDetail.id);
        teamSign.push(res);
        // teamSign.push(this.props.form.getFieldValue('teamname'));
        const player=[];
        this.props.form.getFieldValue('player').forEach((item)=>{
            const obj={};
            obj.id=item;
            obj.role='player';
            player.push(obj);
        });
        teamSign.push(player)
        teamSign[2].push({id:this.props.form.getFieldValue('leader'),role:'leader'})
        teamSign[2].push({id:this.props.form.getFieldValue('coach'),role:'coach'})
        console.log(teamSign)
        console.log(this.props.form.getFieldsValue())

        const EventSign = new SignEvent();
        EventSign.signEvent(teamSign);
    }

// 取消报名，返回选择报名方式页面 ★
    cancelSubmit=()=>{
        this.props.cancelSubmit();
    }

// 教练 ，值发生改变 ★
    handleCoach = (key)=>{
        this.setState({
            userList2:  this.state.myFriends.filter((item,index) => {
                            return item.name !== session.get_name() && item.id !== key;
                        })
        })
    }

// 队员 ，值发生改变 ★
    handlePlayer = (key)=>{
        this.setState({
            userList:   this.state.userList.filter((item,index) => {
                            return item.name !== session.get_name() && item.id !== key;
                        })
        })
    }
    handlePlayerDe = (key)=>{
        this.setState({
            userList:   this.state.userList.concat(
                            this.state.userList2.filter((item,index) => {
                                return item.name !== session.get_name() && item.id === key;
                        }))
        })
    }

// 以下为验证表单数据
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

    validatePlayerr = (rule, value, callback) => {
        if(value){
            if(value.length > 1 && value.length <= 6){
                callback();
              } else {
                callback(new Error('请选择2-6个队员'));
              }
        }else{
            callback();
        }
    }

    // validateContactName = (rule, value, callback) => {
    //     let pattern=/[A-Za-z0-9_\-\u4e00-\u9fa5]+/;
    //     if(value){
    //         if( pattern.test(value) && value.length > 1 && value.length <= 4){
    //             callback();
    //           } else {
    //             callback(new Error('长度为2-6个字符，可包含数字、字母和中文'));
    //           }
    //     }else{
    //         callback();
    //     }
    // }

    // validateTel = (rule, value, callback) => {
    //     let pattern=/0?(13|14|15|18)[0-9]{9}/;
    //     if(value){
    //         if(  pattern.test(value) ){
    //             callback();
    //         } else {
    //             callback(new Error('输入格式不正确'));
    //         }
    //     }else{
    //         callback();
    //     }
        
    // }

    // validateMail = (rule, value, callback) => {
    //     let pattern=/\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
    //     if(value){
    //         if( pattern.test(value) ){
    //             callback();
    //         } else {
    //             callback(new Error('输入格式不正确'));
    //         }
    //     }else{
    //         callback();
    //     }
    // }

    render(){
        const {getFieldProps, getFieldDecorator } = this.props.form;

        const myself= this.state.myFriends ? this.state.myFriends.filter( item => {return item.name === session.get_name()} )[0] : null

        let items = [];
        
		if(!this.state.myFriends || this.state.myFriends.length === 0 ) {
            return items=[];
        }
        else {
            this.state.myFriends.forEach(item => {
                items.push(
                    <Option key={item.id} value={item.id} disabled={false}>姓名：{item.name}，赛事证号：{item.id}</Option>
                );
            });
        }

        
        return(       
            <Form layout="vertical"   onSubmit={this.onSubmit}>
                    <FormItem label="队伍名称" style={{marginBottom:0}}>
                         {getFieldDecorator('teamname', {
                            rules: [
                                { required: true},
                                { validator: this.validateTeamName }
                            ],
                        })(
                            <Input placeholder="填写队伍名称" style={{ width: 290 }}/>
                        )}
                    </FormItem>
                    <FormItem style={{marginBottom:0}}>
                        <span>队伍成员(4-8人)：</span>
                    </FormItem>
                    <FormItem label="领队"  style={{marginBottom:0}} >   
                            <Select placeholder="姓名" notFoundContent="没有用户信息" defaultValue={this.state.mySelf.id } style={{ width: 290 }} {...getFieldProps('leader')}>
                                <Option key={this.state.mySelf.id } value={this.state.mySelf.id } disabled={false}>姓名：{this.state.mySelf.name}，赛事证号：{this.state.mySelf.id}</Option>
                            </Select>  
                    </FormItem>
                    <FormItem label="教练"  style={{marginBottom:0}}>  
                        {getFieldDecorator('coach', {
                            rules: [{ required: true ,message:'请选择一名教练'}],
                        })( 
                            <Select  placeholder="姓名" notFoundContent="没有用户信息" showSearch={true} style={{ width: 290 }} onSelect={key => this.handleCoach(key)}>
                            {this.state.userList.map(item =>
                                <Option key={item.id} value={item.id} disabled={false}>姓名：{item.name}，赛事证号：{item.id}</Option>
                            )}
                            </Select>   
                        )} 
                    </FormItem>
                    <FormItem label="队员"  style={{marginBottom:0}}>   
                        {getFieldDecorator('player', {
                            rules: [
                                { required: true},
                                { validator: this.validatePlayerr }
                            ],
                        })(
                            <Select mode="multiple" notFoundContent="没有用户信息" placeholder="姓名" showSearch={true} style={{ width: 290 }} onSelect={key => this.handlePlayer(key)} onDeselect={key => this.handlePlayerDe(key)}>
                            {this.state.userList2.map(item =>
                                <Option key={item.id} value={item.id} disabled={false}>姓名：{item.name}，赛事证号：{item.id}</Option>
                            )}
                            </Select>  
                        )}
                    </FormItem>             
                    {/*<FormItem label="联系人" style={{ marginBottom:0}}>
                        {getFieldDecorator('contacts', {
                            rules: [
                                { required: true },
                                { validator: this.validateContactName }
                            ],
                        })(
                           <Input placeholder="填写联系人姓名" style={{ width: 290 }}/> 
                        )}
                    </FormItem>
                    <FormItem label="电话" style={{ marginBottom:0}}>
                        {getFieldDecorator('tel', {
                            rules: [
                                { required: true },
                                { validator: this.validateTel }
                            ],
                        })(
                            <Input placeholder="填写联系电话" style={{ width: 290 }}/> 
                        )}
                    </FormItem>
                    <FormItem label="邮箱" style={{ marginBottom:0}}>
                        {getFieldDecorator('mail', {
                            rules: [
                                { required: true },
                                { validator: this.validateMail }
                            ],
                        })(
                            <Input placeholder="填写联系人邮箱" style={{ width: 290 }}/> 
                        )}
                    </FormItem>*/}
                    <FormItem>
                        <Button type="primary" style={{paddingLeft:10, paddingRight:10, marginRight:10}} htmlType="submit">提交</Button>
                        <Button type="danger" style={{paddingLeft:10, paddingRight:10}} onClick={this.cancelSubmit}>取消</Button>
                    </FormItem>
                </Form>      
        )
    }
}

const SignForm = Form.create()(FormForSign);

export default SignForm;