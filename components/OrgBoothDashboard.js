import React from 'react';
import { Row, Col, Card, Table, Tabs, Tab } from 'react-bootstrap';
import Aux from '../hoc/_Aux';
import DEMO from '../store/constant';
import {
  getAllPendingBoothApplication,
  getBoothMonthlySales,
  getBoothYearlySales,
  getBoothDailySales,
  getBoothDashboardDailyMostPopularEventList,
  getBoothDashboardMonthlyMostPopularEventList,
  getBoothDashboardYearlyMostPopularEventList,
  getOverallEventRating,
  getEventRatingCountList,
  getTotalSalesByEvent,
  getNumberOfBusinessPartnerByEvent,
  getVaildEventForBp,
  getNumberOfAllBoothApplications,
  getNumberOfBoothSoldByEvent,
  getNumberOfBoothCapacityByEvent,
  getNumberOfBoothSoldByAllEvent,
  getNumberofAllBoothCapacity,
  getAllEventSalesEarned,
  getCategoryRankList,
} from '../lib/query/analytics';
import { getEventDetails } from '../lib/query/eventApi';
import { getEventByOrganiserId } from '../lib/query/useEvent';
//import { getUser } from '../lib/query/getUser';

import { useState, useEffect } from 'react';
import { parseISO } from 'date-fns';
import PieBasicChart from '../components/PieBasicChart';

