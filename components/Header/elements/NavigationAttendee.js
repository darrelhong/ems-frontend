import Link from 'next/link';
import { IoIosArrowDown } from 'react-icons/io';

const NavigationAttendee = ({ positionClass }) => {
  return (
    <nav className="navigation d-none d-lg-block">
      <ul
        className={`d-flex ${
          positionClass ? positionClass : 'justify-content-end'
        }`}
      >
        <li>
          <Link href="/attendee/home">
            <a className="nav-link">HOME</a>
          </Link>
        </li>

        <li>
          <Link href="/">
            <a className="nav-link">
              TICKETS <IoIosArrowDown />
            </a>
          </Link>

          <ul className="sub-menu sub-menu--one-column">
            <li>
              <Link href="/home/fashion-one">
                <a>Manage My Tickets</a>
              </Link>
            </li>
            <li>
              <Link href="/home/fashion-two">
                <a>Manage Participated Events</a>
              </Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default NavigationAttendee;
