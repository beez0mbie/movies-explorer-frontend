import { useState, useCallback } from 'react';

export function useFormWithValidation(inputValues = {}) {
  const [formValues, setFormValues] = useState(inputValues);
  const [formErrors, setFormErrors] = useState({});
  const [formIsValid, setFormIsValid] = useState(false);

  const handleChangeForm = (event) => {
    const target = event.target;
    const { name, value } = target;
    setFormValues({ ...formValues, [name]: value });
    setFormErrors({ ...formErrors, [name]: target.validationMessage });
    setFormIsValid(target.closest('form').checkValidity());
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setFormValues(newValues);
      setFormErrors(newErrors);
      setFormIsValid(newIsValid);
    },
    [setFormValues, setFormErrors, setFormIsValid],
  );

  return { formValues, handleChangeForm, formErrors, formIsValid, resetForm };
}
