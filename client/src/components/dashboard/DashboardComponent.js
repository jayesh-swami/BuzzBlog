import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getUserProfile } from '../../redux/actions/profileActions';
import { setTitle } from "../../redux/actions/titleActions";
import Spinner from '../common/SpinnerComponent';
import isEmpty from '../../utils/is-empty';
import { Link } from 'react-router-dom';

class Dashboard extends Component {

    componentDidMount(){
        this.props.getUserProfile();
        this.props.setTitle('Dashboard');
    }

    render() {

        const { user } = this.props.auth;
        const { profile, loading } = this.props.profile;

        let dashContent;

        if(profile === null || loading){
            dashContent = (
                <Spinner/>
            )
        }else{
            
            // Check if profile is empty
            if(!isEmpty(profile)){
                dashContent = <h4>DISPLAY PROFILE</h4>;
            }else{

                // User has no profile
                dashContent = (
                  <div className="text-center">
                    <p className="text-cream display-2 mt-5 pt-5">
                      Welcome {user.name}
                    </p>
                    <hr className="text-cream"/>
                    <p className="text-cream display-4 mt-3">
                      Create Your Profile
                    </p>
                    <Link to="/create-profile" className="btn btn-lg form-button text-cream mt-3">
                        Create
                    </Link>
                  </div>
                );
            }

        }

        return (
            <div className="container mt-3">
                <div className="row">
                    <div className="col">
                        {dashContent}
                    </div>
                </div>
            </div>
        )
    }
}

Dashboard.propTypes = {
    getUserProfile : PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    setTitle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps,{getUserProfile,setTitle})(Dashboard);
