import { useEffect } from 'react';
import Link from 'next/link';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
const MobileMenuNavGuest = ({ getActiveStatus }) => {
  useEffect(() => {
    const offCanvasNav = document.querySelector(
      '#offcanvas-mobile-menu__navigation'
    );
    const offCanvasNavSubMenu = offCanvasNav.querySelectorAll(
      '.mobile-sub-menu'
    );
    const anchorLinks = offCanvasNav.querySelectorAll('a');

    for (let i = 0; i < offCanvasNavSubMenu.length; i++) {
      offCanvasNavSubMenu[i].insertAdjacentHTML(
        'beforebegin',
        "<span class='menu-expand'><i></i></span>"
      );
    }

    const menuExpand = offCanvasNav.querySelectorAll('.menu-expand');
    const numMenuExpand = menuExpand.length;

    for (let i = 0; i < numMenuExpand; i++) {
      menuExpand[i].addEventListener('click', (e) => {
        sideMenuExpand(e);
      });
    }

    for (let i = 0; i < anchorLinks.length; i++) {
      anchorLinks[i].addEventListener('click', () => {
        getActiveStatus(false);
      });
    }
  });

  const sideMenuExpand = (e) => {
    e.currentTarget.parentElement.classList.toggle('active');
  };
  return (
    <nav
      className="offcanvas-mobile-menu__navigation space-mb--30"
      id="offcanvas-mobile-menu__navigation"
    >
      <ul>
        <li>
          <Link href="/">
            <a className="nav-link">HOME</a>
          </Link>
        </li>

        <li>
          <Link href="/">
            <a className="nav-link">EVENTS</a>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileMenuNavGuest;
