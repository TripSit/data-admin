import styled from 'styled-components';
import { Form } from 'react-bootstrap';

const FieldLabel = styled(Form.Label)`
  font-weight: bold;
  &::after {
    content: ':';
  }
`;

export default FieldLabel;
