import React, { Component } from 'react'

class Login extends Component {
    render() {
        return (
            <div className="container mt-5 text-cream">
                <h1 className="display-4 text-center">Login</h1>
                <div className="row justify-content-center">
                    <div className="col-md-4 col-lg-4 mt-5">
                        <form className="form-container login-form" action="#" method="post">
                            <table className="form-table" cellpadding = "5" cellspacing = "5">
                                <tr>
                                    <td className="form-label-text">Username</td>
                                    <td ><input type="text" className="form-input-text"/></td>
                                </tr>
                                <tr>
                                    <td className="form-label-text">Password</td>
                                    <td><input type="password" className="form-input-text"/></td>
                                </tr>
                            </table>
                            <p className="auth-form-errors"></p>
                            <input type="submit" value="Submit" className="form-button ml-0 p-1 rounded-border-10"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login;
