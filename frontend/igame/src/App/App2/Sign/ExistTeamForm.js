import React from 'react'
import { Form, Select, Button, Row, Col  } from 'antd';

import { QueryTeamList, UserList} from '../Model/Deal'
import session from '../../User/session'

const FormItem = Form.Item;
const Option = Select.Option;

class FormForSign extends React.Component{
    state={
        eventDetail:this.props.eventDetail,//要报名赛事的全部信息
        hasTeam:0,
        myTeams:null,
        currentTeam:null,
        currentTeam2:null,
        mySelf:null,
        teamId:null
    }

// 请求赛队列表 ???
    componentDidMount(){
        // 每次打开报名页都重新请求
        const Teams = new QueryTeamList(res => this.stateTeams(res));
        Teams.myTeams();
    }
    stateTeams=(res)=>{
        this.setState({
            myTeams:res,
            currentTeam:res[0].players.filter( item => {return item.playername !== session.get_name()}),
            currentTeam2:res[0].players.filter( item => {return item.playername !== session.get_name()}),
            mySelf: res[0].players.filter( item => {return item.playername === session.get_name()})[0],
        });
        this.props.stateTeams(res);
        console.log(this.state.teamIndex);
    }
    
// 提交表单，发送报名请求
    onSubmit=(e)=>{
        e.preventDefault();
        // this.props.submitExistTeamForm(formDetail);
    }
    
// 取消报名，返回选择报名方式页面 ★
    cancelSubmit=()=>{
        this.props.cancelSubmit();
    }

// 选择参赛队伍
    handleTeamSelect=(val)=>{
        this.setState({
            currentTeam : this.state.myTeams.filter(item =>{
                return item.id === val
            })[0].players.filter( item => {return item.playername !== session.get_name()}),
            currentTeam2 : this.state.myTeams.filter(item =>{
                return item.id === val
            })[0].players.filter( item => {return item.playername !== session.get_name()}),
            teamId : val
        })
    }

// 教练 ，值发生改变 ★
handleCoach = (key)=>{
    this.setState({
        currentTeam2:  this.state.myTeams.player.filter((item,index) => {
                        return item.playername !== session.get_name() && item.id !== key;
                    })
    })
}

// // 队员 ，值发生改变 ★
    handlePlayer = (key)=>{
        this.setState({
            currentTeam:   this.state.currentTeam.filter((item,index) => {
                            return item.playername !== session.get_name() && item.id !== key;
                        })
        })
    }
    handlePlayerDe = (key)=>{
        this.setState({
            currentTeam:   this.state.currentTeam.concat(
                            this.state.currentTeam2.filter((item,index) => {
                                return item.playername !== session.get_name() && item.id === key;
                        }))
        })
    }
    
    render(){
        const {getFieldProps, getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        
        let items = [];
        
		if(!this.state.myTeams || this.state.myTeams.length === 0 ) {
            return items=[];
        }
        else {
            this.state.myTeams.forEach(item => {
                items.push(
                    <Option key={item.id} value={item.id} disabled={false}>{item.name}</Option>
                );
            });
        }
        


        return(
            <Form layout="vertical" onSubmit={this.onSubmit}>
                    <FormItem style={{marginBottom:0}} >
                        <span>赛队：</span>
                        <Select defaultValue={this.state.myTeams[0].id} style={{ width: 120 }} onChange={key => this.handleTeamSelect(key)}>
                            {this.state.myTeams.map((item,index) =>
                                <Option key={index} value={item.id}>{item.teamname}</Option>
                            )}
                        </Select>
                        </FormItem>
                        <FormItem label="领队"  style={{marginBottom:0}} >   
                        <Select placeholder="姓名" notFoundContent="没有用户信息" defaultValue={this.state.mySelf.id } style={{ width: 290 }} {...getFieldProps('leader')}>
                            <Option key={this.state.mySelf.id } value={this.state.mySelf.id } disabled={false}>姓名：{this.state.mySelf.playername}，赛事证号：{this.state.mySelf.id}</Option>
                        </Select>  
                </FormItem>
                    <FormItem label="教练"  style={{marginBottom:0}}>  
                        {getFieldDecorator('coach', {
                            rules: [{ required: true ,message:'请选择一名教练'}],
                        })( 
                            <Select  placeholder="姓名" notFoundContent="没有用户信息" showSearch={true} style={{ width: 290 }} onSelect={key => this.handleCoach(key)}>
                            {this.state.currentTeam.map(item =>
                                <Option key={item.id} value={item.id} disabled={false}>姓名：{item.playername}，赛事证号：{item.id}</Option>
                            )}
                            </Select>   
                        )} 
                    </FormItem>
                    <FormItem label="队员"  style={{marginBottom:0}}>   
                        {getFieldDecorator('player', {
                            rules: [
                                { required: true},
                                // { validator: this.validatePlayerr }
                            ],
                        })(
                            <Select mode="multiple" notFoundContent="没有用户信息" placeholder="姓名" showSearch={true} style={{ width: 290 }} onSelect={key => this.handlePlayer(key)} onDeselect={key => this.handlePlayerDe(key)}>
                            {this.state.currentTeam.map(item =>
                                <Option key={item.id} value={item.id} disabled={false}>姓名：{item.playername}，赛事证号：{item.id}</Option>
                            )}
                            </Select>  
                        )}
                    </FormItem>     
                    <FormItem>
                        <Button type="primary" style={{paddingLeft:10, paddingRight:10, marginRight:10}} htmlType="submit">提交</Button>
                        <Button type="danger" style={{paddingLeft:10, paddingRight:10}} onClick={this.cancelSubmit}>取消</Button>
                    </FormItem>
                </Form>      
        )
    }
}


const ExistTeamForm = Form.create()(FormForSign);

export default ExistTeamForm;
