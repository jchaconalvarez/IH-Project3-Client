import React from 'react';
import { Formik } from 'formik';
import StyledForm from './Forms/StyledForm';
import CardInput from './Forms/CardInput';
import CardFields from './Forms/CardFields';
import Button from './Button';

const EditProfile = (props) => {
  const { email, password, _id: id } = props.userData;
  const { editProfile } = props;
  return (
    <Formik
      initialValues={{ email, password }}
      onSubmit={(values, actions) => {
        const { newEmail, newPassword } = values;
        editProfile(id, { newEmail, newPassword });
      }}
      render={({ errors, touched, isSubmitting }) => (
        <StyledForm>
          <CardFields>
            <CardInput type="email" name="email" placeholder={email} />
            {errors.email && touched.email && <div>{errors.email}</div>}
          </CardFields>
          <CardFields>
            <Button type="submit">Edit</Button>
          </CardFields>
        </StyledForm>
      )}
    />
  );
};

export default EditProfile;
