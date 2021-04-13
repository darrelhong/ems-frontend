import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Col } from 'react-bootstrap';
import { checkIfRsvpSent, sendRsvp } from 'lib/query/eventApi';
import { useToasts } from 'react-toast-notifications';
import { rsvpNotif } from 'lib/query/notificationApi';

const PartnerCard = ({ partner, eid, increaseInviteCount }) => {

    const [rsvpSent, setRsvpSent] = useState(false);
    const { addToast, removeToast } = useToasts();

    const handleSendRsvp = async () => {
        try {
            await sendRsvp(eid, partner?.id);
            await rsvpNotif(partner.id,eid);
            createToast('Invitation Sent!', 'success');
            increaseInviteCount();
            setRsvpSent(true);
        } catch (e) {
            createToast('Error with sending, try again later', 'error');
        }
    }

    const createToast = (message, appearanceStyle) => {
        const toastId = addToast(message, { appearance: appearanceStyle });
        setTimeout(() => removeToast(toastId), 3000);
    };

    return (
        // <Col lg={4} sm={6} className="space-mb--50">
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
                {rsvpSent ? (
                    <button
                        className="btn btn-fill-out btn-addtocart space-ml--10"
                        disabled
                        style={{
                            position: 'absolute',
                            right: 10,
                            bottom: 10
                        }}
                    >
                        Invite Sent
                    </button>
                ) : (
                    <button
                        onClick={handleSendRsvp}
                        className="btn btn-fill-out btn-addtocart space-ml--10"
                        style={{
                            position: 'absolute',
                            right: 10,
                            bottom: 10
                        }}
                    >
                        Invite Partner
                    </button>
                )}
            </div>
        // </Col>
    );
};

export default PartnerCard;
