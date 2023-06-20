import React from 'react';

const InputText = (props) => {
    const {
        value, name, changeEvent, placeholder, required, disabled,
    } = props;

    return (
        <input
            type="text"
            className="form-control"
            aria-label="Text input with checkbox"
            name={name}
            onChange={e => changeEvent(e.target.value, e)}
            placeholder={placeholder}
            value={value}
            required={!!required}
            disabled={disabled}
        />
    );
};

export default InputText;
