import React, { useState } from "react";
import { func, string } from "prop-types";
import { useField } from "formik";

import FieldWrapper from "./FieldWrapper";

const InputPassword = ({
  disabled,
  explanation,
  label,
  name,
  onChange: onChangeFromProps,
}) => {
  const [displayPassword, setDisplayPassword] = useState(false);
  const [input] = useField({ name });

  const onChange = (event) => {
    onChangeFromProps(event);
    input.onChange(event);
  };

  const type = displayPassword ? "text" : "password";

  const fieldWrapperProps = {
    name,
    explanation,
    label,
    disabled,
  };

  const inputProps = {
    ...input,
    type,
    onChange,
  };

  return (
    <FieldWrapper {...fieldWrapperProps}>
      <input
        {...inputProps}
        style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
      />
      <button
        type="button"
        onClick={() => setDisplayPassword(!displayPassword)}
      >
        {displayPassword ? "Hide" : "Show"}
      </button>
    </FieldWrapper>
  );
};

InputPassword.propTypes = {
  disabled: string,
  explanation: string,
  label: string,
  name: string.isRequired,
  onChange: func,
};

InputPassword.defaultProps = {
  onChange: () => {},
};

export default InputPassword;
