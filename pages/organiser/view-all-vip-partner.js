import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { Container, Row, Col } from 'react-bootstrap';
import OrganiserWrapper from '../../components/wrapper/OrganiserWrapper';
import {
  getAllVipsByOrganiser,
  deleteSelectedVip,
} from '../../lib/query/useVip';
import VipPartnerHeader from '../../components/VipPartnerHeader';
import useUser from '../../lib/query/useUser';
import VipPartnerView from '../../components/VipPartnerView';
import Paginator from 'react-hooks-paginator';
import { parseISO } from 'date-fns';

function ViewAllVipPartners() {
  const [vips, setVips] = useState([]);
  //test
  const { data: user } = useUser(localStorage.getItem('userId'));
  // console.log('user', user);
  const [sortType, setSortType] = useState('');
  const [sortValue, setSortValue] = useState('CREATED');
  const [filterSortType, setFilterSortType] = useState('');
  const [filterSortValue, setFilterSortValue] = useState('');
  const [sortedEvents, setSortedEvents] = useState('');
  const [shopTopFilterStatus, setShopTopFilterStatus] = useState(false);
  const [layout, setLayout] = useState('list');
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const pageLimit = 12;
  // console.log("Sort value index:", sortValue);
  // console.log("DAta: ", events);
  // console.log("sortedEvents: ", sortedEvents);
  // console.log("current Data: ", currentData);

  useEffect(() => {
    if (user != null) {
      const getVips = async () => {
        const data = await getAllVipsByOrganiser();
        setVips(data);
      };
      getVips();
    }
  }, [user]);

  useEffect(() => {
    if (vips != null) {
      let tempSortedEvents = vips;
      tempSortedEvents = applySearch(tempSortedEvents, searchTerm);
      console.log('vips: ', tempSortedEvents);
      const tempCurrentData = tempSortedEvents.slice(
        offset,
        offset + pageLimit
      );
      setSortedEvents(tempSortedEvents);
      setCurrentData(tempCurrentData);
    }
  }, [offset, vips, sortValue, searchTerm]);

  const applySearch = (listVips, searchTerm) => {
    console.log('searchTerm');
    console.log(searchTerm);
    return listVips.filter(
      (e) => e.name.toLowerCase().includes(searchTerm.toLowerCase())
      //|| e.descriptions.toLowerCase().includes(searchTerm)
    );
  };
  const getVips = async () => {
    const data = await getAllVipsByOrganiser();
    setVips(data);
  };

  const handleDeleteVip = async (vip) => {
    console.log('handle delete :' + vip);
    await deleteSelectedVip(vip);
    getVips();
  };

  const getLayout = (layout) => {
    setLayout(layout);
  };

  const getSortParams = (sortType, sortValue) => {
    setSortType(sortType);
    setSortValue(sortValue);
  };

  const getFilterSortParams = (sortType, sortValue) => {
    setFilterSortType(sortType);
    setFilterSortValue(sortValue);
  };

  // const filterEvents = (listVips, sortValue) => {
  // if (['DRAFT', 'CREATED', 'CANCELLED'].includes(sortValue)) {
  //   return vips.filter((e) => e.eventStatus == sortValue);
  // } else {
  //   if (sortValue == 'past') {
  //     return vips.filter((e) => parseISO(e.eventEndDate) < new Date());
  //   } else
  //     return vips.filter((e) => parseISO(e.eventEndDate) > new Date());
  // }
  // };

  return (
    <div>
      <OrganiserWrapper title="VIP Business Partners">
        <BreadcrumbOne pageTitle="VIP Business Partners">
          <ol className="breadcrumb justify-content-md-end">
            <li className="breadcrumb-item">
              <Link href="/organiser/home">
                <a>Home</a>
              </Link>
            </li>
            <li className="breadcrumb-item">
              <Link href="/organiser/events">
                <a>VIP Business Partners</a>
              </Link>
            </li>
          </ol>
        </BreadcrumbOne>

        <div className="shop-content space-pt--r100 space-pb--r100" style={{ zIndex: -1,
    position:"relative" }}>
          <Container>
            <Row>
              <Col lg={12}>
                <VipPartnerHeader
                  getLayout={getLayout}
                  getFilterSortParams={getFilterSortParams}
                  shopTopFilterStatus={shopTopFilterStatus}
                  setShopTopFilterStatus={setShopTopFilterStatus}
                  layout={layout}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />

                <VipPartnerView
                  handleDeleteVip={handleDeleteVip}
                  vips={currentData}
                  layout={layout}
                />
                <div className="pagination pagination-style pagination-style--two justify -content-center">
                  <Paginator
                    totalRecords={sortedEvents.length}
                    pageLimit={pageLimit}
                    pageNeighbours={2}
                    setOffset={setOffset}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pageContainerClass="mb-0 mt-0"
                    pagePrevText="«"
                    pageNextText="»"
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </OrganiserWrapper>
    </div>
  );
}

export default ViewAllVipPartners;
