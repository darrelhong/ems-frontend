import Swiper from 'react-id-swiper';
// import EventGridWrapperFiveEoProfile from '../ProductThumb/EventGridWrapperFiveEoProfile';
import { Fragment } from 'react';
// import EventGridFive from '../ProductThumb/EventGridFiveEoProfile';
import ProductGrid from './ProductGrid';
import ProductModal from 'components/Booth/sellerProfileDetails/ProductModal';
import { Row, Col } from 'react-bootstrap';
import { useState } from 'react';

const ProductSlider = ({
  products,
  setProductToShow,
  boothNumber,
  boothDesc,
  showProductModal,
}) => {
  const params = {
    slidesPerView: 1,
    spaceBetween: 10,
    slidesPerGroup: 1,
    loop: true,
    loopFillGroupWithBlank: true,
    observer: true,
    observeParents: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

  
  return (
    <Fragment>
      
      <Row style={{display:'flex',alignItems:'center'}}>
        <Col xs={8} md={8}>
          <div>
            <h4>Booth {boothNumber}</h4>
            <p>{boothDesc}</p>
            <button className="btn btn-fill-out btn-sm" onClick={()=>showProductModal(true)}>
              Add Product
            </button>
          </div>
        </Col>
        <Col xs={4} md={4}>
          <div className="product-slider-wrap product-slider-wrap--custom-bullet" style={{maxWidth:'300px'}}>
            {products?.length > 0 && (
              <Swiper {...params}>
                {products.map((product) => (
                  <div key={product.pid}>
                    {
                      <ProductGrid
                        key={product.pid}
                        product={product}
                        setProductToShow={setProductToShow}
                      />
                    }
                  </div>
                ))}
              </Swiper>
            )}
            {products?.length == 0 && <div>No products yet</div>}
          </div>
        </Col>
      </Row>
      <hr></hr>
    </Fragment>
  );
};

export default ProductSlider;
