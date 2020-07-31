import React from 'react';
import PropTypes from 'prop-types';

const TableFooter = ({ page, setPage, totalPages }) => (
  <div className="table__footer">
    <button type="button" disabled={page === 1} onClick={() => setPage(1)}>
      First
    </button>
    <button
      type="button"
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
    >
      Previous
    </button>
    <span>{page}</span>
    <button
      type="button"
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
    >
      Next
    </button>
    <button
      type="button"
      disabled={page === totalPages}
      onClick={() => setPage(totalPages)}
    >
      Last
    </button>
  </div>
);

TableFooter.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default TableFooter;
