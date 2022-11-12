import React, { FC } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import Label from './label';

interface Option {
  value: string;
  label: string;
}

interface Props {
  className?: string;
  name: string;
  label?: string;
  disabled?: boolean
  options: Option[];
}

const SelectField: FC<Props> = function SelectField({
  className,
  name,
  label,
  disabled,
  options,
  ...props
}) {
  const [field, { touched, error }, { setValue }] = useField(name);

  return (
    <Form.Group className={className} controlId={name}>
      {label && <Label>{label}</Label>}
      <Select<Option>
        {...field}
        {...props}
        value={options.find((option) => option.value === field.value)}
        options={options}
        isDisabled={!!disabled}
        onChange={(newValue) => setValue(newValue?.value)}
      />
      {touched && error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default SelectField;
