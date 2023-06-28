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

const TourDetails = () => {
  const { user } = useContext(AuthContext)

  const options = { day: 'numeric', month: 'long', year: 'numeric' }

  const param = useParams();
  const [info, setInfo] = useState({});
  const [review, setReview] = useState([]);
  const [canCmt, setCanCmt] = useState([]);
  const [cmt, setCmt] = useState("");
  const [star, setStar] = useState(1);
  const { totalRating, avgRating } = calculateAvgRating(review)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/tours/${param.id}`);
        setInfo(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [param.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/reviews/tour/${param.id}`);
        setReview(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [param.id]);

  const handleClick = async (e) => {
    e.preventDefault()

    try {
      const res = await axios.post("/reviews/create", {
        Customer_ID: user.Customer_ID,
        Tour_ID: info.Tour_ID,
        Comments: cmt,
        serviceRating: star
      });

      console.log(res.data);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/booking/getBookingByCusATou/${user.Customer_ID}/${info.Tour_ID}`);
        setCanCmt(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [user.Customer_ID, info.Tour_ID]);

  const handleStarClick = (value) => {
    setStar(value);
    console.log(value);
  };

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
                <h2>{info.nameTour}</h2>
                <div className="d-flex align-items-center gap-5">
                  <span className="tour__rating d-flex align-items-center gap-1">
                    <i className='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i> {avgRating}
                  </span>

                  <span><i className='ri-map-pin-fill'></i> {info.addressName}</span>
                  <span><i class='ri-map-pin-line'></i> {info.tourType === 1 ? 'Tour trong nước' : 'Tour nước ngoài'}</span>

                </div>

                <div className="tour__extra-details">
                  <span><i className='ri-map-pin-2-line'></i> Ha Noi</span>
                  <span><i className='ri-money-dollar-circle-line'></i> {info.Tour_price ? info.Tour_price.toLocaleString() : ""} đ / per person</span>
                  <span><i className='ri-map-pin-time-line'></i> 250 k/m</span>
                  <span><i className='ri-group-line'></i> {info.Occupany} people</span>
                </div>

                <div className="tour__extra-details">
                  <span>Thời gian: <b>{info.time} ngày {info.time - 1} đêm</b></span>
                  <span>Phương tiện: <b>Máy bay VietJet</b></span>
                  <span>Khời hành: <b>nhiều ngày khời hành</b></span>
                </div>

                {info.include && (
                  <>
                    <h5>Bao gồm:</h5>
                    {info.include.split("\n").map((m) => <p><i className="ri-check-line" style={{ color: "green" }} ></i>  {m}</p>)}
                  </>
                )}
                {
                  info.uninclude && (
                    <>
                      <h5>Không bao gồm:</h5>
                      {info.uninclude.split("\n").map((m) => <p><i class="ri-close-line" style={{ color: "red" }}></i>{m}</p>)}
                    </>
                  )
                }
                {
                  info.des && (
                    <>
                      <h5>Lịch trình:</h5>
                      {info.des.map((m, i) => (
                        <>
                          <h5>Ngày {i + 1}</h5>
                          <p>{m}</p>
                        </>
                      ))}
                    </>
                  )
                }
              </div>

              <div className="tour__reviews mt-4">
                <h4>Nhận xét ({review.length} nhận xét)</h4>

                <Form>
                  {/* <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                    <span>1 <i className='ri-star-s-fill'></i></span>
                    <span>2 <i className='ri-star-s-fill'></i></span>
                    <span>3 <i className='ri-star-s-fill'></i></span>
                    <span>4 <i className='ri-star-s-fill'></i></span>
                    <span>5 <i className='ri-star-s-fill'></i></span>
                  </div> */}
                  <div className="d-flex align-items-center gap-3 mb-4 rating__group">
                    <span onClick={() => handleStarClick(1)}>1 <i className={star >= 1 ? 'ri-star-s-fill' : 'ri-star-s-line'}></i></span>
                    <span onClick={() => handleStarClick(2)}>2 <i className={star >= 2 ? 'ri-star-s-fill' : 'ri-star-s-line'}></i></span>
                    <span onClick={() => handleStarClick(3)}>3 <i className={star >= 3 ? 'ri-star-s-fill' : 'ri-star-s-line'}></i></span>
                    <span onClick={() => handleStarClick(4)}>4 <i className={star >= 4 ? 'ri-star-s-fill' : 'ri-star-s-line'}></i></span>
                    <span onClick={() => handleStarClick(5)}>5 <i className={star >= 5 ? 'ri-star-s-fill' : 'ri-star-s-line'}></i></span>
                  </div>
                  <div className="review__input">
                    <input type="text" placeholder='Bạn nghĩ gì?' required onChange={e => setCmt(e.target.value)} disabled={canCmt.length === 0} style={{ backgroundColor: 'white' }} />
                    <button className='btn primary__btn text-white' type='submit' onClick={handleClick}>
                      Gửi
                    </button>
                  </div>
                </Form>

                <ListGroup className='user__reviews'>
                  {
                    review.map((m) => (
                      <div className="review__item">
                        {
                          m.Image && <img src={m.Image} alt="" />
                        }

                        <div className="w-100">
                          <div className="d-flex align-items-center justify-content-between">
                            <div>
                              <h5>{`${m.firstName} ${m.lastName}`}</h5>
                              <p>{new Date(m.createAt).toLocaleDateString('en-US', options)}</p>
                            </div>

                            <span className='d-flex align-items-center'>
                              {m.serviceRating}<i className='ri-star-s-fill'></i>
                            </span>
                          </div>

                          <h6>{m.Comments}</h6>
                        </div>
                      </div>
                    ))
                  }
                </ListGroup>
              </div>
            </div>
          </Col>

          <Col lg='4'>
            <Booking tour={info} avgRating={avgRating} />
          </Col>
        </Row>
      </Container>
      <Newsletter />
    </section>

  )
}

export default TourDetails