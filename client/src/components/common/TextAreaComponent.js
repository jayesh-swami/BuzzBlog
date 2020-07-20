import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextArea = (props) => {
    const {
        name,
        placeholder,
        value,
        onChange,
        error,
        info
    } = props;
    return (
        <div className="form-group">
            <textarea
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
            {info && <div className="text-field-info">{info}</div>}
        </div>
    );
}

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    info: PropTypes.string
};

export default TextArea;
