import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { IoIosSearch, IoIosMenu } from 'react-icons/io';
import OrganiserHeaderTop from './OrganiserHeaderTop';
import Navigation from './elements/NavigationEvntOrg';
import SearchOverlay from './elements/SearchOverlay';
import MobileMenuEvntOrg from './elements/MobileMenuEvntOrg';

const HeaderOne = ({ cartItems, navPositionClass }) => {
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
    <header
      className={`header-wrap header-with-topbar ${scroll > headerHeight ? 'is-sticky' : ''
        }`}
    >
      {/* header top */}
      <OrganiserHeaderTop />

      <div className="bottom-header dark-skin">
        <Container>
          <div className="bottom-header-container d-flex justify-content-between align-items-center position-relative">
            {/* logo */}
            <Link href="/">
              <a className="navbar-brand">
                <img
                  className="logo-light"
                  src="/assets/images/event-stop-logo.png"
                  alt="logo"
                />
                <img
                  className="logo-dark"
                  src="/assets/images/event-stop-logo.png"
                  alt="logo"
                />
              </a>
            </Link>

            {/* navigation */}
            <Navigation positionClass={navPositionClass} />

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

      {/* mobile menu */}
      <MobileMenuEvntOrg
        activeStatus={offCanvasMobileMenuActive}
        getActiveStatus={setOffCanvasMobileMenuActive}
      />
    </header>
  );
};

HeaderOne.propTypes = {
  cartItems: PropTypes.array,
  navPositionClass: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    cartItems: state.cartData,
  };
};

export default connect(mapStateToProps)(HeaderOne);
