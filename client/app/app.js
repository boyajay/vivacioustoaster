import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Header from './header';
import { routeActions } from 'react-router-redux';
import { bindActionCreators } from 'redux';
const injectTapEventPlugin = require('react-tap-event-plugin');
injectTapEventPlugin();

const App = ({ children }) => (
  <div style={{ height: '100%', width: '100%' }}>
    {children.props.location.pathname !== 'auth' ?
      <Header /> :
      null
    }
    <div id="children"
      style={{
        marginTop: children.props.location.pathname !== 'auth' ? '80px' : '0px',
      }}
    >
      {children}
    </div>
  </div>
);

App.propTypes = {
  children: React.PropTypes.element,
};

export default App;
