import ReactDOM from 'react-dom';
//import promiseFinally from 'promise.prototype.finally';
import React from 'react';
import {basename} from './config'
import { HashRouter,BrowserRouter } from 'react-router-dom';

import { Provider } from 'mobx-react';

import App from './App/components/App';
import "./index.css"
import testStore from './App/stores/testStore';
import commonStore from './App/stores/commonStore';
import tableStore from './App/stores/tableStore';
import boardStore from './App/stores/board'
import newBoardStore from './App/stores/newBoard'
const stores = {
  testStore,
  commonStore,
  tableStore,
  boardStore,
  newBoardStore
};

// For easier debugging
window._____APP_STATE_____ = stores;

//promiseFinally.shim();
//useStrict(true);

ReactDOM.render((
  <Provider {...stores}>
    <HashRouter basename={basename}> 
      <App />
    </HashRouter>
  </Provider>
), document.getElementById('root'));
