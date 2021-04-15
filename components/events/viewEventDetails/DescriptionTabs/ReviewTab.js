import { ProductRating } from 'components/Product';

const ReviewTab = ({ reviews }) => {

  return (
    <div className="product-description-tab__review">
      <div
        style={{
          overflowY: 'auto',
          overflowX: 'hidden',
        //   height: '60vh',
          position: 'relative',
        }}
      >
        <br></br>
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
              reviews.map((review) => {
                return (
                  <>
                    <hr></hr>
                    <div className="comment-block">
                      <div className="rating-wrap">
                        <div className="rating">
                          <ProductRating ratingValue={review.rating} />
                        </div>
                      </div>
                      <p className="customer-meta">
                        {review.attendee != null && (
                          <span className="review-author">
                            {review.attendee.name}
                          </span>
                        )}
                        {review.partner != null && (
                          <span className="review-author">
                            {review.partner.name}
                          </span>
                        )}

                        <span className="comment-date">
                          {review?.event?.name}
                        </span>
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
