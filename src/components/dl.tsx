import styled from 'styled-components';

const Dl = styled.dl`
  > dt {
    &::after {
      content: ':';
    }
  }
`;

export default Dl;
