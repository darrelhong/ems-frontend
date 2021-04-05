import { Row, Col } from 'react-bootstrap';
import { IoIosAddCircle } from 'react-icons/io';
import Link from 'next/link';

const VipPartnerHeader = ({
  getFilterSortParams,
  getLayout,
  layoutClass,
  layout,
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className="shop-header-area">
      <Row
        className={`align-items-center mb-4 pb-1 ${
          layoutClass ? layoutClass : ''
        }`}
      >
        <Col>
          <div className="shop-header">
            {/* <div className="shop-header__left"> */}
            {/* <select
                className="form-control form-control-sm"
                onChange={(e) =>
                  getFilterSortParams('filterSort', e.target.value)
                }
              >
                <option value="default">Default</option>
                <option value="priceHighToLow">Price - High to Low</option>
                <option value="priceLowToHigh">Price - Low to High</option>
              </select> */}
            {/* </div> */}

            <div>
              <input
                style={{
                  width: '20rem',
                  background: '#F2F1F9',
                  border: 'none',
                  padding: '0.5rem',
                }}
                value={searchTerm}
                placeholder="Search Business Partner"
                onChange={(e) => setSearchTerm(e.target.value)}
              ></input>
            </div>
            <div>
              <Link href="/organiser/view/partners">
                <span style={{ float: 'right' }}>
                  <button
                    className="btn btn-fill-out btn-sm"
                    name="Add"
                    value="Add"
                  >
                    Add VIP
                  </button>
                </span>
              </Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default VipPartnerHeader;
