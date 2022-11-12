import React, { useMemo, useState, FC } from 'react';
import { Table } from 'react-bootstrap';
import type { DrugName } from '../../../types';
import { TYPE_LABELS } from './constants';
import DeleteButton from './delete-button';
import SetDefaultButton from './set-default-button';
import CreateForm from './create';
import CreateButton from '../../create-button';

interface Props {
  drugId: string;
  names: DrugName[];
}

const DrugNames: FC<Props> = function DrugNames({ drugId, names }) {
  const [isCreating, setIsCreating] = useState(false);

  const sortedNames = useMemo(() => names.slice()
    .sort((a, b) => (a.isDefault ? 1 : a.name.localeCompare(b.name))), [names]);

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
          {sortedNames.map((name) => (
            <tr key={name.id}>
              <th>{name.name}</th>
              <td>{TYPE_LABELS[name.type]}</td>
              <td>
                <DeleteButton drugNameId={name.id} />
                <SetDefaultButton disabled={name.isDefault} drugNameId={name.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {isCreating ? (
        <CreateForm drugId={drugId} onSuccess={() => setIsCreating(false)} />
      ) : (
        <CreateButton onClick={() => setIsCreating(true)} />
      )}
    </>
  );
};

export default DrugNames;
