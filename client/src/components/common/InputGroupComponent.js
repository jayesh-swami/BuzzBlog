import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputGroup = (props) => {
    const {
        name,
        placeholder,
        value,
        onChange,
        icon,
        type,
        error
    } = props;
    return (
        <div className="input-group mb-3">
            <div className="input-group-prepend">
                <span className="input-group-text bg-transparent">
                    <span className={`fa fa-${icon} fa-lg fa-inverse`}>
                    </span>
                </span>
            </div>
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
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

InputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    icon: PropTypes.string,
    type: PropTypes.string.isRequired
};

InputGroup.defaultProps = {
    type: 'text'
}

export default InputGroup;
