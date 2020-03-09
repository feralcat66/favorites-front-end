import React from 'react';
import {
    BrowserRouter,
    Route,
    Link,
    Switch,
} from 'react-router-dom';
import './App.css';
import Search from './Search';
import Login from './Login';
import Favorites from './Favorites';
import PrivateRoute from './PrivateRoute';

export default class App extends React.Component {
  state = { user: null };
    
  setUser = user => {
      this.setState({ user: user.body });
  }

  render() {
      console.log(this.state)
      return (
        <div className="App">
        
        <BrowserRouter>
        <div className="links">
            <Link to="/favorites">Favorites</Link>
            <Link to="/">Search</Link>
            <Link to="/login">Login</Link>
        </div>
            <Switch>
                <PrivateRoute exact path="/" component={Search} user={this.state.user} />
                <PrivateRoute exact path="/favorites" component={Favorites} user={this.state.user} />
                <Route exact path="/login" render={(props) => <Login {...props} setUser={ this.setUser } user={this.state.user }/>} />
            </Switch>

        </BrowserRouter>
        </div>
    );
      }
}
