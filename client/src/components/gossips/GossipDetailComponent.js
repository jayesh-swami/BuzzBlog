import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../../redux/actions/titleActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getGossipbyID } from '../../redux/actions/gossipActions';
import Loading from '../common/SpinnerComponent';
import isEmpty from '../../utils/is-empty';


class GossipDetailComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gossip: null,
            isLoading: true
        }
    }

    componentDidMount() {
        this.props.setTitle('Gossips');
        this.props.getGossipbyID(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (!isEmpty(nextProps.gossips.gossip)) {
            this.setState({
                gossip: nextProps.gossips.gossip,
                isLoading: false
            })
        }
    }
    render() {
        const {gossip,isLoading} = this.state;
        if(isLoading){
            return(<Loading/>);
        }else{
            return (
                <div className="container text-cream mt-5 bg-transparent">
                    <div className="row">
                        <div className="col-md-8 col-12">
                            <div className={`card bg-transparent `}>
                                <div className="card-body">
                                    <h5 className="card-title display-4">{gossip.title}</h5>
                                    <p className="card-text">{gossip.details}</p>
                                    <h6 className="gossip-gossiper">- {gossip.user.name}</h6>
                                    <p className="gossip-time">{gossip.spiceLevel}, {gossip.datetime}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

GossipDetailComponent.propTypes = {
    setTitle: PropTypes.func.isRequired,
    getGossipbyID: PropTypes.func.isRequired,
    gossips: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    gossips: state.gossips
})

export default connect(mapStateToProps, { setTitle, getGossipbyID })(GossipDetailComponent);
