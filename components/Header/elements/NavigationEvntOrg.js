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
            <a className="nav-link" style={{ color: '#292b2c' }}>
              HOME
            </a>
          </Link>
        </li>

        <li>
          <a className="nav-link" style={{ color: '#292b2c' }}>
            DASHBOARD
          </a>

          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link href="/organiser/dashboard">
                <a>Booth Application Dashboard</a>
              </Link>
            </li>
            <li>
              <Link href="/organiser/ticketDashboard">
                <a>Event Ticket Dashboard</a>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <a className="nav-link" style={{ color: '#292b2c' }}>
            BROWSE USERS <IoIosArrowDown />
          </a>

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
          <a className="nav-link" style={{ color: '#292b2c' }}>
            EVENT <IoIosArrowDown />
          </a>

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
