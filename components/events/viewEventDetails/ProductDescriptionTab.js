import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import {
  IoIosBody,
  IoMdLocate,
} from "react-icons/io";
import { format, parseISO } from 'date-fns';

const ProductDescriptionTab = ({ event, prettySaleStartDate, prettySalesEndDate }) => {
  return (
    <div className="product-description-tab space-pt--r100 space-pb--50">
      <Tab.Container defaultActiveKey="description">
        <Nav
          variant="pills"
          className="product-description-tab__navigation space-mb--50"
        >
          <Nav.Item>
            <Nav.Link eventKey="ticketing">TICKETING</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="additionalInfo">BUSINESS PARTNERS</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="reviews">
              REVIEWS {event.ratingCount ? `(${event.ratingCount})` : ""}
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="ticketing">

            <div className="product-content__sort-info space-mb--20">
              <ul>
                {event.ticketPrice && (
                  <li>
                    <IoIosBody />Ticket Price: ${event.ticketPrice}
                  </li>

                )}
                {event.ticketCapacity && (
                  <li>
                    <IoIosBody />Tickets sold: {event.ticketTransactions.length} / {event.ticketCapacity}
                  </li>
                )}
                <li>
                  <IoMdLocate />Ticket Sale Start Date: {prettySaleStartDate}
                  {/* <IoMdLocate />{format(parseISO(event.eventStartDate), 'eee, dd MMM yy hh:mmbbb')} */}
                </li>
                <li>
                  <IoMdLocate />Ticket Sale Start Date {prettySalesEndDate}
                </li>
              </ul>
            </div>


          </Tab.Pane>
          <Tab.Pane eventKey="reviews">
            <div className="product-description-tab__details" style={{ textAlign: 'center' }}>
              No reviews yet!
            </div>
          </Tab.Pane>
          {/* <Tab.Pane eventKey="additionalInfo">
            <div className="product-description-tab__additional-info">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Capacity</td>
                    <td>5 Kg</td>
                  </tr>
                  <tr>
                    <td>Color</td>
                    <td>Black, Brown, Red,</td>
                  </tr>
                  <tr>
                    <td>Water Resistant</td>
                    <td>Yes</td>
                  </tr>
                  <tr>
                    <td>Material</td>
                    <td>Artificial Leather</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Tab.Pane>
          <Tab.Pane eventKey="reviews">
            <div className="product-description-tab__review">
              <div className="comments">
                <h5 className="product-tab-title">
                  {product.ratingCount} Review For <span>{product.name}</span>
                </h5>
                <ul className="list-none comment-list mt-4">
                  <li>
                    <div className="comment-img">
                      <img src="/assets/images/users/user1.jpg" alt="user1" />
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
                        <span className="comment-date">March 5, 2020</span>
                      </p>
                      <div className="description">
                        <p>
                          Lorem Ipsumin gravida nibh vel velit auctor aliquet.
                          Aenean sollicitudin, lorem quis bibendum auctor, nisi
                          elit consequat ipsum, nec sagittis sem nibh id elit.
                          Duis sed odio sit amet nibh vulputate
                        </p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="comment-img">
                      <img src="/assets/images/users/user2.jpg" alt="user2" />
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
                        <span className="comment-date">June 17, 2020</span>
                      </p>
                      <div className="description">
                        <p>
                          It is a long established fact that a reader will be
                          distracted by the readable content of a page when
                          looking at its layout. The point of using Lorem Ipsum
                          is that it has a more-or-less normal distribution of
                          letters
                        </p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
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
                      defaultValue={""}
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
            </div>
          </Tab.Pane>
          */}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
};

export default ProductDescriptionTab;
