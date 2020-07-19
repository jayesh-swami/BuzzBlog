import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { registerUser } from '../../redux/actions/authActions';

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
                            <div className="form-group">
                                <input type="text" className={classnames('form-input-text form-control form-control-lg',{
                                    'is-invalid': errors.name
                                })}
                                value={this.state.name} onChange={this.onChange} name="name" placeholder="Name" width="100%"/>
                                {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                            </div>
                            <div className="form-group">
                                <input type="email" className={classnames('form-input-text form-control form-control-lg',{
                                    'is-invalid': errors.email
                                })}
                                name="email" value={this.state.email} onChange={this.onChange} placeholder="Email" width="100%"/>
                                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                            </div>
                            <div className="form-group">
                                <input type="password" className={classnames('form-input-text form-control form-control-lg',{
                                    'is-invalid': errors.password
                                })}
                                name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" width="100%"/>
                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            </div>
                            <div className="form-group">
                                <input type="password" className={classnames('form-input-text form-control form-control-lg',{
                                    'is-invalid': errors.password2
                                })}
                                name="password2" value={this.state.password2} onChange={this.onChange} placeholder="Confirm Password" width="100%"/>
                                {errors.password2 && (<div className="invalid-feedback">{errors.password2}</div>)}
                            </div>
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
    errors: PropTypes.object.isRequired 
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{registerUser})(withRouter(Register));
