import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import Editor from './components/Editor.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import injectTapEventPlugin from 'react-tap-event-plugin';

// injectTapEventPlugin();

//This can check if your electron app can communicate with your backend
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})
//
// // ReactDOM.render(
//     <Provider store={store}>
//     <App />
//   </Provider>,
// =======
//import App from './components/App.js';

/* This can check if your electron app can communicate with your backend */
// fetch('http://localhost:3000')
// .then(resp => resp.text())
// .then(text => console.log(text))
// .catch(err => {throw err})

ReactDOM.render(<MuiThemeProvider>
  <Editor/>
</MuiThemeProvider>,
   document.getElementById('root'));
