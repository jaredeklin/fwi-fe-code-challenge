import React, { useReducer } from 'react';

import './PlayerAdd.scss';
import CountriesList from './CountriesList';

const initialState = {
  name: '',
  country: '',
  winnings: 0,
  imageUrl: '',
};

const reducer = (state, { field, value }) => {
  return { ...state, [field]: value };
};

const PlayerAdd = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { name, country, winnings, imageUrl } = state;

  const handleChange = (e) => {
    dispatch({ field: e.target.name, value: e.target.value });
  };

  return (
    <div className="add-player-container">
      <form className="add-player">
        <h2>Create a new player:</h2>
        <label htmlFor="name">Name:</label>
        <input
          className="input"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <label htmlFor="country">Country:</label>
        <select
          className="input"
          type="text"
          name="country"
          value={country}
          onChange={handleChange}
        >
          <CountriesList />
        </select>
        <label htmlFor="winnings">Winnings:</label>
        <input
          className="input"
          type="number"
          name="winnings"
          value={winnings}
          onChange={handleChange}
        />
        <label htmlFor="imageUrl">Image Url:</label>
        <input
          className="input"
          type="text"
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default PlayerAdd;