const OrgBoothDashboard = () => {
  const [boothAppList, setBoothAppList] = useState([]);
  const [boothDaily, setBoothDaily] = useState();
  const [boothMonthly, setBoothMonthly] = useState();
  const [boothYearly, setBoothYearly] = useState();
  const [dailyMostPopular, setDailyMostPopular] = useState([]);
  const [monthlyMostPopular, setMonthlyMostPopular] = useState([]);
  const [yearlyMostPopular, setYearlyMostPopular] = useState([]);
  const [overallRating, setOverallRating] = useState();
  const [ratingCountList, setRatingCountList] = useState([]);
  const [rating1, setRating1] = useState();
  const [rating2, setRating2] = useState();
  const [rating3, setRating3] = useState();
  const [rating4, setRating4] = useState();
  const [rating5, setRating5] = useState();
  const [eventList, setEventlist] = useState([]);
  const [eventTotalSale, setEventTotalSale] = useState(0);
  const [bpNumber, setBpNumber] = useState(0);
  const [boothSold, setBoothSold] = useState(0);
  const [boothCapacity, setBoothCapacity] = useState(0);
  const [categoryRankList, setCategoryRankList] = useState(null);

  useEffect(() => {
    getEventData();
    getAllPendingBoothApplis();
    getBoothDailySalesData();
    getBoothMonthlySalesData();
    getBoothYearlySalesData();
    getDailyMostPopularEvent();
    getMonthlyMostPopularEvent();
    getYearlyMostPopularEvent();
    getOverallEventRatingData();
    getOverallEventRatingCountListData();
    getRefreshEvents();
    getCategoryRankListData();
  }, []);

  const getEventData = async () => {
    await getVaildEventForBp().then((data) => {
      setEventlist(data);
    });
  };

  const getCategoryRankListData = async () => {
    await getCategoryRankList().then((data) => {
      setCategoryRankList(data);
    });
  };

  const getAllPendingBoothApplis = async () => {
    await getAllPendingBoothApplication().then((data) => {
      setBoothAppList(data);
    });
  };

  const getBoothDailySalesData = async () => {
    await getBoothDailySales().then((data) => {
      setBoothDaily(JSON.stringify(data).replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    });
  };

  const getBoothMonthlySalesData = async () => {
    await getBoothMonthlySales().then((data) => {
      setBoothMonthly(
        JSON.stringify(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      );
    });
  };
  const getBoothYearlySalesData = async () => {
    await getBoothYearlySales().then((data) => {
      setBoothYearly(
        JSON.stringify(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      );
    });
  };

  const getDailyMostPopularEvent = async () => {
    await getBoothDashboardDailyMostPopularEventList().then((data) => {
      setDailyMostPopular(data);
    });
  };

  const getMonthlyMostPopularEvent = async () => {
    await getBoothDashboardMonthlyMostPopularEventList().then((data) => {
      setMonthlyMostPopular(data);
    });
  };
  const getYearlyMostPopularEvent = async () => {
    await getBoothDashboardYearlyMostPopularEventList().then((data) => {
      setYearlyMostPopular(data);
    });
  };
  const getOverallEventRatingData = async () => {
    await getOverallEventRating().then((data) => {
      setOverallRating(data);
    });
  };
  const getOverallEventRatingCountListData = async () => {
    await getEventRatingCountList().then((data) => {
      var totalReviewNum = 0;

      setRatingCountList(data);

      if (data[1] != undefined) {
        totalReviewNum = totalReviewNum + data[1];
      }
      if (data[2] != undefined) {
        totalReviewNum = totalReviewNum + data[2];
      }
      if (data[3] != undefined) {
        totalReviewNum = totalReviewNum + data[3];
      }
      if (data[4] != undefined) {
        totalReviewNum = totalReviewNum + data[4];
      }
      if (data[5] != undefined) {
        totalReviewNum = totalReviewNum + data[5];
      }

      var rating5_ = (data[5] / totalReviewNum) * 100;
      setRating5(rating5_);
      var rating4_ = (data[4] / totalReviewNum) * 100;
      setRating4(rating4_);
      var rating3_ = (data[3] / totalReviewNum) * 100;
      setRating3(rating3_);
      var rating2_ = (data[2] / totalReviewNum) * 100;
      setRating2(rating2_);
      var rating1_ = (data[1] / totalReviewNum) * 100;
      setRating1(rating1_);
    });
  };

  const getNumberOfAllBoothApplicationsData = async () => {
    await getNumberOfAllBoothApplications().then((data) => {
      setBpNumber(data);
    });
  };
  const getNumberOfBoothSoldByEventData = async (id) => {
    await getNumberOfBoothSoldByEvent(id).then((data) => {
      setBoothSold(data);
    });
  };

  const getNumberOfBoothCapacityByEventData = async (id) => {
    await getNumberOfBoothCapacityByEvent(id).then((data) => {
      setBoothCapacity(data);
    });
  };
  const getNumberOfBoothSoldByAllEventData = async () => {
    await getNumberOfBoothSoldByAllEvent().then((data) => {
      setBoothSold(data);
    });
  };

  const getNumberofAllBoothCapacityData = async () => {
    await getNumberofAllBoothCapacity().then((data) => {
      setBoothCapacity(data);
    });
  };

  const getAllEventSalesEarnedData = async () => {
    await getAllEventSalesEarned().then((data) => {
      setEventTotalSale(
        JSON.stringify(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      );
    });
  };

  const getEventFilter = async (id) => {
    var check;
    await getEventDetails(id).then((data) => {
      if (data != undefined && data.length > 0) {
        check = true;
      } else {
        check = false;
      }
    });
    return check;
  };

  const getSelectEvent = async (id) => {
    getEventTotalSales(id);
    getNumberOfBpByEvent(id);
    getNumberOfBoothSoldByEventData(id);
    getNumberOfBoothCapacityByEventData(id);
    getNumberOfBoothSoldByEventData(id);
  };

  const getEventTotalSales = async (id) => {
    await getTotalSalesByEvent(id).then((data) => {
      setEventTotalSale(
        JSON.stringify(data).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
      );
    });
  };

  const getNumberOfBpByEvent = async (id) => {
    await getNumberOfBusinessPartnerByEvent(id).then((data) => {
      setBpNumber(data);
    });
  };

  const getRefreshEvents = async () => {
    getNumberOfAllBoothApplicationsData();
    getNumberOfBoothSoldByAllEventData();
    getNumberofAllBoothCapacityData();
    getAllEventSalesEarnedData();
  };

  const handleEventChange = (e) => {
    if (e.target.value == 'all') {
      getRefreshEvents();
    } else {
      getSelectEvent(e.target.value);
    }
  };

  const mostPopularDailyTabContent = (
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
              <span className="m-0 d-inline">Event Name</span>
              <span className="float-right d-flex  align-items-center">
                <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                No. of Business Partner
              </span>
            </div>
          </div>
          {dailyMostPopular.length > 0 &&
            dailyMostPopular
              .sort((a, b) =>
                a.applicationCount < b.applicationCount ? 1 : -1
              )
              .map((event, key) => {
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
                        <h6 className="m-0 d-inline">{event.name}</h6>
                        <span className="float-right d-flex  align-items-center">
                          <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                          {event.applicationCount}
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

  const mostPopularMonthlyTabContent = (
    <Aux>
      <Card>
        <Card.Body
          style={{
            height: '405px',
            overflow: 'auto',
          }}
        >
          <div className="media friendlist-box align-items-center justify-content-center m-b-20 ">
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
              <span className="m-0 d-inline">Event Name</span>
              <span className="float-right d-flex  align-items-center">
                <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                No. of Business Partner
              </span>
            </div>
          </div>
          {monthlyMostPopular.length > 0 &&
            monthlyMostPopular
              .sort((a, b) =>
                a.applicationCount < b.applicationCount ? 1 : -1
              )
              .map((event, key) => {
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
                        <h6 className="m-0 d-inline">{event.name}</h6>
                        <span className="float-right d-flex  align-items-center">
                          <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                          {event.applicationCount}
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

  const mostPopularYearlyTabContent = (
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
              <span className="m-0 d-inline">Event Name</span>
              <span className="float-right d-flex  align-items-center">
                <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                No. of Business Partner
              </span>
            </div>
          </div>
          {yearlyMostPopular.length > 0 &&
            yearlyMostPopular
              .sort((a, b) =>
                a.applicationCount < b.applicationCount ? 1 : -1
              )
              .map((event, key) => {
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
                        <h6 className="m-0 d-inline">{event.name}</h6>
                        <span className="float-right d-flex  align-items-center">
                          <i className="fa fa-caret-up f-22 m-r-10 text-c-green" />
                          {event.applicationCount}
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
          <Card>
            <Card.Body>
              <h6 className="mb-4">Daily Sales</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{' '} */}
                    ${boothDaily}
                  </h3>
                </div>

                {/* <div className="col-3 text-right">
                  <p className="m-b-0">50%</p>
                </div> */}
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
          <Card>
            <Card.Body>
              <h6 className="mb-4">Monthly Sales</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    {/* <i className="feather icon-arrow-down text-c-red f-30 m-r-5" />{' '} */}
                    ${boothMonthly}
                  </h3>
                </div>

                {/* <div className="col-3 text-right">
                  <p className="m-b-0">36%</p>
                </div> */}
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
          <Card>
            <Card.Body>
              <h6 className="mb-4">Yearly Sales</h6>
              <div className="row d-flex align-items-center">
                <div className="col-9">
                  <h3 className="f-w-300 d-flex align-items-center m-b-0">
                    {/* <i className="feather icon-arrow-up text-c-green f-30 m-r-5" />{' '} */}
                    ${boothYearly}
                  </h3>
                </div>

                {/* <div className="col-3 text-right">
                  <p className="m-b-0">70%</p>
                </div> */}
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
          <Card className="Recent-Users">
            <Card.Header>
              <Card.Title as="h5">Pending Booth Application</Card.Title>
            </Card.Header>
            <Card.Body className="px-0 py-2">
              <Table responsive hover>
                <tbody>
                  <div
                    style={{
                      height: '353px',
                      overflow: 'auto',
                    }}
                  >
                    {boothAppList.length > 0 &&
                      boothAppList.map((boothApplication, key) => {
                        return (
                          <div key="key">
                            <tr className="unread">
                              <td>
                                {boothApplication.businessPartner.profilePic ==
                                  null && (
                                  <img
                                    className="rounded-circle"
                                    style={{ width: '40px' }}
                                    src="
                                    https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png
                                    "
                                    // src="../assets/images/avatar-3.jpg"
                                    alt="profile-pic"
                                  />
                                )}
                                {boothApplication.businessPartner.profilePic !=
                                  null && (
                                  <img
                                    className="rounded-circle"
                                    style={{ width: '40px' }}
                                    src={
                                      boothApplication.businessPartner
                                        .profilePic
                                    }
                                    // src="../assets/images/avatar-3.jpg"
                                    alt="profile-pic"
                                  />
                                )}
                              </td>

                              <td>
                                <h6 className="mb-1">
                                  {boothApplication.businessPartner.name}
                                </h6>
                                <p className="m-0">
                                  {boothApplication.event.name}
                                </p>
                              </td>
                              <td>
                                <h6 className="text-muted">
                                  <i className="fa fa-circle text-c-green f-10 m-r-15" />
                                  <span>
                                    {new Date(
                                      boothApplication.applicationDate
                                    ).toLocaleDateString()}
                                  </span>
                                  {/* {boothApplication.applicationDate} */}
                                </h6>
                              </td>
                              <td>
                                <a
                                  href={DEMO.BLANK_LINK}
                                  className="label theme-bg3 text-white f-12"
                                >
                                  VIEW
                                </a>
                                {/* <a
                                  href={DEMO.BLANK_LINK}
                                  className="label theme-bg text-white f-12"
                                >
                                  Approve
                                </a>
                                <a
                                  href={DEMO.BLANK_LINK}
                                  className="label theme-bg2 text-white f-12"
                                >
                                  Reject
                                </a> */}
                              </td>
                            </tr>
                          </div>
                        );
                      })}
                    {boothAppList.length == 0 && (
                      <div>
                        <span className="ml-4">No Pending Application</span>
                      </div>
                    )}
                  </div>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} xl={4}>
          <Card className="card-event">
            <Card.Body>
              <Row className="mb-4">
                <Col xs={12} sm={12}>
                  <select
                    className="custom-select"
                    onChange={handleEventChange}
                  >
                    <option value="all">All Events</option>
                    {(eventList != null || eventList != undefined) &&
                      eventList.map((event) => {
                        if (getEventFilter(event.eid)) {
                          return (
                            <option value={event.eid}>{event.name}</option>
                          );
                        }
                      })}
                  </select>
                </Col>
              </Row>
              <div className="row align-items-center justify-content-center">
                <div className="col">
                  <h5 className="m-0">Event Details</h5>
                </div>
                <div className="col-auto">
                  {/* <label className="label theme-bg2 text-white f-14 f-w-400 float-right">
                    34%
                  </label> */}
                </div>
              </div>
              <h2 className="mt-2 f-w-300">
                {/* <h6 className="text-muted mt-3 mb-0">IT Fair 2020 </h6> */}
                {bpNumber}
                <sub className="text-muted f-14">Paid Booth Applications</sub>
              </h2>

              <i className="fa fa-angellist text-c-purple f-50" />
            </Card.Body>
          </Card>
          <Card>
            <Card.Body className="border-bottom">
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-zap f-30 text-c-green" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">
                    {boothSold}/{boothCapacity}
                  </h3>
                  <span className="d-block text-uppercase">
                    Total Booths Sold
                  </span>
                </div>
              </div>
            </Card.Body>
            <Card.Body>
              <div className="row d-flex align-items-center">
                <div className="col-auto">
                  <i className="feather icon-map-pin f-30 text-c-blue" />
                </div>
                <div className="col">
                  <h3 className="f-w-300">${eventTotalSale}</h3>
                  <span className="d-block text-uppercase">Total Sales</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={6}>
          <Card className="card-social">
            <Card.Header>
              <Card.Title as="h5">Event Category Popularity</Card.Title>
            </Card.Header>
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center m-b-20">
                {/* <h5></h5> */}
                {/* <div className="col text-right"> */}
                {categoryRankList != null && (
                  <PieBasicChart
                    categoryRankList={categoryRankList}
                  ></PieBasicChart>
                )}
                {/* <h3>12,281</h3>
                  <h5 className="text-c-green mb-0">
                    +7.2% <span className="text-muted">Total Likes</span>
                  </h5> */}
                {/* </div> */}
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} xl={6}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Event Rating</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row align-items-center justify-content-center m-b-20">
                <div className="col-6">
                  <h5 className="f-w-300 d-flex align-items-center float-left m-0">
                    Overall Rating{' '}
                    <i className="fa fa-star f-10 m-l-10 text-c-yellow" />
                  </h5>
                </div>
                <div className="col-6">
                  <h3 className="d-flex  align-items-center float-right m-0">
                    {overallRating}
                    <i className="fa fa-caret-up text-c-green f-22 m-l-10" />
                  </h3>
                </div>
              </div>
              <div className="row" key="key">
                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />5
                  </h6>
                  <h6 className="align-items-center float-right">
                    {ratingCountList[5] != undefined && ratingCountList[5]}
                    {ratingCountList[5] == undefined && 0}
                  </h6>
                  <div
                    className="progress m-t-30 m-b-20"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: rating5 + '%' }}
                      aria-valuenow={rating5}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />4
                  </h6>
                  <h6 className="align-items-center float-right">
                    {ratingCountList[4] != undefined && ratingCountList[4]}
                    {ratingCountList[4] == undefined && 0}
                  </h6>
                  <div
                    className="progress m-t-30  m-b-20"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: rating4 + '%' }}
                      aria-valuenow={rating4}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />3
                  </h6>
                  <h6 className="align-items-center float-right">
                    {ratingCountList[3] != undefined && ratingCountList[3]}
                    {ratingCountList[3] == undefined && 0}
                  </h6>
                  <div
                    className="progress m-t-30  m-b-20"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: rating3 + '%' }}
                      aria-valuenow={rating3}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />2
                  </h6>
                  <h6 className="align-items-center float-right">
                    {ratingCountList[2] != undefined && ratingCountList[2]}
                    {ratingCountList[2] == undefined && 0}
                  </h6>
                  <div
                    className="progress m-t-30  m-b-20"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: rating2 + '%' }}
                      aria-valuenow={rating2}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />1
                  </h6>
                  <h6 className="align-items-center float-right">
                    {ratingCountList[1] != undefined && ratingCountList[1]}
                    {ratingCountList[1] == undefined && 0}
                  </h6>
                  <div
                    className="progress m-t-30  m-b-5"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar  progress-c-theme"
                      role="progressbar"
                      style={{ width: rating1 + '%' }}
                      aria-valuenow={rating1}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        {/* <Card.Body> */}
        {/* <div className="row align-items-center justify-content-center card-active">
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
              </div> */}
        {/* </Card.Body> */}
        {/* </Card>
        </Col> */}
        <Col md={12} xl={12}>
          {/* <Col md={6} xl={8} className="m-b-30"> */}
          <Tabs defaultActiveKey="daily" id="uncontrolled-tab-example">
            <Tab eventKey="daily" title="Daily Popular Event">
              {mostPopularDailyTabContent}
            </Tab>
            <Tab eventKey="monthly" title="Monthly Popular Event">
              {mostPopularMonthlyTabContent}
            </Tab>
            <Tab eventKey="yearly" title="Yearly Popular Event">
              {mostPopularYearlyTabContent}
            </Tab>
          </Tabs>
          {/* </Col> */}
          {/* <Card className="card-social">
            <Card.Body className="border-bottom">
              <div className="row align-items-center justify-content-center">
                <div className="col-auto">
                  <i className="fa fa-twitter text-c-blue f-36" />
                </div> */}
          {/* <div className="col text-right">
                  <h3>11,200</h3>
                  <h5 className="text-c-purple mb-0">
                    +6.2% <span className="text-muted">Total Likes</span>
                  </h5>
                </div> */}
          {/* </div>
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
          </Card> */}
        </Col>

        {/* <Col xl={4}></Col> */}
        {/* <Col md={6} xl={4}>
          <Card>
            <Card.Header>
              <Card.Title as="h5">Event Rating</Card.Title>
            </Card.Header>
            <Card.Body>
              <div className="row align-items-center justify-content-center m-b-20">
                <div className="col-6">
                  <h5 className="f-w-300 d-flex align-items-center float-left m-0">
                    Overall Rating{' '}
                    <i className="fa fa-star f-10 m-l-10 text-c-yellow" />
                  </h5>
                </div>
                <div className="col-6">
                  <h3 className="d-flex  align-items-center float-right m-0">
                    {overallRating}
                    <i className="fa fa-caret-up text-c-green f-22 m-l-10" />
                  </h3>
                </div>
              </div>
              <div className="row" key="key">
                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />5
                  </h6>
                  <h6 className="align-items-center float-right">
                    {ratingCountList[5] != undefined && ratingCountList[5]}
                    {ratingCountList[5] == undefined && 0}
                  </h6>
                  <div
                    className="progress m-t-30 m-b-20"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: rating5 + '%' }}
                      aria-valuenow={rating5}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />4
                  </h6>
                  <h6 className="align-items-center float-right">
                    {ratingCountList[4] != undefined && ratingCountList[4]}
                    {ratingCountList[4] == undefined && 0}
                  </h6>
                  <div
                    className="progress m-t-30  m-b-20"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: rating4 + '%' }}
                      aria-valuenow={rating4}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />3
                  </h6>
                  <h6 className="align-items-center float-right">
                    {ratingCountList[3] != undefined && ratingCountList[3]}
                    {ratingCountList[3] == undefined && 0}
                  </h6>
                  <div
                    className="progress m-t-30  m-b-20"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: rating3 + '%' }}
                      aria-valuenow={rating3}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>

                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />2
                  </h6>
                  <h6 className="align-items-center float-right">
                    {ratingCountList[2] != undefined && ratingCountList[2]}
                    {ratingCountList[2] == undefined && 0}
                  </h6>
                  <div
                    className="progress m-t-30  m-b-20"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar progress-c-theme"
                      role="progressbar"
                      style={{ width: rating2 + '%' }}
                      aria-valuenow={rating2}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
                <div className="col-xl-12">
                  <h6 className="align-items-center float-left">
                    <i className="fa fa-star f-10 m-r-10 text-c-yellow" />1
                  </h6>
                  <h6 className="align-items-center float-right">
                    {ratingCountList[1] != undefined && ratingCountList[1]}
                    {ratingCountList[1] == undefined && 0}
                  </h6>
                  <div
                    className="progress m-t-30  m-b-5"
                    style={{ height: '6px' }}
                  >
                    <div
                      className="progress-bar  progress-c-theme"
                      role="progressbar"
                      style={{ width: rating1 + '%' }}
                      aria-valuenow={rating1}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    />
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col> */}
        {/* <Col md={6} xl={8} className="m-b-30">
          <Tabs defaultActiveKey="daily" id="uncontrolled-tab-example">
            <Tab eventKey="daily" title="Daily Popular Event">
              {mostPopularDailyTabContent}
            </Tab>
            <Tab eventKey="monthly" title="Monthly Popular Event">
              {mostPopularMonthlyTabContent}
            </Tab>
            <Tab eventKey="yearly" title="Yearly Popular Event">
              {mostPopularYearlyTabContent}
            </Tab>
          </Tabs>
        </Col> */}
      </Row>
    </Aux>
  );
};

export default OrgBoothDashboard;
