import React, { useState, ChangeEvent, FormEvent } from "react";

// FormProps interface for defining props of the Form component
interface FormProps<T> {
  initialValues: T;
  validate: (values: T) => Record<keyof T, string | null>;
  onSubmit: (values: T) => void;
  children: (form: {
    values: T;
    errors: Record<keyof T, string | null>;
    touched: Record<keyof T, boolean>;
    handleChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleBlur: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  }) => React.ReactNode;
}

// Main Form component with generic type T
const Form = <T extends Record<string, string | number | boolean>>({
  initialValues,
  validate,
  onSubmit,
  children,
}: FormProps<T>) => {
  // State for form values, errors, and touched fields
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Record<keyof T, string | null>>(
    {} as Record<keyof T, string | null>
  );
  const [touched, setTouched] = useState<Record<keyof T, boolean>>(
    {} as Record<keyof T, boolean>
  );

  // Handle changes in form inputs
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle blur event to track touched fields and trigger validation
  const handleBlur = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    setTouched((prevTouched) => ({ ...prevTouched, [name]: true }));
    setErrors(validate(values));
  };

  // Handle form submission and run validation before submitting
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    const isValid = Object.values(validationErrors).every((error) => !error);
    if (isValid) onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      {children({ values, errors, touched, handleChange, handleBlur })}
    </form>
  );
};

export default Form;
