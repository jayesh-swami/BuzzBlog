import React, { Component } from 'react'

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
              <a href="" className="btn py-1 btn-outline-dark">Sign Up</a>
              <a href="" className="btn ml-2 py-1 btn-outline-dark">Login</a>
            </div>
          </div>
        );
    }
}

export default Landing;