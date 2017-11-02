import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';

import DocBox from './DocBox'

const inlineStyle3 = {
    'border': 'solid',
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
            newDocTitle: '',
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
            return this.props.history.push(`/editDoc/${resp.data.document._id}`);
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
        console.log('in newDocExec', resp.data)
        if (resp.data.success){
            return this.props.history.push(`/editDoc/${resp.data.documentInfo._id}`)
        }
    }

    newDoc(){
        // var title = prompt("What would you like to name your document?", "New Document") 
        axios.post('http://localhost:3000/makeDoc', {
            title: this.state.newDocTitle
        }
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
    }   

    componentWillReceiveProps(nextProps){
    }

    render() {
        return (
            <div style={inlineStyle3}>
                <h1>Welcome {this.state.user.firstName}</h1>
                <br/>
                    <div style={{'display': 'flex', marginBottom: 30, marginTop: -15, 'flexDirection': 'row'}}>
                        <input type="text" className="form-control" placeholder="Add a shared document" id="addDoc"
                        value={this.state.addDoc} onChange={(e) => this.handleChange(e)}></input>
                        <button onClick={() => this.getSharedDoc()} className="btn btn-primary">Add shared document</button>
                    </div>
                    <DocBox docs={this.state.user.documentsOwned} otherDocs={this.state.user.documentsCanEdit} />
                    <div style={{'display': 'flex', 'flexDirection': 'row', 'alignItems': 'center',}}>
                        <input type="text" className="form-control" placeholder="Add a document" id="newDocTitle"
                        value={this.state.newDocTitle} onChange={(e) => this.handleChange(e)}></input>
                        <button onClick={() => this.newDoc()} className="btn btn-success">Make a new document</button>
                    </div>
                <button onClick={() => this.logout()} style={{margin: 10}} className="btn btn-danger">Logout</button>
            </div>  
        )
    }
}

export default Home;
