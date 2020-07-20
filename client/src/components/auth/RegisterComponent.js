import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';
import { setTitle } from "../../redux/actions/titleActions";

import TextFieldGroup from '../common/TextFieldGroupComponent';

class Register extends Component {

    constructor(props){
        super(props);

        this.state = {
          name: "",
          email: "",
          password: "",
          password2: "",
          errors: {},
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount(){

        // If user is already logged in redirect to Gossips page
        if(this.props.auth.isAuthenticated) this.props.history.push('/gossips');
        this.props.setTitle('Register');

    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    onSubmit(event) {
        event.preventDefault();
        
        const newUser = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password2: this.state.password2,
        };

        this.props.registerUser(newUser,this.props.history);

    }

    render() {

        const { errors } = this.state;

        return (
            <div className="container mt-5 text-cream">
                <h1 className="display-4 text-center">Register</h1>
                <div className="row justify-content-center">
                    <div className="col-md-4 col-lg-4 mt-5">
                        <form className="form-container" onSubmit={this.onSubmit} noValidate>
                            <TextFieldGroup
                            name="name" 
                            type="text" 
                            error={errors.name} 
                            onChange={this.onChange} 
                            placeholder="Name"
                            value={this.state.name}
                            />
                            <TextFieldGroup
                            name="email" 
                            type="email" 
                            error={errors.email} 
                            onChange={this.onChange} 
                            placeholder="Email"
                            value={this.state.email}
                            />
                            <TextFieldGroup
                            name="password"  
                            type="password" 
                            error={errors.password} 
                            onChange={this.onChange} 
                            placeholder="Password"
                            value={this.state.password}
                            />
                            <TextFieldGroup
                            name="password2" 
                            type="password" 
                            error={errors.password2} 
                            onChange={this.onChange} 
                            placeholder="Confirm Password"
                            value={this.state.password2}
                            />
                            <button type="submit" className="form-button p-1 btn btn-lg btn-block">
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Register.propTypes = {
    registerUser : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    setTitle: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{registerUser,setTitle})(withRouter(Register));
