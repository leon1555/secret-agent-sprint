import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Agent from './components/Agent';
import Admin from './components/Admin';
import Login from './components/Login';
import Urgent from './components/Urgent';
import Archival from './components/Archival';

import Header from './components/Header';

function App() {
    
  return (
      <>
      
      <Router>
      <Link to='/' className='btn btn-primary m-3'>Main</Link>
          <Header></Header>
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
