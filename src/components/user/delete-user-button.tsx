import React, { useState, FC } from 'react';
import { Button } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';
import { useToast } from '../../providers/toast';
import tsApi from '../../ts-api';

interface Props {
  userId: string;
  onSuccess(): void;
}

const DeleteUserButton: FC<Props> = function DeleteUserButton({ userId, onSuccess }) {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  async function handleClick() {
    setIsLoading(true);
    return tsApi.delete(`/user/${userId}`)
      .then(() => {
        toast('User successfully deleted.', 'success');
        if (onSuccess) onSuccess();
      })
      .catch(() => {
        toast('Failed to delete user.', 'error');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <Button
      size="sm"
      variant="danger"
      disabled={isLoading}
      onClick={() => handleClick()}
    >
      <FaTrash />
    </Button>
  );
};

export default DeleteUserButton;
