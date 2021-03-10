
import React, {useEffect, Suspense} from 'react';
import {Route, Switch } from 'react-router-dom';
import {connect} from 'react-redux';


import * as actions from './store/actions/index';
import './App.css';
import Dashboard from './containers/Dashboard/Dashboard';


const Signup = React.lazy(() => {
  return import('./containers/Auth/Signup/Signup');
});

const Login = React.lazy(() => {
  return import ('./containers/Auth/Login/Login');
})

const App = props => {
  const { onTryAutoSignIn } = props;

  useEffect(() => {
    onTryAutoSignIn();
  }, [onTryAutoSignIn]);

  
  let routes = (
    <Switch>
      <Route path="/signup" exact render={props => <Signup {...props}/>}/>
      <Route path="/login" exact render={props => <Login {...props} />}/>
      <Route path="/" render={props => <Login {...props} />} />
    </Switch>
  )

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path='/' render={props => <Dashboard {...props}/>}></Route>   
      </Switch>
    )
  }

  return (
    <div className="App">
      <Suspense fallback = {<p>Loading...</p>} >
        {routes}
      </Suspense>      
    </div>
  );
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token != null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignIn: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
