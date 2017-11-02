import React from 'react';
import ReactDOM from 'react-dom';
// import App from './containers/App';
import { HashRouter, Link, Route, Switch, withRouter } from 'react-router-dom';
// import router from '../backend/server';
import axios from 'axios';

import DocBox from './DocBox'

const inlineStyle3 = {
    'border': 'solid',
    // 'borderRadius': 30,
    'flex': 1,
    'padding': 25,
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'space-around',
    'backgroundColor': '#f2f9f9',
};

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addDoc: '',
            user: {
                firstName: '',
                lastName: '',
                password: '',
                username: '',
                id: '',
                documentsOwned: [],
                documentsCanEdit: []
            }
        }
    }
    
    handleChange(e){
        const name = e.target.id;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    getSharedDocExec(resp){
        if (resp.data.success){
            console.log('document added');
            return this.props.history.push("/editDoc");
        }
    }

    getSharedDoc(){
        axios.post('http://localhost:3000/search', {
            docId: this.state.addDoc
        })
        .then((resp) => (this.getSharedDocExec(resp)))
        .catch(error => console.log('BAD', error));
    }

    logoutExec(resp){
        if (resp.data.success){
        return this.props.history.push("/login");
        }
    }

    newDocExec(resp){
        if (resp.data.success){
            console.log("doc created");
            return this.props.history.push("/editDoc")
        }
    }

    newDoc(){
        // var title = prompt("What would you like to name your document?", "New Document") 
        axios.post('http://localhost:3000/makeDoc', {}
        )
        .then((resp) => (this.newDocExec(resp)))
        .catch(error => console.log('BAD', error));
    }

    logout(){
        axios.get('http://localhost:3000/logout', {}
            )
            .then((resp) => (this.logoutExec(resp)))
            .catch(error => console.log('BAD', error));
    }

    userVerif(resp){
        if (resp.data.success){
            this.setState({
                user: resp.data.user
            })
        }
        
    }

    componentDidMount() {
        axios.get('http://localhost:3000/home', {}
        )
        .then((resp) => (this.userVerif(resp)))
        .catch(error => console.log('BAD', error));
        // console.log('these are the other props', this.props)
    }   

    componentWillReceiveProps(nextProps){
        // console.log('these are my props', nextProps)
    }

    render() {
        return (
            <div style={inlineStyle3}>
                <h1>Welcome {this.state.user.firstName}</h1>
                <br/>
                    <div style={{marginBottom: 10, marginTop: -15}}>
                        <input type="text" className="form-control" placeholder="Add a document" id="addDoc"
                        value={this.state.addDoc} onChange={(e) => this.handleChange(e)}></input>
                        <button onClick={() => this.getSharedDoc()} style={{margin: 10}} className="btn btn-primary">Add shared document</button>
                    </div>
                <DocBox docs={this.state.user.documentsOwned} otherDocs={this.state.user.documentsCanEdit} />
                <button onClick={() => this.newDoc()} className="btn btn-success">Make a new document</button>
                <button onClick={() => this.logout()} style={{margin: 10}} className="btn btn-danger">Logout</button>
            </div>  
        )
    }
}

export default Home;
