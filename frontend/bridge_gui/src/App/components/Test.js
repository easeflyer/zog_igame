import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

import Demo1 from '../components/cards/demos' // 约定叫录入框
// import Demo2 from './demo2'


const App = (props)=>{
  const url = props.match.url;
  return <div>
    <Switch>
      <Route path={`${url}/cards`} component={Demo1} />
    </Switch>
  </div>
}



export default App; 
