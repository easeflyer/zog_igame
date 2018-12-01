//import Header from './Header'; 可以进一步 设计一个应用的框架。然后其他的都放入
// 找一个现成的组件解决。比如 pannel
// 但还要考虑 手机界面 路由的问题。不能所有的组件都包进去。应该先判断手机界面
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Tables from '../libs/component/table'
//import PrivateRoute from './PrivateRoute'; 

// 子组件列表
import Home from './Home';
import Test from './Test';
import Game from './Game';

@inject('testStore', 'commonStore')
@withRouter
@observer
export default class App extends React.Component {
  componentWillMount() {
    console.log('...componentWillMount');
  }
  componentDidMount() {
    console.log('...componentDidMount');
  }
  render() {
    const tableList=[[{
      name:"张三",
      face:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank:"大师",
      status:"ok"
    },{
      name:"张三",
      face:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank:"大师",
      status:"ok"
    },{
      name:"张三",
      face:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank:"大师",
      status:"ok"
    },{
      name:"张三",
      face:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank:"大师",
      status:"ok"
    },],[{
      name:"张三",
      face:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank:"大师",
      status:"ok"
    },{
      name:"张三",
      face:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank:"大师",
      status:"ok"
    },{
      name:"张三",
      face:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank:"大师",
      status:"ok"
    },{
      name:"张三",
      face:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank:"大师",
      status:"ok"
    },],[{
      name:"张三",
      face:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank:"大师",
      status:"ok"
    },{
      name:"张三",
      face:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank:"大师",
      status:"ok"
    },{
      name:"张三",
      face:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank:"大师",
      status:"ok"
    },{
      name:"张三",
      face:"https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1285622578,302277335&fm=27&gp=0.jpg",
      rank:"大师",
      status:"ok"
    },]]
    return (
      <div>
        {/* <Header /> */}  
        <Tables tableList={tableList} size={200} scale={0.05} margin={2}/>
        <Switch>
          <Route path="/" component={""} />
          <Route path="/test" component={Test} />
          {/* 注意主页放在最下面，避免重复匹配 */}
          <Route path="/da" component={Home} />
        </Switch>
      </div>
    );
  }
}