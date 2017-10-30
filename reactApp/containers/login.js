import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch , Link} from 'react-router-dom';

const inlineStyle = {
    'border': 'solid',
    'borderRadius': 30,
    'width': 1500,
    'height': 750,
    'display': 'flex',
    'flexDirection': 'row',
    'alignItems': 'center',
    'justifyContent': 'space-around',
    'backgroundColor': '#ECF0F1',
  };

  const Register = ({}) => (

    <div style={inlineStyle}>
        <form>
            <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input type="text" className="form-control" placeholder="First Name" id="fName"
                ref={node => {this.myFName = node}} />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input type="text" className="form-control" placeholder="Last Name" id="lName"
                ref={node => {this.myLName= node}} />
            </div>
            <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input type="text" placeholder="username" className="form-control" id="username"
                ref={node => {this.myUsername = node}} />
            </div>
            <div className="form-group">
                <label htmlFor="password">Password:</label>
                <input type="password" className="form-control" placeholder="password" id="pwd"
                ref={node => {this.myPass = node}} />
            </div>
            <div className="form-group">
                <label htmlFor="passwordConf">Password Confirm:</label>
                <input type="password" className="form-control" placeholder="passwordConf" id="pwd"
                ref={node => {this.myPass2 = node}} />
            </div>
            <button onClick={()=>clickModal(idx, curTime, this.myName, this.myNum, this.myNote)} className="btn btn-default">Submit</button>
        </form>
    </div>
    )


Days.propTypes = {
};

const mapStateToProps = (state) => {
  console.log(state)
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Register);