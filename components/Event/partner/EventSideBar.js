import React from 'react';
// import { Container, Row, Col } from 'react-bootstrap';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
// import AddCircleIcon from '@material-ui/icons/AddCircle';
// import IconButton from '@material-ui/core/IconButton';
import Link from "next/link";

const EventSideBar = ({ getSortParams, filterValue }) => {
    const checkActive = (value) => {
        return value == filterValue;
    };
    // console.log("Sort value sidebar:", sortValue);

    return (
        <div className="my-account-content space-pt--r100 space-pb--r100">
            <div className="sidebar">

                <div className="widget">
                    <h5 className="widget__title">Filter By:</h5>
                    <ButtonGroup
                        color="primary"
                        aria-label=" vertical outlined primary button group"
                        orientation="vertical"
                    >
                        <Button
                            variant={`${checkActive('TRENDING') ? 'contained' : 'outlined'}`}
                            onClick={() => getSortParams('status', 'TRENDING')}
                            color="secondary"
                        >
                            Trending
                        </Button>
                        <Button
                            variant={`${checkActive('all') ? 'contained' : 'outlined'}`}
                            onClick={() => getSortParams('status', 'all')}
                            color="secondary"
                        >
                            All
                        </Button>
                        <Button
                            variant={`${checkActive('favourite') ? 'contained' : 'outlined'}`}
                            onClick={() => getSortParams('status', 'favourite')}
                            value="favourite"
                            color="secondary"
                        >
                            Favorite
                        </Button>
                        <Button
                            variant={`${checkActive('applied') ? 'contained' : 'outlined'}`}
                            onClick={() => getSortParams('status', 'applied')}
                            value="applied"
                            color="secondary"
                        >
                            Applied
                        </Button>
                        <Button
                            variant={`${checkActive('pending payment') ? 'contained' : 'outlined'}`}
                            onClick={() => getSortParams('status', 'pending payment')}
                            value="pending payment"
                            color="secondary"
                        >
                            Pending Payment
                        </Button>
                        <Button
                            variant={`${checkActive('confirmed') ? 'contained' : 'outlined'}`}
                            onClick={() => getSortParams('status', 'confirmed')}
                            value="confirmed"
                            color="secondary"
                        >
                            Confirmed
                        </Button>
                        <Button
                            variant={`${checkActive('PAST') ? 'contained' : 'outlined'}`}
                            onClick={() => getSortParams('status', 'past')}
                            value="past"
                            color="secondary"
                        >
                            Past
                        </Button>
                    </ButtonGroup>
                </div>
            </div>
        </div>
    );
};

export default EventSideBar;
