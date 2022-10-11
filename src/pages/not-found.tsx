import React, { FC } from 'react';
import { Container } from 'react-bootstrap';

const NotFoundPage: FC = function NotFoundPage() {
  return (
    <Container as="section">
      <h1>404 &bull; Not Found</h1>
    </Container>
  );
};

export default NotFoundPage;
