// export {default as Demo1 } from './demo1'
// export {Demo1} from './demo1'

import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Demo1 from './demo1' // 约定叫录入框
import Demo2 from './demoMCard'
// import Demo2 from './demo2'


const App = (props)=>{
  const url = props.match.url;
  return <div>
    <Switch>
      <Route path={`${url}/demo1`} component={Demo1} />
      <Route path={`${url}/demo2`} component={Demo2} />
    </Switch>
  </div>
}



export default App; 
