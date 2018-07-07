import React from 'react';
import { NavBar, Tabs, WhiteSpace, Badge, WingBlank } from 'antd-mobile';
import { Icon } from 'antd';
import DetailsHome from './Home'
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import News from './News';
import MatchData from './MatchData';
import MatchTeam from './Team';
import Course from './Course';


export default class MatchDetails extends React.Component {    //已完成的比赛
    componentWillMount(){
        console.log('当前比赛基本信息。。。。。。')
        console.log(this.props.match)
    }

    renderContent = tab =>
        // (<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
        tab.content;

    render() {
        const tabs = [
            { title: <Badge>首页</Badge>,                  content:<DetailsHome match={this.props.match} />},
            { title: <Badge>参赛队</Badge>,                content:<MatchTeam match={this.props.match} /> },
            { title: <Badge dot>结果</Badge>,              content:<Course  /> },
            { title: <Badge>数据</Badge>,                  content:<MatchData /> },
            { title: <Badge text={'3'}>新闻</Badge>,       content:<News match={this.props.match} /> },
            ];
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={this.props.toMatchList}    //返回我的比赛列表
                >比赛详情
                </NavBar>
                <WhiteSpace size='md' />
                <WingBlank>
                    <Tabs tabs={tabs} renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}>
                        {this.renderContent}
                    </Tabs>
                </WingBlank>
            </div>
        );
    }
}

