import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// important components
import Homepage from './containers/ContactContainer'
import CreateUserPage from './containers/CreateUserContianer'
import EditUserPage from './containers/EditUserContainer'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component ={Homepage} />
          <Route path='/newContact' component ={CreateUserPage} />
          <Route path='/editContact/:id' component={EditUserPage} />
          <Route></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
