import React from 'react'
import './newsletter.css'
import { Container, Row, Col } from 'reactstrap'
import maleTourist from '../assets/images/male-tourist.png'

const NewsLetter = () => {
  return (
    <section className='newsletter'>
      <Container>
        <Row>
          <Col lg='6'>
            <div className="newsletter__content">
              <h2>Đăng ký ngay để nhận thông tin du lịch hữu ích</h2>

              <div className="newsletter__input">
                <input type="email" placeholder='Nhập Email' />
                <button className="btn newsletter__btn">Đăng ký</button>
              </div>
              <p>Hãy gửi cho chúng tôi cảm nghĩ của bạn về chúng tôi
              </p>
            </div>
          </Col>
          <Col lg='6'>
            <div className="newsletter__img">
              <img src={maleTourist} alt="" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default NewsLetter