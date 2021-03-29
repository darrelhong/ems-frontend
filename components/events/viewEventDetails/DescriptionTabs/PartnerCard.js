import Link from 'next/link';
import { Col } from 'react-bootstrap';

const PartnerCard = ({ partner }) => {


    return (
        <Col lg={4} sm={6} className="space-mb--50">
            <div className="product-list">
                <div className="product-list__image">
                    {/* DEFO WRONG LINK, SEE WHICH PAGE TO USE */}
                    <Link href={`/partner/seller-profile/${partner.id}`}>
                        <a>
                            <img src={partner.profilePic ?? 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png'} alt="event_image" />
                        </a>
                    </Link>
                </div>

                <div className="product-list__info">
                    <h6 className="product-title">
                        <Link href={`/partner/seller-profile/${partner.id}`}>
                            <a>{partner?.name}</a>
                        </Link>
                    </h6>
                    <p>{partner.businessCategory}</p>
                </div>
                <button
                    onClick={() => console.log('hello')}
                    className="btn btn-fill-out btn-addtocart space-ml--10"
                    style={{ 
                        // textAlign: 'right',
                        // height:'10%',
                        position:'absolute',
                        right:10,
                        bottom:10
                    }}
                >
                    Invite Partner
          </button>
            </div>
        </Col>
    );
};

export default PartnerCard;
