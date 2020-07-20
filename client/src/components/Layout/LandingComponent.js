import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTitle } from "../../redux/actions/titleActions";

class Landing extends Component {

  componentDidMount(){
    // If user is already logged in redirect to Gossips page
    if(this.props.auth.isAuthenticated) this.props.history.push('/gossips');
    this.props.setTitle('Home');
  }
  
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
            <Link to='/register' className="btn py-1 btn-dark">Sign Up</Link>
            <Link to='/login' className="btn ml-2 py-1 btn-dark">Login</Link>
          </div>
        </div>
      );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired,
  setTitle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps,{setTitle})(Landing);