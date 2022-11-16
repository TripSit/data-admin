import React, { FC } from 'react';
import { Button, ButtonProps } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaPencilAlt } from 'react-icons/fa';

interface Props extends ButtonProps {
  id: string;
  baseUrl: string;
}

const EditButton: FC<Props> = function EditButton({ id, baseUrl, ...props }) {
  return (
    <Link to={`${baseUrl.replace(/\/$/, '')}/${id}`}>
      <Button variant="info" size="sm" {...props}>
        <FaPencilAlt />
      </Button>
    </Link>
  );
};

export default EditButton;
