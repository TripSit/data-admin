import React, { FC } from 'react';
import { Container } from 'react-bootstrap';
import PageLayout from '../components/page-layout';

const HomePage: FC = function HomePage() {
  return (
    <PageLayout title="Home">
      <Container>
        <h1>Home Page!</h1>
      </Container>
    </PageLayout>
  );
};

export default HomePage;
