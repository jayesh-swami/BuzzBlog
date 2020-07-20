import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectFieldGroup = (props) => {
    const {
        name,
        placeholder,
        value,
        onChange,
        error,
        info,
        options
    } = props;

    const selectOptions = options.map(option => (
        <option className="select-option" key={option.label} value={option.value}>
            {option.label}
        </option>
    ))

    return (
        <div className="form-group">
            <select
                className={classnames(
                    "form-input-text form-control form-control-lg",
                    {
                        "is-invalid": error,
                    }
                )}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}>
                {selectOptions}
            </select>
            
            {error && <div className="invalid-feedback">{error}</div>}
            {info && <div className="text-field-info">{info}</div>}
        </div>
    );
}

SelectFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    error: PropTypes.string,
    info: PropTypes.string,
    options: PropTypes.array.isRequired
};

SelectFieldGroup.defaultProps = {
    type: 'text'
}

export default SelectFieldGroup;
