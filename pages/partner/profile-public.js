import Link from 'next/link';
import { LayoutOne } from '../../layouts';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductRating } from '../../components/Product';
import  EventsProfile  from '../../components/ProductTab/EventsProfile';
import PartnerWrapper from '../../components/wrapper/PartnerWrapper';
import useUser from '../../lib/query/useUser';
import { useState, useEffect } from 'react';
//import {
//IoIosList,
//IoIosClipboard,
//IoIosDownload,
//IoIosCash,
//IoIosCreate,
//IoIosPerson,
//} from "react-icons/io";

import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import getEvents from '../../lib/query/getEvents';
const PartnerProfile = ({
  router: { query },
}) => {
 
  const localuser = JSON.parse(query.localuser);
  // if user = BP , and view his own profile, there should be an edit button and should have no follow button
  const [publicView, setPublicView] = useState();
  const {data : partner} = useUser(localuser.id);
  const { data: user } = useUser(localStorage.getItem('userId'));


   useEffect(() => { 
    
    if(user?.id !== localuser.id){
    setPublicView(true);
  }else{
    setPublicView(false);
  }
   
   })

   const { data: events } = getEvents(
    localStorage.getItem('userId')
  );


 
 
  return ( 
    

    <PartnerWrapper>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle="Business Partner Profile Details">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">
            Business Partner Profile Details
          </li>
        </ol>
      </BreadcrumbOne>

      <div className="my-account-content space-pt--r100 space-pb--r100">
        <div>
          <Container>
            <Row>
              <Col xs={6} md={4}>
                <Image
                  src="https://www.careerup.com/wp-content/uploads/2016/01/internship-opportunity-advertising-saga-events-1.png"
                  roundedCircle
                />
              </Col>
              <Col xs={6} md={4}>
                <h2>{partner?.name}</h2>
                {/* <div className="product-content__rating-wrap">
                  <div className="product-content__rating">
                    <ProductRating ratingValue={3} />
                    <span>({3})</span>
                  </div>
                </div> */}
                <div>
                  <p>
                    Category:
                    <span>
                      {' '}
                      <Badge variant="primary">{partner?.businessCategory}</Badge>{' '}
                    </span>
                  </p>
                </div>

                <br></br>
                {publicView && (<button
                  type="submit"
                  className="btn btn-fill-out"
                  name="submit"
                  value="Submit"
                >
                  Follow
                </button>)}
                
              </Col>
            </Row>
          </Container>
        </div>
        <Row className="justify-content-md-center">
          <Col md={{ span: 8 }}>
            <Tab.Container defaultActiveKey="Events">
              <Nav
                variant="pills"
                className="product-description-tab__navigation"
              >
                <Nav.Item>
                  <Nav.Link eventKey="Events">EVENTS</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="Description">DESCRIPTION</Nav.Link>
                </Nav.Item>
              </Nav>

              <Tab.Content>
                <Tab.Pane eventKey="Events">
                  <div className="product-description-tab__details">
                    {/* category slider 
                      <CategorySliderTwo
                        categorySliderData={categorySliderData}
                      />
                      */}
                    {/* tab product -> refers to eletronic-two*/}
                    <EventsProfile

                      current={events}
                  //   upcoming="bestSellerProducts"
                  //  past="featuredProducts"
                   
                    /> 
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="Description">
                  <br></br>
                  <div className="product-description-tab__additional-info">
                    {partner?.description}
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </div>
     </PartnerWrapper>
  );
}
/*
const mapStateToProps = (state) => {
  const products = state.productData;
  return {
    trendingProducts: getProducts(products, "electronics", "popular", 10),
    featuredProducts: getProducts(products, "electronics", "featured", 8),
    newProducts: getProducts(products, "electronics", "new", 8),
    bestSellerProducts: getProducts(products, "electronics", "popular", 8),
    saleProducts: getProducts(products, "electronics", "sale", 8),
  };
 
};
 */

// PartnerProfile.propTypes = {
//   id: PropTypes.long,
// };
export default withRouter(PartnerProfile);