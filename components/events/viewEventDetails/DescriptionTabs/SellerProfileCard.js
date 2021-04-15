import Link from 'next/link';
import { Row, Col } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';

const SellerProfileCard = ({ sellerProfile, deleteCancelEvent, createToast }) => {

    const getBoothNumbers = () => {
        try {
            const booths = sellerProfile.booths;
            let boothNumberString = '';
            booths.map((booth) => boothNumberString += (booth.boothNumber + ','));
            return boothNumberString.slice(0, -1);
        } catch (e) {
            return 'Not Allocated yet';
        }
    };

    return (
        // <Col lg={4} sm={6} className="space-mb--50">
        //     <div className="product-list">
        //         <div className="product-list__image">
        //             <Link href={`/organiser/events/seller-profile/${sellerProfile.id}`}>
        //                 <a>
        //                     <img src={sellerProfile.businessPartner.profilePic ?? 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png'} alt="event_image" />
        //                 </a>
        //             </Link>
        //         </div>

        //         <div className="product-list__info">

        //             <h6 className="product-title">
        //                 <Link href={`/organiser/events/seller-profile/${sellerProfile.id}`}>
        //                     <a>{sellerProfile?.businessPartner?.name}</a>
        //                 </Link>
        //             </h6>

        //             <div className="product-description">{sellerProfile.description}</div>
        //             <span className="booth-numbers">
        //                 Allocated booth Numbers: {getBoothNumbers()}
        //             </span>
        //         </div>
        //     </div>
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
                              {sellerProfile.businessPartner.profilePic == null && (
                                <img
                                  src="https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png"
                                  className="img-circle img-no-padding img-responsive"
                                />
                              )}
                              {sellerProfile.businessPartner.profilePic != null && (
                                <Image
                                  className="img-circle img-no-padding img-responsive"
                                  src={sellerProfile.businessPartner.profilePic}
                                />
                              )}
                            </div>
                          </Col>
                          <Col md="5" xs="5">
                            <br></br>
                            <h6>
                            <Link
                              href={`/organiser/events/seller-profile/${sellerProfile.id}`}
                            >
                            {sellerProfile?.businessPartner?.name}
                            </Link>{' '}</h6>
                            <br />
                            <span className="text-muted">
                              {sellerProfile.description}
                            </span>
                            <br></br>
                            {/* <span className="booth-numbers">
                         Allocated booth Numbers: {getBoothNumbers()}
                         </span> */}
                            {/* <div>
                              {partner.businessCategory !== null &&
                                (
                                  <span>
                                    {' '}
                                    <Badge variant="primary">
                                      {partner.businessCategory}
                                    </Badge>{' '}
                                  </span>


                                )}
                            </div> */}
                          </Col>
                          <Col className="text-center" md="4" xs="4">
                            <br></br>
                            {/* {sellerProfile?.businessPartner?.businessCategory !== null && (
                              <span>
                                {' '}
                                <Badge variant="primary">
                                  {sellerProfile?.businessPartner?.businessCategory}
                                </Badge>{' '}
                              </span>
                            )} */}
                             <h6>
              Allocated Booth Numbers:
              <div>
                  <br></br>
              <strong > {getBoothNumbers()}</strong></div>
            </h6>
                            {/* {!showPublicView && (<Button
                              className="btn-round btn-icon"
                              color="success"
                              outline
                              size="sm"
                            >
                              Select
                             <i className="fa fa-envelope" /> */}
                            {/* </Button>)}  */}
                          </Col>
                        </Row>
                      </li>
              
                
              </ul>
            </div>
           
         
        </Col>
     
      </>
    );
};

export default SellerProfileCard;
