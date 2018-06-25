import React from 'react';
import ExistTeamForm from './ExistTeamForm';
import NewTeamForm from './NewTeamForm';
import { Input, Select, Button, Badge  } from 'antd-mobile';

export default class SignForm extends React.Component{
    state={
        exist:0
    }

    selectExist=()=>{
        this.setState({
            exist:1
        })
    }

    selectNew=()=>{
        this.setState({
            exist:2
        })
    }

    submitExistTeamForm=(data)=>{
        this.props.submitExistTeamForm(data);
    }
    cancelExistTeamForm=()=>{
        this.props.cancelTeamForm();
        // this.setState({
        //     exist:0
        // })
    }
    
    submitNewTeamForm=(data)=>{
        this.props.submitNewTeamForm(data);
    }
    cancelNewTeamForm=()=>{
        this.props.cancelTeamForm();
        // this.setState({
        //     exist:0
        // })
    }

    render(){
        return(
            <div>
                    {this.state.exist==0 ?
                        <div>
                            <Button type="primary" size="small" inline style={{float:'left',marginLeft:20, marginTop:30}} onClick={this.selectExist}>选择已有赛队报名</Button> 
                            <Button type="warning" size="small" inline style={{float:'right',marginRight:20, marginTop:30}} onClick={this.selectNew}>新建赛队报名</Button>
                        </div> :
                        null
                    }
                    {this.state.exist==1 ? 
                        !this.props.toast ? <ExistTeamForm submitExistTeamForm={this.submitExistTeamForm} cancelExistTeamForm={this.cancelExistTeamForm}/> : <p style={{textAlign:'center',marginTop:30}}>恭喜您，报名成功！</p>  : 
                        null  
                    }    
                    {this.state.exist==2 ? 
                        !this.props.toast ? <NewTeamForm submitNewTeamForm={this.submitNewTeamForm} cancelNewTeamForm={this.cancelNewTeamForm}/> : <p style={{textAlign:'center',marginTop:30}}>恭喜您，报名成功！</p> :
                        null
                    }
            </div>
        )
    }
}