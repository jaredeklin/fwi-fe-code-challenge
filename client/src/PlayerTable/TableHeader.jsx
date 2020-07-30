import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { DESC } from '../constants';

const NAME = 'name';
const WINNINGS = 'winnings';
const COUNTRY = 'country';

const displayArrow = ({ sortBy, sortOrder }, column) => {
  if (column !== sortBy) return;

  return sortOrder === DESC
    ? String.fromCharCode(0x2191)
    : String.fromCharCode(0x2193);
};

const TableHeader = ({ changeSort, ...sort }) => (
  <table
    id="player-table-header"
    role="presentation"
    className="table table--fixed"
  >
    <thead>
      <tr role="row">
        <th role="columnheader" className="table__header table__avatar">
          <Link to="add-player">+</Link>
        </th>
        <th
          role="columnheader"
          className="table__header table__player"
          onClick={() => changeSort(NAME)}
        >
          Player {displayArrow(sort, NAME)}
        </th>
        <th
          role="columnheader"
          className="table__header table__winnings"
          onClick={() => changeSort(WINNINGS)}
        >
          Winnings {displayArrow(sort, WINNINGS)}
        </th>
        <th
          role="columnheader"
          className="table__header table__native"
          onClick={() => changeSort(COUNTRY)}
        >
          Native of {displayArrow(sort, COUNTRY)}
        </th>
      </tr>
    </thead>
  </table>
);

TableHeader.propTypes = {
  sortBy: PropTypes.string.isRequired,
  sortOrder: PropTypes.string.isRequired,
  changeSort: PropTypes.func.isRequired,
};

export default TableHeader;
