import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Link, Route, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';

const inlineStyle2 = {
    'border': 'solid',
    'flex': 1,
    'padding': 75,
    'display': 'flex',
    'flexDirection': 'column',
    'alignItems': 'center',
    'justifyContent': 'space-around',
    'backgroundColor': '#f2f9f9',
};


class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            pass: '',
        }
    }

    changePage(resp) {
        if (resp.data.success) {
        return this.props.history.push("/home")
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        let user = {
            username: this.state.username,
            password: this.state.pass
        };

        axios.post('http://localhost:3000/login', {
            username : user.username,
            password: user.password,
            }, {
            withCredentials: true
            }
        )
        .then((resp) => (this.changePage(resp)))
        .catch(error => console.log('BAD', error))
    }


    handleChange(e) {
        const name = e.target.id;
        const value = e.target.value
        this.setState({[name]: value});
    }
        
    render() {
        return (
            <div>
                <form style={inlineStyle2} className="container-fluid" onSubmit={(e) => this.handleSubmit(e)}>
                <h1> Login: <br/> <br/> </h1>
                    <div className="form-group">
                        <label htmlFor="username">Username: </label>
                        <input type="text" placeholder="Username" className="form-control" id="username"
                        value={this.state.username} onChange={(e) => this.handleChange(e)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password: </label>
                        <input type="password" className="form-control" placeholder="Password" id="pass"
                        value={this.state.pass} onChange={(e) => this.handleChange(e)} required />
                    </div>
                    <br/>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    <br/>
                        Don't have an account?
                    <br />            
                    <Link to="/register" className="btn btn-default">Register</Link>
                </form>
            </div>  
        )
    }
}

export default Login;
