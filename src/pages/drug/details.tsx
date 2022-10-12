import React, { FC } from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Loading from '../../components/loading';

const DRUG_DETAILS = gql`
  query DrugDetails($drugId: ID!) {
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

interface DrugName {
  id: string;
  name: string;
  type: 'COMMON' | 'SUBSTITUTIVE' | 'SYSTEMATIC';
}

interface DrugDetailsBase {
  id: string;
  name: string;
  aliases: DrugName[];
  summary: string
  psychonautWikiUrl: string;
  errowidExperiencesUrl: string;
}

interface DrugDetailsPayload extends DrugDetailsBase {
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
  const { data, loading, error } = useQuery<{ drugs: DrugDetailsPayload[] }, { drugId: string }>(
    DRUG_DETAILS,
    {
      variables: { drugId },
    },
  );

  if (loading) return <Loading />;
  if (error) return <p>{error.message}</p>;
  if (!data) return null;

  const drug: DrugDetails = data.drugs.map(({ lastUpdatedBy, ...xs }) => ({
    ...xs,
    lastUpdatedBy: lastUpdatedBy.nick,
    updatedAt: new Date(drug.updatedAt),
    createdAt: new Date(drug.createdAt),
  }));

  return (
    <Container>
      <h1>{drug.name}</h1>
    </Container>
  );
};

export default DrugDetailsPage;
