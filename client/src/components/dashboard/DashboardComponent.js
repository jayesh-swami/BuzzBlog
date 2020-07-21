import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import { getUserProfile,deleteCaughtGoss,deleteGossExp } from '../../redux/actions/profileActions';
import { setTitle } from "../../redux/actions/titleActions";
import Spinner from '../common/SpinnerComponent';
import isEmpty from '../../utils/is-empty';
import { Link } from 'react-router-dom';
import ProfileActions from '../profile/ProfileActionsComponent';
import GossExperiences from './GossExperienceComponent';
import CaughtGoss from './CaughtGossComponent';

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
                        <h4 className="mt-3 mb-0 pb-0">Gossip Experiences</h4>
                        <hr/>
                        <GossExperiences gossExperience={profile.gossipExperience}/>
                        <h4 className="mt-3 mb-0 pb-0">Caught Gossips</h4>
                        <hr />
                        <CaughtGoss caughtGoss={profile.caughtGossips}/>
                        <button className="mt-5 mb-5 btn form-button is-invalid" type="button" data-toggle="modal" data-target="#accountDeleteModal">
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
    setTitle: PropTypes.func.isRequired,
    deleteCaughtGoss: PropTypes.func.isRequired,
    deleteGossExp: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    auth: state.auth
})

export default connect(mapStateToProps,{getUserProfile,setTitle,deleteCaughtGoss,deleteGossExp})(Dashboard);
