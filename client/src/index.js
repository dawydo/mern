import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

import App from './components/App'
import reducers from './reducers'
import axios from 'axios'
window.axios = axios



//------REDUX STORE -------
//add reducers as argument
const store = createStore(reducers, {}, applyMiddleware(reduxThunk))


//Store as a prop and child is <App/> component
//Privider tad is React component who reads state changes
//Provider inform all children components what new state available and
// ...updates with a new state!
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('#root')
);

// console.log('STRIPE KEY IS', process.env.REACT_APP_STRIPE_KEY)
// console.log('Environment is', process.env.NODE_ENV)
