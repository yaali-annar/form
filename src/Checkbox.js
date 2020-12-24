import React from "react";
import { func, string, bool } from "prop-types";
import { useField } from "formik";

const InputCheckbox = ({ name, onChange: onChangeFromProps, disabled }) => {
  const [{ value: checked, onChange }] = useField({ name });
  const actualOnChange = (event) => {
    if (disabled) {
      return;
    }
    onChangeFromProps(event);
    onChange(event);
  };
  return (
    <input
      {...{ checked, disabled, name }}
      onChange={actualOnChange}
      type="checkbox"
    />
  );
};

InputCheckbox.propTypes = {
  disabled: bool,
  name: string.isRequired,
  onChange: func,
};

InputCheckbox.defaultProps = {
  disabled: false,
  onChange: () => {},
};

export default InputCheckbox;
