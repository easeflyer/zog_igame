import React from 'react';
import { List } from 'antd-mobile';
import './Index.css';
import ChangeSafetyNav from './Changepwd';

const Item = List.Item;
const Brief = Item.Brief;


export default class Safety extends React.Component {
    state = {
        // disabled: false,
        SafetyNav:true,
        change:false,
        reset:false,
    }

    changeSafetyNav = ()=>{
        this.setState({
            SafetyNav:!this.state.SafetyNav,
            change:true,
        });
    }

    
    render() {
        return (
            <div>
                {this.state.SafetyNav ? 
                    <List renderHeader={() => '请选择你要进行的操作'} className="my-list">
                        <Item arrow="horizontal" onClick={this.changeSafetyNav}>修改密码</Item>
                        <Item arrow="horizontal" onClick={() => {}}>重置密码（忘记密码）</Item>
                    </List>
                : 
                ''
                }
                {this.state.change ? <ChangeSafetyNav />  : ''}
                {this.state.reset ? <ChangeSafetyNav />  : ''}
            </div>
        );
    }
}

