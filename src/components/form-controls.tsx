import React, { FC } from 'react';
import styled from 'styled-components';
import {
  Button,
  Row,
  Col,
  ColProps,
} from 'react-bootstrap';

const Controls = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > button:not(:first-of-type) {
    margin-left: 1rem;
  }
`;

interface Props extends ColProps {
  submit?: boolean;
  onCancel?: () => void | Promise<void>;
}

const FormControls: FC<Props> = function FormControls({
  children,
  className,
  submit,
  onCancel,
  ...props
}) {
  return (
    <Row className={className}>
      <Controls {...props}>
        {submit && (
          <Button type="submit" variant="success">
            Submit
          </Button>
        )}

        {onCancel && (
          <Button type="button" variant="warning" onClick={onCancel}>
            Cancel
          </Button>
        )}

        {children}
      </Controls>
    </Row>
  );
};

export default FormControls;
