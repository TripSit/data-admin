import React, { FC } from 'react';
import { useMutation, gql } from '@apollo/client';
import DeleteButton from '../../buttons/delete';

const DELETE_DRUG_NAME = gql`
  mutation DeleteDrugName($drugNameId: UUID!) {
    deleteDrugName(drugNameId: $drugNameId)
  }
`;

interface QueryResponse {
  deleteDrugname: void;
}

interface QueryVariables {
  drugNameId: string;
}

interface Props extends QueryVariables {}

const DeleteDrugNameButton: FC<Props> = function DeleteDrugNameButton({ drugNameId }) {
  const [send, { loading }] = useMutation<QueryResponse, QueryVariables>(DELETE_DRUG_NAME);

  async function handleDelete() {
    return send({
      variables: { drugNameId },
      update(cache) {
        cache.evict({
          id: cache.identify({
            id: drugNameId,
            __typename: 'DrugName',
          }),
        });
      },
    });
  }

  return (
    <DeleteButton disabled={loading} onClick={handleDelete} />
  );
};

export default DeleteDrugNameButton;
