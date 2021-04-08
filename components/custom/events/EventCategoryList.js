import Link from 'next/link';
import PropTypes from 'prop-types';
import { Badge } from 'react-bootstrap';

import styles from './EventCategoryList.module.css';

export default function EventCategoryList({ categories }) {
  return (
    <div className={styles.container}>
      <h6>Event category</h6>
      {categories.map((category) => (
        <>
          <Link href={`../events?category=${encodeURIComponent(category)}`}>
            <Badge
              key={category}
              pill
              variant="info"
              className={styles.badge}
              as="a"
            >
              {category}
            </Badge>
          </Link>{' '}
        </>
      ))}
    </div>
  );
}

EventCategoryList.propTypes = {
  categories: PropTypes.array,
};
