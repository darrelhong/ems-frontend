import { Fragment, useState } from 'react';
import Link from 'next/link';
import ProductModal from './elements/ProductModal';
import { ProductRating } from '../Product';
import Image from 'react-bootstrap/Image';
const ProductGridFive = ({
  product,
  discountedPrice,
  productPrice,
  cartItem,
  wishlistItem,
  compareItem,
  bottomSpace,
  // addToCart,
  // addToWishlist,
  // deleteFromWishlist,
  // addToCompare,
  // deleteFromCompare,
  // addToast,
  // cartItems,
  sliderClass,
}) => {
  const [modalShow, setModalShow] = useState(false);
  const [colorImage, setColorImage] = useState('');

  return (
    <Fragment>
      <div
        className={`${sliderClass ? sliderClass : ''} ${
          bottomSpace ? bottomSpace : ''
        }`}
      >
        <div
          className="product-grid product-grid--style-three"
          style={{ width: '40%' }}
        >
          <div className="product-grid__image">
            <a>
              <img
                src="https://www.careerup.com/wp-content/uploads/2016/01/internship-opportunity-advertising-saga-events-1.png"
                alt="product_img1"
              />
            </a>

            {/*  <Link
              href={`/shop/product-basic/[slug]?slug=${product.slug}`}
              as={'/shop/product-basic/' + product.slug}
            >
              <a>
                <img
                  src={colorImage ? colorImage : product.thumbImage[0]}
                  alt="product_img1"
                />
                <img
                  className="product-hover-image"
                  src={colorImage ? colorImage : product.thumbImage[1]}
                  alt="product_img1"
                />
              </a>
            </Link>
            <div className="product-grid__badge-wrapper">
              {product.new ? <span className="pr-flash">NEW</span> : ''}
              {product.featured ? (
                <span className="pr-flash bg-danger">HOT</span>
              ) : (
                ''
              )}
              {product.discount ? (
                <span className="pr-flash bg-success">SALE</span>
              ) : (
                ""
              )} */}
          </div>
          <div className="product-grid__action-box">
            {/* <ul>
                <li>
                  {product.affiliateLink ? (
                    <a href={product.affiliateLink} target="_blank">
                      <i className="icon-action-redo" />
                    </a>
                  ) : product.variation && product.variation.length >= 1 ? (
                    <Link
                      href={`/shop/product-basic/[slug]?slug=${product.slug}`}
                      as={'/shop/product-basic/' + product.slug}
                    >
                      <a>
                        <i className="icon-wrench" />
                      </a>
                    </Link>
                  ) : product.stock && product.stock > 0 ? (
                    <button
                      onClick={() => addToCart(product, addToast)}
                      disabled={
                        cartItem !== undefined &&
                        cartItem.quantity >= cartItem.stock
                      }
                      className={cartItem !== undefined ? 'active' : ''}
                    >
                      <i className="icon-basket-loaded" />
                    </button>
                  ) : (
                    <button disabled>
                      <i className="icon-basket-loaded" />
                    </button>
                  )}
                </li>
                <li>
                  <button
                    onClick={
                      compareItem !== undefined
                        ? () => deleteFromCompare(product, addToast)
                        : () => addToCompare(product, addToast)
                    }
                    className={compareItem !== undefined ? 'active' : ''}
                  >
                    <i className="icon-shuffle" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setModalShow(true)}
                    className="d-none d-lg-block"
                  >
                    <i className="icon-magnifier-add" />
                  </button>
                </li>
                <li>
                  <button
                    onClick={
                      wishlistItem !== undefined
                        ? () => deleteFromWishlist(product, addToast)
                        : () => addToWishlist(product, addToast)
                    }
                    className={wishlistItem !== undefined ? 'active' : ''}
                  >
                    <i className="icon-heart" />
                  </button>
                </li>
              </ul>
            </div>*/}
          </div>
          <div className="product-grid__info">
            <div>
              <h6 className="product-title">
                {/* <Link
                href={`/shop/product-basic/[slug]?slug=${product.slug}`}
                as={'/shop/product-basic/' + product.slug}
              >
                <a>{product.name}</a>
                {/* </Link> */}
              </h6>
            </div>
            <div>
              <h6 className="product-description">
                {/* <Link
                href={`/shop/product-basic/[slug]?slug=${product.slug}`}
                as={"/shop/product-basic/" + product.slug}
              > */}
                <a>{product.descriptions}</a>
                {/* </Link> */}
              </h6>
            </div>
</div>
            {/* <div className="product-price">
              {product.discount ? (
                <Fragment>
                  <span className="price">${discountedPrice}</span>
                  <del>${productPrice}</del> */}
            {/* {/* <span className="on-sale">{product.discount}% Off</span> */}
            {/* </Fragment>
              ) : (
                <span className="price">${productPrice}</span>
              )}
            </div>
            <div className="rating-wrap">
              <ProductRating ratingValue={product.rating} />
              <span className="rating-num">({product.ratingCount})</span>
            </div>
          </div>
        </div>
      </div>
      {/* product modal */}
      <ProductModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        product={product}
        discountedprice={discountedPrice}
        productprice={productPrice}
        cartitems={cartItems}
        cartitem={cartItem}
        wishlistitem={wishlistItem}
        compareitem={compareItem}
        addtocart={addToCart}
        addtowishlist={addToWishlist}
        deletefromwishlist={deleteFromWishlist}
        addtocompare={addToCompare}
        deletefromcompare={deleteFromCompare}
        addtoast={addToast}
      />
      </div>
      </div>
    </Fragment>
  );
};

export default ProductGridFive;
