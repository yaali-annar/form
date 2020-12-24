import React from "react";
import { arrayOf, bool, func, shape, string } from "prop-types";
import { useField } from "formik";

import FieldWrapper from "./FieldWrapper";

const Select = ({
  explanation,
  label,
  disabled,
  name,
  onChange: onChangeFromProps,
  options,
  selectPrompt,
}) => {
  const [input] = useField({ name });

  if (!options?.map) {
    return null;
  }

  const onChange = (event) => {
    onChangeFromProps(event);
    input.onChange(event);
  };

  const fieldWrapperProps = {
    name,
    explanation,
    label,
    disabled,
  };

  const selectProps = { ...input, onChange, disabled };

  return (
    <FieldWrapper {...fieldWrapperProps}>
      <div className="select-arrow"></div>
      <select {...selectProps}>
        <option value="">{selectPrompt}</option>
        {options.map(({ value, text: children }, index) => (
          <option key={index} {...{ children, value }} />
        ))}
      </select>
    </FieldWrapper>
  );
};

Select.propTypes = {
  disabled: bool,
  explanation: string,
  label: string,
  name: string.isRequired,
  options: arrayOf(
    shape({
      value: string,
      text: string,
    })
  ).isRequired,
  selectPrompt: string,
  onChange: func,
};

Select.defaultProps = {
  selectPrompt: "Mohon pilih",
  onChange: () => {},
};

export default Select;
