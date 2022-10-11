import React, { FC } from 'react';
import { Table, Container } from 'react-bootstrap';

const UserListingPage: FC = function UserListingPage() {
  return (
    <Container as="section">
      <h1>Users</h1>
      <Table striped>
        <thead>
          <tr>
            <th>Email</th>
            <th>Nick</th>
            <th aria-label="Controls" />
          </tr>
        </thead>
        <tbody>
          {}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserListingPage;
