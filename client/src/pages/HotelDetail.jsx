import React, { useState, useRef, useEffect, useContext } from 'react'
import '../styles/hotel-detail.css'
import Newsletter from '../shared/Newsletter'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { Col, Container, Row, Card, CardImg, CardTitle, CardSubtitle, CardBody } from 'reactstrap'
import RoomDetail from './RoomDetail'


const HotelDetails = () => {
  const [info, setInfo] = useState({});
  const [room, setRoom] = useState([])
  const param = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/hotels/${param.id}`);
      console.log(res.data);
      setInfo(res.data);
    }

    fetchData();
  }, [param.id]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/rooms/getRoom/${param.id}`);
      console.log(res.data.data);
      setRoom(res.data.data);
    }

    fetchData();
  }, [param.id])

  return (
    <section>
      <Container>
        <Row>
          <Col lg='12'>
            <div className="tour__content">
              <img src={info.img} alt="this is a hotel" />

              <div className="tour__info">
                <h2>{info.HotelName}</h2>

                <div className="tour__extra-details">
                  <span><i className='ri-map-pin-fill'></i> {info.name}</span>
                  <span><i class="ri-customer-service-line"></i> {info.Phone}</span>
                </div>
                <div className="tour__extra-details">
                  <div className="tour__detail">
                    <h5>Một kỳ nghỉ tuyệt vời</h5>
                    <p>Vị trí phòng đẹp, khung cảnh đẹp. Cảm ơn Mytour đã kết nối.</p>
                  </div>
                  <div className="tour__detail1">
                    <h5>Tiện nghi khách sạn</h5>
                    <div>
                      <i class="ri-global-line"></i>
                      <p>American Express</p>
                    </div>
                    <div>
                      <i class="ri-luggage-cart-line"></i>
                      <p>Giữ hành lý</p>
                    </div>
                    <div>
                      <i class="ri-user-line"></i>
                      <p>Lễ tân 24h</p>
                    </div>
                    <div>
                      <i class="ri-phone-line"></i>
                      <p>Trợ giúp đặc biệt</p>
                    </div>
                    <div>
                      <i class="ri-ie-line"></i>
                      <p>Internet miễn phí.</p>
                    </div>
                    <div>
                      <i class="ri-file-list-3-line"></i>
                      <p>Spa</p>
                    </div>
                    <div>
                      <i class="ri-layout-3-line"></i>
                      <p>Hồ bơi ngoài trời</p>
                    </div>
                    <div className="detail-layout">
                      <p>+28</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="tour__reviews mt-4">
              <Row>
                <Col lg="12" md="12" sm="12" xs="12">
                  <Row>
                    {
                      room.map((m) => (
                        <Col lg="3" md="6">
                          <Card>
                            <div className="tour__img">
                              <img src={m.urlImg[0]} />
                              <span>Nổi bật</span>
                            </div>

                            <CardBody>
                              <div className="card__top d-flex align-items-center justify-content-between">
                                <span className="tour__location d-flex align-items-center gap-1">
                                  <i class='ri-map-pin-line'></i> Phú Quốc
                                </span>
                              </div>

                              <h5 className='tour__title' style={{ height: '80px' }}><Link to={`/rooms/`}>{m.roomName}</Link></h5>

                              <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
                                <h5>{m.roomPrice.toLocaleString()} đ <span> /phòng</span></h5>
                                <Link to={`/rooms/${m.roomId}`}>
                                  <button className=' booking__btn'>Đặt Phòng</button>
                                </Link>
                              </div>
                            </CardBody>
                          </Card>
                        </Col>
                      ))
                    }
                  </Row>
                </Col>
                <Col lg='12'>
                  <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                    <span
                      className="active__page"
                    >
                      1
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
      <Newsletter />
    </section>
  )
}

export default HotelDetails