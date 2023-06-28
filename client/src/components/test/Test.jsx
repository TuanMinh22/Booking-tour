import React, { useState, useContext, useEffect } from 'react'
import './test.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'
import { AuthContext } from '../../context/AuthContext'

const Test = ({ room }) => {
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [guest, setGuest] = useState(1);
  const [bookingStatus, setBookingStatus] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (bookingStatus) {
      const timer = setTimeout(() => {
        setBookingStatus(null);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [bookingStatus]);

  return (
    <div className='booking'>
      {bookingStatus === 'success' && (
        <div className="booking__status success">Đặt thành công!</div>
      )}

      {bookingStatus === 'failure' && (
        <div className="booking__status failure">Đặt thất bại. Làm ơn thử lại.</div>
      )}
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>{room.roomPrice ? room.roomPrice.toLocaleString() : ""} đ <span>/ Phòng</span></h3>
      </div>
      <div className="booking__form">
        <h5>Thông tin</h5>
        <Form className='booking__info-form'>
          <FormGroup>
            <input type="text" placeholder='Full Name' id='fullName' value={`${user.firstName} ${user.lastName}`} required />
          </FormGroup>
          <FormGroup>
            <input type="tel" placeholder='Phone' id='phone' value={user.Phone} required />
          </FormGroup>
          <FormGroup className='d-flex align-items-center gap-3'>
            <input type="date" placeholder='' id='bookAt' required onChange={(e) => setCheckIn(e.target.value)} />
            <input type="date" placeholder='' id='bookAt' required onChange={(e) => setCheckOut(e.target.value)} />

          </FormGroup>
          <FormGroup>
            <input type="number" placeholder='Guest' id='guestSize' required onChange={(e) => setGuest(e.target.value)} />
          </FormGroup>
        </Form>
      </div>

      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center gap-1'>{room.roomPrice ? room.roomPrice.toLocaleString() : ""} đ<i className='ri-close-line'></i> Phòng</h5>
            <span> {room.roomPrice ? room.roomPrice.toLocaleString() : ""} đ</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 total'>
            <h5>Tổng tiền</h5>
            <span>{room.roomPrice ? room.roomPrice.toLocaleString() : ""} đ</span>
          </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4'>Đặt</Button>
      </div>
    </div>
  )
}

export default Test