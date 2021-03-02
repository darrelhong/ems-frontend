import { useEffect } from "react";
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
const MobileMenuNavEvntOrg = ({ getActiveStatus }) => {
  useEffect(() => {
    const offCanvasNav = document.querySelector(
      "#offcanvas-mobile-menu__navigation"
    );
    const offCanvasNavSubMenu = offCanvasNav.querySelectorAll(
      ".mobile-sub-menu"
    );
    const anchorLinks = offCanvasNav.querySelectorAll("a");

    for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
      offCanvasNavSubMenu[i].insertAdjacentHTML(
        "beforebegin",
        "<span class='menu-expand'><i></i></span>"
      );
    }

    const menuExpand = offCanvasNav.querySelectorAll(".menu-expand");
    const numMenuExpand = menuExpand.length;

    for (let i = 0; i < numMenuExpand; i++) {
      menuExpand[i].addEventListener("click", (e) => {
        sideMenuExpand(e);
      });
    }

    for (let i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener("click", () => {
        getActiveStatus(false);
      });
    }
  });

  const sideMenuExpand = (e) => {
    e.currentTarget.parentElement.classList.toggle("active");
  };
  return (
    <nav
      className="offcanvas-mobile-menu__navigation space-mb--30"
      id="offcanvas-mobile-menu__navigation"
    >
      <ul>
      <li>
          <Link href="/organiser/home">
            <a className="nav-link">
              HOME 
            </a>
          </Link>
        </li>

        <li>
          <Link href="/organiser/dashboard">
            <a className="nav-link">
              DASHBOARD 
            </a>
          </Link>
        </li>
        <li className="menu-item-has-children">
       
          <Link href="/">
            <a className="nav-link">
              EVENT
            </a>
          </Link>

          <ul className="mobile-sub-menu">
            <li>
              <Link href="/home/fashion-one">
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
              <Link href="/home/furniture-two">
                <a>View All VIP Business Partner</a>
              </Link>
            </li>
           
          </ul>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenuNavEvntOrg;
