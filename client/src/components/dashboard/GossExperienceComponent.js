import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { deleteGossExp } from '../../redux/actions/profileActions';

class GossExperience extends Component {

    constructor(props){
        super(props);
    }

    onDeleteClick(id) {
        this.props.deleteGossExp(id, this.props.history);
    }

    render() {

        const gossExp = this.props.gossExperience.map(goss => {
            return (
                <div className="box-shadow-cream px-2 py-1 my-2 position-relative" key={goss._id}>
                    <button type="button"
                        className="btn text-cream btn-sm position-absolute"
                        style={{ right: '5px', top: '5px' }}
                        title="Delete this Goss Experience"
                        onClick={this.onDeleteClick.bind(this, goss._id)}>
                        &times;
                    </button>
                    <h5><u>{goss.title} : {goss.aboutWhom}</u></h5>
                    <p>{goss.details}</p>
                </div>
            );
        });

        return (
            <div>
                {gossExp}
            </div>
        )
    }
}

GossExperience.propTypes = {
    deleteGossExp: PropTypes.func.isRequired
}


export default connect(null,{deleteGossExp})(withRouter(GossExperience));