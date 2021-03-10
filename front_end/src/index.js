import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {Provider} from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import {BrowserRouter as Router} from 'react-router-dom';
import thunk from 'redux-thunk';

import AuthReducer from './store/reducers/auth';

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;

const rootReducer = combineReducers({
    auth: AuthReducer
    
})

//Creating a redux store, we then add our redux then compose our enhancer then allow middleware with thunk being our middleware
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

const render = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>  
  </Provider>
)

ReactDOM.render(
  
  <React.StrictMode>
    {render}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
