import React, { FC } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Button } from 'react-bootstrap';
import type { DrugName } from '../../../types';

const SET_DEFAULT_DRUG_NAME = gql`
  mutation SetDefaultDrugName($drugNameId: UUID!) {
    setDefaultDrugName(drugNameId: $drugNameId) {
      id
      name
      type
      isDefault
    }
  }
`;

interface QueryResponse {
  setDefaultDrugName: DrugName[];
}

interface QueryVariables {
  drugNameId: string;
}

interface Props extends QueryVariables {
  disabled?: boolean;
}

const SetDefaultDrugNameButton: FC<Props> = function SetDefaultDrugNameButton({
  drugNameId,
  disabled,
}) {
  const [setDefault, { loading }] = useMutation<QueryResponse, QueryVariables>(
    SET_DEFAULT_DRUG_NAME,
    {
      variables: { drugNameId },
    },
  );

  return (
    <Button variant="info" disabled={!!disabled || loading} onClick={() => setDefault()}>
      Set Default
    </Button>
  );
};

export default SetDefaultDrugNameButton;
