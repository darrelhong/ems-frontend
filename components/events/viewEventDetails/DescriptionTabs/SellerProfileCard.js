import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';

const SellerProfileCard = ({ sellerProfile, deleteCancelEvent, createToast }) => {

    const getBoothNumbers = () => {
        try {
            const booths = sellerProfile.booths;
            let boothNumberString = '';
            booths.map((booth) => boothNumberString += (booth.boothNumber + ','));
            return boothNumberString.slice(0, -1);
        } catch (e) {
            return '?';
        }
    };

    return (
        <Col lg={4} sm={6} className="space-mb--50">
            <div className="product-list">
                <div className="product-list__image">
                    <Link href={`/partner/seller-profile/${sellerProfile.id}`}>
                        <a>
                            <img src={sellerProfile.businessPartner.profilePic ?? 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png'} alt="event_image" />
                        </a>
                    </Link>
                </div>

                <div className="product-list__info">

                    <h6 className="product-title">
                        <Link href={`/partner/seller-profile/${sellerProfile.id}`}>
                            <a>{sellerProfile?.businessPartner?.name}</a>
                        </Link>
                    </h6>

                    <div className="product-description">{sellerProfile.description}</div>
                    <span className="booth-numbers">
                        Allocated booth Numbers: {getBoothNumbers()}
                    </span>
                </div>
            </div>
        </Col>
    );
};

export default SellerProfileCard;
