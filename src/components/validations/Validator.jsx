import { validationMessages } from "./../../constants/validationMessages";
import React, { createContext, useEffect, useState } from "react";
import Validator from "validatorjs";
import { HELPER } from "./../../services";

export const ValidationContext = createContext(null);

const _registerConfirmPasswordValidations = (password) => {
  Validator.register(
    "confirm_password",
    function (value) {
      return value === password;
    },
    "Password and confirm password should must match"
  );
};

export default function Validators({
  registerValidations = null,
  setErrors: errorsData = null,
  customValidationMessages = {},
  formData = {},
  rules = {},
  children,
}) {
  const [submitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (submitted) {
      let _isValidationFail = isValidationFail();
      if (false == _isValidationFail) {
        setErrors({});
      }
    }
  }, [formData]);

  const [errors, setErrors] = useState(null);

  useEffect(() => {
    if (errorsData) {
      setErrors(errorsData);
    }
  }, [errorsData]);

  const onSubmit = (callback) => {
    let isValidationFailed = isValidationFail();
    if (false == isValidationFailed) {
      setErrors({});
      callback(formData);
      setIsSubmitted(false);
    } else {
      HELPER.toaster.error("Please fill the required fields with valid format");
      setIsSubmitted(true);
    }
  };

  const isValidationFail = () => {
    Validator.setMessages("en", validationMessages);
    _registerConfirmPasswordValidations();
    let validation = new Validator(formData, rules, customValidationMessages);
    validation.setAttributeFormatter(function (attribute) {
      return ":attribute";
    });

    if (validation.fails()) {
      setErrors(validation.errors.errors);
      return true;
    }
    return false;
  };

  return <>{children({ onSubmit, errors })}</>;
}
