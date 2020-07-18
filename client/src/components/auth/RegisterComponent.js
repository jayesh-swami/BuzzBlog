import React, { Component } from 'react'

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

    onChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }
    onSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <div className="container mt-5 text-cream">
                <h1 className="display-4 text-center">Register</h1>
                <div className="row justify-content-center">
                    <div className="col-md-4 col-lg-4 mt-5">
                        <form className="form-container" onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-input-text form-control form-control-lg" 
                                value={this.state.name} onChange={this.onChange} name="name" placeholder="Name" width="100%"/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-input-text form-control form-control-lg" 
                                name="email" value={this.state.email} onChange={this.onChange} placeholder="Email" width="100%"/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-input-text form-control form-control-lg" 
                                name="password" value={this.state.password} onChange={this.onChange} placeholder="Password" width="100%"/>
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-input-text form-control form-control-lg" 
                                name="password2" value={this.state.password2} onChange={this.onChange} placeholder="Confirm Password" width="100%"/>
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

export default Register;
