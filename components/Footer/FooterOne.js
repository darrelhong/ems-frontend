import { Fragment, useState, useEffect } from 'react';
import Link from 'next/link';
import { Container, Row, Col } from 'react-bootstrap';
import { animateScroll } from 'react-scroll';
import {
  IoLogoFacebook,
  IoLogoTwitter,
  IoLogoGoogleplus,
  IoLogoYoutube,
  IoLogoInstagram,
  IoIosPhonePortrait,
  IoIosMailOpen,
  IoIosPin,
  IoIosArrowUp,
} from 'react-icons/io';
import { SubscribeEmail } from '../Newsletter';

const FooterOne = () => {
  const [scroll, setScroll] = useState(0);
  const [top, setTop] = useState(0);

  useEffect(() => {
    setTop(100);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    animateScroll.scrollToTop();
  };

  const handleScroll = () => {
    setScroll(window.scrollY);
  };

  return (
    <Fragment>
      {/* <div className="bg--default space-pt--60 space-pb--60">
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h3 className="newsletter-title text-white mb-md-0">
                Subscribe Our Newsletter
              </h3>
            </Col>
            <Col md={6}>
              <SubscribeEmail
                mailchimpUrl="https://devitems.us11.list-manage.com/subscribe/post?u=6bbb9b6f5827bd842d9640c82&amp;id=05d85f18ef"
                alertColor="#fff"
              />
            </Col>
          </Row>
        </Container>
      </div> */}

      <footer className="footer-dark">
        <div className="footer-top">
          <Container>
            <Row>
              <Col lg={3} md={6} sm={12}>
                <div className="widget">
                  <h6 className="widget-title">EventStop</h6>
                  {/* <div className="footer-logo">
                    <Link href="/">
                      <a>
                        <img src="/assets/images/event-stop-logo.png" alt="logo" />
                      </a>
                    </Link>
                  </div> */}
                  <p>Discover new events or Create your own event!</p>
                </div>
                <div className="widget">
                  <ul className="social-icons">
                    <li>
                      <a href="#">
                        <IoLogoFacebook />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <IoLogoTwitter />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <IoLogoGoogleplus />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <IoLogoYoutube />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <IoLogoInstagram />
                      </a>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={2} md={3} sm={6}>
                <div className="widget">
                  <h6 className="widget-title">Useful Links</h6>
                  <ul className="widget-links">
                    <li>
                      <Link href="/other/about-us">
                        <a>About Us</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/other/faq">
                        <a>FAQ</a>
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>

              <Col lg={3} md={4} sm={6}>
                <div className="widget">
                  <h6 className="widget-title">Contact Info</h6>
                  <ul className="contact-info contact-info-light">
                    <li>
                      <IoIosPin />
                      <p>123 Street, Old Trafford, New South London , UK</p>
                    </li>
                    <li>
                      <IoIosMailOpen />
                      <a href="mailto:info@sitename.com">info@sitename.com</a>
                    </li>
                    <li>
                      <IoIosPhonePortrait />
                      <p>+ 457 789 789 65</p>
                    </li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <button
          className={`scroll-top ${scroll > top ? 'show' : ''}`}
          onClick={() => scrollToTop()}
        >
          <IoIosArrowUp />
        </button>
      </footer>
    </Fragment>
  );
};

export default FooterOne;
