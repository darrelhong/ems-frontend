import PropTypes from 'prop-types';

const user = PropTypes.shape({
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
});

export default user;
