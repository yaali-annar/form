import React from "react";
import { string, bool, node, oneOf } from "prop-types";
import { useField } from "formik";
import { cx } from "@emotion/css";

const FieldWrapper = ({
  children,
  className: classNameFromProps,
  label,
  name,
  disabled,
  explanation,
}) => {
  const [, { error, touched }] = useField({ name });

  const errorMessage = touched ? error : "";
  const info = errorMessage || explanation || "";

  const className = cx("form-field", classNameFromProps, {
    error: !!errorMessage,
    disabled,
  });

  return (
    <div {...{ className }}>
      {label && <label className="label">{label}</label>}
      <div className="form-control">
        {children}
        {info && <div className="explanation">{info}</div>}
      </div>
    </div>
  );
};

FieldWrapper.propTypes = {
  children: node,
  className: string,
  disabled: bool,
  explanation: string,
  label: string.isRequired,
  name: string.isRequired,
  rawExplanation: oneOf([string, node]),
};

export default FieldWrapper;
