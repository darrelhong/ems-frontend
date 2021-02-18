import Link from 'next/link';
import { LayoutOne } from '../../layouts';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductRating } from '../../components/Product';
import { ProductTabFour } from '../../components/ProductTab';

//import {
//IoIosList,
//IoIosClipboard,
//IoIosDownload,
//IoIosCash,
//IoIosCreate,
//IoIosPerson,
//} from "react-icons/io";

<<<<<<< HEAD
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
=======
>>>>>>> 752682069da4e99910164068e03e7b1ef3abaa8e
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Badge from 'react-bootstrap/Badge';

const EventOrgProfile = () => {
  return (
    <LayoutOne>
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
                <h2>Sunny Tech</h2>
                <div className="product-content__rating-wrap">
                  <div className="product-content__rating">
                    <ProductRating ratingValue={3} />
                    <span>({3})</span>
                  </div>
                </div>
                <div>
                  <p>
                    Category:
                    <span>
                      {' '}
                      <Badge variant="primary">Technology</Badge>{' '}
                    </span>
                  </p>
                </div>

                <br></br>
                <button
                  type="submit"
                  className="btn btn-fill-out"
                  name="submit"
                  value="Submit"
                >
                  Follow
                </button>
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
                  <Nav.Link eventKey="Events">PARTICIPATED EVENTS</Nav.Link>
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
                    <ProductTabFour

                    // newProducts="newProducts"
                    //bestSellerProducts="bestSellerProducts"
                    //featuredProducts="featuredProducts"
                    //saleProducts="saleProducts"
                    />
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="Description">
                  <br></br>
                  <div className="product-description-tab__additional-info">
                    Sunny Tech is Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Assumenda tempore doloribus hic. Repellat
                    aut id, quia aliquid mollitia facilis praesentium, delectus
                    fugiat ut sunt dolores fuga voluptate non culpa quis.
                  </div>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
          </Col>
        </Row>
      </div>
    </LayoutOne>
  );
};
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

export default EventOrgProfile;
