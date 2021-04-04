import { format, parseISO } from 'date-fns';
import { Container, Row, Col } from 'react-bootstrap';
import Swiper from 'react-id-swiper';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useState } from 'react';

const HeroSliderPopularEvents = ({ heroSliderData }) => {

  const params = {
    loop: true,
    speed: 1000,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    watchSlidesVisibility: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <FiChevronLeft />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <FiChevronRight />
      </button>
    ),
  };
  return (
    <div className="hero-slider" style={{margin: "-14px"}}>
      <div className="hero-slider__wrapper">
        <Swiper {...params}>
          {heroSliderData &&
            heroSliderData.map((single, key) => {
              return (
                <div style={{padding: "14px"}} key={key}>
                    <Container style={{borderRadius: "12px"}}>
                        <Row style={{backgroundColor: "#fff5f5", borderRadius: "inherit", boxShadow: "5px 4px 8px rgba(0,0,0,0.3)"}}>
                            <Col className="d-flex align-items-center" style={{padding: "30px 50px"}} lg={6} xs={12}>
                                <div className="d-flex flex-column justify-content-between w-100" style={{minHeight: "180px"}}>
                                    <div>
                                        <h2><strong>{single?.name}</strong></h2>
                                        <p className="text-default mt-auto">
                                            {format(parseISO(single?.eventStartDate), 'eee, dd MMM yy hh:mmbbb')}
                                        </p>
                                    </div>
                                    <a className="btn btn-fill-out w-100" href={`/partner/events/${single?.eid}`}>
                                        View Event Details
                                    </a>
                                </div>
                            </Col>
                            <Col style={{padding: "0", borderRadius: "12px", textAlign: "end"}} xs={12} lg={6}>
                                <img style={{borderRadius: "inherit"}} src={single?.images?.[0] || '/assets/images/img-placeholder.jpg'} />
                            </Col>
                        </Row>
                    </Container>
                </div>
              );
            })}
        </Swiper>
      </div>
    </div>
  );
};

export default HeroSliderPopularEvents;
