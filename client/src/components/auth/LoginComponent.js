import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginUser } from '../../redux/actions/authActions';

class Login extends Component {

    constructor(props){
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {

        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }

        if(nextProps.errors){
            this.setState({errors:nextProps.errors});
        }

    }

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    onSubmit(event) {
        event.preventDefault();

        const loginData = {
            email: this.state.email,
            password: this.state.password
        }

        this.props.loginUser(loginData);
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="container mt-5 text-cream">
                <h1 className="display-4 text-center">Login</h1>
                <div className="row justify-content-center">
                    <div className="col-md-4 col-lg-4 mt-5">
                        <form className="form-container" onSubmit={this.onSubmit} noValidate>
                            <div className="form-group">
                                <input type="email" className={classnames('form-input-text form-control form-control-lg',{
                                    'is-invalid': errors.email
                                })}
                                name="email" value={this.state.email} onChange={this.onChange} placeholder="Email"/>
                                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
                            </div>
                            <div className="form-group">
                                <input type="password" className={classnames('form-input-text form-control form-control-lg',{
                                    'is-invalid': errors.password
                                })}
                                name="password" value={this.state.password} onChange={this.onChange} placeholder="Password"/>
                                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
                            </div>
                            <button type="submit" className="form-button p-1 btn btn-lg btn-block">
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})


export default connect(mapStateToProps,{loginUser})((Login));
