import { useReducer } from 'react';

import { ASC, DESC } from '../constants';

const initialState = {
  sortBy: '',
  sortOrder: '',
};

const reducer = (state, values) => {
  return { ...state, ...values };
};

export const useTableSort = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { sortBy, sortOrder } = state;

  const changeSort = (column) => {
    if (column === sortBy) {
      return dispatch({ sortOrder: sortOrder === ASC ? DESC : ASC });
    }

    dispatch({ sortBy: column, sortOrder: ASC });
  };

  return { sortBy, sortOrder, changeSort };
};
