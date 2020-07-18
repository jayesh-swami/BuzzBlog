import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {

  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-expand-md bg-cream mx-5 rounded-border-10 mt-3 navbar-light">
            <Link to='/' className="navbar-brand"><img src="assets/images/icon.png" height="30px" width="30px" alt="Gossip Blog"/>
            &nbsp;Gossip Blog</Link>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li class="nav-item">
                        <Link class="nav-link" to='/'>Home</Link>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                  <li class="nav-item">
                        <Link class="nav-link" to="/register">Register</Link>
                    </li>
                    <li class="nav-item">
                        <Link class="nav-link" to='/login'>Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
      </div>
    );
  }
}

export default Header;