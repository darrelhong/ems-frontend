import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';

const EventBoothCard = ({ sellerProfile }) => {
  return (
    <Col lg={4} sm={4} className="mb-3">
      <div className="product-list">
        <div className="product-list__image">
          <a>
            <img
              width={280}
              height={186}
              style={{ objectFit: 'cover' }}
              src={sellerProfile.event.images[0]}
              alt="Event Picture"
            />
          </a>
        </div>

        <div className="product-list__info">
          <Link href={`/partner/seller-profile/${sellerProfile.id}`}>
            <h6 className="product-title">
              <a>{sellerProfile.event.name}</a>
            </h6>
          </Link>

          <div className="product-description">
            {/* Seller Profile: {sellerProfile.description} */}
            Booth Profile Description: {sellerProfile.description}
          </div>
        </div>
      </div>
    </Col>
  );
};

export default EventBoothCard;
