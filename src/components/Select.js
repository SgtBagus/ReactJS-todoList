import React from 'react';

class Select extends React.Component {
    static generateOptions(data) {
        return (
            data.map((option) => {
                return (
                    <option
                        key={Object.values(option)[0]}
                        value={Object.values(option)[0]}
                        disabled={option.disabled}
                    >
                        {Object.values(option)[1]}
                    </option>
                );
            })
        );
    }

    shouldComponentUpdate = ({ data, value, disabled }) => {
        const { data: pData, value: pValue, disabled: pDisabled } = this.props;

        if (pData !== data || pValue !== value || pDisabled !== disabled) {
            return true;
        }

        return false;
    }

    handleChange = (event) => {
        const { changeEvent } = this.props;

        changeEvent(event.target.value, event);
    }

    render() {
        const {
            value, data, name, placeholder,
        } = this.props;

        return (
            <select
                className="form-select"
                name={name}
                value={value}
                onChange={this.handleChange}
            >
                {!value && (
                    <option
                        value=""
                        className="placeholder"
                        style={{ backgroundColor: "white" }}
                    >
                        {placeholder || "Choose one"}
                    </option>
                )}
                {this.constructor.generateOptions(data)}
            </select>
        );
    }
}

export default Select;
