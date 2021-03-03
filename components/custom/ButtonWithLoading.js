import PropTypes from 'prop-types';
import { Spinner } from 'react-bootstrap';

export default function ButtonWithLoading({ isLoading, children, ...props }) {
  return (
    <button {...props}>
      {children}{' '}
      {isLoading && (
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      )}
    </button>
  );
}

ButtonWithLoading.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};
