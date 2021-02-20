import Link from 'next/link';
import { LayoutOne } from '../../layouts';
import { BreadcrumbOne } from '../../components/Breadcrumb';
import { Container, Row, Col } from 'react-bootstrap';
import { ProductRating } from '../../components/Product';
import { ProductTabFour } from '../../components/ProductTab';
import useUser from '../../lib/query/useUser';
import api from '../../lib/ApiClient';
import { IoIosStar, IoIosStarOutline } from 'react-icons/io';
import { BsPencilSquare } from 'react-icons/bs';
import Tab from 'react-bootstrap/Tab';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

const EventOrgProfile = () => {
const { data: user } = useUser(localStorage.getItem('userId'));
console.log(user);



  return (
    <LayoutOne>
      {/* breadcrumb */}
      <BreadcrumbOne pageTitle="Event Organiser Profile Details">
        <ol className="breadcrumb justify-content-md-end">
          <li className="breadcrumb-item">
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          <li className="breadcrumb-item active">
            Event Organiser Profile Details
          </li>
        </ol>
      </BreadcrumbOne>

      <div className="my-account-content space-pt--r100 space-pb--r100">
        <div>
          <Container>
            <Row className="justify-content-md-center">
              <Col xs={4} md={6}>
                <Image
                  className="profile-image"
                  src={user?.profilePic}
                  thumbnail
                />
              </Col>
              <Col xs={4} md={6}>
                <h2>{user?.name}</h2>
                <div className="product-content__rating-wrap">
                  <div className="product-content__rating">
                    <ProductRating ratingValue={3} />
                    <span>({3})</span>
                  </div>
                </div>

                <br></br>
             
                  {/* <button
                    className="btn btn-fill-out"
                    name="follow"
                    value="follow"
                  >
                    Follow
                  </button> */}
            
                <div>
                  <Link href="/organiser/profile-account">
                    <button
                      className="btn btn-fill-out"
                      name="edit"
                      value="edit"
                    >
                      <BsPencilSquare />
                    </button>
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Row className="justify-content-md-center">
          <Col xs={6} md={9}>
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
                <Nav.Item>
                  <Nav.Link eventKey="reviews">
                    REVIEWS{' '}
                    {/*product.ratingCount ? `(${product.ratingCount})` : ""*/}
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  {/*show only if the role is organiser*/}
                  <Nav.Link eventKey="followers">
                    FOLLOWERS{' '}
                    {/*product.ratingCount ? `(${product.ratingCount})` : ""*/}
                  </Nav.Link>
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
                    {user?.description}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="reviews">
                  <div className="product-description-tab__review">
                    <div className="comments">
                      <br></br>
                      <h5 className="product-tab-title">
                        {/*the product name is the event name*/}
                        {5} Review For <span>{'productname'}</span>
                      </h5>
                      <ul className="list-none comment-list mt-4">
                        <li>
                          <div className="comment-img">
                            <img
                              src="/assets/images/users/user1.jpg"
                              alt="user1"
                            />
                          </div>
                          <div className="comment-block">
                            <div className="rating-wrap">
                              <div className="rating">
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStarOutline />
                              </div>
                            </div>
                            <p className="customer-meta">
                              <span className="review-author">Alea Brooks</span>
                              <span className="comment-date">
                                March 5, 2020
                              </span>
                            </p>
                            <div className="description">
                              <p>
                                Lorem Ipsumin gravida nibh vel velit auctor
                                aliquet. Aenean sollicitudin, lorem quis
                                bibendum auctor, nisi elit consequat ipsum, nec
                                sagittis sem nibh id elit. Duis sed odio sit
                                amet nibh vulputate
                              </p>
                            </div>
                          </div>
                        </li>
                        <li>
                          <div className="comment-img">
                            <img
                              src="/assets/images/users/user2.jpg"
                              alt="user2"
                            />
                          </div>
                          <div className="comment-block">
                            <div className="rating-wrap">
                              <div className="rating">
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStar />
                                <IoIosStarOutline />
                              </div>
                            </div>
                            <p className="customer-meta">
                              <span className="review-author">Grace Wong</span>
                              <span className="comment-date">
                                June 17, 2020
                              </span>
                            </p>
                            <div className="description">
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout. The point of using
                                Lorem Ipsum is that it has a more-or-less normal
                                distribution of letters
                              </p>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                    {/*
                    <div className="review-form field-form">
                      <h5>Add a review</h5>
                      <form className="row mt-3">
                        <div className="form-group col-12">
                          <span className="product-rating">
                            <IoIosStarOutline />
                            <IoIosStarOutline />
                            <IoIosStarOutline />
                            <IoIosStarOutline />
                            <IoIosStarOutline />
                          </span>
                        </div>
                        <div className="form-group col-12">
                          <textarea
                            required="required"
                            placeholder="Your review *"
                            className="form-control"
                            name="message"
                            rows={4}
                            defaultValue={''}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <input
                            required="required"
                            placeholder="Enter Name *"
                            className="form-control"
                            name="name"
                            type="text"
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <input
                            required="required"
                            placeholder="Enter Email *"
                            className="form-control"
                            name="email"
                            type="email"
                          />
                        </div>
                        <div className="form-group col-12">
                          <button
                            type="submit"
                            className="btn btn-fill-out"
                            name="submit"
                            value="Submit"
                          >
                            Submit Review
                          </button>
                        </div>
                      </form>
                    </div>
                   */}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="followers">
                  <br></br>
                  <div className="product-description-tab__additional-info">
                    {/*put the list of followers here*/}
                    {''}
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
