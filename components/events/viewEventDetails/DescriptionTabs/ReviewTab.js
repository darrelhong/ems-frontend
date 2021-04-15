import { ProductRating } from 'components/Product';
import {
  Col, Row

} from 'reactstrap';
const ReviewTab = ({ reviews }) => {

  return (
    <>
    <Row>
    <Col md={1}>
      </Col>
   
    <Col md={10}>
    <div className="product-description-tab__review">
      <div
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
        //   height: '60vh',
          position: 'relative',
        }}
      >
        {/* <br></br> */}
        <ul className="list-none comment-list mt-8">
          <li>
            {/* {(reviews == null || reviews == undefined) && (
                <span>There are no reviews.</span>
              )} */}
            {reviews?.length < 1 && (
              <div
                className="product-description-tab__details"
                style={{ textAlign: 'center' }}
              >
                No reviews yet!
              </div>
            )}
            {/* {(reviews != null || reviews != undefined) && */}
            {reviews.length > 0 &&
              reviews.map((review,key) => {
                return (
                  <>
                    {key > 0 && (<hr></hr>) }
                    <div className="comment-block">
                      <div className="rating-wrap">
                        <div className="rating">
                          <ProductRating
                            ratingValue={review.rating}
                          />
                        </div>
                        <div className="description">
                          <p>{review.reviewDateTime}</p>
                        </div>
                      </div>
                      <p className="customer-meta">
                        {review.attendee != null && (
                          <h6 className="product-description">
                            {review.attendee.name}
                          </h6>
                        )}
                        {review.partner != null && (
                          <h6 className="product-description">
                            {review.partner.name}
                          </h6>
                        )}
                        <div className="rating">
                          <strong className="product-description">{review.event.name}</strong>
                        </div>
                      </p>
                      <div className="description">
                        <p>{review.reviewText}</p>
                      </div>
                    </div>
                  </>
                );
              })}
          </li>
        </ul>
      </div>
    </div>
    </Col>
    <Col md={1}>
    </Col>
    </Row>
    </>
  );
};

export default ReviewTab;

{
  /* <div
              className="product-description-tab__details"
              style={{ textAlign: 'center' }}
            >
              No reviews yet!
            </div> */
}
