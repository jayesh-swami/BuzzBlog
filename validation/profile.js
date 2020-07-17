const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let err = {};

  data.handle = !isEmpty(data.handle) ? data.handle : "";
  data.mostHatedPerson = !isEmpty(data.mostHatedPerson) ? data.mostHatedPerson : "";
  data.feeling = !isEmpty(data.feeling) ? data.feeling : "";

    // Handle Field Validation
    if(!validator.isLength(data.handle, { min: 2, max: 30 }))
    {
        err.handle = "Handle should be between 2 and 30 characters."
    }
    if (validator.isEmpty(data.handle)) {
        err.handle = "Handle required.";
    }

    // mostHatedPerson Field Validation
    if (validator.isEmpty(data.mostHatedPerson)) {
        err.mostHatedPerson = "Most hated person field required.";
    }
    if (!validator.isLength(data.handle, { min: 2, max: 30 })) {
      err.mostHatedPerson = "Most hated person's name should be between 2 and 30 characters.";
    }

    // feeling Field Validation
    if (validator.isEmpty(data.feeling)) {
        err.feeling = "Feeling field required.";
    }

    // Social handles validation
    if (!isEmpty(data.twitter)){
        if(!validator.isURL(data.twitter)){
            errors.twitter = "Not a valid URL";
        }
    }
    if (!isEmpty(data.facebook)) {
      if (!validator.isURL(data.facebook)) {
        errors.facebook = "Not a valid URL";
      }
    }
    if (!isEmpty(data.linkedin)) {
      if (!validator.isURL(data.linkedin)) {
        errors.linkedin = "Not a valid URL";
      }
    }
    if (!isEmpty(data.instagram)) {
      if (!validator.isURL(data.instagram)) {
        errors.instagram = "Not a valid URL";
      }
    }

  return {
    errors: err,
    isValid: isEmpty(err),
  };
};