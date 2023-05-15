import React, { useState } from 'react'
import { Container, Carousel, Col, Row } from 'react-bootstrap';
import { ImagesBanner } from '../../../assets/Images'
import BannerRight_1 from '../../../assets/images/banner-2.jpg'
import BannerRight_2 from '../../../assets/images/banner-4.jpg'

export default function CarouselComp() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Container fluid>
      <Row className='justify-content-evenly'>
        <Col xs={8}>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            {
              ImagesBanner.map((image) => (
                <Carousel.Item>
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

        <Col xs={3} className="d-flex flex-column justify-content-around">
          <img
            className="d-block w-100"
            src={BannerRight_1}
            alt="First slide"
          />

          <img
            className="d-block w-100"
            src={BannerRight_2}
            alt="First slide"
          />
        </Col>
      </Row >
    </Container>
  )
}
