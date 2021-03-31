import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

import styles from './EventCategoryList.module.css';

export default function EventCategoryList({ categories }) {
  return (
    <div className={styles.container}>
      {categories.map((category) => (
        <>
          <Badge
            key={category}
            pill
            variant="info"
            className={styles.badge}
            as="a"
          >
            {category}
          </Badge>{' '}
        </>
      ))}
    </div>
  );
}

EventCategoryList.propTypes = {
  categories: PropTypes.array,
};
