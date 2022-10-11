import React, { FC } from 'react';
import { Container } from 'react-bootstrap';
import PageLayout from '../components/page-layout';

const NotFoundPage: FC = function NotFoundPage() {
  return (
    <PageLayout title="Not Found">
      <Container as="section">
        <h1>404 &bull; Not Found</h1>
      </Container>
    </PageLayout>
  );
};

export default NotFoundPage;
