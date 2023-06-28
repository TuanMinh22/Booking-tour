import React from 'react'
import './footer.css'
import { Container, Row, Col, ListGroup, ListGroupItem } from 'reactstrap'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/logo.png'

const quick__links = [
  {
    path: '/home',
    display: 'Trang chủ'
  },
  {
    path: '/about',
    display: 'Khách sạn'
  },
  {
    path: '/tours',
    display: 'Tours'
  },
]

const quick__links2 = [
  {
    path: '/gallery',
    display: 'Trưng bày'
  },
  {
    path: '/login',
    display: 'Đăng nhập'
  },
  {
    path: '/register',
    display: 'Đăng ký'
  },
]

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className='footer'>
      <Container>
        <Row>
          <Col lg='3'>
            <div className="logo">
              <Link to='/'>
                <div className="logo">
                  <span>𝓜𝓲𝓷𝓱 𝓟𝓱𝓾̛𝓸̛𝓷𝓰</span>
                </div>
              </Link>
              <p>Khám phá thế giới với trang web booking tour của chúng tôi - nơi tận hưởng hành trình đáng nhớ và trải nghiệm du lịch tuyệt vời.</p>
              <div className="social__link d-flex align-items-center gap-4">
                <span>
                  <Link to='#'>
                    <i class='ri-youtube-line'></i>
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                    <i class='ri-github-fill'></i>
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                    <i class='ri-facebook-circle-line'></i>
                  </Link>
                </span>
                <span>
                  <Link to='#'>
                    <i class='ri-instagram-line'></i>
                  </Link>
                </span>
              </div>
            </div>
          </Col>

          <Col lg='3'>
            <h5 className="footer__link-title">Phát hiện</h5>

            <ListGroup className='footer__quick-links'>
              {
                quick__links.map((item, index) => (
                  <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Đường dẫn nhanh</h5>

            <ListGroup className='footer__quick-links'>
              {
                quick__links2.map((item, index) => (
                  <ListGroupItem key={index} className='ps-0 border-0'>
                    <Link to={item.path}>{item.display}</Link>
                  </ListGroupItem>
                ))
              }
            </ListGroup>
          </Col>
          <Col lg='3'>
            <h5 className="footer__link-title">Liên hệ</h5>

            <ListGroup className='footer__quick-links'>
              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i class='ri-map-pin-line'></i></span>
                  Address:
                </h6>
                <p className='mb-0'>Ha Noi</p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i class='ri-mail-line'></i></span>
                  Email:
                </h6>

                <p className='mb-0'>nguyentuanminh.cn@gmail.com</p>
              </ListGroupItem>

              <ListGroupItem className='ps-0 border-0 d-flex align-items-center gap-3'>
                <h6 className='mb-0 d-flex align-items-center gap-2'>
                  <span><i class='ri-phone-fill'></i></span>
                  Phone:
                </h6>

                <p className='mb-0'>0365350342</p>
              </ListGroupItem>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer