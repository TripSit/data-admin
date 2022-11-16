import React, { FC } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { FaTrash } from 'react-icons/fa';

const DeleteButton: FC<ButtonProps> = function DeleteButton(props) {
  return (
    <Button variant="danger" size="sm" {...props}>
      <FaTrash />
    </Button>
  );
};

export default DeleteButton;
