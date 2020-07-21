import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTitle } from '../../redux/actions/titleActions';
import { getProfileByHandle } from '../../redux/actions/profileActions';
import Loading from '../common/SpinnerComponent';

class ProfileDetailComponent extends Component {


    constructor(props){
        super(props);

        this.state = {
            profile: null,
            isLoading: true
        }
    }

    componentDidMount(){
        this.props.setTitle(`${this.props.match.params.handle}'s Profile`);
        this.props.getProfileByHandle(this.props.match.params.handle);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.profile.profile){
            this.setState({
                profile: nextProps.profile.profile,
                isLoading: nextProps.profile.isLoading
            })
        }
    }


    render() {

        if(this.state.isLoading){
            return(
                <Loading/>
            );
        }
        else{
            const profile = this.state.profile; 
            return (
                <div className="container mt-5 pt-3 mb-5 pb-5 text-cream">
                    <div className="row">
                        <div className="col-md-3 col-6">
                            <img src={profile.user.avatar} alt={profile.handle} className="rounded-border-10"/>
                        </div>
                        <div className="col-6 col-md-4">
                            <h1>{profile.user.name}</h1>
                            <p>Bio: {profile.bio}</p>
                            <p>Feeling: {profile.feeling}</p>
                            <p>Most Hated Person: {profile.mostHatedPerson}</p>
                        </div>
                    </div>
                    <h3 className="mt-3 pt-3 mb-0 pb-0">Gossips By {profile.user.name}</h3>
                    <div className="row card-row mt-1 justify-content-start">
                        {/* TODO ADD GOSSIPS BY GOSSIPER  */}
                    </div>
                </div>
            );
        }
    }
}

ProfileDetailComponent.propTypes = {
    setTitle: PropTypes.func.isRequired,
    profile: PropTypes.func.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps,{setTitle, getProfileByHandle})(ProfileDetailComponent);
