import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { string, object, number } from 'yup';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import CountriesList from './CountriesList';
import './PlayerForm.scss';
import { COUNTRIES } from '../constants';

const playerSchema = object().shape({
  name: string().required('*Name must be at least one character'),
  country: string().required('*Must select a Country'),
  winnings: number().required('*Must be a number'),
  imageUrl: string(),
});

const defaultState = {
  name: '',
  country: '',
  winnings: 0,
  imageUrl: '',
};

const PlayerForm = ({ text, initialValues, onSubmit, onDelete }) => {
  const { push } = useHistory();

  return (
    <Formik
      initialValues={initialValues || defaultState}
      validationSchema={playerSchema}
      onSubmit={(values) => onSubmit(values)}
    >
      <div className="player-form-container">
        <Form className="player-form">
          <h2>{text}</h2>
          <label htmlFor="name">Name:</label>
          <Field
            className="player-form__input"
            type="text"
            name="name"
            data-testid="player-form-name"
          />
          <ErrorMessage
            name="name"
            component="span"
            className="player-form__error"
          />
          <label htmlFor="country">Country:</label>
          <Field
            as="select"
            className="player-form__input"
            name="country"
            data-testid="player-form-select"
          >
            <CountriesList />
          </Field>
          <ErrorMessage
            name="country"
            component="span"
            className="player-form__error"
          />
          <label htmlFor="winnings">Winnings:</label>
          <Field
            className="player-form__input"
            type="number"
            name="winnings"
            data-testid="player-form-winnings"
          />
          <ErrorMessage
            name="winnings"
            component="span"
            className="player-form__error"
          />
          <label htmlFor="imageUrl">Image Url:</label>
          <Field className="player-form__input" type="text" name="imageUrl" />
          <div className="player-form__buttons">
            <button
              type="button"
              onClick={() => push('/')}
              data-testid="player-form-cancel"
            >
              Cancel
            </button>
            {onDelete && (
              <button
                type="button"
                className="player-form__button"
                onClick={() => onDelete(initialValues.id)}
              >
                Delete
              </button>
            )}
            <button
              type="submit"
              className="player-form__button"
              data-testid="player-form-submit"
            >
              Submit
            </button>
          </div>
        </Form>
      </div>
    </Formik>
  );
};

PlayerForm.propTypes = {
  text: PropTypes.string.isRequired,
  initialValues: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    country: PropTypes.oneOf(Object.keys(COUNTRIES)),
    winnings: PropTypes.number.isRequired,
    imageUrl: PropTypes.string.isRequired,
  }),
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
};

export default PlayerForm;
