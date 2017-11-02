import React from 'react';
import ReactDOM from 'react-dom';
import Editor from './components/Editor.js';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { HashRouter, Link, Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';

import DocBox from './containers/DocBox';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';

import MyEditor from './components/Editor';


fetch('http://localhost:3000')
.then(resp => resp.text())
.then(text => console.log(text))
.catch(err => {throw err})

class App extends React.Component {
    constructor(props){
        super(props);
        this.state =  {
        user: {
            firstName: '',
            lastName: '',
            username: ''
            },
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps){
    }

    render(){
        return (
        <div>
            <Switch>
                <Route path="/editDoc/:docId" component={MyEditor}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/home" component={Home}/>
                <Route path="/" component={Login}/>
            </Switch>
        </div>
        )
    }
};

ReactDOM.render(
  <MuiThemeProvider>
      <HashRouter>
        <App/>
      </HashRouter>
    </MuiThemeProvider>,
    document.getElementById('root'));
