import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Landing extends Component {
    render() {
        return (
          <div className="container mt-5 pt-5">
            <div className="jumbotron bg-cream py-5 rounded-border-10">
              <h1 className="display-4">Welcome to Hot Spicy Goss</h1>
              <p className="lead">
                Bored with your stagnant and uneventful life? We bring you the
                juiciest, hottest and the spiciest gossip of the town. Special
                access only!
              </p>
              <Link to='/register' className="btn py-1 btn-outline-dark">Sign Up</Link>
              <Link to='/login' className="btn ml-2 py-1 btn-outline-dark">Login</Link>
            </div>
          </div>
        );
    }
}

export default Landing;