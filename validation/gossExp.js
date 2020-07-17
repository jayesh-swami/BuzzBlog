const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateGossExpInput(data) {
  let err = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.aboutWhom = !isEmpty(data.aboutWhom) ? data.aboutWhom : "";
  data.details = !isEmpty(data.details) ? data.details : "";

  // Title Field Validation
  if (validator.isEmpty(data.title)) {
    err.title = "Title field is required.";
  }

  // aboutWhom Field Validation
  if (validator.isEmpty(data.aboutWhom)) {
    err.aboutWhom = "About whom field is required.";
  }

  // details Field Validation
  if (validator.isEmpty(data.details)) {
    err.details = "Gossip Experience Details field is required.";
  }

  return {
    errors: err,
    isValid: isEmpty(err),
  };
};
