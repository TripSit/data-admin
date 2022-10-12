import React, { useEffect, useState, FC } from 'react';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import axios from 'axios';
import { useToast } from '../../providers/toast';
import tsApi from '../../ts-api';
import DeleteUserButton from '../../components/user/delete-user-button';

const HeadingWithControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

interface UserDetails {
  id: string;
  email: string;
  nick: string;
  joinedAt: Date;
}

const UserDetailsPage: FC = function UserDetailsPage() {
  const history = useHistory();
  const { userId } = useParams<{ userId: string }>();
  const toast = useToast();
  const [user, setUser] = useState<UserDetails>();

  useEffect(() => {
    const source = axios.CancelToken.source();
    tsApi.get<{ user: UserDetails }>(`/user/${userId}`, {
      cancelToken: source.token,
    })
      .then((res) => setUser({
        ...res.data.user,
        joinedAt: new Date(res.data.user.joinedAt),
      }))
      .catch((ex) => {
        if (!axios.isCancel(ex)) {
          toast('Failed to fetch user.', 'error');
        }
      });

    return () => source.cancel();
  }, []);

  return (
    <Container as="section">
      <HeadingWithControls>
        <h1>User Details</h1>
        <div>
          {user && (
            <DeleteUserButton userId={user.id} onSuccess={() => history.push('/users')} />
          )}
        </div>
      </HeadingWithControls>
      {user && (
        <p>{user.nick}</p>
      )}
    </Container>
  );
};

export default UserDetailsPage;
