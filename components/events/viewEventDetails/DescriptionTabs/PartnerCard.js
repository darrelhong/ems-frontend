import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Col, Row } from 'react-bootstrap';
import { checkIfRsvpSent, sendRsvp } from 'lib/query/eventApi';
import { useToasts } from 'react-toast-notifications';
import { rsvpNotif } from 'lib/query/notificationApi';
import Badge from 'react-bootstrap/Badge';

const PartnerCard = ({ partner, eid, increaseInviteCount }) => {

    const [rsvpSent, setRsvpSent] = useState(false);
    const { addToast, removeToast } = useToasts();

    const handleSendRsvp = async () => {
        try {
            await sendRsvp(eid, partner?.id);
            // await rsvpNotif(partner.id,eid);
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
            // <div className="product-list">
            //     <div className="product-list__image">
            //         {/* DEFO WRONG LINK, SEE WHICH PAGE TO USE */}
            //         <Link href={`/partner/seller-profile/${partner.id}`}>
            //             <a>
            //                 <img src={partner.profilePic ?? 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png'} alt="event_image" />
            //             </a>
            //         </Link>
            //     </div>

            //     <div className="product-list__info">
            //         <h6 className="product-title">
            //             <Link href={`/partner/seller-profile/${partner.id}`}>
            //                 <a>{partner?.name}</a>
            //             </Link>
            //         </h6>
            //         <p>{partner.businessCategory}</p>
            //     </div>
            //     {rsvpSent ? (
            //         <button
            //             className="btn btn-fill-out btn-addtocart space-ml--10"
            //             disabled
            //             style={{
            //                 position: 'absolute',
            //                 right: 10,
            //                 bottom: 10
            //             }}
            //         >
            //             Invite Sent
            //         </button>
            //     ) : (
            //         <button
            //             onClick={handleSendRsvp}
            //             className="btn btn-fill-out btn-addtocart space-ml--10"
            //             style={{
            //                 position: 'absolute',
            //                 right: 10,
            //                 bottom: 10
            //             }}
            //         >
            //             Invite Partner
            //         </button>
            //     )}
            // </div>
        // </Col>
        <>
        <Col md={12}>
          {/* <div
            style={{
              overflowY: 'auto',
              // border:'1px solid red',
              // width:'500px',
              overflowX: 'hidden',
              height: '40vh',
              position: 'relative',
            }}
          > */}
            <div className="product-description-tab__additional-info">
              <ul className="list-unstyled team-members">
              
                      <li>
                        <hr></hr>
                        <Row>
                          <Col md="1" xs="1">
                            {' '}
                            &nbsp;
                          </Col>
                          <Col md="2" xs="2">
                            <div className="avatar">
                              {/* <img
                    alt="..."
                    className="img-circle img-no-padding img-responsive"
                    src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                  /> */}
                              {partner.profilePic == null && (
                                <img
                                  src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                  className="img-circle img-no-padding img-responsive"
                                />
                              )}
                              {partner.profilePic != null && (
                                <img
                                  className="img-circle img-no-padding img-responsive"
                                  src={partner.profilePic}
                                />
                              )}
                            </div>
                          </Col>
                          <Col md="5" xs="5">
                            <br></br>
                            <h6>
                            <Link
                                        href={{
                                          pathname: '/partner/partner-profile',
                                          query: {
                                            localuser: JSON.stringify(partner?.id),
                                          },
                                        }}
                                      >
                                        {partner?.name}
                                      </Link>{' '} </h6><div>
                              {partner?.businessCategory !== null &&
                                (
                                  <span>
                                    {' '}
                                    <Badge variant="primary">
                                      {partner?.businessCategory}
                                    </Badge>{' '}
                                  </span>


                                )}
                            </div>
                            <br />
                            <span className="text-muted">
                              {partner?.description}
                            </span>
              
                           
                         
                            
                          </Col>
                          <Col className="text-center" md="4" xs="4">
                            <br></br>
   
                            
            
              <div style={{textAlign:"right"}}>
                  {/* <br></br> */}
                       {rsvpSent ? (
                    <button
                        className="btn btn-fill-out btn-addtocart space-ml--10"
                        disabled
                        // style={{
                        //     position: 'absolute',
                        //     right: 10,
                        //     bottom: 10
                        // }}
                    >
                        Invite Sent
                    </button>
                ) : (
                    <button
                        onClick={handleSendRsvp}
                        className="btn btn-fill-out btn-addtocart space-ml--10"
                        // style={{
                        //     position: 'absolute',
                        //     right: 10,
                        //     bottom: 10
                        // }}
                    >
                        Invite Partner
                    </button>
                )}</div>
            
                          </Col>
                        </Row>
                      </li>
              
                
              </ul>
            </div>
           
         
        </Col>
        </>
    );
};

export default PartnerCard;
