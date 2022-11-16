import React, { FC } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';
import Label from './label';

interface Props {
  className?: string;
  name: string;
  label?: string;
  disabled?: boolean;
}

const CheckboxField: FC<Props> = function CheckboxField({
  className,
  name,
  label,
  disabled,
}) {
  const [field, { touched, error }, { setValue }] = useField(name);

  return (
    <Form.Group className={className} controlId={name}>
      {label && <Label>{label}</Label>}
      <Form.Check
        {...field}
        disabled={!!disabled}
        onChange={(e) => setValue(e.target.checked)}
      />
      {touched && error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default CheckboxField;
