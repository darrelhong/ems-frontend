import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

export default function CustomPagination({
  number,
  first,
  last,
  totalPages,
  setPage,
}) {
  return (
    <>
      <Pagination>
        <Pagination.Prev
          disabled={first}
          onClick={() => {
            setPage((curr) => Math.max(curr - 1, 0));
          }}
        />
        <Pagination.Next
          disabled={last}
          onClick={() => {
            setPage((curr) => (curr < totalPages ? curr + 1 : curr));
          }}
        />
      </Pagination>
      <p className="ml-3 text-dark">
        Page {number + 1} of {totalPages}
      </p>
    </>
  );
}

CustomPagination.propTypes = {
  number: PropTypes.number.isRequired,
  first: PropTypes.bool.isRequired,
  last: PropTypes.bool.isRequired,
  totalPages: PropTypes.number.isRequired,
  setPage: PropTypes.func.isRequired,
};
