import React, { Component } from 'react';
import axios from "axios";
import classnames from 'classnames';

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

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    onSubmit(event) {
        event.preventDefault();

        const loginData = {
            email: this.state.email,
            password: this.state.password
        }

        axios.post('/api/users/login', loginData)
        .then(res => {
            console.log(res);
        })
        .catch(err => this.setState({errors: err.response.data}));
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

export default Login;
