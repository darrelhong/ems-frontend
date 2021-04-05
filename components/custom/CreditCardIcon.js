import PropTypes from 'prop-types';
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';

export default function CreditCardIcon({ type, size = '2em' }) {
  const icons = {
    visa: <FaCcVisa size={size} className="mr-2" />,
    mastercard: <FaCcMastercard size={size} className="mr-1" />,
  };
  return icons[type] || null;
}

CreditCardIcon.propTypes = {
  type: PropTypes.string.isRequired,
  size: PropTypes.string,
};
