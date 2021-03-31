import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';

const EventBoothCard = ({ sellerProfile }) => {
    return (
        <Col lg={4} sm={4} className="space-mb-50">
            <div className="product-list">
                <div className="product-list__image">
                    <a>
                        <img src={sellerProfile.event.images[0]} alt="Event Picture" />
                    </a>
                </div>

                <div className="product-list__info">
                    <h6 className="product-title">
                        <a>{sellerProfile.event.name}</a>
                    </h6>

                    <div className="product-description">{sellerProfile.description}</div>
                </div>
            </div>
        </Col>
    )
};


export default EventBoothCard;