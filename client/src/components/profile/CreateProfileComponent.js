import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import TextFieldGroup from '../common/TextFieldGroupComponent';
import TextArea from '../common/TextAreaComponent';
import InputGroup from '../common/InputGroupComponent';
import { setTitle } from '../../redux/actions/titleActions';
import { withRouter } from 'react-router-dom';
import { createUserProfile } from '../../redux/actions/profileActions';

class CreateProfile extends Component {
    
    constructor(props){
        super(props);

        this.state = {
            displaySocialInputs: false,
            handle: '',
            mostHatedPerson: '',
            bio: '',
            feeling: '',
            facebook: '',
            instagram: '',
            linkedin: '',
            twitter: '',
            skills: '',
            errors: {}
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.toggleSocial = this.toggleSocial.bind(this);
    }

    componentDidMount(){
        this.props.setTitle('Create Profile');
    }
    onChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    onSubmit(event) {
        event.preventDefault();

        console.log('yeah');

        // Create a new profile
        const newProfile = {
            handle: this.state.handle,
            mostHatedPerson: this.state.mostHatedPerson,
            bio: this.state.bio,
            feeling: this.state.feeling,
            facebook: this.state.facebook,
            instagram: this.state.instagram,
            linkedin: this.state.linkedin,
            twitter: this.state.twitter,
            skills: this.state.skills
        }
        this.props.createUserProfile(newProfile,this.props.history);
    }
    toggleSocial(event){
        this.setState({ displaySocialInputs: !this.state.displaySocialInputs });
    }

    render() {

        const { errors } = this.state;

        return (
            <div className="container mt-4 mb-5 text-center text-cream">
                <div className="row">
                    <div className="col-md-6 mx-auto">
                        <h1 className="display-4 mb-4">Enter Details</h1>
                        <form onSubmit={this.onSubmit}>
                            <TextFieldGroup name="handle" placeholder="Enter a unique goss handle <3."
                                value={this.state.handle} onChange={this.onChange}
                                error={errors.handle} type="text" />
                            <TextFieldGroup name="mostHatedPerson" placeholder="Tell us who is your most hated person."
                                value={this.state.mostHatedPerson} onChange={this.onChange}
                                error={errors.mostHatedPerson} type="text" />
                            <TextFieldGroup name="feeling" placeholder="How are you feeling? (short answer only plis)"
                                value={this.state.feeling} onChange={this.onChange}
                                error={errors.feeling} type="text" />
                            <TextFieldGroup name="skills" placeholder="Skills : stalking,blazing ..."
                                value={this.state.skills} onChange={this.onChange}
                                error={errors.skills} type="text" info="Enter as comma separated values" />
                            <TextArea name="bio" placeholder="Tell us about yourself!"
                                value={this.state.bio} onChange={this.onChange}
                                error={errors.bio} />

                            <div className="social-inputs mb-3">
                                <button type="button" className="btn btn-block form-button btn-sm" onClick={this.toggleSocial}>
                                    Enter Social Accounts
                                </button>
                                <p className={classnames("text-field-info text-left my-0 py-0 mt-1 ml-1",{
                                        "d-none": this.state.displaySocialInputs
                                    })}>*Optional</p>
                                <div className={classnames("mt-3",{
                                    "d-none": !this.state.displaySocialInputs
                                })}>
                                    <InputGroup name="instagram" placeholder="Enter your Instagram id"
                                        value={this.state.instagram} onChange={this.onChange} icon="instagram" type="text" />
                                    <InputGroup name="twitter" placeholder="Enter your Twitter username"
                                        value={this.state.twitter} onChange={this.onChange} icon="twitter" type="text" />
                                    <InputGroup name="facebook" placeholder="Enter your Facebook profile"
                                        value={this.state.facebook} onChange={this.onChange} icon="facebook" type="text" />
                                    <InputGroup name="linkedin" placeholder="Enter your LinkedIn id?"
                                        value={this.state.linkedin} onChange={this.onChange} icon="linkedin" type="text" />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-block btn-lg form-button">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    setTitle: PropTypes.func.isRequired,
    createUserProfile: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    profile: state.profile,
    errors: state.errors
})

export default connect(mapStateToProps,{setTitle, createUserProfile})(withRouter(CreateProfile));
