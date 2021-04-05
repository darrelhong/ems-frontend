//THIS IS FOR BP MANAGING PRODUCTS

import PropTypes from 'prop-types';
import { useState } from "react";
import { format, parseISO } from 'date-fns';
import { likeEvent, unlikeEvent } from 'lib/query/events'
import { Card } from 'react-bootstrap';
import styles from './ProductCard.module.css';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import EditIcon from '@material-ui/icons/Edit';
import { useMutation, useQueryClient } from "react-query";

export default function ProductCard({ product, user }) {

  // function inFav(event, user) {
  //   return user.favouriteEventList.some(e => e.eid === event.eid)
  // }

  // const queryClient = useQueryClient();
  // const [inFav, setinFav] = useState(user?.favouriteEventList.some(e => e.eid === event.eid))

  // const toggleLike = async (e) => {
  //   e.preventDefault()
  //   if (!inFav) {
  //     // user?.favouriteEventList.push(event)
  //     likeEvent(user.id, event.eid)
  //     // console.log(user.favouriteEventList)
  //   }
  //   else {
  //     unlikeEvent(user.id, event.eid)
  //   }
  //   setinFav(!inFav)
  //   queryClient.invalidateQueries("events")
  // }

  // const { mutateAsync } = useMutation(toggleLike)


  return (
    <Card
      className={`h-100 ${styles.productCard}`}
      style={{
        transition: 'all 0.3s ease',
        ':hover': {
          boxShadow: '2px 1px 8px -3px rgb(0 0 0 / 30%)',
        },
      }}
    >
      <Card.Img
        variant="top"
        src={product?.image || '/assets/images/img-placeholder.jpg'}
        style={{ height: 200 }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{product.name}</Card.Title>
        <Card.Text className="line-clamp">{product?.description}</Card.Text>
        <Card.Text className="text-default mt-auto">
          {/* {format(parseISO(event.eventStartDate), 'eee, dd MMM yy hh:mmbbb')} */}
          <span style={{ float: 'right' }}>
            <IconButton aria-label="fav" color="secondary"
              // onClick={(e) => { toggleLike(e) }}
              >
                <EditIcon />
                {/* <FavoriteIcon /> */}
                {/* (<FavoriteBorderIcon />) */}
            </IconButton>
          </span>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  event: PropTypes.object,
};
