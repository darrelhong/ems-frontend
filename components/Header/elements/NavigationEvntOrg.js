import Link from 'next/link';
import { Col } from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

const NavigationEvntOrg = ({ positionClass }) => {
  return (
    <nav className="navigation d-none d-lg-block">
      <ul
        className={`d-flex ${
          positionClass ? positionClass : 'justify-content-end'
        }`}
      >
        <li>
          <Link href="/organiser/home">
            <a className="nav-link">HOME</a>
          </Link>
        </li>

        <li>
          <Link href="/organiser/dashboard">
            <a className="nav-link">DASHBOARD</a>
          </Link>
        </li>

        <li>
          <Link href="/">
            <a className="nav-link">
              BROWSE USERS <IoIosArrowDown />
            </a>
          </Link>

          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link href="/organiser/view/partners">
                <a>View All Business Partners</a>
              </Link>
            </li>
            <li>
              <Link href="/organiser/view/organisers">
                <a>View All Event Organisers</a>
              </Link>
            </li>

            </ul>
        
        </li>

        <li>
          <Link href="/">
            <a className="nav-link">
              EVENT <IoIosArrowDown />
            </a>
          </Link>

          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link href="/organiser/events">
                <a>Manage My Events</a>
              </Link>
            </li>
            <li>
              <Link href="/home/fashion-two">
                <a>Manage Booths</a>
              </Link>
            </li>
            <li>
              <Link href="/home/furniture-one">
                <a>Manage Business Partner Booth Application</a>
              </Link>
            </li>
            <li>
              <Link href="/organiser/view-all-vip-partner-new">
                <a>View All VIP Business Partner</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationEvntOrg;
