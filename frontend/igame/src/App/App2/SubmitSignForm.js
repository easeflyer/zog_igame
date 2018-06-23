import React from 'react';
import SignForm from './SignForm';
import { Input, Select, Button, Badge  } from 'antd';

export default class SubmitSignForm extends React.Component{
    submitSignForm=(data)=>{
        this.props.submitSignForm(data);
    }

    render(){
        return(
            <div>
                    {!this.props.toast ? <SignForm submitSignForm={this.submitSignForm} /> : <Badge> <span>恭喜您，报名成功！</span></Badge> }     
            </div>
        )
    }
}