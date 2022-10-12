import React, { FC } from 'react';
import styled from 'styled-components';
import { FaSpinner } from 'react-icons/fa';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  i {
    @keyframes spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    animation: 400ms linear 0 spin;
  }
`;

interface Props {
  className?: string;
}

const Loading: FC<Props> = function Loading({ className }) {
  return (
    <Wrapper className={className}>
      <FaSpinner />
      <p>Loading&hellip;</p>
    </Wrapper>
  );
};

export default Loading;
