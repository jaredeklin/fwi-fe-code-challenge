import React from 'react';
import { COUNTRIES } from '../constants';

const sortedByName = Object.keys(COUNTRIES)
  .map((countryCode) => ({
    countryCode,
    name: COUNTRIES[countryCode],
  }))
  .sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

const CountriesList = () => (
  <>
    <option value="">--Please choose a country--</option>
    {sortedByName.map(({ countryCode, name }) => (
      <option key={countryCode} value={countryCode}>
        {name}
      </option>
    ))}
  </>
);

export default CountriesList;
