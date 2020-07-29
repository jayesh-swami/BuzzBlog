import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setTitle } from '../../redux/actions/titleActions';
import PropTypes from 'prop-types';
import { getGossipbyID,deleteGossip, createComment, deleteComment, createReply, deleteReply } from '../../redux/actions/gossipActions';
import Loading from '../common/SpinnerComponent';
import TextFieldGroupComponent from '../common/TextFieldGroupComponent';
import isEmpty from '../../utils/is-empty';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';
import date from 'date-and-time';


class GossipDetailComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            gossip: null,
            isLoading: true,
            comment: '',
            reply: '',
            openedReplies: {
                commentID: []
            },
            errors: ''
        }
        this.toggleReplies = this.toggleReplies.bind(this);
        this.onSubmitReply = this.onSubmitReply.bind(this);
    }

    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
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
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onSubmit(event){
        event.preventDefault();
        this.props.createComment({comment:this.state.comment},this.state.gossip._id,this.props.history);
    }
    onSubmitReply(commentID){
        this.props.createReply({comment: this.state.reply},commentID, this.state.gossip._id);
        this.setState({reply:''});
    }
    onDeleteClick(id){
        this.props.deleteGossip(id,this.props.history);
    }
    onCommentDeleteClick(commentID, gossID){
        this.props.deleteComment(commentID,gossID);
    }
    onReplyDeleteClick(commentID, gossID,replyID) {
        this.props.deleteReply(replyID,commentID, gossID);
    }
    toggleReplies(commentID){

        let openedRepliesCopy = [];
        for (let i = 0; i < this.state.openedReplies.commentID.length; i++) {
            openedRepliesCopy[i] = this.state.openedReplies.commentID[i];
        }

        if(openedRepliesCopy.includes(commentID)){

            const index = this.state.openedReplies.commentID.indexOf(commentID);
            if (index > -1) {
                openedRepliesCopy.splice(index, 1);
            }
            this.setState({
                openedReplies: {commentID:openedRepliesCopy}
            })
        }
        else{
            console.log(this.state)
            openedRepliesCopy.push(commentID);
            this.setState({
                openedReplies: { commentID: openedRepliesCopy }
            })
            console.log(this.state)
        }
    }

    render() {
        const {gossip,isLoading,errors } = this.state;
        if(isLoading){
            return(<Loading/>);
        }else{
            const deleteButton = (
                <button type="button" className="btn btn-sm form-button is-invalid position-absolute"
                    style={{ right: "5%", top: '15%' }}
                    onClick={this.onDeleteClick.bind(this,gossip._id)}>
                        Delete This Gossip
                </button>
            );
            const dateTime = new Date(gossip.datetime);

            // Comments rendering
            const comments = this.state.gossip.comments.slice(0).reverse().map(comment => {
                const commentDeleteButton = (
                    <button type="button" className="btn small-font px-1 py-0 btn-sm text-cream px-1 position-absolute"
                        onClick={this.onCommentDeleteClick.bind(this,comment._id, gossip._id)}
                        style={{top:'0px',right:'10%'}}>
                        &times;
                    </button>
                );
            // Returning mapping of replies
            const replies = comment.replies.map(reply => {

                const replyDeleteButton = (
                    <button type="button" className="btn small-font btn-sm text-cream"
                        onClick={this.onReplyDeleteClick.bind(this, comment._id, gossip._id, reply._id)}>
                        &times;
                    </button>
                );

                return (
                    <div className="row" key={reply._id}>
                        <img src={reply.user.avatar} className="mt-2" style={{ height: '30px', width: '30px', borderRadius: '10%' }} />
                        <div className="col-10 text-wrap">
                            <p className="my-0 py-1 text-wrap">{reply.comment}</p>
                            <p className="x-small-font">-{reply.user.name}<br/>{date.format(new Date(reply.datetime),'h:m A, ddd, D MMM,YY')}</p>
                        </div>
                        <div className="col-1">
                            {this.props.auth.user.id === reply.user._id ? replyDeleteButton : ''}
                        </div>
                    </div>
                )
            })
            return(
                <>
                <div className="row ml-2 position-relative" key={comment._id}>
                    <img src={comment.user.avatar} className="mr-2 mt-1" style={{ height: '50px', borderRadius: '10%' }} />
                    {this.props.auth.user.id === comment.user._id ? commentDeleteButton : ''}
                    <div className="col-12 col-md-8 text-wrap">
                        <p className="my-0 py-1 text-wrap">{comment.comment}</p>
                        <p className="x-small-font">-{comment.user.name}<br/>{date.format(new Date(comment.datetime),'h:m A, ddd, D MMM,YY')}
                        </p>
                    </div>
                    <div className="col-10 offset-1 pl-0 pr-2">
                        <button type="button" className="btn small-font btn-sm form-button px-1"
                            onClick={() => this.toggleReplies(comment._id)}>
                            View Replies
                        </button>
                    </div>
                    {/* Replies Area */}
                    <div className={classnames("container col-md-6 offset-1",{
                        "d-none": !this.state.openedReplies.commentID.includes(comment._id)
                    })}>
                        <hr/>
                        {replies}
                        <form onSubmit={(e) => {e.preventDefault();this.onSubmitReply(comment._id)}}>
                            <div className="row">
                                <div className="col-8 align-self-center" >
                                    <TextFieldGroupComponent
                                        name="reply"
                                        type="text"
                                        placeholder="Enter your reply here..."
                                        value={this.state.reply}
                                        onChange={this.onChange.bind(this)}
                                        error={errors.reply}/>
                                </div>
                                <div className="col align-self-start">
                                    <button type="submit" className="btn btn-sm form-button">
                                        Submit
                                    </button>
                                </div>
                             </div>   
                        </form>
                    </div>
                </div>
                <hr/>
                </>
            );
            })

            return (
                <div className="container text-cream mt-5 bg-transparent">
                    { this.props.auth.user.id === gossip.user._id ? deleteButton : ''}
                    <div className="row">
                        <div className="col-md-10 col-12">
                            <div className={`card bg-transparent `}>
                                <div className="card-body">
                                    <h5 className="card-title display-4">{gossip.title}</h5>
                                    <p className="card-text">{gossip.details}</p>
                                    <h6 className="gossip-gossiper">- {gossip.user.name}</h6>
                                    <p className="gossip-time small-font">
                                        {date.format(dateTime,'h:m A, ddd, D MMM,YY')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row mt-5 ml-2">
                        <div className="col-12">
                            <h5 className="card-title display-4">Comments</h5>
                        </div>
                        <img src={this.props.auth.user.avatar} className="mr-2 mt-1" style={{ height: '40px', borderRadius: '10%' }} /> 
                            <div className="col-12 col-md-10">
                                <form onSubmit={this.onSubmit.bind(this)}>
                                <TextFieldGroupComponent
                                name="comment"
                                type="text"
                                placeholder="Enter your comment here..."
                                value={this.state.comment}
                                onChange={this.onChange.bind(this)}
                                error={errors.comment}/>
                                <button type="submit" className="btn form-button">
                                    Submit
                                </button>
                                </form>
                            </div>
                    </div>
                    <hr/>
                    {comments}
                    <div className="mb-5">
                    </div>
                </div>
            )
        }
    }
}

GossipDetailComponent.propTypes = {

    setTitle: PropTypes.func.isRequired,
    getGossipbyID: PropTypes.func.isRequired,
    gossips: PropTypes.object.isRequired,
    deleteGossip: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createComment: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    createReply: PropTypes.func.isRequired,
    deleteReply: PropTypes.func.isRequired

}

const mapStateToProps = (state) => ({
    gossips: state.gossips,
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { setTitle, getGossipbyID, deleteGossip, createComment,deleteComment,createReply, deleteReply })(withRouter(GossipDetailComponent));
