import React, { useState } from "react";
import { useField } from "formik";
import {
  string,
  number,
  arrayOf,
  func,
  bool,
  node,
  oneOfType,
} from "prop-types";

const File = ({
  allowedExtensions,
  explanation,
  name,
  maxSize,
  multipart,
  onChange,
}) => {
  const [reader, setReader] = useState({});
  const [errorMessageValues, setErrorMessageValues] = useState({});

  let [_, { error }, { setValue, setError }] = useField({ name });

  const actualOnChange = ({ currentTarget }) => {
    setErrorMessageValues({});
    setError("");

    const { files } = currentTarget;
    if (files.length === 0) {
      return;
    }
    const [file] = files;

    if (file.size > maxSize * 1024 * 1024) {
      setError("error.file.tooLarge");
      return;
    }

    const nameParts = file.name.split(".");
    const extension = nameParts[nameParts.length - 1];
    if (!allowedExtensions.includes(extension)) {
      setError("error.file.extensionNotAllowed");
      setErrorMessageValues({ extension });
      return;
    }

    onChange(file);
    if (multipart) {
      setValue(file);
    } else {
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <div className="upload-button">
        <button>Upload</button>
        <input onChange={actualOnChange} type="file" />
      </div>
      {explanation && <div className="explanation">{explanation}</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

File.propTypes = {
  allowedExtensions: arrayOf(string),
  explanation: oneOfType([node, string]),
  name: string.isRequired,
  multipart: bool,
  maxSize: number,
  onChange: func,
};

File.defaultProps = {
  allowedExtensions: ["png", "jpg", "svg"],
  maxSize: 2,
  multipart: false,
  onChange: () => {},
};

export default File;
