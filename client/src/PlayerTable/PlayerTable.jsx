import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import URI from 'urijs';
import PropTypes from 'prop-types';

import { fetchPlayersSuccess } from '../appState/actions';

import './PlayerTable.scss';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';
import { usePagination } from './usePagination';

const BASE_URL = 'http://localhost:3001/players';
const getPlayers = (state) => state.playerIds.map((id) => state.players[id]);

const PlayerTable = (sort) => {
  const { sortBy, sortOrder } = sort;
  const dispatch = useDispatch();
  const { setTotal, size, from, ...pagination } = usePagination();
  const totalRef = useRef(null);

  const url = URI(BASE_URL)
    .addSearch({ sortBy, sortOrder, size, from })
    .toString();

  const updateTotal = (count) => {
    if (count !== totalRef.current) {
      setTotal(count);
      totalRef.current = count;
    }
  };

  const updateTotalCount = React.useCallback(updateTotal, [totalRef.current]);

  useEffect(() => {
    (async function fetchPlayers() {
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      });

      const json = await response.json();

      dispatch(fetchPlayersSuccess(json));
      updateTotalCount(json.total);
    })();
  }, [url, dispatch, updateTotalCount]);

  const players = useSelector(getPlayers);

  return (
    <div
      id="player-table-grid"
      role="grid"
      aria-label="Poker Players"
      className="player-table"
    >
      <TableHeader {...sort} setPage={pagination.setPage} />
      <TableBody players={players} />
      {players.length > 0 && <TableFooter {...pagination} />}
    </div>
  );
};

PlayerTable.propTypes = {
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  changeSort: PropTypes.func.isRequired,
};

export default PlayerTable;
