import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';

const PublishingPane = ({
  eventStatus,
  handleSubmit,
  onSubmit,
  saveDraft,
  register,
  watch,
  vip,
  setVip,
  errors,
  hideOptions,
  setHideOptions,
}) => {
  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Publishing Options</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <Row>
            <Col className="form-group" md={12}>
              <label>
                List as VIP Event - Only Invited VIP Business Partners Can Apply 
                <span className="required">*</span>
              </label>
              <div>
                {/* <label>
                                    <input
                                    type="checkbox"
                                    name="vip"
                                    ref={register()}
                                    value={true}
                                    checked = {vip}
                                    onChange = {(event) => {
                                        setVip(!vip);
                                        //console.log(event.target.value);
                                        //setVip(event.target.value);
                                    }}
                                    style={{marginRight: 5}} />
                                    List as VIP Event
                                </label> */}
                <label style={{ marginRight: '10%' }}>
                  <input
                    type="radio"
                    name="vip"
                    ref={register({ required: true })}
                    value={true}
                    checked={vip}
                    onChange={() => {
                      setVip(true);
                      // console.log(event.target.value);
                      // setVip(event.target.value);
                    }}
                    style={{ marginRight: 5 }}
                  />
                  Yes
                </label>
                <label>
                  <input
                    type="radio"
                    ref={register({ required: true })}
                    name="vip"
                    value={false}
                    checked={vip == false}
                    onChange={() => {
                      setVip(false);
                      // console.log(event.target.value);
                      // setVip(event.target.value);
                    }}
                    // onChange={(e) => console.log(e)}
                    style={{ marginRight: 5 }}
                  />
                  No
                </label>
              </div>
              {errors.vip && (
                <span role="alert" style={{ color: 'red' }}>
                  This field is required
                </span>
              )}
            </Col>
            {/* <Col className="form-group" md={12}>
              <label>
                Publishing Options:
                <span className="required">*</span>
              </label>
              <div>
                <label style={{ marginRight: '10%' }}>
                  <input
                    type="radio"
                    name="hideOptions"
                    ref={register({ required: true })}
                    value="hideBoth"
                    checked={hideOptions == 'hideBoth'}
                    onChange={() => setHideOptions('hideBoth')}
                    style={{ marginRight: 5 }}
                  />
                  Hide from both Attendees and Business Partners
                </label>
                <label style={{ marginRight: '10%' }}>
                  <input
                    type="radio"
                    name="hideOptions"
                    checked={hideOptions == 'hideFromAttendee'}
                    ref={register({ required: true })}
                    value="hideFromAttendee"
                    onChange={() => setHideOptions('hideFromAttendee')}
                    style={{ marginRight: 5 }}
                  />
                  Hide from Attendees but show Business Partners
                </label>
                <label>
                  <input
                    type="radio"
                    ref={register()}
                    name="hideOptions"
                    value="showBoth"
                    onChange={() => setHideOptions('showBoth')}
                    checked={hideOptions == 'showBoth'}
                    // checked={this.state.selectedOption === "Female"}
                    // onChange={this.onValueChange}
                    style={{ marginRight: 5 }}
                  />
                  Show to both Attendees and Business Partners
                </label>
              </div>
              {errors.hideOptions && (
                <span role="alert" style={{ color: 'red' }}>
                  This field is required
                </span>
              )}
            </Col> */}

            {/* <Col>
              {eventStatus != 'CREATED' && (
                <button
                  type="button"
                  name="saveDraft"
                  className="btn btn-border-fill btn-sm"
                  onClick={saveDraft}
                >
                  Save as Draft
                </button>
              )}
              <button
                type="submit"
                className="btn btn-fill-out btn-sm"
                name="submit"
                value="Submit"
                ref={register()}
                onClick={handleSubmit(onSubmit)}
              >
                {eventStatus == 'CREATED' ? 'Save Changes' : 'Create Event'}
              </button>
            </Col> */}
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

PublishingPane.propTypes = {
  register: PropTypes.func,
  watch: PropTypes.func,
  vip: PropTypes.bool,
};

export default PublishingPane;
