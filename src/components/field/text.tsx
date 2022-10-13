import React, { FC } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

interface Props {
  className?: string;
  name: string;
  label?: string;
  disabled?: boolean;
}

const TextField: FC<Props> = function TextField({
  className,
  name,
  label,
  disabled,
  ...props
}) {
  const [field, { touched, error }] = useField<string>(name);

  return (
    <Form.Group className={className} controlId={name}>
      {label && (
        <Form.Label>{label}</Form.Label>
      )}
      <Form.Control {...field} {...props} disabled={!!disabled} />
      {touched && error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default TextField;
