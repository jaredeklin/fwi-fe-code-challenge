import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '@react-md/button';
import { Text } from '@react-md/typography';

const TableFooter = ({ page, setPage, totalPages }) => (
  <div className="table__footer">
    <Button
      theme="primary"
      themeType="contained"
      disabled={page === 1}
      onClick={() => setPage(1)}
      disableRipple
    >
      First
    </Button>
    <Button
      theme="primary"
      themeType="contained"
      disabled={page === 1}
      onClick={() => setPage(page - 1)}
      disableRipple
    >
      Previous
    </Button>
    <Text type="headline-6" color="theme-primary">
      Page: {page}
    </Text>
    <Button
      theme="primary"
      themeType="contained"
      disabled={page === totalPages}
      onClick={() => setPage(page + 1)}
      disableRipple
    >
      Next
    </Button>
    <Button
      theme="primary"
      themeType="contained"
      disabled={page === totalPages}
      onClick={() => setPage(totalPages)}
      disableRipple
    >
      Last
    </Button>
  </div>
);

TableFooter.propTypes = {
  page: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};

export default TableFooter;
