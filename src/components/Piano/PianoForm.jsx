import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import styled from 'styled-components';
import Button from '../Button';

const PianoForm = (props) => {
  const { initialValues, changeName } = props;
  return (
    <React.Fragment>
      <Formik
        itinialValues={initialValues}
        onSubmit={(values) => {
          const { songName } = values;
          changeName(songName);
        }}
        render={() => {
          return (
            <Form>
              <Field type="text" name="songName" placeholder="Song name" />
              <Button>Change</Button>
            </Form>
          );
        }}
      />
    </React.Fragment>
  );
};

export default PianoForm;
