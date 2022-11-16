import React, { FC } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import Loading from '../../components/loading';
import EditButton from '../../components/buttons/edit';

const GET_ALL_USERS = gql`
  query GetAllUsers {
    users {
      id
      username
      discord {
        id
        username
      }
      lastSeen
      joinedAt
    }
  }
`;

interface UserListing {
  id: string;
  username: string;
  discord: {
    id: string;
    username: string;
  };
  isFullBanned: string;
  lastSeen: Date;
  joinedAt: Date;
}

const UserListingPage: FC = function UserListingPage() {
  const { data, loading, error } = useQuery<{ users: UserListing[] }>(GET_ALL_USERS);

  return (
    <Container>
      <h1>Users</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Username</th>
            <th>Discord</th>
            <th>Last Seen</th>
            <th>Joined</th>
            <th aria-label="Controls" />
          </tr>
        </thead>
        <tbody>
          {loading || error ? (
            <tr>
              <td colSpan={4}>
                {error?.message || <Loading />}
              </td>
            </tr>
          ) : data?.users.map((user) => (
            <tr key={user.id}>
              <th>
                <Link to={`/user/${user.id}`}>{user.username}</Link>
              </th>
              <td>{user.discord?.username}</td>
              <td>{user.lastSeen.toLocaleString()}</td>
              <td>{user.joinedAt.toLocaleString()}</td>
              <td>
                <EditButton baseUrl="/user" id={user.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserListingPage;
