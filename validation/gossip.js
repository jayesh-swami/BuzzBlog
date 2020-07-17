const validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateGossipInput(data) {
  let err = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.details = !isEmpty(data.details) ? data.details : "";
  data.spiceLevel = !isEmpty(data.spiceLevel) ? data.spiceLevel : "";

  // Title Field Validation
  if (validator.isEmpty(data.title)) {
    err.title = "Title field is required.";
  }
  if (!validator.isLength(data.title, { min: 10, max: 300 })) {
    err.title = "Title must be between 10 and 300 characters.";
  }

  // details Field Validation
  if (validator.isEmpty(data.details)) {
    err.details = "Details field is required.";
  }

  // spiceLevel Field Validation
  if (validator.isEmpty(data.spiceLevel)) {
    err.spiceLevel = "Spice Level field is required.";
  }
  if ( !(validator.equals(data.spiceLevel,'S') || validator.equals(data.spiceLevel,'TS') || validator.equals(data.spiceLevel,'CS')) ){
      err.spiceLevel = "Spice Level field can only be Spicy(S), Too Spicy(TS) or Cold Spicy(CS)";
  }

  return {
    errors: err,
    isValid: isEmpty(err),
  };
};
