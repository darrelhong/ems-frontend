import PropTypes from 'prop-types';
import { Button, Spinner } from 'react-bootstrap';

export default function ButtonWithLoading({ isLoading, children, ...props }) {
  return (
    <Button {...props}>
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
    </Button>
  );
}

ButtonWithLoading.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.node,
};
