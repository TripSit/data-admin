import React, { FC } from 'react';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';
import Label from './label';

interface Props {
  className?: string;
  name: string;
  label?: string;
  disabled?: boolean;
  textArea?: boolean;
}

const TextField: FC<Props> = function TextField({
  className,
  name,
  label,
  disabled,
  textArea,
  ...props
}) {
  const [field, { touched, error }] = useField<string>(name);

  return (
    <Form.Group className={className} controlId={name}>
      {label && <Label>{label}</Label>}
      <Form.Control
        {...field}
        as={textArea ? 'textarea' : undefined}
        {...props}
        disabled={!!disabled}
      />
      {touched && error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default TextField;
