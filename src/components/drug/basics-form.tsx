import React, { FC } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Row, Col } from 'react-bootstrap';
import { useToast } from '../../providers/toast';
import Form from '../form';
import TextField from '../field/text';
import FormControls from '../form-controls';

const UPDATE_DRUG = gql`
  mutation UpdateDrug(
    $drugId: UUID!,
    $summary: String,
    $psychonautWikiUrl: String,
    $errowidExperiencesUrl: String,
  ) {
    updateDrug(
      id: $drugId,
      summary: $summary,
      psychonautWikiUrl: $psychonautWikiUrl,
      errowidExperiencesUrl: $errowidExperiencesUrl,
    ) {
      id
      summary
      psychonautWikiUrl
      errowidExperiencesUrl
      updatedAt
    }
  }
`;

const validationSchema = Yup.object().shape({
  summary: Yup.string().trim(),
  psychonautWikiUrl: Yup.string().trim().url(),
  errowidExperiencesUrl: Yup.string().trim().url(),
})
  .required();

interface FormValues {
  summary?: string;
  psychonautWikiUrl?: string;
  errowidExperiencesUrl?: string;
}

interface MutationVariables extends FormValues {
  drugId: string;
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
    onCompleted() {
      toast('Basic drug info updated.', 'success');
    },
    onError() {
      toast('Failed to update drug.', 'error');
    },
  });

  async function handleSubmit(updates: FormValues) {
    return update({
      variables: { drugId, ...updates },
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
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Row>
            <Col xs={12}>
              <TextField
                name="summary"
                label="Summary"
                disabled={isSubmitting}
                textArea
              />
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

          <FormControls submit />
        </Form>
      )}
    </Formik>
  );
};

export default DrugBasicsForm;
