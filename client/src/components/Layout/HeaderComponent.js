import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../redux/actions/authActions';
import { clearCurrentProfile } from "../../redux/actions/profileActions";
import { withRouter } from 'react-router-dom';

class Header extends Component {

  onLogoutClick(event){

    event.preventDefault();
    this.props.logoutUser(this.props.history);
    this.props.clearCurrentProfile();
    
  }

  render() {

    const { isAuthenticated,user } = this.props.auth;

    const authLinks = (
      <React.Fragment>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/gossips">
              Gossips
            </Link>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              onClick={this.onLogoutClick.bind(this)}
              href=""
            >
              Logout
            </a>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/dashboard">
              <img
                src={user.avatar}
                className="my-0 py-0 mr-1"
                alt={user.name}
                title="Dashboard"
                style={{ width: "25px", height: "25px", borderRadius: "50%" }}
              />
            </Link>
          </li>
        </ul>
      </React.Fragment>
    );

    const guestLinks = (
      <React.Fragment>
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      </React.Fragment>
    );

    return (
      <div className="header">
        <nav className="navbar navbar-expand-md bg-cream mx-5 rounded-border-10 mt-3 navbar-light">
            <Link to='/' className="navbar-brand"><img src="assets/images/icon.png" height="30px" width="30px" alt="Gossip Blog"/>
            &nbsp;Gossip Blog</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav d-md-block mr-auto">
                  <li className="nav-item">
                    {this.props.title.title}
                  </li>
                </ul>
                {isAuthenticated ? authLinks : guestLinks}
            </div>
        </nav>
      </div>
    );
  }
}

Header.propTypes = {

  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  clearCurrentProfile: PropTypes.func.isRequired,
  title: PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
  auth: state.auth,
  title: state.title
})


export default connect(mapStateToProps,{ logoutUser,clearCurrentProfile })(withRouter(Header));