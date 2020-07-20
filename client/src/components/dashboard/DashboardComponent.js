import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getUserProfile } from '../../redux/actions/profileActions';
import { setTitle } from "../../redux/actions/titleActions";
import Spinner from '../common/SpinnerComponent';
import isEmpty from '../../utils/is-empty';
import { Link } from 'react-router-dom';
import ProfileActions from '../profile/ProfileActionsComponent';

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
                // Display User's Profile
                dashContent = (
                    <React.Fragment>
                        <div className="modal" role="dialog" id="accountDeleteModal">
                            <div className="modal-dialog" role="document">
                                <div className="modal-content bg-red is-invalid">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Did you just try to delete your account?</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <p>You should know. There is no getting out of this.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h4 className="display-4 mb-4">Welcome <Link to={`/profile/${profile.handle}`}>{profile.handle}</Link></h4>
                        <ProfileActions />
                        {/* TODO GOSS DEETS */}
                        <button className="mt-5 btn form-button is-invalid" type="button" data-toggle="modal" data-target="#accountDeleteModal">
                            Delete Account
                        </button>
                    </React.Fragment>
                );

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
            <div className="container mt-3 text-cream">
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
