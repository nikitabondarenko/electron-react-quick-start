import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';

const inlineStyle1 = {
    'border': 'solid',
    'flex': 1,
    'padding': 75,
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'space-around',
    'backgroundColor': '#f2f9f9',
};

class Register extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fName: '',
            lName: '',
            username: '',
            pass: '',
            passCon: ''
        }
    }

    changePage() {
        return this.props.history.push("/login");
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let user = {
            username: this.state.username,
            password: this.state.pass,
            passwordRepeat: this.state.passCon,
            fName: this.state.fName,
            lName: this.state.lName
        };

        axios.post('http://localhost:3000/register', {
        username : user.username,
        password: user.password,
        passwordRepeat: user.passwordRepeat,
        firstName: user.fName,
        lastName: user.lName
        },
            {
            withCredentials: true
            }
        )
        .then(() => (this.changePage()))
        .catch(error => console.log('BAD', error));
    }

    handleChange(e){
        const name = e.target.id;
        const value = e.target.value;
        this.setState({[name]: value});
    }

    componentDidMount(){
    }

    render() {
    return (    
            <div>
                <form style={inlineStyle1} className="container-fluid" onSubmit={(e) => this.handleSubmit(e)}>
                <h1> Register: </h1> <br/> <br/>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name: </label>
                        <input type="text" className="form-control" placeholder="First Name" id="fName"
                        value={this.state.fName} onChange={(e) => this.handleChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name: </label>
                        <input type="text" className="form-control" placeholder="Last Name" id="lName"
                        value={this.state.lName} onChange={(e) => this.handleChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input type="text" placeholder="Username" className="form-control" id="username"
                        value={this.state.username} onChange={(e) => this.handleChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" className="form-control" placeholder="Password" id="pass"
                        value={this.state.pass} onChange={(e) => this.handleChange(e)} required/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordConf">Password Confirm: </label>
                        <input type="password" className="form-control" placeholder="Password Confirm" id="passCon"
                        value={this.state.passCon} onChange={(e) => this.handleChange(e)} required/>
                    </div>
                    <br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    <br/>            
                        <Link to="/login" className="btn btn-default">Login</Link>
                </form>
               
            </div>
        )
    }
};


export default Register;
