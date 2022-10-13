import React, { FC } from 'react';
import styled from 'styled-components';
import { useField } from 'formik';
import { Form } from 'react-bootstrap';

const Label = styled(Form.Label)`
  font-weight: bold;
  &::after {
    content: ':';
  }
`;

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
      {label && <Label>{label}</Label>}
      <Form.Control {...field} {...props} disabled={!!disabled} />
      {touched && error && (
        <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
      )}
    </Form.Group>
  );
};

export default TextField;
