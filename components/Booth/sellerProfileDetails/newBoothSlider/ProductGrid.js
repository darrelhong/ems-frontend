import { Fragment, useState } from 'react';
// import Link from 'next/link';
// import EventModal from './elements/EventModalEoProfile';
// import { ProductRating } from '../Product';

const ProductGrid = ({ product, bottomSpace, sliderClass,setProductToShow }) => {
  const [modalShow, setModalShow] = useState(false);
  const [colorImage, setColorImage] = useState('');

  //   return (
  //       <div>Product</div>
  //   )
  return (
    <Fragment>
      <div
        className={`${sliderClass ? sliderClass : ''}
        ${bottomSpace ? bottomSpace : ''}`}
      >
        <div className="product-grid product-grid--style-three">
          <div className="product-grid__image">
            {/* <Link
            // href={`/shop/product-basic/[slug]?slug=${product.slug}`}
            // as={"/shop/product-basic/" + product.slug}
            > */}
            <a>
              <img
                //event images is here
                // src={colorImage ? colorImage : product.images[0]}
                src={colorImage ? colorImage : product.image}
                alt="event_img0"
                onClick={() => setProductToShow(product)}
              />
            </a>
          </div>
          <div className="product-grid__info">
            <h6 className="product-title">
              {/* <Link
                // href={`/shop/product-basic/[slug]?slug=${product.slug}`}
                // as={'/shop/product-basic/' + product.slug}
              > */}
              <a onClick={() => setProductToShow(product)}>{product.name}</a>
              {/* </Link> */}
            </h6>
            {/* <div className="rating-wrap">
              <ProductRating ratingValue={event.rating} />
              <span className="rating-num">({event.rating})</span>
            </div> */}
          </div>
        </div>
      </div>
      {/* product modal */}
      {/* <EventModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        event={event}
      /> */}
    </Fragment>
  );
};

export default ProductGrid;
