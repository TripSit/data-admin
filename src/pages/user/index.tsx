import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import usePageFetch from '../../hooks/use-page-fetch';
import DeleteUserButton from '../../components/user/delete-user-button';
import Loading from '../../components/loading';

interface UserListing {
  id: string;
  email: string;
  nick: string;
  joinedAt: Date;
}

const UserListingPage: FC = function UserListingPage() {
  const { data, setData, error } = usePageFetch<{ users: UserListing[] }, UserListing[]>('/user', {
    transform: ({ users }) => users.map((user) => ({
      ...user,
      joinedAt: new Date(user.joinedAt),
    })),
  });

  function onDeleteSuccess(deletedUserId: string) {
    setData((prev) => prev && prev.filter((user) => user.id !== deletedUserId));
  }

  return (
    <Container as="section">
      <h1>Users</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Nick</th>
            <th>Email</th>
            <th>Joined At</th>
            <th aria-label="Controls" />
          </tr>
        </thead>
        <tbody>
          {data === null || error === null ? (
            <tr>
              <td colSpan={4}>
                {error?.message || <Loading />}
              </td>
            </tr>
          ) : data?.map((user) => (
            <tr key={user.id}>
              <th>
                <Link to={`/users/${user.id}`}>{user.nick}</Link>
              </th>
              <td>{user.email}</td>
              <td>{user.joinedAt.toLocaleDateString()}</td>
              <td>
                <DeleteUserButton
                  userId={user.id}
                  onSuccess={() => onDeleteSuccess(user.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserListingPage;
