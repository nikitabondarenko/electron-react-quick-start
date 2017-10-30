import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';

<<<<<<< HEAD
import mainReducer from '../reducers/mainReducer'
console.log(mainReducer)
const store = createStore(mainReducer);

//This can check if your electron app can communicate with your backend 
fetch('http://localhost:3000')
.then(resp => resp.text())
.then(text => console.log(text))
.catch(err => {throw err})

ReactDOM.render(
    <Provider store={store}>
    <App />
  </Provider>,
=======
//import App from './components/App.js';
import Editor from './components/Editor.js';

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

ReactDOM.render(<Editor/>,
>>>>>>> nikitab
   document.getElementById('root'));
