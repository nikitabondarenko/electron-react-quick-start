import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch , Link} from 'react-router-dom';
import { withReflex } from 'reflexbox';

import Login from './login';

const inlineStyle = {
    'border': 'solid',
    'display': 'flex',
    'flex': 2,
    'alignItems': 'center',
    'flexDirection': 'column',
    // 'justifyItems': 'center',
    'justifyContent': 'space-around',
    'backgroundColor': '#BB8FCE'
  };

const App = ({}) => (
    <BrowserRouter>
      <div style={inlineStyle}>
      <p>You know why I am here... <br/> I am here to have a fun time</p>
      <Login></Login>
      </div>
    </BrowserRouter>
  );

App.propTypes = {
};

const mapStateToProps = (state) => {
  return {
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default App;