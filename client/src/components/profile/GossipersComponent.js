import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../../redux/actions/titleActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getAllProfiles } from '../../redux/actions/profileActions';
import Loading from '../common/SpinnerComponent';

class Gossipers extends Component {

    constructor(props){
        super(props);

        this.state = {
            profiles: null
        }
    }


    componentDidMount(){

        this.props.setTitle('Gossipers');
        this.props.getAllProfiles();
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.profile.profiles){
            this.setState({
                profiles: nextProps.profile.profiles
            })
        }
    }

    render() {

        let profiles = this.state.profiles;

        if(profiles){
            profiles = this.props.profile.profiles.map(profile => {
                console.log(profile);
                return (
                    <div className="col-4 col-sm-4 col-md-4 col-lg-4 text-center">
                        <Link to={`/gossiper/${profile.handle}`}>
                            <div className="position-relative">
                                <img src={profile.user.avatar} alt={profile.user.name} className="profiles-image rounded-border-10"/>
                                <p className="position-absolute text-cream"
                                    style={{ left: '0',right:'0', bottom: '0' }}>
                                    {profile.user.name}</p>
                            </div>
                            </Link>
                    </div>
                );
            })
        }
        else{
            // Profile is loading
            profiles = (<Loading/>);
        }

        return (
            <div className="container mt-5">
                <div className="row pt-2 pb-2 px-0 mx-0 pt-3 justify-content-between">
                        {profiles}
                    </div>
                </div>
        )
    }
}

Gossipers.propTypes = {
    setTitle: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    getAllProfiles: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile
})

export default connect(mapStateToProps,{setTitle,getAllProfiles})(Gossipers);
