import { useState, useEffect } from 'react';
import { Col, Badge, Row} from 'react-bootstrap';
import { getSellerProfileIdFromApplication } from 'lib/query/sellerApplicationApi';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

const ApplicationCard = ({
  app,
  approveAction,
  rejectAction,
  setApplication,
  renderAppRejButton,
}) => {
  const [sellerProfileId, setSellerProfileId] = useState(0);

  useEffect(() => {
    const loadSellerProfileId = async () => {
      // console.log("test***************************")
      const id = await getSellerProfileIdFromApplication(app.id);
      setSellerProfileId(id);
      setDate(app.applicationDate.toLocaleDateString());
      console.log("app: ", app);
    };

    if (app?.sellerApplicationStatus === 'CONFIRMED') {
      loadSellerProfileId();
    }
  }, []);

  const renderAppRejButtonComponent = () => {
    switch (app?.sellerApplicationStatus) {
      case 'PENDING':
        return (
          <div
            style={{
              float: 'right',
            }}
          >
            <button
              onClick={() => {
                setApplication(app);
                approveAction();
              }}
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              Approve
            </button>
            <button
              // onClick={rejectAction}
              onClick={() => {
                setApplication(app);
                rejectAction();
              }}
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              Reject
            </button>
          </div>
        );
        break;
      case 'APPROVED':
        return (
          <Row>
            <Col lg={3}>
          
            </Col>
            <Col lg={1}>
              <div style={{textAlign:"right", marginTop:"4%"}}>
                   <h4>3 </h4>
              </div>
       
          </Col>
            <Col lg={5}>
             
            <div style={{textAlign:"left", marginTop:"3%"}}>
                 <strong className="product-description ">
             Days Since Allocation           
             
            </strong> 
            </div>

            </Col>
            <Col lg={3}>  
            <div
            style={{
              float: 'right',
            }}
          >
            <button
              // disabled
              onClick={() => {
                setApplication(app);
                rejectAction();
              }}
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              Reject
            </button>
          </div>
            </Col>
        
          </Row>
        );
        break;
      case 'REJECTED':
        return (
          <div
            style={{
              float: 'right',
            }}
          >
            <button
              disabled
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              Rejected
            </button>
          </div>
        );
        break;
      case 'CONFIRMED':
        return (
          <div
            style={{
              float: 'right',
            }}
          >
            <Link href={`seller-profile/${sellerProfileId}`}>
              <button
                // variant="primary"
                className="btn btn-fill-out btn-addtocart space-ml--10"
              >
                View Seller Profile
              </button>
            </Link>
          </div>
        );
        break;
      case 'CANCELLED':
        return (
          <div
            style={{
              float: 'right',
            }}
          >
            <button
              disabled
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              Cancelled
            </button>
          </div>
        );
        break;
    }
  };

  const getVariant = () => {
    switch (app?.sellerApplicationStatus) {
      case 'PENDING':
        return 'danger';
        break;
      case 'APPROVED':
        return 'primary';
        break;
      case 'REJECTED':
        return 'secondary';
        break;
      case 'CONFIRMED':
        return 'success';
        break;
      case 'CANCELLED':
        return 'light';
        break;
      default:
        return 'primary';
        break;
    }
  };

  const getLg = () => {
    let output;
    if (renderAppRejButton) {
      output = 12;
    } else output = null;
    return output;
  };

  const getSm = () => {
    let output;
    if (renderAppRejButton) {
      output = 6;
    } else output = null;
    return output;
  };

  return (
    <Col lg={getLg()} sm={getSm()} className="space-mb--50">
      <div className="product-list">
        <div className="product-list__image" style={{
          textAlign: "center"
        }}>
          <br></br>

          <Badge
            pill
            variant={getVariant()}
            style={{
              position: 'absolute',
              top: 5,
              left: 5,
            }}
          >
            {app?.sellerApplicationStatus}
          </Badge>
          <br></br>
          <img
            className="profile-image"
            src={
              app?.businessPartner?.profilePic ??
              "../../assets/images/defaultprofilepic.png"
            }
            alt="BP_image"
            style={{ width: '80%' }}

            thumbnail
          />

        </div>

        <div className="product-list__info">
          <h6
            className="product-title"
            style={{
              marginBottom: '5%',
            }}
          >
            <Link href={{
              pathname: '/partner/partner-profile',
              query: {
                paraId: JSON.stringify(app.businessPartner.id),
              },
            }}>
              <a className="hover-effect">{app.businessPartner.name}</a> 
            </Link>
          </h6>

          <div className="product-description">
            <Row>
              <Col lg={4}>
            <strong>
              Event Applied:
              <Link href={`/organiser/events/${app?.event?.eid}`}>
                <a className="hover-effect">{app?.event?.name}</a>
              </Link>
            </strong>
            </Col>
            <Col lg={4}>
            <strong>
              Application Date:            
              <a className="hover-effect">  {format(parseISO(app?.applicationDate), 'dd MMM yyyy')}</a>

            </strong>

            </Col>
            <Col lg={4}>
            <strong>
              Payment Status:
              <a className="hover-effect">{app?.paymentStatus}</a>
            </strong>
            </Col>
            </Row>
          </div>

          <br />

          <div className="product-description">
            <p>
              <strong>Description</strong>
            </p>
            {app.description}
          </div>

          <br />

          <div className="product-description">
            <p>
              <strong>Additional Comments</strong>
            </p>
            {app.comments}
          </div>
            <br></br>
          {renderAppRejButton && renderAppRejButtonComponent()}
        </div>
      </div>
    </Col>
  );
};

export default ApplicationCard;
