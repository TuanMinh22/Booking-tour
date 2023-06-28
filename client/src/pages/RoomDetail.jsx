import React, { useState, useRef, useEffect, useContext } from 'react'
import '../styles/tour-details.css'
import { Container, Row, Col, Form, ListGroup } from 'reactstrap'
import calculateAvgRating from '../utils/avgRating'
import Booking from '../components/Booking/Booking'
import Newsletter from '../shared/Newsletter'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Test from '../components/test/Test'

const RoomDetails = () => {
  const { user } = useContext(AuthContext)

  const options = { day: 'numeric', month: 'long', year: 'numeric' }

  const param = useParams();
  const [info, setInfo] = useState({});
  const [review, setReview] = useState([]);
  const [cmt, setCmt] = useState("");
  const { totalRating, avgRating } = calculateAvgRating(review)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/rooms/${param.id}`);
        setInfo(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [param.id]);

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [info])

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8'>
            <div className="tour__content">
              {
                info.urlImg && (
                  <>
                    <Carousel showThumbs={false}>
                      {info.urlImg.map((url, index) => (
                        <div key={index}>
                          <img src={url} alt={`Slide ${index + 1}`} />
                        </div>
                      ))}
                    </Carousel>
                  </>
                )}
              <div className="tour__info">
                <h2>{info.roomName}</h2>
                <div className="d-flex align-items-center gap-5">
                  {/* <span className="tour__rating d-flex align-items-center gap-1">
                  </span> */}

                  <span><i className='ri-map-pin-fill'></i> Phú Quốc</span>
                </div>

                <div className="tour__extra-details">
                  <span><i className='ri-map-pin-2-line'></i> Ha Noi</span>
                  <span><i className='ri-money-dollar-circle-line'></i> {info.roomPrice ? info.roomPrice.toLocaleString() : ""} đ / Phòng</span>
                  <span><i className='ri-map-pin-time-line'></i> 250 k/m</span>
                  <span><i className='ri-group-line'></i> {info.Occupany} người</span>
                </div>

                {/* <div className="tour__extra-details">
                  <span>Thời gian: <b>{info.time} ngày {info.time - 1} đêm</b></span>
                  <span>Phương tiện: <b>Máy bay VietJet</b></span>
                  <span>Khời hành: <b>nhiều ngày khời hành</b></span>
                </div> */}
              </div>

            </div>
          </Col>

          <Col lg='4'>
            <Test room={info} />
          </Col>
        </Row>
      </Container>
      <Newsletter />
    </section>

  )
}

export default RoomDetails