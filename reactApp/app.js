import React from 'react';
import ReactDOM from 'react-dom';
// import App from './containers/App';
import { HashRouter, Link, Route, Switch, withRouter } from 'react-router-dom';
// import router from '../backend/server';
import axios from 'axios';

import DocBox from './containers/DocBox';
import Home from './containers/Home';
import Register from './containers/Register';
import Login from './containers/Login';

import MyEditor from './components/Editor';

// import mainReducer from '../reducers/mainReducer'
// console.log(mainReducer)
// const store = createStore(mainReducer);

//This can check if your electron app can communicate with your backend 
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
        // console.log('these are the realest props', this.props)
    }

    componentWillReceiveProps(nextProps){
        // console.log('these are my props', nextProps)
    }

    render(){
        return (
        <div>
            <Switch>
                <Route path="/editDoc/:Doc" component={MyEditor}/>
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
    <HashRouter>
    <App />
    </HashRouter>,
   document.getElementById('root'));
