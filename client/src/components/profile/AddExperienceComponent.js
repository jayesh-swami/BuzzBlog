import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTitle } from '../../redux/actions/titleActions';
import { addGossExperience } from '../../redux/actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroupComponent';
import { withRouter } from 'react-router-dom';
import TextArea from '../common/TextAreaComponent';

class AddExperience extends Component {

    constructor(props){
        super(props);

        this.state = {
            title: '',
            aboutWhom: '',
            details: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    onSubmit(event){
        event.preventDefault();

        const newGoss = {
            title: this.state.title,
            aboutWhom: this.state.aboutWhom,
            details: this.state.aboutWhom
        }

        this.props.addGossExperience(newGoss,this.props.history);
    }

    componentWillMount(){
        this.props.setTitle('Add Goss Experience');
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="container text-cream mt-5">
                <h1 className="display-4 text-center">Add Details</h1>
                <div className="row">
                    <div className="col-md-6 mx-auto mt-3">
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup
                                name="title"
                                type="text"
                                error={errors.title}
                                onChange={this.onChange}
                                placeholder="Give a title for your experience"
                                value={this.state.title}
                            />
                            <TextFieldGroup
                                name="aboutWhom"
                                type="text"
                                error={errors.aboutWhom}
                                onChange={this.onChange}
                                placeholder="The subject of Gossip"
                                value={this.state.aboutWhom}
                            />
                            <TextArea
                                name="details"
                                error={errors.details}
                                onChange={this.onChange}
                                placeholder="Give details for your experience"
                                value={this.state.details}
                            />
                            <button type="submit" className="form-button btn btn-block">
                                Add
                    </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

AddExperience.propTypes = {
    setTitle: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    addGossExperience: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps,{setTitle,addGossExperience})(withRouter(AddExperience));
