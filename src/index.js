import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'

// Layouts
import App from './App'
import Home from './components/Home'
import Battlefield from './components/Battlefield'
import MyPhoenixes from './components/MyPhoenixes'
import FAQ from './components/FAQ'
import MetamaskGet from './components/MetamaskGet'
import MetamaskLocked from './components/MetamaskLocked'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
          <Route path="/faq" component={FAQ} />
          <Route path="/battlefield" component={Battlefield} />
          <Route path="/myPhoenixes" component={MyPhoenixes} />
          <Route path="/getMetamask" component={MetamaskGet} />
          <Route path="/unlockMetamask" component={MetamaskLocked} />
      </Route>
    </Router>
  </Provider>
  ),
  document.getElementById('root')
);
