import React from "react";
import { func, string, bool } from "prop-types";
import { useField } from "formik";
import NumberFormat from "react-number-format";

import FieldWrapper from "./FieldWrapper";

const InputNumber = ({
  disabled,
  explanation,
  label,
  name,
  onChange: onChangeFromProps,
}) => {
  const [input, { setValue }] = useField({ name });

  const onChange = (event) => {
    if (disabled) {
      return;
    }

    onChangeFromProps(event);
    setValue(+event.target.value);
  };

  const fieldWrapperProps = {
    name,
    explanation,
    label,
    disabled,
  };

  const inputProps = {
    ...input,
    onChange,
    disabled,
  };

  return (
    <FieldWrapper {...fieldWrapperProps}>
      <NumberFormat {...inputProps} thousandSeparator=" " />
    </FieldWrapper>
  );
};

InputNumber.propTypes = {
  disabled: bool,
  explanation: string,
  label: string,
  name: string.isRequired,
  onChange: func,
};

InputNumber.defaultProps = {
  disabled: false,
  onChange: () => {},
};

export default InputNumber;
