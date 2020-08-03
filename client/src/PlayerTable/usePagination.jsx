import { useReducer } from 'react';

import { DEFAULT_QUERY_SIZE } from '../constants';

const paginationState = {
  total: 0,
  size: DEFAULT_QUERY_SIZE,
  from: 0,
  page: 1,
  totalPages: 1,
};

const reducer = (state, values) => {
  return { ...state, ...values };
};

export const usePagination = () => {
  const [state, dispatch] = useReducer(reducer, paginationState);
  const { size } = state;

  const setTotal = (total) =>
    dispatch({ total, totalPages: Math.ceil(total / size) });

  const setPage = (page) => dispatch({ page, from: size * (page - 1) });

  return { setTotal, setPage, ...state };
};
