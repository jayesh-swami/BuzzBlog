import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { deleteCaughtGoss } from '../../redux/actions/profileActions';

class CaughtGoss extends Component {

    constructor(props) {
        super(props);
    }

    onDeleteClick(id){
        this.props.deleteCaughtGoss(id, this.props.history);
    }

    render() {

        const gossExp = this.props.caughtGoss.map(goss => {
            return (
                <div className="box-shadow-cream px-2 py-1 my-2 position-relative" key={goss._id}>
                    <button type="button"
                        className="btn text-cream btn-sm position-absolute"
                        style={{ right: '5px', top: '5px' }}
                        title="Delete this Goss Experience"
                        onClick={this.onDeleteClick.bind(this, goss._id)}>
                        &times;
                    </button>
                    <h5><u>{goss.title}</u></h5>
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

CaughtGoss.propTypes = {
    deleteCaughtGoss: PropTypes.func.isRequired
}


export default connect(null,{ deleteCaughtGoss })(withRouter(CaughtGoss));