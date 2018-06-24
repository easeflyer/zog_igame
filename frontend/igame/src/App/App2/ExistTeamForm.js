import React from 'react'
import DealUser from './Model/DealUser'
import { Form, Select, Button, Row, Col  } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const formDetail={
    eventName : '团体公开赛',
    teamId : 0
};

class FormForSign extends React.Component{
    state={
        userList: new DealUser(),  
        hasTeam:0
    }

    onSubmit=(e)=>{
        e.preventDefault();
        this.props.submitExistTeamForm(formDetail);
    }

    handlerEventSelect =(value)=>{
        formDetail.eventName = `${value}`;
    }

    handlerTeamSelect=(value)=>{
        this.setState({
            hasTeam:`${value}`
        });
        formDetail.teamId = `${value}`;
        console.log(formDetail)
    }

    render(){
        const {getFieldProps, getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

        const allUserList = this.state.userList.list[0].userInfo;

        return(
            <Form layout="vertical" onSubmit={this.onSubmit}>
                    <FormItem  style={{marginBottom:0}} >
                        <span>项目：</span>
                        <Select defaultValue='团体公开赛' style={{ width: 120 }} onSelect={this.handlerEventSelect}>
                            <Option value="团体公开赛">团体公开赛</Option>
                            <Option value="青年赛">青年赛</Option>
                            <Option value="中年赛">中年赛</Option>
                        </Select>
                    </FormItem>
                    <FormItem style={{marginBottom:0}} >
                        <span>赛队：</span>
                        <Select defaultValue={allUserList.teamList[0].teamName} style={{ width: 120 }} onSelect={this.handlerTeamSelect}>
                            {allUserList.teamList.map((item,index) =>
                                <Option key={index} value={index}>{item.teamName}</Option>
                            )}
                        </Select>
                    </FormItem>
                    <FormItem label="领队"  style={{marginBottom:0}} >   
                        <Row>
                            <Col span={6}>
                                <span>赛事证号</span>
                            </Col>
                            <Col span={6}>
                                <span>{allUserList.teamList[this.state.hasTeam].leaderId}</span>
                            </Col>
                            <Col span={6}>
                                <span>姓名</span>
                            </Col>
                            <Col span={6}>
                                <span>{allUserList.teamList[this.state.hasTeam].leaderName}</span>
                            </Col>
                        </Row>                        
                    </FormItem>
                    <FormItem label="教练"  style={{marginBottom:0}} >   
                        <Row>
                            <Col span={6}>
                                <span>赛事证号</span>
                            </Col>
                            <Col span={6}>
                                <span>{allUserList.teamList[this.state.hasTeam].coachId}</span>
                            </Col>
                            <Col span={6}>
                                <span>姓名</span>
                            </Col>
                            <Col span={6}>
                                <span>{allUserList.teamList[this.state.hasTeam].coachName}</span>
                            </Col>
                        </Row>    
                    </FormItem>
                    {
                        allUserList.teamList[this.state.hasTeam].player.map((item,index) =>
                            <FormItem key={index} label={"队员"+(index+1)}  style={{marginBottom:0}} >   
                                <Row>
                                    <Col span={6}>
                                        <span>赛事证号</span>
                                    </Col>
                                    <Col span={6}>
                                        <span>{item.eventId}</span>
                                    </Col>
                                    <Col span={6}>
                                        <span>姓名</span>
                                    </Col>
                                    <Col span={6}>
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
                        <Button type="danger" style={{paddingLeft:10, paddingRight:10}}>取消</Button>
                    </FormItem>
                </Form>      
        )
    }
}


const ExistTeamForm = Form.create()(FormForSign);

export default ExistTeamForm;