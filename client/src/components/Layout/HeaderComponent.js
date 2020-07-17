import React, { Component } from 'react';

class Header extends Component {

  render() {
    return (
      <div className="header">
        <nav className="navbar navbar-expand-md bg-cream mx-5 rounded-border-10 mt-3 navbar-light">
            <a href='' className="navbar-brand"><img src="assets/images/icon.png" height="30px" width="30px" alt="Gossip Blog"/>
            &nbsp;Gossip Blog</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="#">Home</a>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto">
                  <li class="nav-item">
                        <a class="nav-link" href="#">Register</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Login</a>
                    </li>
                </ul>
            </div>
        </nav>
      </div>
    );
  }
}

export default Header;