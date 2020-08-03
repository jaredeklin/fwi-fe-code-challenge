import React from 'react';
import { Formik, Form } from 'formik';
import { string, object, number } from 'yup';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import { Button } from '@react-md/button';
import { Text } from '@react-md/typography';

import { COUNTRIES } from '../constants';
import FormikTextField from './FormikTextField';
import FormikSelect from './FormikSelect';
import './PlayerForm.scss';

const playerSchema = object().shape({
  name: string().required('*Name must be at least one character'),
  country: string().required('*Must select a Country'),
  winnings: number().required('*Must be a number'),
  imageUrl: string(),
});

const defaultState = {
  name: '',
  country: '',
  winnings: '',
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
          <Text type="headline-4" color="theme-primary">
            {text}
          </Text>
          <FormikTextField
            name="name"
            data-testid="player-form-name"
            id="name"
            label="Name"
            className="player-form__input"
          />
          <FormikSelect
            id="countries"
            name="country"
            data-testid="player-form-select"
            label="Country"
            className="player-form__input"
          />
          <FormikTextField
            type="number"
            name="winnings"
            data-testid="player-form-winnings"
            id="winnings"
            label="Winnings"
            className="player-form__input"
          />
          <FormikTextField
            type="url"
            name="imageUrl"
            data-testid="player-form-url"
            id="imageUrl"
            label="Image Url"
            className="player-form__input"
          />
          <div className="player-form__buttons">
            <Button
              onClick={() => push('/')}
              data-testid="player-form-cancel"
              theme="primary"
              disableRipple={true}
            >
              Cancel
            </Button>
            {onDelete && (
              <Button
                type="button"
                className="player-form__button"
                theme="primary"
                themeType="contained"
                disableRipple={true}
                onClick={() => onDelete(initialValues.id)}
              >
                Delete
              </Button>
            )}
            <Button
              type="submit"
              className="player-form__button"
              data-testid="player-form-submit"
              theme="primary"
              themeType="contained"
              disableRipple={true}
            >
              Submit
            </Button>
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
