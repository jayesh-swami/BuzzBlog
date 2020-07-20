import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextFieldGroup = (props) => {
    const {
        name,
        placeholder,
        value,
        onChange,
        error,
        type,
        info,
        disabled
    } = props;
    return (
      <div className="form-group">
        <input
          type={type}
          className={classnames(
            "form-input-text form-control form-control-lg",
            {
              "is-invalid": error,
            }
          )}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
        {error && <div className="invalid-feedback">{error}</div>}
        {info && <div className="text-field-info">{info}</div>}
      </div>
    );
}

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  info: PropTypes.string,
  disabled: PropTypes.string
};

TextFieldGroup.defaultProps = {
    type: 'text'
}

export default TextFieldGroup;
