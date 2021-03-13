import React, { useState, useRef, useEffect } from 'react';
import { Fragment } from 'react';
import Link from 'next/link';
import { Row, Col, ProgressBar, Modal, Button } from 'react-bootstrap';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { vipToggle } from '../lib/functions/eventOrganiser/eventFunctions';
import Badge from 'react-bootstrap/Badge';

// change delete cancel event to delete vip
const VipPartnerCard = ({ vip, deleteVip, createToast }) => {
  const [currVip, setCurrVip] = useState(vip);
  const [vipToBeDeleted, setVipToBeDeleted] = useState(null);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const closeModal = () => setDeleteModalShow(false);
  const openModal = () => setDeleteModalShow(true);
  const [deleteMode, setDeleteMode] = useState(true);
  const [undoMode, setUndoMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [undoClick, setUndoClick] = useState(false);

  useEffect(() => {
    if (timeLeft === 0 && undoClick == false) {
      console.log('TIME LEFT IS 0');
      setTimeLeft(null);
      confirmDelete();
      setDeleteMode(false);
      setUndoMode(false);
    }

    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  const markDelete = async (currVip) => {
    setTimeLeft(3);
    setVipToBeDeleted(currVip);
    setUndoMode(true);
    setDeleteMode(false);
  };

  const undoDelete = async (currVip) => {
    setUndoMode(false);
    setDeleteMode(true);
    setUndoClick(true);
  };
  const confirmDelete = async () => {
    await deleteVip(vipToBeDeleted.id);
  };

  return (
    <Fragment>
      <Col lg={4} sm={6} className="space-mb--50">
        <div className="product-list">
          <div className="product-list__image">
            {/* <Link
              href={{
                pathname: '/partner/partner-profile',
                query: { localuser: JSON.stringify(currVip.id) },
              }}
            > */}
            <a>
              {currVip.profilePic != null && (
                <img src={currVip.profilePic} alt="event_image" />
              )}
              {currVip.profilePic == null && (
                <img
                  src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                  alt="event_image"
                />
              )}
            </a>
            {/* </Link> */}
          </div>

          <div className="product-list__info">
            <Col>
              <Row md={12}>
                <Col md={8}>
                  <h6 className="product-title">
                    <Link
                      href={{
                        pathname: '/partner/partner-profile',
                        query: { localuser: JSON.stringify(currVip.id) },
                      }}
                    >
                      <a>{currVip.name}</a>
                    </Link>
                  </h6>
                  <div className="d-flex justify-content-between">
                    <div className="product-price">
                      <Badge variant="primary">
                        {currVip.businessCategory}
                      </Badge>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between">
                    {/* <div className="product-price"> */}
                    {currVip.description}
                    {/* </div> */}
                  </div>
                </Col>
                <Col md={4}>
                  <div className="product-list__actions customlistAction">
                    {/* <li>
                  <HidePopover event={currEvent} createToast={createToast} />
                </li> */}
                    {/* <li>
                  <IconButton
                    aria-label="vip"
                    color="secondary"
                    onClick={() => handleVipToggle(currVip)}
                  >
                    {currVip.vip ? <StarIcon /> : <StarBorderIcon />}
                  </IconButton>
                </li> */}
                    <span style={{ float: 'right' }}>
                      {deleteMode == true && undoMode == false && (
                        <button
                          className="btn btn-fill-out btn-sm"
                          name="delete"
                          size="sm"
                          onClick={() => markDelete(currVip)}
                        >
                          {' '}
                          Delete{' '}
                        </button>
                      )}

                      {undoMode == true && (
                        <button
                          className="btn btn-fill-out btn-sm"
                          name="delete"
                          size="sm"
                          onClick={() => undoDelete(currVip)}
                        >
                          {' '}
                          Undo({timeLeft}){' '}
                        </button>
                      )}
                    </span>
                  </div>
                </Col>
              </Row>
            </Col>
          </div>
        </div>
      </Col>
    </Fragment>
  );
};

export default VipPartnerCard;
