import React, { FC } from 'react';
import { useMutation, gql } from '@apollo/client';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { Row, Col } from 'react-bootstrap';
import { TYPE_LABELS } from './constants';
import type { DrugName, DrugNameType } from '../../../types';
import FormControls from '../../form-controls';
import TextField from '../../field/text';
import SelectField from '../../field/select';

const CREATE_DRUG_NAME = gql`
  mutation CreateDrugName($drugId: UUID! $name: String!, $type: DrugNameType!) {
    createDrugName(drugId: $drugId, name: $name, type: $type) {
      id
      name
      type
      isDefault
    }
  }
`;

interface TypeOption {
  value: DrugNameType;
  label: string;
}

const typeOptions: TypeOption[] = Object.entries(TYPE_LABELS)
  .map(([value, label]) => ({
    label,
    value: value as DrugNameType,
  }))
  .sort((a, b) => a.label.localeCompare(b.label));

interface FormValues {
  name: string;
  type?: DrugNameType;
}

interface QueryResponse {
  createDrugName: DrugName;
}

interface QueryVariables {
  drugId: string;
  name: string;
  type: DrugNameType;
}

const validationSchema = Yup.object({
  name: Yup.string().trim().required(),
  type: Yup.string().oneOf(Object.keys(TYPE_LABELS)),
})
  .required();

interface Props {
  drugId: string;
  onSuccess(drugName: DrugName): void | Promise<void>;
}

const CreateDrugNameForm: FC<Props> = function CreateDrugNameForm({ drugId, onSuccess }) {
  console.log(drugId);
  const [create] = useMutation<QueryResponse, QueryVariables>(CREATE_DRUG_NAME, {
    onCompleted(data) {
      onSuccess(data.createDrugName);
    },
  });

  async function handleSubmit(values: FormValues) {
    if (!values.type) throw new Error('Missing name type.');
    return create({
      variables: {
        drugId,
        name: values.name,
        type: values.type,
      },
    });
  }

  return (
    <Formik<FormValues>
      initialValues={{ name: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <Row>
            <Col xs={12} sm={6}>
              <TextField name="name" label="Name" disabled={isSubmitting} />
            </Col>

            <Col xs={12} sm={6}>
              <SelectField
                name="type"
                label="Type"
                options={typeOptions}
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

export default CreateDrugNameForm;
