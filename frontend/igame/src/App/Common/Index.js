import React from 'react';
import { NavBar, List, WhiteSpace } from 'antd-mobile';
import { Icon } from 'antd';
import 'antd-mobile/dist/antd-mobile.css'; // 这一句是从哪里引入的？
import MatchList from './MatchList';

const Item = List.Item;


export default class Match extends React.Component {
    state = {
        open:0,       // 0：默认页，分类列表， 1：所选分类的比赛列表， 2：所选比赛的详细
        title:'',
    }
    setTitle = (title)=>{
        this.setState({
            title:title,
        })
    }
    toSortList = ()=>{             //返回我的比赛分类页
        this.setState({
            open:0,
        })
    }
    toMatchList = ()=>{            //进入比赛列表页
        this.setState({
            open:1,
        })
    }
    
    render() {
        let page = null;
        switch (this.state.open) {
            case 0:
                page = <SortList 
                    name = {this.props.name}
                    toMine={this.props.toMine}                  //返回个人中心
                    setTitle={this.setTitle}                    //设置导航标题
                    toMatchList={this.toMatchList} />;         //进入比赛列表页
                break;
            case 1:
                page = <MatchList title={this.state.title} toSortList={this.toSortList} />;   
                break;
            case 2:
                // page = <CompletedMatch toMatchMine={this.toMatchMine} />;   //已经完成的比赛列表页面
                break;
            default:
                // page = <Match toMine={this.props.toMine} />;
                break;
        }
        return(
            <div>
                {page}
            </div>
        );
    }
}

class SortList extends React.Component {       //我的比赛分类列表页组件
    toMatchList = (title)=>{
        this.props.toMatchList();
        this.props.setTitle(title);
    }
    render() {
        const name = this.props.name;
        return(
            <div>
                <NavBar
                mode="light"
                icon={name ? <Icon type="left" /> : '' }
                onLeftClick={name ? ()=>this.props.toMine() : ()=>{} }      //如果有name，认为是从《我》这个入口进来，从而加载不同的数据，设置不同的title
                >{name ? `${name}的比赛` : '比赛列表'}
                </NavBar>
                <WhiteSpace size='xl' />
                <Item extra="" arrow="horizontal" onClick={() => {this.toMatchList('即将开始的比赛')} }>即将开始的比赛</Item>
                <Item extra="" arrow="horizontal" onClick={() => {this.toMatchList('正在进行的比赛')} }>正在进行的比赛</Item>
                <Item extra="" arrow="horizontal" onClick={() => {this.toMatchList('已经完成的比赛')} }>已经完成的比赛</Item>
            </div>
        );
    }
}