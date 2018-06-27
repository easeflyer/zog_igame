import React from 'react';
import {List, SearchBar, WingBlank} from 'antd-mobile'
import {NavBar, Icon} from 'antd-mobile'
import EventNavBar from './Common/EventNavBar'
import {DealList, DealSign} from './Model/Deal'

export default class Event extends React.Component{ 
    state={
        originList:this.props.originList||null,
        list:null
    }
 
    // 请求比赛列表 ???
    componentDidMount(){
        // 保证只请求一次
        if(this.props.initialize){
            const List = new DealList(res => this.stateList(res));
            List.eventList();
        }else{
            this.setState({
                list:this.state.originList
            })
        }
        // 每次打开或回到列表页都重新请求
        // const List = new DealList(res => this.stateConfig(res));
        // List.eventList();
    }
    stateList=(res)=>{
        this.setState({
            originList:res,
            list:res
        });
        this.props.stateList(res);
    }

    // 按关键字搜索比赛 ★
    handlerSearch(value){
        const searchEvent = new DealList();
        searchEvent.searchList(this.state.originList, value, res =>this.setState({list:res}));
    }

    // 点击查看详情 ★
    handlerClick=(key)=>{
        this.props.handlerDetail(key);
    }

   render(){
        let items = [];
        
		if(!this.state.list || this.state.list.length == 0 ) {
            items.push(<p key={0} style={{textAlign:'center',fontSize:14,padding:15, marginTop:1}} >暂无比赛</p>);
        }
        else {
            this.state.list.forEach(item => {
                items.push(
                    <List.Item 
                        key={item.id} 
                        style={{margin:'5px 0'}}
                        arrow="horizontal" 
                        onClick={id => this.handlerClick(item.id)}
                        >
                        <span style={{marginRight:5}}>{item.name}</span>
                    </List.Item>
                );
            });
		}
        
        return (
            <WingBlank>  
               <EventNavBar  left="" eventName="比赛列表" clickArrow={()=>{return false}}/>
                <SearchBar
                placeholder="Search"
                onSubmit={value => this.handlerSearch(value)}
                onChange={value => this.handlerSearch(value)}
                />
                <List>{items}</List>
            </WingBlank>
        );
    }
}