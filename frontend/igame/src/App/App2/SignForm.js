import React from 'react'
import { Form, Input, Select, Button  } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

class SignForm extends React.Component{
    constructor(props){
        super(props);
    }

    submitSignForm=()=>{
        this.props.submitSignForm();
    }
    render(){
        const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
        return(
            <Form layout="vertical">
                    <FormItem label="项目"  style={{marginBottom:0}} >
                        <Select defaultValue="团体公开赛" style={{ width: 120 }}>
                            <Option value="团体公开赛">团体公开赛</Option>
                            <Option value="青年赛">青年赛</Option>
                            <Option value="中年赛">中年赛</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="队伍名称" style={{marginBottom:0}} >
                        <Select defaultValue="专治小可爱" style={{ width: 120 }}>
                            <Option value="专治小可爱">专治小可爱</Option>
                            <Option value="你是最棒的">你是最棒的</Option>
                            <Option value="宇宙无敌帅">宇宙无敌帅</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="领队"  style={{marginBottom:0}} >   
                        <Select defaultValue="赛事证号" style={{ width: 120 }}>
                            <Option value="18062202">18062202</Option>
                            <Option value="18062203">18062203</Option>
                            <Option value="18062204">18062204</Option>
                            <Option value="18062205">18062205</Option>
                        </Select>
                        <Select defaultValue="姓名" style={{ width: 120 }}>
                            <Option value="张强">张强</Option>
                            <Option value="玛丽">玛丽</Option>
                            <Option value="刘飞">刘飞</Option>
                            <Option value="武广">武广</Option>
                        </Select>    
                    </FormItem>
                    <FormItem label="教练"  style={{marginBottom:0}} >   
                        <Select defaultValue="赛事证号" style={{ width: 120 }}>
                            <Option value="18062202">18062202</Option>
                            <Option value="18062203">18062203</Option>
                            <Option value="18062204">18062204</Option>
                            <Option value="18062205">18062205</Option>
                        </Select>
                        <Select defaultValue="姓名" style={{ width: 120 }}>
                            <Option value="张强">张强</Option>
                            <Option value="玛丽">玛丽</Option>
                            <Option value="刘飞">刘飞</Option>
                            <Option value="武广">武广</Option>
                        </Select>    
                    </FormItem>
                    <FormItem label="队员"  style={{marginBottom:0}} >   
                        <Select defaultValue="赛事证号" style={{ width: 120 }}>
                            <Option value="18062202">18062202</Option>
                            <Option value="18062203">18062203</Option>
                            <Option value="18062204">18062204</Option>
                            <Option value="18062205">18062205</Option>
                        </Select>
                        <Select defaultValue="姓名" style={{ width: 120 }}>
                            <Option value="张强">张强</Option>
                            <Option value="玛丽">玛丽</Option>
                            <Option value="刘飞">刘飞</Option>
                            <Option value="武广">武广</Option>
                        </Select>    
                    </FormItem>
                    <FormItem style={{marginTop:20, marginBottom:0}}>
                        <p>联系人：{'江川'}</p>
                        <p>电话：{"123456789"}</p>
                        <p> Email：{"123456@163.com"}</p>   
                    </FormItem>
                    <FormItem>
                        <Button type="primary" style={{paddingLeft:10, paddingRight:10, marginRight:10}} htmlType="submit" onClick={this.submitSignForm}>提交</Button>
                        <Button type="danger" style={{paddingLeft:10, paddingRight:10}}>取消</Button>
                    </FormItem>
                </Form>      
        )
    }
}

function mapPropsToFields(props) {
    return '';
}

const SignFormCommit = Form.create({
    mapPropsToFields: mapPropsToFields
})(SignForm);

export default SignFormCommit;