import PartnerCard from './PartnerCard';
import { Row } from 'react-bootstrap';

const RecommendedPartnersTab = ({
  eventId,
  recommendedPartners,
  increaseInviteCount,
}) => {

  return (
    <div>
      {recommendedPartners?.length == 0 && (
            <div
            className="product-description-tab__details"
            style={{ textAlign: 'center' }}
          >
            No recommended partners to display! Most have already signed up
          </div>
      )}

      {recommendedPartners?.length > 0 && recommendedPartners.map((partner) => {
              return (
                <PartnerCard
                  partner={partner}
                  eid={eventId}
                  increaseInviteCount={increaseInviteCount}
                />
              );
            })}
    </div>
  );
};

export default RecommendedPartnersTab;
