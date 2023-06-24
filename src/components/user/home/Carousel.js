import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
////////     START  UI      ////////
import { Container, Carousel, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { ImagesBanner } from '../../../assets/Images';
import BannerRight from '../../../assets/images/bannerRight.jpg';
////////     END  UI      ////////

export default function CarouselComp() {
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Container fluid >
      <Row className='justify-content-evenly align-items-center'>
        <Col md={8} xs={7}>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {
              ImagesBanner.map((image) => (
                <Carousel.Item key={image.id}>
                  <img
                    className="d-block w-100"
                    src={image.banner}
                    alt="First slide"
                  />
                </Carousel.Item>
              ))
            }
          </Carousel>
        </Col>

        <Col md={3} xs={5} className="d-flex flex-column justify-content-around">
          <div>
            <img
              className="d-block"
              src={BannerRight}
              alt="First slide"
              width='80%'
            />
          </div>

          <Button className="w-100 my-4 fw-bold custom-btn_animate btn-animate"
            onClick={() => navigate('/products')}>
            <span style={{ fontSize: '18px' }}>Mua sắm</span>
          </Button>
        </Col>
      </Row >
    </Container>
  )
}
