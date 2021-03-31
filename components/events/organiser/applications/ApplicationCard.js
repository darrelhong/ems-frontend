import { useState, useEffect } from "react";
import { Col, Badge } from "react-bootstrap";
import { getSellerProfileIdFromApplication } from 'lib/query/sellerApplicationApi';
import Link from 'next/link';

const ApplicationCard = ({ app, approveAction, rejectAction, setApplication, renderAppRejButton }) => {

    const [sellerProfileId, setSellerProfileId] = useState(0);

    useEffect(() => {

        const loadSellerProfileId = async () => {
            const id = await getSellerProfileIdFromApplication(app.id);
            setSellerProfileId(id);
        };

        if (app?.sellerApplicationStatus === 'CONFIRMED') {
            loadSellerProfileId();
        }
    }, [])

    const renderAppRejButtonComponent = () => {
        switch (app?.sellerApplicationStatus) {
            case 'PENDING':
                return (
                    <div
                        style={{
                            float: 'right'
                        }}>

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
                    <div
                        style={{
                            float: 'right'
                        }}>

                        <button
                            disabled
                            className="btn btn-fill-out btn-addtocart space-ml--10"
                        >
                            Approved
                    </button>
                    </div>
                );
                break;
            case 'REJECTED':
                return (
                    <div
                        style={{
                            float: 'right'
                        }}>

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
                            float: 'right'
                        }}>
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
                            float: 'right'
                        }}>

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
                return "danger";
                break;
            case 'APPROVED':
                return "primary";
                break;
            case 'REJECTED':
                return "secondary";
                break;
            case 'CONFIRMED':
                return "success";
                break;
            case 'CANCELLED':
                return "light";
                break;
            default:
                return "primary";
                break;
        };
    };

    const getLg = () => {
        let output;
        if (renderAppRejButton) {
            output = 4;
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
        <Col
            lg={getLg()}
            sm={getSm()}
            className="space-mb--50">
            <div className="product-list">
                <div className="product-list__image">
                    <img src={app?.businessPartner?.profilePic ?? "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"} alt="BP_image" />
                    <Badge
                        pill
                        variant={getVariant()}
                        style={{
                            position: 'absolute',
                            top: 5,
                            left: 5
                        }}
                    >
                        {app?.sellerApplicationStatus}
                    </Badge>
                </div>

                <div className="product-list__info">
                    <h6 className="product-title"
                        style={{
                            marginBottom: '5%'
                        }}>
                        {app.businessPartner.name}
                    </h6>


                    <div className="product-description">
                        <p><strong>Description</strong></p>
                        {app.description}
                    </div>

                    <br />

                    <div className="product-description">
                        <p><strong>Additional Comments</strong></p>
                        {app.comments}
                    </div>

                    {renderAppRejButton && renderAppRejButtonComponent()}
                </div>
            </div>
        </Col>
    )
}

export default ApplicationCard;