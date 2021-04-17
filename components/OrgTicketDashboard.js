import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import Aux from '../hoc/_Aux';
import DEMO from '../store/constant';
import Link from 'next/link';

import {
  getDailySales, getMonthlySales, getYearlySales, getTotalSales, getTotalTicketNumberSales,
  getTotalTicketNumberSalesByEvent, getTotalSalesByEvent, getTopSales, getEvents, getEvent, getDays, getDaysStartEvent,
  getTopSalesInfo, getTopNumberInfo, getCurrentTicketSales, getCurrentSalesInfo, getCurrentNumberInfo, getUpcomingEventTicket
} from '../lib/query/ticketDashboard';
//import { getUser } from '../../lib/query/getUser';
import { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
// import avatar1 from '../assets/images/avatar-1.jpg';
// import avatar2 from '../assets/images/avatar-2.jpg';
// import avatar3 from '../assets/images/avatar-3.jpg';

const OrgDashboard = () => {
  // const [user, setUser] = useState();

  const [dailySales, setDailySales] = useState();
  const [monthlySales, setMonthlySales] = useState();
  const [yearlySales, setYearlySales] = useState();
  const [totalSales, setTotalSales] = useState();
  const [totalTicketSales, setTotalTicketSales] = useState();
  const [events, setEvents] = useState([]);
  const [eventTitle, setEventTitle] = useState("Upcoming Event");
  const [eventName, setEventName] = useState("");
  const [days, setDays] = useState();
  const [daysTitle, setDaysTitle] = useState("Days Till End of Ticket Sales");
  const [ticketCapacity, setTicketCapacity] = useState(50);
  const [percentage, setPercentage] = useState(20);
  const [topEvents, setTopEvents] = useState([]);
  const [tabNum, setTabNum] = useState([]);
  const [tabSales, setTabSales] = useState([]);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [tabNumCurrent, setTabNumCurrent] = useState([]);
  const [tabSalesCurrent, setTabSalesCurrent] = useState([]);
  const [upcomingEvent, setUpcomingEvent] = useState();
  const [month, setMonth] = useState();
  const [year, setYear] = useState();
  const [day, setDay] = useState();

  // localStorage.getItem('userId')
  // const { data: topEvents} = getTopSales();

  useEffect(() => {


    getTopSalesEvent();
    getDailyTicketSales();
    getMonthlyTicketSales();
    getYearlyTicketSales();
    getTotalTicketSales();
    getTotalTicketNumberOfSales();
    getValidEvents();
    getCurrentEvents();
    getUpcoming();
    var d = new Date();
    var n = d.getMonth();
    setYear(d.getFullYear());
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setMonth(months[n]);
    var date = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
    setDay(date);

  }, []);
  const getNumberOfDays = async (eventId) => {
    await getDays(eventId).then((data) => {

      if (data < 0) {
        getPastEventDay(eventId);
      } else {
        setDays(parseInt(data));
        setDaysTitle("Days Till End of Ticket Sales");
      }
    });
  }
  const getUpcoming = async () => {
    await getUpcomingEventTicket().then((data) => {
      console.log("upcoming" + data?.eid);
      if(data?.eid != 0){
        setUpcomingEvent(data?.eid);
      setEventName(data?.name);
      getNumberOfDays(data?.eid);
      }else{
        setDaysTitle("No Upcoming Events or Past Events with Ticket Transactions")
      }
      

    })
  }
  const getCurrentEvents = async () => {
    await getCurrentTicketSales().then((data) => {
      setCurrentEvents(data);
      if (data.length > 0) {
        getCurrentInfoSales();
        getCurrentInfoNumber();
      }
    })
  }

  const getTopInfoSales = async () => {
    await getTopSalesInfo().then((data) => {
      setTabSales(data);
    })
  }
  const getTopInfoNumber = async () => {
    await getTopNumberInfo().then((data) => {
      setTabNum(data);
    })
  }
  const getCurrentInfoSales = async () => {
    await getCurrentSalesInfo().then((data) => {
      setTabSalesCurrent(data);
    })
  }
  const getCurrentInfoNumber = async () => {
    await getCurrentNumberInfo().then((data) => {
      setTabNumCurrent(data);
    })
  }
  const getTopSalesEvent = async () => {
    await getTopSales().then((data) => {
      // console.log("topevents" + data[0].name);

      setTopEvents(data);
      if (data.length > 0) {
        console.log("gettabinfo");
        getTopInfoSales();
        getTopInfoNumber();
        console.log(tabSales + "tabsales");
        console.log(tabNum + "tabnum");

      }
    });


  }
  const getDailyTicketSales = async () => {
    await getDailySales().then((data) => {
      setDailySales(JSON.stringify(data).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    });
  };

  const getMonthlyTicketSales = async () => {
    await getMonthlySales().then((data) => {
      setMonthlySales(JSON.stringify(data).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    });
  };

  const getYearlyTicketSales = async () => {
    await getYearlySales().then((data) => {
      setYearlySales(JSON.stringify(data).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    });
  };

  const getTotalTicketSales = async () => {
    await getTotalSales().then((data) => {
      setTotalSales(JSON.stringify(data).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    });
  };

  const getTotalTicketNumberOfSales = async () => {
    await getTotalTicketNumberSales().then((data) => {
      setTotalTicketSales(data);
    });
  };

  const getValidEvents = async () => {
    await getEvents(localStorage.getItem('userId')).then((data) => {
      console.log(data);
      setEvents(data);
    });
  };


  const handleChange = (e) => {
    if (e.target.value == 'all') {
      getRefreshAll();
    } else {
      getFilterEvent(e.target.value);
    }
  };

  const getRefreshAll = async (eventId) => {
    setEventTitle("Upcoming Event");
    getUpcoming();
    getTotalTicketSales();
    getTotalTicketNumberOfSales();
  }

  const getPastEventDay = async (eventId) => {

    await getDaysStartEvent(eventId).then((dataNext) => {

      if (dataNext < 0) {
        setDays("");
        setDaysTitle("Event is over.")
      } else {
        setDays(parseInt(dataNext));
        setDaysTitle("Days Till Start of Event")
      }
    });

  }

  const getFilterEvent = async (eventId) => {
    setEventTitle("Filtered Event");
    await getTotalTicketNumberSalesByEvent(eventId).then((data) => {
      setTotalTicketSales(data);
    });
    await getTotalSalesByEvent(eventId).then((data) => {
      setTotalSales(JSON.stringify(data).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    });
    await getEvent(eventId).then((data) => {
      setEventName(data?.name);
      setTicketCapacity(data?.ticketCapacity);
      setPercentage(Math.round(totalTicketSales / data?.ticketCapacity * 100));
      setUpcomingEvent(data?.eid);
    });

    await getDays(eventId).then((data) => {

      if (data < 0) {
        getPastEventDay(eventId);
      } else {
        setDays(parseInt(data));
        setDaysTitle("Days Till End of Ticket Sales");
      }
    });

  }

  const tabContentCurrent = (
    <Aux>
      <Card>
        <Card.Body
          style={{
            height: '405px',
            overflow: 'auto',
          }}
        >
          <div className="media friendlist-box align-items-center justify-content-center m-b-20">
            <div className="m-r-10 photo-table">
              {/* <a href={DEMO.BLANK_LINK}>
                    <img
                      className="rounded-circle"
                      style={{ width: '40px' }}
                      src="../assets/images/avatar-1.jpg"
                      alt="activity-user"
                    />
                  </a> */}
            </div>
            <div className="media-body">
              <h6 className="m-0 d-inline">Event Name</h6>
              <h6 className="float-right d-flex  align-items-center">
                <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                No. Of Ticket Sold / Total Sales
              </h6>
            </div>
          </div>
          {currentEvents != undefined && currentEvents != null && currentEvents.length > 0 &&
            currentEvents.map((event, key) => {
              // getTabTicketNum(event.eid);
              // getTabTicketSales(event.eid);

              return (
                <div key="key">
                  <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                      {/* <a href={DEMO.BLANK_LINK}>
                    <img
                      className="rounded-circle"
                      style={{ width: '40px' }}
                      src="../assets/images/avatar-1.jpg"
                      alt="activity-user"
                    />
                  </a> */}
                    </div>
                    <div className="media-body">
                      <span className="m-0 d-inline">{event.name}</span>
                      <span className="float-right d-flex  align-items-center">
                        <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                        {tabNumCurrent[key]} / ${tabSalesCurrent[key]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </Card.Body>
      </Card>
    </Aux>
  );
  const tabContent = (
    <Aux>
      <Card>
        <Card.Body
          style={{
            height: '405px',
            overflow: 'auto',
          }}
        >
          <div className="media friendlist-box align-items-center justify-content-center m-b-20">
            <div className="m-r-10 photo-table">
              {/* <a href={DEMO.BLANK_LINK}>
                    <img
                      className="rounded-circle"
                      style={{ width: '40px' }}
                      src="../assets/images/avatar-1.jpg"
                      alt="activity-user"
                    />
                  </a> */}
            </div>
            <div className="media-body">
              <h6 className="m-0 d-inline" >Event Name</h6>
              <h6 className="float-right d-flex  align-items-center">
                <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                No. Of Ticket Sold / Total Sales
              </h6>
            </div>
          </div>
          {topEvents != undefined && topEvents != null && topEvents.length > 0 &&
            topEvents.map((event, key) => {
              // getTabTicketNum(event.eid);
              // getTabTicketSales(event.eid);

              return (
                <div key="key">
                  <div className="media friendlist-box align-items-center justify-content-center m-b-20">
                    <div className="m-r-10 photo-table">
                      {/* <a href={DEMO.BLANK_LINK}>
                    <img
                      className="rounded-circle"
                      style={{ width: '40px' }}
                      src="../assets/images/avatar-1.jpg"
                      alt="activity-user"
                    />
                  </a> */}
                    </div>
                    <div className="media-body">
                      <span className="m-0 d-inline" >{event.name}</span>
                      <span className="float-right d-flex  align-items-center" >
                        <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                        {tabNum[key]} / ${tabSales[key]}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
        </Card.Body>
      </Card>
    </Aux>
  );

  return (
    <Aux>
      <Row>
        <Col md={6} xl={4}>
          <Card style={{ backgroundColor: "#c5bddb" }}>
            <Card.Body>
              <h6 className="mb-4">Daily Sales</h6>
              <div className="row d-flex align-items-center">
                <div className="col-6">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{' '} */}
                    ${dailySales}
                  </h3>
                </div>

                <div className="col-6 text-right">
                  <p className="m-b-0">{day}</p>
                </div>
              </div>
              {/* <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: '50%' }}
                  aria-valuenow="50"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div> */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card style={{ backgroundColor: "#c5d9e8" }}>
            <Card.Body>
              <h6 className="mb-4">Monthly Sales</h6>
              <div className="row d-flex align-items-center">
                <div className="col-6">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    {/* <i className="feather icon-arrow-down text-c-red f-30 m-r-5" />{' '} */}
                    ${monthlySales}
                  </h3>
                </div>

                <div className="col-6 text-right">
                  <p className="m-b-0">{month}</p>
                </div>
              </div>
              {/* <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme2"
                  role="progressbar"
                  style={{ width: '35%' }}
                  aria-valuenow="35"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div> */}
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4}>
          <Card style={{ backgroundColor: "#e0bcbf" }} >
            <Card.Body>
              <h6 className="mb-4">Yearly Sales</h6>
              <div className="row d-flex align-items-center">
                <div className="col-6">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{' '} */}
                    ${yearlySales}
                  </h3>
                </div>

                <div className="col-6 text-right">
                  <p className="m-b-0">{year}</p>
                </div>
              </div>
              {/* <div className="progress m-t-30" style={{ height: '7px' }}>
                <div
                  className="progress-bar progress-c-theme"
                  role="progressbar"
                  style={{ width: '70%' }}
                  aria-valuenow="70"
                  aria-valuemin="0"
                  aria-valuemax="100"
                />
              </div> */}
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={8}>

          <Tabs defaultActiveKey="today" id="uncontrolled-tab-example" >
            <Tab eventKey="today" title="Top Ticket Sales">
              {tabContent}
            </Tab>
            <Tab eventKey="week" title="Current Ticket Sales">
              {tabContentCurrent}
            </Tab>
            {/* <Tab eventKey="all" title="All">
              {tabContent}
            </Tab> */}
          </Tabs>


        </Col>



        <Col md={6} xl={4}>
          <Card className="card-event">
            <select
              className="custom-select"
              onChange={handleChange}
            >
              <option value="all">Filter By Events</option>
              {(events != null ||
                events != undefined) &&
                events.map((event) => {
                  return (
                    <option value={event.eid}>
                      {event.name}
                    </option>
                  );

                })}
            </select>
          </Card>
          {/* <br></br> */}
          <Card className="card-event">
            <Card.Body>
              <div className="row align-items-center justify-content-center">
                <div className="col">
                  <h5 className="m-0">{eventTitle}</h5>
                </div>
                <div className="col-auto">
                  {/* <label className="label theme-bg2 text-white f-14 f-w-400 float-right">
                    34%
                  </label> */}
                </div>
              </div>
              {/* <div className="mt-2"> */}
              <div>
                {/* {upcomingEvent != undefined && (<Link href={`/organiser/events/${upcomingEvent}`}> <h5 className="mt-3 mb-0 " style={{ color : "#9e9ba8"}}>{eventName} </h5> </Link>)} */}

                <h5 className="mt-3 mb-0 " style={{ color: "#9e9ba8" }}>{eventName} </h5>
                <br></br>
                <div className="row d-flex align-items-center">
                  <div className="col-3 text-center">
                    <h3 className="f-w-300" style={{ color: "#b07183" }}>{days} </h3>
                  </div>
                  <div className="col-9 text-left">
                    <span className="d-block text-uppercase">
                      {daysTitle}
                    </span>
                  </div>
                </div>
                {/* <h3 className="f-w-300" style={{ color : "#b07183"}}>{days} </h3>
                  <span className="d-block text-uppercase">
                    {daysTitle}
                  </span> */}

                {/* </h4> */}
              </div>
              <i className="fa fa-angellist text-c-purple f-50" />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="border-bottom">
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-zap f-30 text-c-green" />
                </div>
                <div className="col" >
                  {eventTitle === "Upcoming Event" && (<h3 className="f-w-300" style={{ color: "#b07183" }}>{totalTicketSales} </h3>)}
                  {eventTitle === "Filtered Event" && (<h3 className="f-w-300" style={{ color: "#b07183" }}>{totalTicketSales} / {ticketCapacity} </h3>)}

                  <span className="d-block text-uppercase">Total Tickets Sold</span>

                </div>

              </div>
              {/* <br></br> */}
              {/* <div className="col-3 text-right">
                  <p className="m-b-0">{percentage}%</p>
                </div>
              <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: percentage + '%', height: '6px' }}
                      aria-valuenow={percentage}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />  */}


            </Card.Body>
            <Card.Body>
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-map-pin f-30 text-c-blue" />
                </div>
                <div className="col">
                  <h3 className="f-w-300" style={{ color: "#b07183" }}>${totalSales}</h3>
                  <span className="d-block text-uppercase">
                    Total Sales
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* <Col md={6} xl={4}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fa fa-facebook text-primary f-36" />
                </div>
                <div className="col text-right">
                  <h3>12,281</h3>
                  <h5 className="text-c-green mb-0">
                    +7.2% <span className="text-muted">Total Likes</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>35,098
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '60%', height: '6px' }}
                      aria-valuenow="60"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>350
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme2"
                      role="progressbar"
                      style={{ width: '45%', height: '6px' }}
                      aria-valuenow="45"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
        {/* <Col md={6} xl={4}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fa fa-twitter text-c-blue f-36" />
                </div>
                <div className="col text-right">
                  <h3>11,200</h3>
                  <h5 className="text-c-purple mb-0">
                    +6.2% <span className="text-muted">Total Likes</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>34,185
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-green"
                      role="progressbar"
                      style={{ width: '40%', height: '6px' }}
                      aria-valuenow="40"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>800
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-blue"
                      role="progressbar"
                      style={{ width: '70%', height: '6px' }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col xl={4}>
          <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fa fa-google-plus text-c-red f-36" />
                </div>
                <div className="col text-right">
                  <h3>10,500</h3>
                  <h5 className="text-c-blue mb-0">
                    +5.9% <span className="text-muted">Total Likes</span>
                  </h5>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row align-items-center justify-content-center card-active">
                <div className="col-6">
                  <h6 className="text-center m-b-10">
                    <span className="text-muted m-r-5">Target:</span>25,998
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '80%', height: '6px' }}
                      aria-valuenow="80"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-6">
                  <h6 className="text-center  m-b-10">
                    <span className="text-muted m-r-5">Duration:</span>900
                  </h6>
                  <div className="progress">
                    <div
                      className="progress-bar progress-c-theme2"
                      role="progressbar"
                      style={{ width: '50%', height: '6px' }}
                      aria-valuenow="50"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={4}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Event Rating</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row align-items-center justify-content-center m-b-20">
                <div className="col-6">
                  <h2 className="f-w-300 d-flex align-items-center float-left m-0">
                    4.7 <i className="fa fa-star f-10 m-l-10 text-c-yellow" />
                  </h2>
                </div>
                <div className="col-6">
                  <h6 className="d-flex  align-items-center float-right m-0">
                    0.4{' '}
                    <i className="fa fa-caret-up text-c-green f-22 m-l-10" />
                  </h6>
                </div>
              </div>

              <div className="row">
                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />5
                  </h6>
                  <h6 className="align-items-center float-right">384</h6>
                  <div
                    className="progress m-t-30 m-b-20"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '70%' }}
                      aria-valuenow="70"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />4
                  </h6>
                  <h6 className="align-items-center float-right">145</h6>
                  <div
                    className="progress m-t-30  m-b-20"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '35%' }}
                      aria-valuenow="35"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />3
                  </h6>
                  <h6 className="align-items-center float-right">24</h6>
                  <div
                    className="progress m-t-30  m-b-20"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '25%' }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />2
                  </h6>
                  <h6 className="align-items-center float-right">1</h6>
                  <div
                    className="progress m-t-30  m-b-20"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: '10%' }}
                      aria-valuenow="10"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />1
                  </h6>
                  <h6 className="align-items-center float-right">0</h6>
                  <div
                    className="progress m-t-30  m-b-5"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: '0%' }}
                      aria-valuenow="0"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={8} className="m-b-30">
          <Tabs defaultActiveKey="today" id="uncontrolled-tab-example">
            <Tab eventKey="today" title="Today">
              {tabContent}
            </Tab>
            <Tab eventKey="week" title="This Week">
              {tabContent}
            </Tab>
            <Tab eventKey="all" title="All">
              {tabContent}
            </Tab>
          </Tabs>
        </Col> */}
      </Row>
    </Aux>
  );
};

export default OrgDashboard;
