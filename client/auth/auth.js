import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { checkForLogin } from './authActions';
import { Map } from 'immutable';
import cookie from 'react-cookie';


class Auth extends React.Component {
  componentWillMount() {
    this.props.onCheckForLogin(this.props.isAuthenticated);
  }

  render() {
    return (
      <div className="landingPage">
        <div style={{ position: 'relative' }}>
          <div className="logo">
          voyAger
          </div>
          <img className="logoPic" src="../assets/planelogo.png" />
        </div>
        <div className="landingDescrip">
        Where to next? Voyager, for the solo adventurer or group expeditions.
        </div>
        <form action="/auth/facebook" className="loginForm">
          <button type="login" className="loginBtn">Login with Facebook
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.get('isAuthenticated'),
});

const mapDispatchToProps = (dispatch) => ({
  onCheckForLogin: bindActionCreators(checkForLogin, dispatch),
});
Auth = connect(mapStateToProps, mapDispatchToProps)(Auth);


Auth.propTypes = {
  isAuthenticated: React.PropTypes.bool,
  onCheckForLogin: React.PropTypes.func,
};


export default Auth;
