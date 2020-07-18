import React, { Component } from 'react'

class Register extends Component {
    render() {
        return (
            <div className="container mt-5 text-cream">
                <h1 className="display-4 text-center">Register</h1>
                <div className="row justify-content-center">
                    <div className="col-md-4 col-lg-4 mt-5">
                        <form className="form-container" action="#" method="post" autoComplete="off">
                            <table className="form-table" cellpadding = "5" cellspacing = "5">
                                <tr>
                                    <td className="form-label-text">Email</td>
                                    <td ><input type="text" className="form-input-text"/></td>
                                </tr>
                                <tr>
                                    <td className="form-label-text">Name</td>
                                    <td ><input type="text" className="form-input-text"/></td>
                                </tr>
                                <tr>
                                    <td className="form-label-text">Password</td>
                                    <td><input type="password" className="form-input-text"/></td>
                                </tr>
                                <tr>
                                    <td className="form-label-text">Confirm Password</td>
                                    <td><input type="password" className="form-input-text"/></td>
                                </tr>
                            </table>
                            <p className="auth-form-errors"></p>
                            <button type="submit" className="form-button p-1">
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
