import { Fragment, useState } from "react";
import { AiOutlineReload } from "react-icons/ai";
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoGoogleplus,
  IoLogoYoutube,
  IoLogoInstagram,
  IoMdWifi,
  IoIosBody,
  IoMdStar
} from "react-icons/io";

const EventDescription = ({
  event,
  prettyStartDate,
  publishToggle,
  hideToggle,
  vipToggle
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
          {/* <span className="price">{event.eventStartDate}</span>  */}
          <span className="price">{prettyStartDate}</span> {/* keep this part */}
        </div>

        {/* for now comment out  */}

        {/* {product.rating && product.rating > 0 ? (
          <div className="product-content__rating-wrap">
            <div className="product-content__rating">
              <ProductRating ratingValue={product.rating} />
              <span>({product.ratingCount})</span>
            </div>
          </div>
        ) : (
          ""
        )} */}
      </div>
      <div className="product-content__description space-mb--20">
        <p>{event.descriptions}</p>
      </div>

      <div className="product-content__sort-info space-mb--20">
        <ul>
          {event.physical ? (
            <li>
              <IoIosBody /> Physical Event
            </li>
          ) : (
              <li>
                <IoMdWifi /> Online Event
              </li>
            )}
          <li>
            <AiOutlineReload /> Event Location: {event.address}
          </li>

          {event.vip ? (
            <li>
              < IoMdStar /> Undo VIP
            </li>
          ) : (
              <li>
                < IoMdStar /> Make Event VIP
              </li>)}
        </ul>
      </div>
      <hr />

      <Fragment>
        <div
        // className={`${productContentButtonStyleClass
        //   ? productContentButtonStyleClass
        //   : "product-content__button-wrapper d-flex align-items-center"
        //   }`}
        >
          {/* first button */}
          <button
            // onClick={() =>
            //   addToCart(
            //     product,
            //     addToast,
            //     quantityCount,
            //     selectedProductColor,
            //     selectedProductSize
            //   )
            // }
            // disabled={productCartQty >= productStock}
            className="btn btn-fill-out btn-addtocart space-ml--10"
          >
            <i className="icon-basket-loaded" /> Edit
          </button>

          {event.published ?

            (<button
              onClick={publishToggle}
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              <i className="icon-basket-loaded" /> Unpublish Event
            </button>)
            :
            (<button
              onClick={publishToggle}
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              <i className="icon-basket-loaded" /> Publish Event
            </button>)
          }

          {event.hidden ?

            (<button
              onClick={hideToggle}
              title="Unhide your event from attendees!"
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              <i className="icon-basket-loaded" /> Unhide Event
            </button>)
            :
            (<button
              onClick={hideToggle}
              title="Hide your event from attendees from now"
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              <i className="icon-basket-loaded" /> Hide Event
            </button>)
          }


          {event.vip ? (
            <button
              onClick={vipToggle}
              className="btn btn-fill-out btn-addtocart space-ml--10"
            >
              <i className="icon-basket-loaded" /> Unlist from VIP
            </button>
          ) : (
              <button
                onClick={vipToggle}
                className="btn btn-fill-out btn-addtocart space-ml--10"
              >
                <i className="icon-basket-loaded" /> Make VIP
              </button>
            )
          }






          {/* second button */}
          <button
          // className={`product-content__compare ${compareItem !== undefined ? "active" : ""
          //   }`}
          // title={
          //   compareItem !== undefined
          //     ? "Added to compare"
          //     : "Add to compare"
          // }
          // onClick={
          //   compareItem !== undefined
          //     ? () => deleteFromCompare(product, addToast)
          //     : () => addToCompare(product, addToast)
          // }
          >
            <i className="icon-shuffle" />
          </button>

          {/* third button */}
          <button
          // className={`product-content__wishlist ${wishlistItem !== undefined ? "active" : ""
          //   }`}
          // title={
          //   wishlistItem !== undefined
          //     ? "Added to wishlist"
          //     : "Add to wishlist"
          // }
          // onClick={
          //   wishlistItem !== undefined
          //     ? () => deleteFromWishlist(product, addToast)
          //     : () => addToWishlist(product, addToast)
          // }
          >
            <i className="icon-heart" />
          </button>
        </div>
      </Fragment>
      <hr />
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
