import React, { FC } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Row, Col } from 'react-bootstrap';
import { FaSave } from 'react-icons/fa';
import { useToast } from '../../providers/toast';
import Form from '../form';
import TextField from '../field/text';

const UPDATE_DRUG = gql`
  mutation UpdateDrug($drugId: UUID!, $updates: DrugUpdateInput!) {
    updateDrug(drugId: $drugId, updates: $updates) {
      id
      summary
      psychonautWikiUrl
      errowidExperiencesUrl
    }
  }
`;

const validationSchema = Yup.object().shape({
  summary: Yup.string().trim(),
  psychonautWikiUrl: Yup.string().url().trim(),
  errowidExperiencesUrl: Yup.string().url().trim(),
})
  .required();

interface FormValues {
  summary?: string;
  psychonautWikiUrl?: string;
  errowidExperiencesUrl?: string;
}

interface MutationVariables {
  drugId: string;
  updates: FormValues;
}

interface Props {
  drugId: string;
  summary?: string;
  psychonautWikiUrl?: string;
  errowidExperiencesUrl?: string;
}

const DrugBasicsForm: FC<Props> = function DrugBasicsForm({
  drugId,
  summary,
  psychonautWikiUrl,
  errowidExperiencesUrl,
}) {
  const toast = useToast();

  const [update] = useMutation<FormValues, MutationVariables>(UPDATE_DRUG, {
    onError() {
      toast('Failed to update drug.', 'error');
    },
  });

  async function handleSubmit(updates: FormValues) {
    return update({
      variables: { drugId, updates },
    });
  }

  return (
    <Formik<FormValues>
      initialValues={{
        summary: summary || '',
        psychonautWikiUrl: psychonautWikiUrl || '',
        errowidExperiencesUrl: errowidExperiencesUrl || '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      {({ isSubmitting }) => (
        <Form>
          <Row>
            <Col xs={12}>
              <TextField name="summary" label="Summary" disabled={isSubmitting} />
            </Col>
          </Row>

          <Row>
            <Col xs={12} md={6}>
              <TextField
                name="psychonautWikiUrl"
                label="Psychonaut Wiki"
                disabled={isSubmitting}
              />
            </Col>

            <Col xs={12} md={6}>
              <TextField
                name="errowidExperiencesUrl"
                label="Errowid Experiences"
                disabled={isSubmitting}
              />
            </Col>
          </Row>

          <Button type="submit" variant="info" disabled={isSubmitting}>
            <FaSave />
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default DrugBasicsForm;
