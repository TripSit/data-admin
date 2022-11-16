import React, { FC } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

interface Props extends ButtonProps {
  onClick(): void;
}

const CreateButton: FC<Props> = function CreateButton(props) {
  return (
    <Button variant="info" size="sm" {...props}>
      <FaPlus />
    </Button>
  );
};

export default CreateButton;
