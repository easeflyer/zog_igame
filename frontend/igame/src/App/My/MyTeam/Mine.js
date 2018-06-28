import React from 'react';
import { NavBar, List, WhiteSpace } from 'antd-mobile';
import { Icon } from 'antd';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？

export default class TeamMine extends React.Component {       //我的赛队列表页
    render() {
        const matchListData = [
            {id:1, people:'8人',  name:'欧德汇通牛逼1队'},
            {id:2, people:'8人',  name:'欧德汇通牛逼2队'},
            {id:3, people:'8人',  name:'欧德汇通牛逼3队'},
            {id:4, people:'8人',  name:'欧德汇通牛逼4队'},
            {id:8, people:'8人',  name:'欧德汇通牛逼5队'},
            {id:9, people:'8人',  name:'欧德汇通牛逼8队'}
        ];
        const MatchList = (<div>
            {matchListData.map((item, index) => {
                return (
                    <List.Item key={index}    //?这里应该用id还是索引做key
                    extra={item.people}
                    arrow="horizontal" 
                    onClick={() => {}}
                    >{item.name}</List.Item>
                );
            })}
        </div>);
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.props.toMine}    //返回我
                rightContent={[
                    <Icon key="0" type="plus-square" onClick={()=>{console.log(9999999999)}} style={{ marginRight: '16px',fontSize:20 }} />,
                  ]}
                >我的赛队
                </NavBar>
                <WhiteSpace size='xl' />
                {MatchList}
            </div>
        );
    }
}
