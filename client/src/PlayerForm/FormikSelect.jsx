import React from 'react';
import PropTypes from 'prop-types';
import { ErrorMessage, useField } from 'formik';

import { FormMessage, NativeSelect } from '@react-md/form';

import './PlayerForm.scss';
import CountriesList from './CountriesList';

const FormikSelect = ({ name, ...props }) => {
  const [field, { error, touched }] = useField(name);
  const isError = !!(error && touched);

  return (
    <div>
      <NativeSelect {...field} {...props} error={isError}>
        <CountriesList />
      </NativeSelect>
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

FormikSelect.propTypes = {
  name: PropTypes.string.isRequired,
  ...NativeSelect.propTypes,
};

export default FormikSelect;
