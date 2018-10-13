import React from 'react';
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
} from 'formik';

const validateInput = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.0]+\[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Invalid email address';
  }
  return errors;
};

const AuthForm = (props) => {
  const { initialValues } = props;
  return (
    <Formik
      initialValues={initialValues}
      // validate={validateInput}
      onSubmit={(values, actions) => {
        props.sendData(values);
      }}
      render={( isSubmitting ) => {
        return (
          <Form>
            <Field type="email" name="email" />
            <ErrorMessage name="email" component="p" />
            <Field type="password" name="password" />
            <ErrorMessage name="password" component="p" />
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    />
  );
};

export default AuthForm;
