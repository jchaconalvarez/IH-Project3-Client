import React from 'react';
import { Formik, ErrorMessage } from 'formik';
import StyledForm from '../Forms/StyledForm';
import CardInput from '../Forms/CardInput';
import CardFields from '../Forms/CardFields';
import AuthErrorMessage from '../Forms/AuthErrorMessage';
import Button from '../Button';

const renderError = (error) => {
  return (
    <CardFields>
      <AuthErrorMessage>{error.error}</AuthErrorMessage>
    </CardFields>
  );
};

const validateInput = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const AuthForm = (props) => {
  const { initialValues, sendData, showLogin, error } = props;
  return (
    <Formik
      initialValues={initialValues}
      validate={validateInput}
      onSubmit={(values, actions) => {
        const { email, password } = values;
        sendData({ email, password });
      }}
      render={( isSubmitting ) => {
        return (
          <StyledForm>
            <CardFields authForm>
              <CardInput type="email" name="email" placeholder="Email" />
              <ErrorMessage name="email" component="p" />
            </CardFields>
            <CardFields authForm>
              <CardInput type="password" name="password" placeholder="Password" />
              <ErrorMessage name="password" component="p" />
            </CardFields>
            { error && renderError(error) }
            <CardFields authForm>
              <Button>{ !showLogin ? 'Sign Up' : 'Log In' }</Button>
            </CardFields>
          </StyledForm>
        );
      }}
    />
  );
};

export default AuthForm;
