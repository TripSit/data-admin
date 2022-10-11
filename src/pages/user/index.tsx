import React, { useEffect, useState, FC } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Container } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import axios from 'axios';
import { useToast } from '../../providers/toast';
import tsApi from '../../ts-api';

interface User {
  id: string;
  email: string;
  nick: string;
  joinedAt: Date;
}

const UserListingPage: FC = function UserListingPage() {
  const toast = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const source = axios.CancelToken.source();
    tsApi.get<{ users: User[] }>('/user', {
      cancelToken: source.token,
    })
      .then((res) => setUsers(res.data.users.map((user) => ({
        ...user,
        joinedAt: new Date(user.joinedAt),
      }))))
      .catch((ex) => {
        if (!axios.isCancel(ex)) {
          toast('Failed to fetch users.', 'error');
        }
      });

    return () => source.cancel();
  }, []);

  async function deleteUser(userId: string) {
    setIsDeleting(true);
    return tsApi.delete(`/user/${userId}`)
      .then(() => {
        toast('User successfully deleted.', 'success');
        setUsers((prev) => prev.filter((user) => user.id !== userId));
      })
      .catch(() => {
        toast('Failed to delete user.', 'error');
      })
      .finally(() => {
        setIsDeleting(false);
      });
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
          {users.map((user) => (
            <tr key={user.id}>
              <th>
                <Link to={`/users/${user.id}`}>{user.nick}</Link>
              </th>
              <td>{user.email}</td>
              <td>{user.joinedAt.toLocaleDateString()}</td>
              <td>
                <Button
                  size="sm"
                  variant="danger"
                  disabled={isDeleting}
                  onClick={() => deleteUser(user.id)}
                >
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default UserListingPage;
