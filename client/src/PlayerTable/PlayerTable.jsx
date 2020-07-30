import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import URI from 'urijs';
import PropTypes from 'prop-types';

import { fetchPlayersSuccess } from '../appState/actions';

import './PlayerTable.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

const BASE_URL = 'http://localhost:3001/players';
const getPlayers = (state) => state.playerIds.map((id) => state.players[id]);

const PlayerTable = (sort) => {
  const { sortBy, sortOrder } = sort;
  const dispatch = useDispatch();

  useEffect(() => {
    (async function fetchPlayers() {
      const url = URI(BASE_URL).addSearch({ sortBy, sortOrder });
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      const json = await response.json();
      dispatch(fetchPlayersSuccess(json));
    })();
  }, [sortBy, sortOrder, dispatch]);

  const players = useSelector(getPlayers);

  return (
    <div
      id="player-table-grid"
      role="grid"
      aria-label="Poker Players"
      className="player-table"
    >
      <TableHeader {...sort} />
      <TableBody players={players} />
    </div>
  );
};

PlayerTable.propTypes = {
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  changeSort: PropTypes.func.isRequired,
};

export default PlayerTable;
