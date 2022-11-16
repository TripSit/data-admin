import React, { FC } from 'react';

export interface UserAction {
  id: string;
  type: 'NOTE' | 'WARNING' | 'FULL_BAN' | 'TICKET_BAN' | 'DISCORD_BOT_BAN' | 'BAN_EVASION'
  | 'UNDERBAN' | 'TIMEOUT' | 'REPORT' | 'KICK';
  description: string;
  internalNote?: string;
  expiresAt?: Date;
  repealedBy?: {
    id: string;
    username: string;
  };
  repealedAt?: Date;
  createdBy: {
    id: string;
    username: string;
  };
  createdAt: Date;
}

interface Props {
  actions: UserAction[];
}

const UserActions: FC<Props> = function UserActions({ actions }) {
  return (
    <p>User Actions</p>
  );
};

export default UserActions;
