import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from 'formik';

import { TextField, FormMessage } from '@react-md/form';

import './PlayerForm.scss';

const FormikTextField = ({ name, ...props }) => {
  const [field, { error, touched }] = useField(name);
  const isError = !!(error && touched);
  const value = field.value.toString();

  return (
    <div>
      <TextField {...field} {...props} value={value} error={isError} />
      <ErrorMessage name={name}>
        {(errorMessage) => (
          <FormMessage id={props.id} error={true}>
            {errorMessage}
          </FormMessage>
        )}
      </ErrorMessage>
    </div>
  );
};

FormikTextField.propTypes = {
  name: PropTypes.string.isRequired,
  ...TextField.propTypes,
};

export default FormikTextField;
