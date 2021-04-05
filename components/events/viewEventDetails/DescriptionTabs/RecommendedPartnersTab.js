import PartnerCard from './PartnerCard';
import { Row } from 'react-bootstrap';

const RecommendedPartnersTab = ({
    eventId,
    recommendedPartners,
    increaseInviteCount
}) => {

    return (
        <div className="shop-products"
            style={{
                marginTop: '10%'
            }}
        >
            <Row className="list">
                {recommendedPartners.length != 0 ? (
                    recommendedPartners.map((partner) => {
                        return (
                            <PartnerCard
                                partner={partner}
                                eid={eventId}
                                increaseInviteCount={increaseInviteCount}
                            />
                        );
                    })
                ) : (
                    <div
                        className="product-description-tab__details"
                        style={{ textAlign: 'center' }}
                    >
                        No recommended partners to display!
                    </div>
                )
                }
            </Row>
        </div>
    )
};

export default RecommendedPartnersTab;