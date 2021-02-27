import { Fragment, useState } from "react";
import {
  IoMdWifi,
  IoIosBody,
  IoMdStar, //vip
  IoMdStarOutline,
  IoMdCloudDownload, //publish and unpublish
  IoMdCloudUpload,
  IoMdEye, //hide and unhide
  IoMdEyeOff,
  IoMdCalendar,
  IoMdLocate,
  IoMdCreate
} from "react-icons/io";
import ProductRating from "../../Product/ProductRating";
import Link from 'next/link';

const EventDescription = ({
  event,
  prettyStartDate,
  prettyEndDate,
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
      {/* event name originally here */}
      {/* <h2 className="product-content__title space-mb--10">{event.name}</h2> */}
      <div className="product-content__price-rating-wrapper space-mb--10">
        <h2 className="product-content__title space-mb--10">{event.name}</h2>
        {/* <div className="product-content__price d-flex-align-items-center">
          <span className="price">{prettyStartDate}</span>
        </div> */}

        {/* CONDITIONAL RENDERING CHECK WHETHER EVENT IS COMPLETED THEN SHOW THIS */}
        {/* {event.rating && event.rating == 0 ? ( */}
        <div className="product-content__rating-wrap">
          <div className="product-content__rating">
            <ProductRating ratingValue={event.rating} />
            <span>(0)</span> {/* we hardcode 0 ratings for now */}
          </div>
        </div>
        {/*  ) : (
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
              <IoIosBody />Physical Event
            </li>

          ) : (
              <li>
                <IoMdWifi />Online Event
              </li>
            )}
          <li>
            <IoMdLocate />Event Location: {event.address}
          </li>
          <li>
            <IoMdCalendar />{prettyStartDate} to {prettyEndDate}
          </li>
          {/* {event.vip && (
            <li>
              < IoMdStar onClick={vipToggle} />VIP event
            </li>
          )}
          {event.hidden ? (
            <li>
              <IoMdEye title="Unhide your event from attendees!" onClick={hideToggle} />Hidden from attendees
            </li>
          ) : (
              <li>
                <IoMdEyeOff title="Temporarily hide your event from attendees" onClick={hideToggle} />Open for attendees to view!
              </li>
            )}
          {event.published ? (
            <li>
              <IoMdCloudDownload title="Temporarily unpublish your event from business partners!" onClick={publishToggle} />Open for business partners to view!
            </li>
          ) : (
              <li>
                <IoMdCloudUpload title="Publish your event for business partners to see!" onClick={publishToggle} />Event is unpublished, business partners won't find your event
              </li>
            )} */}

        </ul>
      </div>
      <hr />

      <Fragment>
        <div>
        <div className="product-content__product-share space-mt--15" style={{ display: 'flex', justifyContent: 'flex-end' }}>
            {/* <span>Actions:</span> */}
            <ul className="social-icons">
              <li>
                <a href="javascript:void(0);" onClick={vipToggle}>
                  {/* <IoLogoFacebook  /> */}
                  {event.vip ? (
                    <IoMdStarOutline title="Unlist event from VIP" />
                  ) :
                    (<IoMdStar title="Make this a VIP-only event!" />)}
               </a>
              </li>
              <li>
                <a href="javascript:void(0);" onClick={hideToggle}>
                  {event.hidden ? (
                    <IoMdEye title="Unhide your event from attendees!" />
                  ) : (
                      <IoMdEyeOff title="Temporarily hide your event from attendees" />
                    )}
                </a>
              </li>
              <li>
                <a href="javascript:void(0);" onClick={publishToggle}>
                  {event.published ? (
                    <IoMdCloudDownload title="Temporarily unpublish your event from business partners!" />
                  ) : (
                      <IoMdCloudUpload title="Publish your event for business partners to see!" />
                    )}
                </a>
              </li>
              <li>
                <Link href={`/organiser/events/create?eid=${event.eid}`}>
                  <a>
                    <IoMdCreate />
                  </a>
                </Link>
              </li>
            </ul>
            <button
              onClick={publishToggle}
              className="btn btn-fill-out btn-addtocart space-ml--10"
              style={{ marginLeft: 'auto', marginRight: 'auto' }}
            >
              <i className="icon-basket-loaded" /> Cancel Event
            </button>
          </div>


          {/* three ugly ass buttons */}
          {/* {event.published ?

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
          } */}
        </div>
      </Fragment>
      <hr />
      {/* <div className="product-content__product-share space-mt--15">
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
      </div> */}
    </div>
  );
};

export default EventDescription;
