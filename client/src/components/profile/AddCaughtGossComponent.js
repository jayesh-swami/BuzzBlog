import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setTitle } from '../../redux/actions/titleActions';
import { addCaughtGoss } from '../../redux/actions/profileActions';
import TextFieldGroup from '../common/TextFieldGroupComponent';
import { withRouter } from 'react-router-dom';
import TextArea from '../common/TextAreaComponent';

class AddCaughtGoss extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            details: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value })
    }

    onSubmit(event) {
        event.preventDefault();

        const caughtGoss = {
            title: this.state.title,
            details: this.state.details
        }

        this.props.addCaughtGoss(caughtGoss, this.props.history);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({
                errors: nextProps.errors
            })
        }
    }

    componentWillMount() {
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
                            <TextArea
                                name="details"
                                error={errors.details}
                                onChange={this.onChange}
                                placeholder="Give details on how you were caught!"
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

AddCaughtGoss.propTypes = {
    setTitle: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    addCaughtGoss: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, { setTitle, addCaughtGoss })(withRouter(AddCaughtGoss));
