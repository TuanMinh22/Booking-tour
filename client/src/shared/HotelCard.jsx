import React, { useEffect, useState } from 'react'
import { Card, CardBody } from 'reactstrap'
import { Link } from 'react-router-dom'
import './hotel-card.css'
import axios from 'axios'

const HotelCard = ({ hotel }) => {
  const [review, setReview] = useState([])

  return (
    <div className='tour__card'>
      <Card>
        <div className="tour__img">
          <img src={hotel.img} />
          <span>Nổi bật</span>
        </div>

        <CardBody>
          <div className="card__top d-flex align-items-center justify-content-between">
            <span className="tour__location d-flex align-items-center gap-1">
              <i class='ri-map-pin-line'></i> {hotel.name}
            </span>
            <span className="tour__rating d-flex align-items-center gap-1">
              <i class='ri-star-fill'></i> 4
              <span>(3)</span>
            </span>
          </div>

          <h5 className='tour__title' style={{ height: '80px' }}><Link to={`/hotels/`}>{hotel.HotelName}</Link></h5>

          <div className="card__bottom d-flex align-items-center justify-content-between mt-3">
            <h5>{hotel.Phone}</h5>
            <Link to={`/hotels/${hotel.Hotel_ID}`}>
              <button className=' booking__btn'>Đặt Ngay</button>
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  )


}

export default HotelCard