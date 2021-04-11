import { useState, useEffect, useRef } from 'react';
import { Row, Col } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';






const LocationPane = ({ register, watch, physical, setPhysical, errors, location }) => {
  // const [physical,setPhysical] = useState(true);
  const [query, setQuery] = useState(location);
  // const autoCompleteRef = useRef(null);
  // const [autoCompleteRef, setAutoCompleteRef] = useState();
  const [website, setWebsite] = useState("");
  const [phone, setPhone] = useState("");
  const options = { types: ["establishment"], componentRestrictions: { country: "SG" } };

  let autoComplete;

  const loadScript = (url, callback) => {
    let script = document.createElement("script");
    script.type = "text/javascript";

    if (script.readyState) {
      script.onreadystatechange = function () {
        if (script.readyState === "loaded" || script.readyState === "complete") {
          script.onreadystatechange = null;
          callback();
        }
      };
    } else {
      script.onload = () => callback();
    }

    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
  };

  function handleScriptLoad(updateQuery) {
    autoComplete = new window.google.maps.places.Autocomplete(
      document.getElementById('autocomplete'), options

    );
    autoComplete.setFields(["address_components", "formatted_address", "opening_hours", "website", "formatted_phone_number", "name"]);
    autoComplete.addListener("place_changed", () =>
      handlePlaceSelect(updateQuery)
    );
  }
  async function handlePlaceSelect(updateQuery) {
    const addressObject = autoComplete.getPlace();
    const querytest = addressObject.name + " " + addressObject.formatted_address;
    updateQuery(querytest);
    console.log(addressObject);
    // information= addressObject.website + " " +  addressObject.formatted_phone_number;
    setWebsite(addressObject.website);
    setPhone(addressObject.formatted_phone_number);

  }
  useEffect(() => {
    loadScript(
      `https://maps.googleapis.com/maps/api/js?key=AIzaSyD6lwl3tFVZ5XyGBrr8gWwWDPnrsTknuEE&libraries=places`,
      () => handleScriptLoad(setQuery)
    );
  }, []);

  return (
    <Card className="my-account-content__content">
      <Card.Header>
        <h3>Event Location Details</h3>
      </Card.Header>
      <Card.Body>
        <div className="account-details-form">
          <Row>
            <Col className="form-group" md={12}>
              <label>
                Is this a physically hosted event?
                <span className="required">*</span>
              </label>
              <div>
                <label style={{ marginRight: '10%' }}>
                  <input
                    type="radio"
                    name="physical"
                    ref={register({ required: true })}
                    value={true}
                    checked={physical}
                    onChange={() => setPhysical(true)}
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
                    checked={physical == false}
                    onChange={() => setPhysical(false)}
                    style={{ marginRight: 5 }}
                  />
                  No
                </label>
              </div>
              {errors.physical && (
                <span role="alert" style={{ color: 'red' }}>
                  This field is required
                </span>
              )}
            </Col>

            {/* probably need some caption saying either online or physical would do, or shift to online/physical */}
            <Col className="form-group" md={12}>
              <label>
                Address{' '}
                <span className="required">
                  * (Could be an online link or physical venue)
                </span>
              </label>
              {/* <input
                // required
                className="form-control"
                name="address"
                type="text"
                ref={register({ required: true })}
              />  */}
              <input

                className="form-control"

                onChange={event => { setQuery(event.target.value); }}
                placeholder="Enter a Location"
                type="text"
                value={query}
                name="address"
                ref={register({ required: true })}
                id="autocomplete"

              // ref={(ref) => {register(ref); autoCompleteRef;}}
              //  ref= {autoCompleteRef}
              //  id={autoCompleteRef}
              />

              {errors.address && (
                <span role="alert" style={{ color: 'red' }}>
                  This field is required
                </span>
              )}
            </Col>
            <Col className="form-group" md={12}>
              {physical && (<div> <span>Website: </span> <a href={website}> {website ?? 'Not available'} </a></div> 
              )}
            </Col>

            <Col className="form-group" md={12}>
              {/* <span>{website}</span> */}
              {physical && (<span>Phone Number: {phone ?? 'Not available'}</span>)}

              {/* <span>{phone}</span> */}

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
