import React from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
    return (
        <div className="pl-2">
            <Link to="/edit-profile" className="btn btn-sm form-button">
                <span className="fa fa-street-view"></span>&nbsp;&nbsp;Edit Profile
            </Link>
            <Link to="/add-caught-gossips" className="btn btn-sm form-button">
                <span className="fa fa-bomb"></span>&nbsp;&nbsp;Add Caught Gossips
            </Link>
            <Link to="/add-goss-experience" className="btn btn-sm form-button">
                <span className="fa fa-comment-o"></span>&nbsp;&nbsp;Add Gossip Experience
            </Link>

        </div>
    )
}

export default ProfileActions;
