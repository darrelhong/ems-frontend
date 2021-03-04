import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import Link from "next/link";

const EventSideBar = ({ getSortParams, sortValue }) => {
  const checkActive = (value) => {
    return value == sortValue;
  };
  // console.log("Sort value sidebar:", sortValue);

  return (
    <div className="my-account-content space-pt--r100 space-pb--r100">
      <div className="sidebar">

        <div className="widget">
          <h6 className="product-title">
            <Link href="events/create">
              <a>Create Event</a>
            </Link>
          </h6>
        </div>

        <div className="widget">
          <h5 className="widget__title">Status</h5>
          <ButtonGroup
            color="primary"
            aria-label=" vertical outlined primary button group"
            orientation="vertical"
          >
            <Button
              variant={`${checkActive('CREATED') ? 'contained' : 'outlined'}`}
              onClick={() => getSortParams('status', 'CREATED')}
              color="secondary"
            >
              All
            </Button>
            <Button
              variant={`${checkActive('past') ? 'contained' : 'outlined'}`}
              onClick={() => getSortParams('status', 'past')}
              value="past"
              color="secondary"
            >
              Past
            </Button>
            <Button
              variant={`${checkActive('upcoming') ? 'contained' : 'outlined'}`}
              onClick={() => getSortParams('status', 'upcoming')}
              value="upcoming"
              color="secondary"
            >
              Upcoming
            </Button>
            <Button
              variant={`${checkActive('DRAFT') ? 'contained' : 'outlined'}`}
              onClick={() => getSortParams('status', 'DRAFT')}
              value="draft"
              color="secondary"
            >
              Draft
            </Button>
            <Button
              variant={`${checkActive('CANCELLED') ? 'contained' : 'outlined'}`}
              onClick={() => getSortParams('status', 'CANCELLED')}
              value="cancelled"
              color="secondary"
            >
              Cancelled
            </Button>
          </ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default EventSideBar;
