import { IoIosClose } from "react-icons/io";
import MobileMenuSearch from "./MobileMenuSearch";
import MobileMenuNavEvntOrg from "./MobileMenuNavEvntOrg";
import MobileMenuWidgets from "./MobileMenuWidgets";

const MobileMenuEvntOrg = ({ activeStatus, getActiveStatus }) => {
  return (
    <div className={`offcanvas-mobile-menu ${activeStatus ? "active" : ""}`}>
      <div
        className="offcanvas-mobile-menu__overlay-close"
        onClick={() => getActiveStatus(false)}
      />
      <div className="offcanvas-mobile-menu__wrapper">
        <button
          className="offcanvas-mobile-menu__close"
          onClick={() => getActiveStatus(false)}
        >
          <IoIosClose />
        </button>
        <div className="offcanvas-mobile-menu__content-wrapper">
          <div className="offcanvas-mobile-menu__content">
            {/* mobile search */}
            <MobileMenuSearch />

            {/* mobile nav menu */}
            <MobileMenuNavEvntOrg getActiveStatus={getActiveStatus} />

          
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenuEvntOrg;
