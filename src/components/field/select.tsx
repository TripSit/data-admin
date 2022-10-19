import React, { FC } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import Label from './label';

interface Props {
  className?: string;
  name: string;
  label?: string;
  disabled?: boolean
  options: {
    value: string;
    label: string;
  }[];
}

const SelectField: FC<Props> = function SelectField({
  className,
  name,
  label,
  disabled,
  ...props
}) {
  const [field, { touched, error }, { setValue }] = useField(name);

  return (
    <Form.Group className={className} controlId={name}>
      {label && <Label>{label}</Label>}
      <Select
        {...field}
        {...props}
        disabled={!!disabled}
        onChange={(newValue) => setValue(newValue)}
      />
      {touched && error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default SelectField;
