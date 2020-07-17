const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateCommentInput(data) {
  let err = {};

  data.comment = !isEmpty(data.comment) ? data.comment : "";

  // Title Field Validation
  if (validator.isEmpty(data.comment)) {
    err.comment = "Comment field is required.";
  }

  return {
    errors: err,
    isValid: isEmpty(err),
  };
};
