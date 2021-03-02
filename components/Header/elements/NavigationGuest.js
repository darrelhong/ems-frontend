import Link from "next/link";
import { Col } from "react-bootstrap";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";

const NavigationGuest = ({ positionClass }) => {
  return (
    <nav className="navigation d-none d-lg-block">
      <ul
        className={`d-flex ${
          positionClass ? positionClass : "justify-content-end"
        }`}
      >
        <li>
          <Link href="/">
            <a className="nav-link">
              HOME 
            </a>
          </Link>
        </li>

        <li>
          <Link href="/">
            <a className="nav-link">
              EVENTS
            </a>
          </Link>
        </li>
        
      
       
      </ul>
    </nav>
  );
};

export default NavigationGuest;