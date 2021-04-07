import Link from 'next/link';

import { Modal, Button, Form, Card, Col, Container, Row } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import {
  AiOutlineNotification,
} from 'react-icons/ai';
import useUser from '../../lib/query/useUser';
import axios from 'axios';

import withProtectRoute from '../../components/ProtectRouteWrapper';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { FooterOne } from '../../components/Footer';
import AdminHeaderTop from '../../components/Header/AdminHeaderTop';
import { useQuery, useQueryClient } from 'react-query';
import api from '../../lib/ApiClient';
import {getEventOrganisers, getAttendees, getBusinessPartners} from '../../lib/query/getAllUsers';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

import { store } from 'react-notifications-component';

import CenterSpinner from 'components/custom/CenterSpinner';
import AdminWrapper from 'components/wrapper/AdminWrapper';


export default function AdminHome() {
  const { data: user, isSuccess, isLoading } = useUser(
    localStorage.getItem('userId')
  );



  // const { organisers } = useQuery('eventOrganisers', getEventOrganisers);
  // const { partners } = useQuery('businessPartners', getBusinessPartners);
  // const { attendees } = useQuery('attendees', getAttendees);



  const [broadcastModalShow, setBroadcastModalShow] = useState(false);
  const closeBroadcastModal = () => setBroadcastModalShow(false);
  const openBroadcastModal = () => setBroadcastModalShow(true);

  const [confirmBroadcastModalShow, setConfirmBroadcastModalShow] = useState(false);
  const closeConfirmBroadcastModal = () => { setConfirmBroadcastModalShow(false); setBroadcastModalShow(true); }
  const openConfirmBroadcastModal = () => { setConfirmBroadcastModalShow(true); setBroadcastModalShow(false); }
  const [message, setMessage] = useState('');
  const [checkAttendee, setCheckAttendee] = useState(false);
  const [checkPartner, setCheckPartner] = useState(false);
  const [checkOrganiser, setCheckOrganiser] = useState(false);
  const [attendees, setAttendees] = useState([]);
  const [organisers, setOrganisers] = useState([]);
  const [partners, setPartners] = useState([]);


  useEffect(() => {  
   const getAllUsers = async() =>{
     await getEventOrganisers().then((data)=>{
       setOrganisers(data);
     })
     await getAttendees().then((data)=>{
      setAttendees(data);
    })
    await getBusinessPartners().then((data)=>{
      setPartners(data);
    })
   }
   getAllUsers();
  }, []);
  const handleMessage = (e) => {
    setMessage(e.target.value);
    console.log(e.target.value + "message");

  };
  const handlePartner = (e) => {
    if (e.target.checked) {
      console.log("checked");

      setCheckPartner(true);
    } else {
      console.log("unchecked");

      setCheckPartner(false);
    }
    console.log(checkPartner + "partner");
  };

  const handleAttendee = (e) => {
    if (e.target.checked) {
      setCheckAttendee(true);      
      console.log("check attendee" + checkAttendee);

    } else {
      setCheckAttendee(false);
      console.log("check attendee" + checkAttendee);

    }
  };

  const handleOrganiser = (e) => {
    if (e.target.checked) {
      setCheckOrganiser(true);
    } else {
      setCheckOrganiser(false);
    }
  };

  const sendNoti = () => {
    var endpoint = 'https://api.ravenhub.io/company/WLU2yLZw9d/broadcasts/3Uhk4wSvIx';


    var postBody = { "notifications": [] };
    console.log("sendnoti" + checkAttendee);
    console.log("attendees length" + attendees.length);
    if (checkAttendee == true) {
      for (var i = 0; i < attendees.length; i++) {
        console.log("attendee" + attendees[i].id);
        postBody.notifications.push({
          "subscriberId": "attendee" + attendees[i].id,
          "data": {
            "message": message,
          }

        })
        console.log(postBody.notifications[i].subscriberId + "notification postbody");

      }

    }
    if (checkPartner == true) {
      for (var i = 0; i < partners.length; i++) {
        console.log("partner" + partners[i].id);
        postBody.notifications.push({
          "subscriberId": "partner" + partners[i].id,
          "data": {
            "message": message,
          }

        })
        console.log(postBody.notifications[i].subscriberId + "notification postbody");
      }
    }
    if (checkOrganiser == true) {
      for (var i = 0; i < organisers.length; i++) {
        console.log("organiser" + organisers[i].id);
        postBody.notifications.push({
          "subscriberId": "organiser" + organisers[i].id,
          "data": {
            "message": message,
          }

        })
        console.log(postBody.notifications[i].subscriberId + "notification postbody");
      }
    }
    console.log("postbody" + postBody.notifications);

    axios.post(endpoint, postBody, {
      headers: { 'Content-type': 'application/json' }
    });
    closeConfirmBroadcastModal();
    closeBroadcastModal();

    store.addNotification({
      title: "Success",
      message: "The broadcast messages have been sent out successfully.",
      type: "success",
      insert: "top",
      container: "top-left",
      dismiss: {
        duration: 5000,
        onScreen: true
      }
    });
  };



  return (
    <>

      <Head>
        <title>Admin Dasboard</title>
      </Head>

      <AdminHeaderTop />


      <BreadcrumbOne pageTitle="Admin Home">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/admin/home">
              <a>Admin Home</a>
            </Link>
          </li>
        </ol>
      </BreadcrumbOne>
      <ReactNotification />

      <Modal show={confirmBroadcastModalShow} onHide={closeConfirmBroadcastModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Confirm Broadcast Message
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to broadcast this message?
            </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeConfirmBroadcastModal}>
            No
              </Button>
          <Button
            variant="primary"
            onClick={sendNoti}
          >
            Yes
              </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={broadcastModalShow} onHide={closeBroadcastModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Broadcast Message
            </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ display: "flex", flexDirection: "column", gap: "5px" }} >
          {/* <input
              required
              className="form-control"
              name="broadcastTitle"
              id="broadcastTitle"
              placeholder="Title"
              style={{ width: "100%" }}
            /> */}
          <textarea
            required
            className="form-control"
            name="broadcastMessage"
            id="broadcastMessage"
            placeholder="Type your message here..."
            style={{ width: "100%", height: "10em" }}
            onChange={handleMessage}
          />
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", width: "50%" }}>
              <Form.Check id="chkBusinessPartner"
                onClick={handlePartner.bind(
                  this)}
              />
              <label htmlFor="chkBusinessPartner" >
                All Business Partners
                </label>
            </div>
            <div style={{ display: "flex", width: "50%" }}>
              <Form.Check id="chkAttendee" onClick={handleAttendee.bind(
                this)} />
              <label htmlFor="chkAttendee" >
                All Attendees
                </label>
            </div>
            <div style={{ display: "flex", width: "50%" }}>
              <Form.Check id="chkOrganiser" onClick={handleOrganiser.bind(
                this)} />
              <label htmlFor="chkOrganiser" >
                All Organisers
                </label>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeBroadcastModal}>
            Close
            </Button>
          <Button
            variant="primary"
            onClick={() => openConfirmBroadcastModal()}
          >
            Proceed
            </Button>
        </Modal.Footer>
      </Modal>
      <Container className="space-pt--30 space-pb--30">
        {isLoading && <CenterSpinner />}
        {isSuccess && (
          <p>
            Your are logged in as {user?.name}.
          </p>
        )}
        <Row>
          <button
            className="btn btn-fill-out btn-sm"
            style={{ float: "right" }}
            onClick={() => openBroadcastModal()}
          >
            <AiOutlineNotification />
          </button>

        </Row>
        <br></br>
        <Row>
          <Col sm={6} lg={4} className="mb-4">
            <Card>
              <Card.Header>Event organisers</Card.Header>
              <Card.Body>
                <Card.Text>View event organisers</Card.Text>
                <Link href="/admin/eventorg">
                  <button className="btn btn-fill-out btn-sm">View</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} lg={4} className="mb-4">
            <Card>
              <Card.Header>Business partners</Card.Header>
              <Card.Body>
                <Card.Text>View business partners</Card.Text>
                <Link href="/admin/bizpartners">
                  <button className="btn btn-fill-out btn-sm">View</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={6} lg={4} className="mb-4">
            <Card>
              <Card.Header>Attendee</Card.Header>
              <Card.Body>
                <Card.Text>View attendees</Card.Text>
                <Link href="/admin/attendee">
                  <button className="btn btn-fill-out btn-sm">View</button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </AdminWrapper>
  );
}
