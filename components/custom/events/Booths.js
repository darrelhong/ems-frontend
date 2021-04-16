import PropTypes from 'prop-types';
import { Accordion, Card, ListGroup } from 'react-bootstrap';
import { LightgalleryItem, LightgalleryProvider } from 'react-lightgallery';
import Link from 'next/link';

export default function Booths({ sellerProfiles }) {
  const booths = sellerProfiles?.reduce((prev, curr) => {
    curr.booths;
    return prev.concat(curr.booths);
  }, []);


  return (
    <div>
      <h5>View Event's Booths and Products</h5>

      <Accordion>
        {booths?.map((booth, key) => (
          <Card key={booth.id}>
            <Accordion.Toggle as={Card.Header} eventKey={booth.id}>
            
              <span>  Booth {booth.boothNumber} by{' '}</span>
              <Link href={`seller-profile/${booth.sellerProfile.id}`}>
                {booth.sellerProfile.businessPartner.name}
                </Link>
              
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={booth.id}>
              <Card.Body>
                <ListGroup variant="flush">
                  { (booth.products.map((product) => (
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
                  )))}
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
