import React, { FC, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import UserActions, { UserAction } from '../../components/user/actions';
import Dl from '../../components/dl';
import NotFoundPage from '../not-found';
import Loading from '../../components/loading';

const USER_DETAILS = gql`
  query UserDetails($userId: UUID!) {
    users(id: $userId) {
      id
      email
      username
      discord {
        id
        username
        discriminator
      }
      actions {
        id
        type
        description
        internalNote
        expiresAt
        repealedBy {
          id
          username
        }
        repealedAt
        createdBy {
          id
          username
        }
        createdAt
      }
      lastSeen
      joinedAt
    }
  }
`;

interface UserDetails {
  id: string;
  email?: string;
  username?: string;
  discord?: {
    id: string;
    username: string;
    discriminator: string;
  };
  actions: UserAction[];
  lastSeen: Date;
  joinedAt: Date;
}

interface QqlVariables {
  userId: string;
}

const UserDetailsPage: FC = function UserDetailsPage() {
  const { userId } = useParams<QqlVariables>();

  const [userDetails, setUserDetails] = useState<UserDetails>();
  const { loading, error } = useQuery<{ users: UserDetails[] }, QqlVariables>(USER_DETAILS, {
    variables: { userId },
    onCompleted(data) {
      const [payload] = data.users;
      setUserDetails({
        ...payload,
        lastSeen: new Date(payload.lastSeen),
        joinedAt: new Date(payload.joinedAt),
        actions: payload.actions.map((action) => ({
          ...action,
          expiresAt: action.expiresAt && new Date(action.expiresAt),
          repealedAt: action.repealedAt && new Date(action.repealedAt),
          createdAt: action.createdAt && new Date(action.createdAt),
        })),
      });
    },
  });

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;
  if (!userDetails) return <NotFoundPage />;

  return (
    <Container>
      <h1>{userDetails.username || userDetails.discord?.username}</h1>

      <Dl>
        <dt>Username</dt>
        <dd>{userDetails.username}</dd>
        <dt>Email</dt>
        <dd>{userDetails.email}</dd>
        <dt>Discord</dt>
        <dd>{userDetails.discord?.username}#{userDetails.discord?.discriminator}</dd>
        <dt>Last Seen</dt>
        <dd>{userDetails.lastSeen.toLocaleString()}</dd>
        <dt>Joined At</dt>
        <dd>{userDetails.joinedAt.toLocaleString()}</dd>
      </Dl>

      <h2>Actions</h2>
      <UserActions actions={userDetails.actions} />
    </Container>
  );
};

export default UserDetailsPage;
