import PropTypes from 'prop-types';
import { FaCcMastercard, FaCcVisa } from 'react-icons/fa';

export default function CreditCardIcon({ type }) {
  const icons = {
    visa: <FaCcVisa size="2em" className="mr-2" />,
    mastercard: <FaCcMastercard size="2em" className="mr-1" />,
  };
  return icons[type] || null;
}

CreditCardIcon.propTypes = {
  type: PropTypes.string.isRequired,
};
