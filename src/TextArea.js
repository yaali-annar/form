import React from "react";
import { func, number, string, bool } from "prop-types";
import { useField } from "formik";

import FieldWrapper from "./FieldWrapper";

const InputTextArea = ({
  rows,
  name,
  onChange: onChangeFromProps,
  disabled,
  maxLength,
  ...props
}) => {
  const [input] = useField({ name });

  const onChange = (event) => {
    if (disabled) {
      return;
    }
    const newEvent = { ...event };
    let newValue = newEvent.target.value;

    if (newValue.length > maxLength) {
      newEvent.target.value = newValue.slice(0, maxLength);
    }

    onChangeFromProps(newEvent);
    input.onChange(newEvent);
  };

  const fieldWrapperProps = {
    ...props,
    name,
    disabled,
  };

  const inputProps = {
    ...input,
    rows,
    onChange,
    disabled,
  };

  return (
    <FieldWrapper {...fieldWrapperProps}>
      <textarea {...inputProps} type="text" />
    </FieldWrapper>
  );
};

InputTextArea.propTypes = {
  rows: number,
  disabled: bool,
  maxLength: number,
  name: string.isRequired,
  onChange: func,
};

InputTextArea.defaultProps = {
  rows: 3,
  maxLength: 32,
  disabled: false,
  onChange: () => {},
};

export default InputTextArea;
