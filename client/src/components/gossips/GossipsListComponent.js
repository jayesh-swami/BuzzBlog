import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../../redux/actions/titleActions';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getGossips } from '../../redux/actions/gossipActions';
import Loading from '../common/SpinnerComponent';
import isEmpty from '../../utils/is-empty';

class GossipsListComponent extends Component {

    constructor(props){
        super(props);

        this.state = {
            gossips: null,
            isLoading: true
        }
    }

    componentDidMount(){
        this.props.setTitle('Gossips');
        this.props.getGossips();
    }

    componentWillReceiveProps(nextProps){
        if(!isEmpty(nextProps.gossips.gossips)){
            console.log("next: ", nextProps.gossips);
            this.setState({
                gossips: nextProps.gossips.gossips,
                isLoading: false
            })
        }
    }

    render() {

        const {gossips,isLoading} = this.state;
        let gossips_content;
        
        if(isLoading){
            return(<Loading/>);
        }else if(!isLoading){
            console.log(gossips);
            gossips_content = gossips.map(gossip => {
                return (
                    <div key={gossip._id} className={`bg-cream card col-sm-6 col-md-4 col-lg-3 col-8 px-2 mx-3 mt-4 spice-${gossip.spiceLevel}`}>
                        <div className="card-body">
                            <h4 className="card-title">{gossip.title}</h4>
                            <h6 className="card-subtitle mb-2 text-muted">By - {gossip.user.name}</h6>
                            <p className="card-text">{gossip.details.substring(0, 100)}...</p>
                            <Link to={`/gossip/${gossip._id}`} className="btn form-button float-right mb-0 pb-0 text-dark">Read more</Link>
                        </div>
                    </div>
                );
            })
            return (
                <div className="container mb-5">
                    <div className="row card-row mt-3 justify-content-around">
                        {gossips_content}
                    </div>
                </div>
            )

        }
    }
}

GossipsListComponent.propTypes = {
    setTitle: PropTypes.func.isRequired,
    getGossips: PropTypes.func.isRequired,
    gossips: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    gossips: state.gossips
})

export default connect(mapStateToProps,{setTitle,getGossips})(GossipsListComponent);
