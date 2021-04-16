import PropTypes from 'prop-types';
import { Accordion, Card, ListGroup } from 'react-bootstrap';
import { LightgalleryItem, LightgalleryProvider } from 'react-lightgallery';

export default function Booths({ sellerProfiles }) {
  const booths = sellerProfiles?.reduce((prev, curr) => {
    curr.booths;
    return prev.concat(curr.booths);
  }, []);

  return (
    <div className="mt-3">
      <h5>Booths and Products</h5>

      <Accordion>
        {booths?.map((booth) => (
          <Card key={booth.id} style={{ marginBottom: 0 }}>
            <Accordion.Toggle as={Card.Header} eventKey={booth.id}>
              Booth {booth.boothNumber} by{' '}
              <span className="text-primary">
                {booth.sellerProfile.businessPartner.name}
              </span>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={booth.id}>
              <Card.Body>
                <ListGroup variant="flush">
                  {booth.products.map((product) => (
                    <ListGroup.Item
                      key={product.pid}
                      className="d-flex align-items-center"
                    >
                      <LightgalleryProvider>
                        <LightgalleryItem group="any" src={product.image}>
                          <img
                            width={50}
                            src={product.image}
                            style={{
                              borderRadius: 3,
                              maxWidth: 'none',
                            }}
                          />
                        </LightgalleryItem>
                      </LightgalleryProvider>
                      <div className="ml-2">
                        <div>{product.name}</div>
                        <small className="text-muted">
                          {product.description}
                        </small>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </div>
  );
}

Booths.propTypes = {
  sellerProfiles: PropTypes.array,
};
