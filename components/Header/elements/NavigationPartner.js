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
          <Link href="/">
            <a className="nav-link">
              BOOTH <IoIosArrowDown />
            </a>
          </Link>

          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link href="/partner/seller-profile">
                <a>Manage Booths</a>
              </Link>
            </li>
            <li>
              <Link href="/home/fashion-two">
                <a>Manage Products</a>
              </Link>
            </li>
            <li>
              <Link href="/home/furniture-one">
                <a>Manage Applications</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationPartner;
