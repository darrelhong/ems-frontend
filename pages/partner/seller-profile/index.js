import useUser from '../../../lib/query/useUser';
import Link from 'next/link';
import { BreadcrumbOne } from 'components/Breadcrumb';
import PartnerWrapper from 'components/wrapper/PartnerWrapper';
import { useState, useEffect } from 'react';
import { getAllSellerProfilesByPartner } from '../../../lib/query/boothApi';
import GeneralSideBar from 'components/events/GeneralSideBar';
import { Col, Container, Row } from 'react-bootstrap';
import EventBoothCard from 'components/events/partner/EventBoothCard';
import { parseISO } from 'date-fns';

export default function AllSellerProfiles() {
  const { data: user } = useUser(localStorage.getItem('userId'));
  const [sellerProfiles, setSellerProfiles] = useState([]);
  const [filterValue, setFilterValue] = useState('upcoming');

  const filterStatus = ['upcoming', 'completed'];

  useEffect(() => {
    if (user) {
      const getSPs = async () => {
        const data = await getAllSellerProfilesByPartner(user.id);
        if (filterValue == 'upcoming') {
          setSellerProfiles(
            data.filter((d) => parseISO(d.event.eventStartDate) > new Date())
          );
        } else {
          setSellerProfiles(
            data.filter((d) => parseISO(d.event.eventStartDate) < new Date())
          );
        }
      };
      getSPs();
    }
  }, [user, filterValue]);

  // console.log(sellerProfiles)

  return (
    <PartnerWrapper title="Seller Profiles">
      <BreadcrumbOne pageTitle="View All Seller Profiles">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/partner/home">
              <a>Partner Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">Seller Profiles</li>
        </ol>
      </BreadcrumbOne>
      <Container className="my-4">
        <Row>
          <Col md="auto mb-3">
            <GeneralSideBar
              filterValue={filterValue}
              setFilterValue={setFilterValue}
              statuses={filterStatus}
            />
          </Col>

          <Col className="shop-products">
            <Row className="list">
              {sellerProfiles?.length != 0 ? (
                sellerProfiles.map((prof) => {
                  return <EventBoothCard sellerProfile={prof} key={prof.id} />;
                })
              ) : (
                <div
                  className="product-description-tab__details"
                  style={{ textAlign: 'center' }}
                >
                  <img
                    src="https://cdn.dribbble.com/users/888330/screenshots/2653750/empty_data_set.png"
                    alt="No Events Found"
                  />
                </div>
              )}
            </Row>
          </Col>
        </Row>
      </Container>
    </PartnerWrapper>
  );
}
