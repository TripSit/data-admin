import styled from 'styled-components';
import { Form } from 'formik';

export default styled(Form)`
  > .row:not(:first-child) {
    margin-top: .8rem;
  }
`;
