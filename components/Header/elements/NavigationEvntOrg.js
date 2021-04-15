import Link from 'next/link';
import { Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import useUser from 'lib/query/useUser';

const NavigationEvntOrg = ({ positionClass }) => {
  const { data: user } = useUser();

  const notApprovedTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      {user?.supportDocsUrl
        ? 'Sorry, your appplication has not been vetted yet. We will get back to you soon!'
        : 'Please upload your verification documents in the Settings page!'}
    </Tooltip>
  );

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
            {user?.approved ? ( //approved then normal
              <li>
                <Link href="/organiser/events/create">
                  <a>Create New Event</a>
                </Link>
              </li>
            ) : (
              //else will be disabled with a tooltip
              <OverlayTrigger
                placement="left"
                delay={{ show: 250, hide: 400 }}
                overlay={notApprovedTooltip}
              >
                <li>
                  <Link href="/organiser/events/create">
                    <a
                      disabled
                      style={
                        true ? { pointerEvents: 'none', opacity: 0.6 } : null
                      }
                    >
                      Create New Event
                    </a>
                  </Link>
                </li>
              </OverlayTrigger>
            )}
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
              <Link href="/organiser/events/applications">
                <a>Manage Event Applications</a>
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
