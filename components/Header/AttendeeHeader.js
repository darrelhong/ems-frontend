import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IoIosSearch, IoIosMenu } from 'react-icons/io';
import AttendeeHeaderTop from './AttendeeHeaderTop';
import NavigationAttendee from './elements/NavigationAttendee';
import SearchOverlay from './elements/SearchOverlay';
import MobileMenuAttendee from './elements/MobileMenuAttendee';

const AttendeeHeader = ({ navPositionClass }) => {
  const [scroll, setScroll] = useState(0);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [offCanvasSearchActive, setOffCanvasSearchActive] = useState(false);
  const [offCanvasMobileMenuActive, setOffCanvasMobileMenuActive] = useState(
    false
  );

  useEffect(() => {
    const header = document.querySelector('.header-wrap');
    setHeaderHeight(header.offsetHeight);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <>
      {scroll > headerHeight && (
        <div style={{ height: 90, width: '100%' }}></div>
      )}
      <header
        className={`header-wrap header-with-topbar ${
          scroll > headerHeight ? 'is-sticky' : ''
        }`}
      >
        {/* header top */}
        <AttendeeHeaderTop />

        <div className="bottom-header dark-skin">
          <Container>
            <div className="bottom-header-container d-flex justify-content-between align-items-center position-relative">
              {/* logo */}
              <Link href="/attendee/home">
                <a className="navbar-brand">
                  <img src="/assets/images/event-stop-logo.png" alt="logo" />
                </a>
              </Link>

              {/* navigation */}
              <NavigationAttendee positionClass={navPositionClass} />

              {/* icons */}
              <ul className="header-icons d-flex">
                <li className="d-none d-lg-block">
                  <button
                    className="nav-link search-trigger"
                    onClick={() => {
                      setOffCanvasSearchActive(true);
                    }}
                  >
                    <IoIosSearch />
                  </button>
                </li>

                <li className="d-block d-lg-none">
                  <button
                    className="nav-link mobile-menu-trigger pr-0"
                    onClick={() => {
                      setOffCanvasMobileMenuActive(true);
                    }}
                  >
                    <IoIosMenu />
                  </button>
                </li>
              </ul>
            </div>
          </Container>
        </div>

        {/* search overlay */}
        <SearchOverlay
          activeStatus={offCanvasSearchActive}
          getActiveStatus={setOffCanvasSearchActive}
        />

        {/* mobile menu NEED TO EDIT THIS TO PARTNER*/}
        <MobileMenuAttendee
          activeStatus={offCanvasMobileMenuActive}
          getActiveStatus={setOffCanvasMobileMenuActive}
        />
      </header>
    </>
  );
};

AttendeeHeader.propTypes = {
  cartItems: PropTypes.array,
  navPositionClass: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};

export default connect(mapStateToProps)(AttendeeHeader);
