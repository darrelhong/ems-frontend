import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const LocationPane = ({ register, watch, physical, setPhysical, errors }) => {
  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Event Location Details</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <Row>
            <Col className="form-group" md={12}>
              <label>Is this a physically hosted event?<span className="required">*</span>
              </label>
              <div>
                <label style={{ marginRight: '10%' }}>
                  <input
                    type="radio"
                    name="physical"
                    ref={register({ required: true })}
                    value={true}
                    checked={physical}
                    onChange={(event) => {
                      console.log(event.target.value);
                      if (event.target.value == 'true') setPhysical(true);
                      // setPhysical(event.target.value);
                    }}
                    style={{ marginRight: 5 }}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    ref={register({ required: true })}
                    name="physical"
                    value={false}
                    checked={physical}
                    onChange={(event) => {
                      // setPhysical(event.target.value);
                      if (event.target.value == 'false') setPhysical(false);
                    }}
                    // onChange={(e) => console.log(e)}
                    style={{ marginRight: 5 }}
                  />
                  No
                </label>
              </div>
              {errors.physical && (
                <span role="alert" style={{ color: 'red' }}>
                  This field is required
                </span>
              )
              }
            </Col>

            {/* probably need some caption saying either online or physical would do, or shift to online/physical */}
            <Col className="form-group" md={12}>
              <label>
                Address <span className="required">* (Could be an online link or physical venue)</span>
              </label>
              <input
                // required
                className="form-control"
                name="address"
                type="text"
                ref={register({ required: true })}
              />
              {errors.address && (
                <span role="alert" style={{ color: 'red' }}>
                  This field is required
                </span>
              )
              }
            </Col>
            {/* {watch('isPhysical') ? (
              <h1>{watch('isPhysical')}</h1>
            ) : (
                <h1>{watch('isPhysical')}</h1>
              )} */}
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

LocationPane.propTypes = {
  register: PropTypes.func,
  watch: PropTypes.func,
};

export default LocationPane;
