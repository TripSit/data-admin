import React, { FC } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import Loading from '../../components/loading';

const GET_ALL_DRUGS = gql`
  query GetAllDrugs {
    drugs {
      id
      name
    }
  }
`;

interface DrugListing {
  id: string;
  name: string;
}

const DrugListingPage: FC = function DrugListingPage() {
  const { data, loading, error } = useQuery<{ drugs: DrugListing[] }>(GET_ALL_DRUGS);

  return (
    <Container>
      <h1>Drugs</h1>
      <Table striped bordered>
        <thead>
          <tr>
            <th>Name</th>
            <th aria-label="Controls" />
          </tr>
        </thead>
        <tbody>
          {loading || error ? (
            <tr>
              <td colSpan={2}>
                {error?.message || <Loading />}
              </td>
            </tr>
          ) : data?.drugs.map((drug) => (
            <tr key={drug.id}>
              <th>
                <Link to={`/drugs/${drug.id}`}>{drug.name}</Link>
              </th>
              <td />
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default DrugListingPage;
