import React, { useState, FC } from 'react';
import { Table } from 'react-bootstrap';
import type { DrugName } from '../../../types';
import { TYPE_LABELS } from './constants';
import DeleteDrugNameButton from './delete-button';
import CreateDrugForm from './create';
import CreateButton from '../../create-button';

interface Props {
  names: DrugName[];
}

const DrugNames: FC<Props> = function DrugNames({ names }) {
  const [isCreating, setIsCreating] = useState(false);

  return (
    <>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th aria-label="Controls" />
          </tr>
        </thead>
        <tbody>
          {names.map((name) => (
            <tr key={name.id}>
              <th>{name.name}</th>
              <td>{TYPE_LABELS[name.type]}</td>
              <td>
                <DeleteDrugNameButton drugNameId={name.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isCreating ? (
        <CreateDrugForm onSuccess={() => setIsCreating(false)} />
      ) : (
        <CreateButton onClick={() => setIsCreating(true)} />
      )}
    </>
  );
};

export default DrugNames;
