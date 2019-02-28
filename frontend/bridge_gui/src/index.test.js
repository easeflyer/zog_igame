import ReactDOM from 'react-dom';
import React from 'react';
import Card from './App/components/card'
//import Card from './App/components/Card'
// import {basename} from './config'
// import { HashRouter,BrowserRouter } from 'react-router-dom';

// import { Provider } from 'mobx-react';

// import App from './App/components/App';

// import testStore from './App/stores/testStore';
// import commonStore from './App/stores/commonStore';
// import tableStore from './App/stores/tableStore';
// import boardStore from './App/stores/board'
// import newBoardStore from './App/stores/newBoard'
// const stores = {
//   testStore,
//   commonStore,
//   tableStore,
//   boardStore,
//   newBoardStore
// };

// // For easier debugging
// window._____APP_STATE_____ = stores;

//promiseFinally.shim();
//useStrict(true);

const App = props => <div>
  <Card
    active={2}
    // key={22}
    index={22}
    seat={'S'}
    animation={''}
    card={'S2'}
    size={171.54}
    position={{ x: 476, y: 10 }}
    zIndex={2}
  />
</div>

ReactDOM.render(<App />, document.getElementById('root'));
