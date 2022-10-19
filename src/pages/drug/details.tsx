import React, { useState, FC } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import type { DrugName } from '../../types';
import Loading from '../../components/loading';
import DrugBasicsForm from '../../components/drug/basics-form';
import DrugNamesForm from '../../components/drug/names';

const DRUG_DETAILS = gql`
  query DrugDetails($drugId: UUID!) {
    drugs(query: { id: $drugId }) {
      id
      name
      aliases {
        id
        name
        type
      }
      summary
      psychonautWikiUrl
      errowidExperiencesUrl
      lastUpdatedBy {
        nick
      }
      updatedAt
      createdAt
    }
  }
`;

interface DrugDetailsBase {
  id: string;
  name: string;
  aliases: DrugName[];
  summary: string
  psychonautWikiUrl: string;
  errowidExperiencesUrl: string;
}

export interface DrugDetailsPayload extends DrugDetailsBase {
  lastUpdatedBy: {
    nick: string;
  };
  updatedAt: string;
  createdAt: string;
}

interface DrugDetails extends DrugDetailsBase {
  lastUpdatedBy: string;
  updatedAt: Date;
  createdAt: Date;
}

const DrugDetailsPage: FC = function DrugDetailsPage() {
  const { drugId } = useParams<{ drugId: string }>();
  const [drug, setDrug] = useState<DrugDetails>();
  const { loading, error } = useQuery<{ drugs: DrugDetailsPayload[] }, { drugId: string }>(
    DRUG_DETAILS,
    {
      variables: { drugId },
      onCompleted(data) {
        const [payload] = data.drugs;
        setDrug({
          ...payload,
          lastUpdatedBy: payload.lastUpdatedBy.nick,
          updatedAt: new Date(payload.updatedAt),
          createdAt: new Date(payload.createdAt),
        });
      },
    },
  );

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;
  if (!drug) return <p>Drug not found.</p>;

  return (
    <Container>
      <h1>{drug.name}</h1>
      <DrugBasicsForm
        drugId={drug.id}
        summary={drug.summary}
        psychonautWikiUrl={drug.psychonautWikiUrl}
        errowidExperiencesUrl={drug.errowidExperiencesUrl}
      />

      <h2>Names</h2>
      <DrugNamesForm names={drug.aliases} />
    </Container>
  );
};

export default DrugDetailsPage;
