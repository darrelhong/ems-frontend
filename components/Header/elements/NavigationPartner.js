import Link from 'next/link';
import { Col } from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';

const NavigationPartner = ({ positionClass }) => {
  return (
    <nav className="navigation d-none d-lg-block">
      <ul
        className={`d-flex ${positionClass ? positionClass : 'justify-content-end'
          }`}
      >
        <li>
          <Link href="/partner/home">
            <a className="nav-link">HOME</a>
          </Link>
        </li>
        <li>
          <a className="nav-link">
            BROWSE USERS <IoIosArrowDown />
          </a>

          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link href="/partner/view/partners">
                <a>View All Business Partners</a>
              </Link>
            </li>
            <li>
              <Link href="/partner/view/organisers">
                <a>View All Event Organisers</a>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href="/partner/events">
            <a className="nav-link">EVENTS</a>
          </Link>
        </li>

        <li>

          <a className="nav-link">
            BOOTH <IoIosArrowDown />
          </a>


          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link href="/partner/seller-profile">
                <a>Manage Booth Profiles</a>
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <Link href="/partner/products">
            <a className="nav-link">PRODUCTS</a>
          </Link>
        </li>
        
      </ul>
    </nav>
  );
};

export default NavigationPartner;
