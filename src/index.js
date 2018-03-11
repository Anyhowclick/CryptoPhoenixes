import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import 'bootstrap/dist/css/bootstrap.css'

// Layouts
import App from './App'
import Home from './layouts/Home'
import Market from './layouts/Market'
import FAQ from './layouts/FAQ'
import MetamaskGet from './layouts/MetamaskGet'
import MetamaskLocked from './layouts/MetamaskLocked'

// Redux Store
import store from './store'

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store)

ReactDOM.render((
  <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
        <Route path="/faq" component={FAQ} />
        <Route path="/marketplace" component={Market} />
        <Route path="/getMetamask" component={MetamaskGet} />
        <Route path="/unlockMetamask" component={MetamaskLocked} />
    </Route>
  </Router>
  ),
  document.getElementById('root')
);
