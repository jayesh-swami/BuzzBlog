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
            auth: {},
            gossips: null,
            isLoading: true
        }
    }

    componentDidMount(){
        this.props.setTitle('Gossips');
        this.props.getGossips();
    }

    render() {

        const { isLoading,gossips } = this.props.gossips;
        const { auth } = this.props;
        
        let gossips_content;
        
        if(isLoading){
            return(<Loading/>);
        }else{

            const notifCalc = (gossip,i) => {
                let x = 0;
                gossip.comments.forEach(comment => {
                    if(new Date(comment.datetime) > new Date(gossip.lastLogins[i].lastLogin)){
                        x = x + 1 + comment.replies.length;
                    }else{
                        comment.replies.forEach(reply => {
                            if (new Date(reply.datetime) > new Date(gossip.lastLogins[i].lastLogin)){
                                x = x + 1;
                            }
                        })
                    }
                });
                return x;
            }

            // Calculating the last login for every gossip
            let lastLoginsforGossips = gossips.map((gossip) => {
                for(let i=0; i<gossip.lastLogins.length ;i++){
                    if(gossip.lastLogins.length>0 && (gossip.lastLogins[i].user === auth.user.id)){
                        return({
                            gossip: gossip._id,
                            lastLogin: gossip.lastLogins[i].lastLogin,
                            numNotifs: (gossip.comments.length>0 ? notifCalc(gossip,i) : 0)
                        })
                    }
                }
                return {
                  gossip: gossip._id,
                  lastLogin: null,
                  numNotifs: gossip.comments.length + (gossip.comments.replies ? gossip.comments.reduce((n,x) => {return n + x.replies.length}) : 0)
                };
            });
            if(!isLoading && gossips && auth.user){
                gossips_content = gossips.map((gossip,index) => {
                    const notifBadge = (<span className="badge badge-pill position-absolute badge-danger" style={{right:'0px',top:'0px'}}>
                        {lastLoginsforGossips[index].numNotifs} <span className="fa fa-bell"></span></span>);
                return (
                    <div key={gossip._id} className={`bg-cream card postion-relative col-sm-6 col-md-4 col-lg-3 col-8 px-2 mx-3 mt-4 spice-${gossip.spiceLevel}`}>
                        {lastLoginsforGossips[index].numNotifs > 0 ? notifBadge : ''}
                        <div className="card-header">
                            <h4 className="card-title">{gossip.title}</h4>
                        </div>
                        {gossip.image ? (<img className="card-img-top px-2 mt-2 rounded-border-10" style={{height:'200px',objectFit:'cover',objectPosition:'0 0'}} src={gossip.image} alt="Card image cap"/>) : 
                        (<img className="card-img-top px-2 mt-2 rounded-border-10" style={{height:'200px',objectFit:'cover',objectPosition:'0 0'}} src={`https://picsum.photos/id/${(Math.ceil(Math.random()*100))+100}/400/600`} alt="Card image cap"/>)}
                        <div className="card-body">
                            <h6 className="card-subtitle mb-2 text-muted">By - {gossip.user.name}</h6>
                            <p className="card-text">{gossip.details.substring(0, 100)}...</p>
                            <Link to={`/gossip/${gossip._id}`} className="btn form-button float-right mb-0 pb-0 text-dark">Read more</Link>
                        </div>
                    </div>
                );
            })
            }
            return (
                <>
                <Link to="/create-gossip" className="btn form-button position-fixed"
                    style={{right:"2.5%",bottom:'5%'}}>
                        <span className="fa fa-bullhorn"></span>&nbsp;&nbsp;Create Gossip
                    </Link>
                <div className="container mb-5">
                    <div className="row card-row mt-3 justify-content-around">
                        {gossips_content}
                    </div>
                </div>
                </>
            )

        }
    }
}

GossipsListComponent.propTypes = {
    setTitle: PropTypes.func.isRequired,
    getGossips: PropTypes.func.isRequired,
    gossips: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    gossips: state.gossips
})

export default connect(mapStateToProps,{setTitle,getGossips})(GossipsListComponent);
