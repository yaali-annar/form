import React from "react";
import { func, number, string, bool } from "prop-types";
import { useField } from "formik";
import FieldWrapper from "./FieldWrapper";

const InputText = ({
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
    onChange,
    disabled,
  };

  return (
    <FieldWrapper {...fieldWrapperProps}>
      <input {...inputProps} type="text" />
    </FieldWrapper>
  );
};

InputText.propTypes = {
  disabled: bool,
  maxLength: number,
  name: string.isRequired,

  onChange: func,
};

InputText.defaultProps = {
  disabled: false,
  explanation: "",
  inputWidth: "100%",
  labelWidth: 160,
  maxLength: 32,

  onChange: () => {},
};

export default InputText;
