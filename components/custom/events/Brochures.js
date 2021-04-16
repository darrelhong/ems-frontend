import PropTypes from 'prop-types';
import { Figure } from 'react-bootstrap';
import ScrollContainer from 'react-indiana-drag-scroll';
import { LightgalleryItem, LightgalleryProvider } from 'react-lightgallery';

import styles from './Brochures.module.css';

export default function Brochures({ sellerProfiles }) {
  if (sellerProfiles.length > 0) {
    const brochures = sellerProfiles.reduce((prev, curr) => {
      const temp = curr.brochureImages.map((src, i) => ({
        bpIndex: i + 1,
        imageSrc: src,
        bpName: curr.businessPartner.name,
      }));
      return prev.concat(temp);
    }, []);
    return (
      <div>
        <LightgalleryProvider>
          <h5>Brochures</h5>
          <ScrollContainer>
            <div className={styles.container}>
              {brochures.map((item, i) => (
                <Figure className={styles.item} key={i}>
                  <LightgalleryItem group="any" src={item.imageSrc}>
                    <Figure.Image
                      src={item.imageSrc}
                      className={styles.image}
                    />
                  </LightgalleryItem>
                  <Figure.Caption>
                    <div>{item.bpName}</div>
                    Brochure {item.bpIndex}
                  </Figure.Caption>
                </Figure>
              ))}
            </div>
          </ScrollContainer>
        </LightgalleryProvider>
      </div>
    );
  }
  return null;
}

Brochures.propTypes = {
  sellerProfiles: PropTypes.array,
};
