import React from 'react';
import { NavBar, List, WhiteSpace } from 'antd-mobile';
import { Icon } from 'antd';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import Models from '../../Models/Models';

export default class TeamMine extends React.Component {       //我的赛队列表页
    state = {
        teamList:null
    }
    // 请求我的赛队列表 
    componentDidMount(){
        const m = Models.create();
        m.query('exec','og.igame.team','get_teams',{},(data)=>{this.setState({teamList:data})},()=>{},[]);
    }
    render() {
        let datalist;
        if(!this.state.teamList || this.state.teamList.length === 0 ) {
            datalist = (<div>
                <List.Item>你还没有加入任何赛队！</List.Item>
            </div>);
        }else{
            datalist = (<div>
                {this.state.teamList.map((item,index)=>{
                    return(
                        <List.Item key={index}    //?这里应该用id还是索引做key
                        extra={`${item.players.length}人`}
                        arrow="horizontal" 
                        onClick={() => this.props.toTeamDetails(item)}
                        >{item.teamname}</List.Item>
                    );
                })}
            </div>);
        }
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.props.toMine}    //返回我
                rightContent={[
                    <Icon key="0" type="plus-square" 
                    onClick={()=>this.props.toTeamAdd()} 
                    style={{ marginRight: '16px',fontSize:20 }} />,
                  ]}
                >我的赛队
                </NavBar>
                <WhiteSpace size='xl' />
                {datalist}
            </div>
        );
    }
}
