import React, { Component } from 'react';
import './App.css';
import {NavLink, Switch, Route, withRouter} from 'react-router-dom'
import {Redirect} from 'react-router';
import Signup from './components/Signup'
import Login from './components/Login'
import Jokes from './components/Jokes'

class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className='top_nav'>
          <NavLink to='/jokes' style={{textDecoration:'none'}}>View Joke</NavLink>
          <NavLink to='/login' style={{textDecoration:'none'}}>Login</NavLink>
          <NavLink to='/signup' style={{textDecoration:'none'}}>SignUp</NavLink>
        </nav>

        <section>
          <Switch>
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login}/>
            <Route path='/jokes' component={Jokes} />
            <Route path='/' render={() => (
                <Redirect to='/Jokes' />
            )
              } />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withRouter(App);