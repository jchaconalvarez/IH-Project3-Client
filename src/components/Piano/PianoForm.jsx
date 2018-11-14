import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage
} from 'formik';
import styled from 'styled-components';

const NameForm = styled(Form)`
  grid-area: name;
  width: 100%;
`;
const FieldForm = styled(Field)`
  width: 70%;
`;
const Btn = styled(Form)`

`;

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
            <NameForm>
              <FieldForm type="text" name="songName" placeholder="Song name" />
              <button type="button">Change</button>
            </NameForm>
          );
        }}
      />
    </React.Fragment>
  );
};

export default PianoForm;
