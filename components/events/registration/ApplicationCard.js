import { useEffect } from "react";
import { Col } from "react-bootstrap";

const ApplicationCard = ({ app }) => {

    // console.log(app);
    return (
        <Col lg={4} sm={6} className="space-mb--50">
            <div className="product-list">
                <div className="product-list__image">
                    <img src="https://i.pinimg.com/originals/ca/20/61/ca2061c17d6f4a32978dd541bafed0e4.jpg" alt="BP_image" />
                </div>

                <div className="product-list__info">
                    <h6 className="product-title">
                        {app.businessPartner.name}
                    </h6>

                    <div className="d-flex justify-content-between">
                        <div className="product-price">
                            <span className="price">
                                testing!
                            </span>
                        </div>
                    </div>

                    <div className="product-description">
                        {app.description}
                    </div>

                    <br />

                    <div className="product-description">
                        {app.comments}
                    </div>

                </div>
            </div>
        </Col>
    )
}

export default ApplicationCard;