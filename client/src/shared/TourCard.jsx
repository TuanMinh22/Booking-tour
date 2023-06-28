import React, { useEffect, useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import './tour-card.css'
import calculateAvgRating from '../utils/avgRating'
import axios from 'axios'

const TourCard = ({ tour }) => {

  // const { _id, title, city, photo, price, featured, reviews } = tour

  const [review, setReview] = useState([])
  const { totalRating, avgRating } = calculateAvgRating(review)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`/reviews/tour/${tour.Tour_ID}`);
        setReview(res.data);
        console.log(tour);
      } catch (err) {
        console.log(err)
      }
    };
    fetchData();
  }, [tour.Tour_ID]);

  return (
    <div className='tour__card'>
      <Card>
        <div className="tour__img">
          <img src={tour.urlImg[0]} />
          <span>{avgRating > 4 ? 'Nổi bật' : ''}</span>
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i class='ri-map-pin-line'></i> {tour.addressName}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i class='ri-star-fill'></i> {avgRating}
              <span>({review.length})</span>
            </span>
          </div>

          <h5 className='tour__title' style={{ height: '80px' }}><Link to={`/tours/`}>{tour.nameTour}</Link></h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>{tour.tourPrice.toLocaleString()} đ <span> /người</span></h5>
            <Link to={`/tours/${tour.Tour_ID}`}>
              <button className=' booking__btn'>Đặt Ngay</button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  )


}

export default TourCard