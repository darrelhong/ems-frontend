import {
  IoIosPhonePortrait,
  IoMdMail,
  IoLogoTwitter,
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoPinterest,
  IoMdPerson
} from "react-icons/io";
import { AiOutlineUser, AiOutlineSetting, AiOutlineLogout, AiOutlineNotification } from 'react-icons/ai';

import Link from "next/link";

const MobileMenuWidgets = () => {
  return (
    <div className="offcanvas-mobile-menu__widgets space-mb--30">
      <div className="contact-widget space-mb--30">
        <ul>
          <li>
          <AiOutlineNotification />
          <Link href="/other/wishlist">
              <a>Notification</a>
            </Link>
          </li>
          <li>
          <AiOutlineUser />
          <Link href="/other/wishlist">
              <a>Profile</a>
            </Link>
          </li>
          <li>
          <AiOutlineSetting />
          <Link href="/other/wishlist">
              <a>Settings</a>
            </Link>
          </li>
          <li>
           <AiOutlineLogout/>
          <a onClick={() => logout({ redirectTo: '/organiser/login' })}>
              <a>Log out</a>
            </a>
          </li>
        </ul>
      </div>

      {/* <div className="social-widget">
        <a href="https://www.twitter.com" target="_blank">
          <IoLogoTwitter />
        </a>
        <a href="https://www.instagram.com" target="_blank">
          <IoLogoInstagram />
        </a>
        <a href="https://www.facebook.com" target="_blank">
          <IoLogoFacebook />
        </a>
        <a href="https://www.pinterest.com" target="_blank">
          <IoLogoPinterest />
        </a>
      </div>  */}
    </div>
  );
};

export default MobileMenuWidgets;
