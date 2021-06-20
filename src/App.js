import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Agent from './components/Agent';
import Admin from './components/Admin';
import Login from './components/Login';
import Urgent from './components/Urgent';
import Archival from './components/Archival';

import Header from './components/Header';

function App() {
    
  return (
      <>
      <Header></Header>
      <Router>
          <div>
              <Switch>
                <Route path="/" exact component={Login}/>
                  <Route path="/main" exact component={Login}/>
                  <Route path="/admin" exact component={Admin}/>
                  <Route path="/agent" exact component={Agent}/>
                  <Route path="/agent/urgent" exact component={Urgent}/>
                  <Route path="/agent/archival" exact component={Archival}/>
              </Switch>
          </div>
      </Router>
      </>
  )
  
}
export default App;
