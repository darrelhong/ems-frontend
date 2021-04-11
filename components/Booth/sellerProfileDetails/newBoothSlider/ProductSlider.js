import Swiper from 'react-id-swiper';
// import EventGridWrapperFiveEoProfile from '../ProductThumb/EventGridWrapperFiveEoProfile';
import { Fragment } from 'react';
// import EventGridFive from '../ProductThumb/EventGridFiveEoProfile';
import ProductGrid from './ProductGrid';
import ProductModal from 'components/Booth/sellerProfileDetails/ProductModal';

const ProductSlider = ({ products, setProductToShow }) => {

  const params = {
    slidesPerView: 3,
    spaceBetween: 10,
    slidesPerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    observer: true,
    observeParents: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  };

// return (
//     <div>Slider</div>
// );

    return (
      <Fragment>
        <div className="product-slider-wrap product-slider-wrap--custom-bullet">
            {/* {products?.length > 0 ? ( */}
                 <Swiper {...params}>
                 {products.map((product) => (
                   <div key={product.pid}>
                     {<ProductGrid key={product.pid} product={product} setProductToShow={setProductToShow}/>}
                   </div>
                 ))}
               </Swiper>
             {/* : (
                 <div>No products yet</div>
             )} */}
        </div>
      </Fragment>
    );
};

export default ProductSlider;
