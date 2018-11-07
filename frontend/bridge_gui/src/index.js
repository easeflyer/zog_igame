import ReactDOM from 'react-dom';
//import promiseFinally from 'promise.prototype.finally';
import React from 'react';
import { HashRouter } from 'react-router-dom';
//import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';

import App from './App/components/App';

import testStore from './stores/testStore';
import commonStore from './stores/commonStore';

const stores = {
  testStore,
  commonStore
};

// For easier debugging
window._____APP_STATE_____ = stores;

//promiseFinally.shim();
//useStrict(true);

ReactDOM.render((
  <Provider {...stores}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>
), document.getElementById('root'));
