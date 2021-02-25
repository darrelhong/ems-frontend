import { Fragment, useState } from "react";
import Link from "next/link";
import { getProductCartQuantity } from "../../lib/product";
import { ProductRating } from "../Product";
import { BsShield } from "react-icons/bs";
import { AiOutlineReload } from "react-icons/ai";
import { GiSwapBag } from "react-icons/gi";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoGoogleplus,
  IoLogoYoutube,
  IoLogoInstagram
} from "react-icons/io";

const EventDescription = ({
  event
}) => {
  // const [selectedProductColor, setSelectedProductColor] = useState(
  //   product.variation ? product.variation[0].color : ""
  // );
  // const [selectedProductSize, setSelectedProductSize] = useState(
  //   product.variation ? product.variation[0].size[0].name : ""
  // );
  // const [productStock, setProductStock] = useState(
  //   product.variation ? product.variation[0].size[0].stock : product.stock
  // );
  // const [quantityCount, setQuantityCount] = useState(1);

  // const productCartQty = getProductCartQuantity(
  //   cartItems,
  //   product,
  //   selectedProductColor,
  //   selectedProductSize
  // );
  
  return (
    <div className="product-content">
      <h2 className="product-content__title space-mb--10">{event.name}</h2>
      <div className="product-content__price-rating-wrapper space-mb--10">
        <div className="product-content__price d-flex-align-items-center">
          <span className="price">${event.startDate}</span> {/* keep this part */}
        </div>
        {product.rating && product.rating > 0 ? (
          <div className="product-content__rating-wrap">
            <div className="product-content__rating">
              <ProductRating ratingValue={product.rating} />
              <span>({product.ratingCount})</span>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="product-content__description space-mb--20">
        <p>{event.descriptions}</p>
      </div>

      <div className="product-content__sort-info space-mb--20">
        <ul>
          <li>
            <BsShield /> Physical : Online
          </li>
          <li>
            <AiOutlineReload /> {event.address}
          </li>
          <li>
            <GiSwapBag /> VIP?
          </li>
        </ul>
      </div>
      <hr />
      {product.affiliateLink ? (
        <div className="product-content__quality">
          <div className="product-content__cart btn-hover">
            <a
              href={product.affiliateLink}
              target="_blank"
              className="btn btn-fill-out btn-addtocart"
            >
              Buy Now
            </a>
          </div>
        </div>
      ) : (
        <Fragment>
          <div
            className={`${
              productContentButtonStyleClass
                ? productContentButtonStyleClass
                : "product-content__button-wrapper d-flex align-items-center"
            }`}
          >
            {/* first button */}
            <button
              onClick={() =>
                addToCart(
                  product,
                  addToast,
                  quantityCount,
                  selectedProductColor,
                  selectedProductSize
                )
              }
              disabled={productCartQty >= productStock}
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              <i className="icon-basket-loaded" /> Add To Cart
            </button>

            {/* second button */}
            <button
              className={`product-content__compare ${
                compareItem !== undefined ? "active" : ""
              }`}
              title={
                compareItem !== undefined
                  ? "Added to compare"
                  : "Add to compare"
              }
              onClick={
                compareItem !== undefined
                  ? () => deleteFromCompare(product, addToast)
                  : () => addToCompare(product, addToast)
              }
            >
              <i className="icon-shuffle" />
            </button>

            {/* third button */}
            <button
              className={`product-content__wishlist ${
                wishlistItem !== undefined ? "active" : ""
              }`}
              title={
                wishlistItem !== undefined
                  ? "Added to wishlist"
                  : "Add to wishlist"
              }
              onClick={
                wishlistItem !== undefined
                  ? () => deleteFromWishlist(product, addToast)
                  : () => addToWishlist(product, addToast)
              }
            >
              <i className="icon-heart" />
            </button>
          </div>
        </Fragment>
      )}
      <hr />
      <ul className="product-content__product-meta">
        <li>
          SKU: <span>{product.sku}</span>
        </li>
        <li>
          Category:
          {product.category &&
            product.category.map((item, index, arr) => {
              return (
                <Link
                  href="/shop/grid-left-sidebar"
                  as={"/shop/grid-left-sidebar"}
                  key={index}
                >
                  <a>{item + (index !== arr.length - 1 ? ", " : "")}</a>
                </Link>
              );
            })}
        </li>
        <li>
          Tags:
          {product.tag &&
            product.tag.map((item, index, arr) => {
              return (
                <Link
                  href="/shop/grid-left-sidebar"
                  as={"/shop/grid-left-sidebar"}
                  key={index}
                >
                  <a>{item + (index !== arr.length - 1 ? ", " : "")}</a>
                </Link>
              );
            })}
        </li>
      </ul>
      <div className="product-content__product-share space-mt--15">
        <span>Share:</span>
        <ul className="social-icons">
          <li>
            <a href="#">
              <IoLogoFacebook />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoTwitter />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoGoogleplus />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoYoutube />
            </a>
          </li>
          <li>
            <a href="#">
              <IoLogoInstagram />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EventDescription;
