import React from 'react'
import { Form, Select, Button, Row, Col  } from 'antd';

import DealUser from './Model/DealUser'
import { DealTeams } from './Model/Deal'

const FormItem = Form.Item;
const Option = Select.Option;

const formDetail={
    id:0,
    // eventName : '团体公开赛',
    teamId : 0
};

class FormForSign extends React.Component{
    state={
        eventDetail:this.props.eventDetail,//要报名赛事的全部信息
        userList: new DealUser(),  
        hasTeam:0,
        myTeams:null
    }

// 请求赛队列表 ???
    componentDidMount(){
        formDetail.id = this.state.eventDetail.id;
        console.log(this.state.eventDetail)
        // 每次打开报名页都重新请求
        const Teams = new DealTeams(res => this.stateTeams(res));
        Teams.myTeams();
    }
    stateTeams=(res)=>{
        this.setState({
            myTeams:res
        });
        this.props.stateTeams(res);
    }
    
// 提交表单，发送报名请求
    onSubmit=(e)=>{
        e.preventDefault();
        console.log(formDetail);
        // this.props.submitExistTeamForm(formDetail);
    }
    
// 取消报名，返回选择报名方式页面 ★
    cancelSubmit=()=>{
        this.props.cancelSubmit();
    }
   
// 存储选择的比赛项目
    // handlerEventSelect =(value)=>{
    //     formDetail.eventName = `${value}`;
    // }
    
// 存储选择的参赛队伍
    handlerTeamSelect=(value)=>{
        this.setState({
            hasTeam:`${value}`
        });
        formDetail.teamId = `${value}`;
    }

    render(){
        // const {getFieldProps, getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const allUserList = this.state.userList.list[0].userInfo;

        return(
            <Form layout="vertical" onSubmit={this.onSubmit}>
                    {/*<FormItem  style={{marginBottom:0}} >
                        <span>项目：</span>
                        <Select defaultValue="团体公开赛" style={{ width: 120 }} onSelect={this.handlerEventSelect}>
                            <Option value="团体公开赛">团体公开赛</Option>
                            <Option value="青年赛">青年赛</Option>
                            <Option value="中年赛">中年赛</Option>
                        </Select>
                    </FormItem>*/}
                    <FormItem style={{marginBottom:0}} >
                        <span>赛队：</span>
                        <Select defaultValue={allUserList.teamList[0].teamName} style={{ width: 120 }} onSelect={this.handlerTeamSelect}>
                            {allUserList.teamList.map((item,index) =>
                                <Option key={index} value={index}>{item.teamName}</Option>
                            )}
                        </Select>
                    </FormItem>
                    <FormItem label="领队"  style={{marginBottom:0}} >   
                        <Row  type="flex" justify="center">
                            <Col span={5}>
                                <span>赛事证号</span>
                            </Col>
                            <Col span={5}>
                                <span>{allUserList.teamList[this.state.hasTeam].leaderId}</span>
                            </Col>
                            <Col span={5}>
                                <span>姓名</span>
                            </Col>
                            <Col span={5}>
                                <span>{allUserList.teamList[this.state.hasTeam].leaderName}</span>
                            </Col>
                        </Row>                        
                    </FormItem>
                    <FormItem label="教练"  style={{marginBottom:0}} >   
                        <Row  type="flex" justify="center">
                            <Col span={5}>
                                <span>赛事证号</span>
                            </Col>
                            <Col span={5}>
                                <span>{allUserList.teamList[this.state.hasTeam].coachId}</span>
                            </Col>
                            <Col span={5}>
                                <span>姓名</span>
                            </Col>
                            <Col span={5}>
                                <span>{allUserList.teamList[this.state.hasTeam].coachName}</span>
                            </Col>
                        </Row>    
                    </FormItem>
                    {
                        allUserList.teamList[this.state.hasTeam].player.map((item,index) =>
                            <FormItem key={index} label={"队员"+(index+1)}  style={{marginBottom:0}} >   
                                <Row  type="flex" justify="center">
                                    <Col span={5}>
                                        <span>赛事证号</span>
                                    </Col>
                                    <Col span={5}>
                                        <span>{item.eventId}</span>
                                    </Col>
                                    <Col span={5}>
                                        <span>姓名</span>
                                    </Col>
                                    <Col span={5}>
                                        <span>{item.name}</span>
                                    </Col>
                                </Row>    
                            </FormItem>
                        )
                    }
                    <FormItem style={{marginTop:20, marginBottom:0}} >
                        <p>联系人：{allUserList.teamList[this.state.hasTeam].contacts}</p>
                        <p>电话：{allUserList.teamList[this.state.hasTeam].contactsTel}</p>
                        <p> Email：{allUserList.teamList[this.state.hasTeam].contactsMail}</p>   
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