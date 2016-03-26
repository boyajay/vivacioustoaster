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
        <div className="logo">
        voyAger
        </div>
        <div className="landingDescrip">
        Where to next? For the solo adventurer or group expeditions,
        Voyager will make planning a breeze.
        </div>
        <form action="/auth/facebook">
          <button type="login" className="loginBtn">Login with Facebook
            <br /> to get started
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
