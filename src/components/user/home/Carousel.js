import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
////////     START  UI      ////////
import { Container, Carousel, Col, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

import { ImagesBanner } from '../../../assets/Images';
import BannerRight from '../../../assets/images/bannerRight.jpg';
import { Grid } from '@mui/material';
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
        <Col md={8} xs={12}>
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

        <Col md={3} xs={12}>
          <Row className='justify-content-evenly align-items-center'>
            <Col md={12} xs={6}>
              <img
                className="d-block"
                src={BannerRight}
                alt="First slide"
                width='80%'
              />
            </Col>

            <Col md={12} xs={6}>
              <Button className="w-100 fw-bold custom-btn_animate btn-animate"
                onClick={() => navigate('/products')}>
                <span style={{ fontSize: '18px' }}>KHÁM PHÁ</span>
              </Button>
            </Col>
          </Row>
        </Col>
      </Row >
    </Container>
  )
}
