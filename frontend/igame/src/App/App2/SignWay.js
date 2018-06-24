import React from 'react';
import ExistTeamForm from './ExistTeamForm';
import NewTeamForm from './NewTeamForm';
import { Input, Select, Button, Badge  } from 'antd';

export default class SignForm extends React.Component{
    submitExistTeamForm=(data)=>{
        this.props.submitExistTeamForm(data);
    }

    submitNewTeamForm=(data)=>{
        console.log(data)
    }

    render(){
        return(
            <div>
                    {/* {!this.props.toast ? <ExistTeamForm submitExistTeamForm={this.submitExistTeamForm} /> : <Badge> <span>恭喜您，报名成功！</span></Badge> }      */}
                    {!this.props.toast ? <NewTeamForm submitNewTeamForm={this.submitNewTeamForm} /> : <Badge> <span>恭喜您，报名成功！</span></Badge> }     
            </div>
        )
    }
}