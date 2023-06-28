import React, { useState, useContext, useEffect } from 'react'
import './booking.css'
import { Form, FormGroup, ListGroup, ListGroupItem, Button } from 'reactstrap'

import { redirect, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios';

const Booking = ({ tour, avgRating }) => {
  const { Tour_price, Tour_ID, tourType, Date_end } = tour
  const navigate = useNavigate()
  const [fullName, setFullName] = useState("");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(1);
  const [bookingStatus, setBookingStatus] = useState(null);
  const { user } = useContext(AuthContext);
  const [minDate, setMinDate] = useState("");


  const expectedAmount = Number(Tour_price) * Number(amount);
  const serviceFee = 500000
  const totalAmount = Number(expectedAmount) + Number(serviceFee)
  const occupanies = Number(tour.Occupany) - Number(amount);

  useEffect(() => {
    const today = new Date();
    let minDays = 7; // Mặc định cách 1 tuần (7 ngày)

    if (tourType === 2) {
      minDays = 14; // Nếu tourType = 2, cách 2 tuần (14 ngày)
    }
    today.setDate(today.getDate() + minDays);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setMinDate(formattedDate);
  }, [tourType]);


  const handleClick = async e => {
    e.preventDefault()

    try {
      const Ndate = new Date(date);
      const year = Ndate.getFullYear();
      const month = String(Ndate.getMonth() + 1).padStart(2, "0");
      const day = String(Ndate.getDate()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      const res = await axios.post("/booking/create", {
        Customer_ID: user.Customer_ID,
        Tour_ID: Tour_ID,
        numPerson: Number(amount),
        DateOfBooking: formattedDate,
        amount: totalAmount,
        Methodology: 1,
        Status: 2,
        Occupany: occupanies
      });

      console.log(res.data);
      setBookingStatus('success');
      res && navigate('/history');
    } catch (error) {
      alert(error.message)
    }
  }

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
        <h3>{Date_end ? Tour_price.toLocaleString() : ""} đ <span>/ người</span></h3>
        <span className="tour__rating d-flex align-items-center">
          <i class='ri-star-fill' style={{ 'color': 'var(--secondary-color)' }}></i>
          {avgRating === 0 ? null : avgRating}
        </span>
      </div>

      {/* =============== BOOKING FORM START ============== */}
      <div className="booking__form">
        <h5>Thông tin người đặt</h5>
        <Form className='booking__info-form' onSubmit={handleClick}>
          <FormGroup>
            <input type="text" placeholder='Full Name' id='fullName' required value={`${user.firstName} ${user.lastName}`}
              onChange={(e) => setFullName(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <input type="tel" placeholder='Phone' id='phone' required value={user.Phone}
            />
          </FormGroup>
          <FormGroup className='d-flex align-items-center gap-3'>
            <input type="date" placeholder='' id='Date' required
              min={minDate}
              onChange={(e) => setDate(e.target.value)} />
            <input type="number" placeholder='Guest' id='amount' min="0" required
              onChange={(e) => setAmount(e.target.value)} />
          </FormGroup>
        </Form>
      </div>
      {/* =============== BOOKING FORM END ================ */}

      {/* =============== BOOKING BOTTOM ================ */}
      <div className="booking__bottom">
        <ListGroup>
          <ListGroupItem className='border-0 px-0'>
            <h5 className='d-flex align-items-center gap-1'>{Tour_price ? Tour_price.toLocaleString() : ""} đ <i class='ri-close-line'></i> {amount} người</h5>
            <span>{expectedAmount ? expectedAmount.toLocaleString() : ""} đ</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0'>
            <h5>Phí dịch vụ</h5>
            <span>{serviceFee} đ</span>
          </ListGroupItem>
          <ListGroupItem className='border-0 px-0 total'>
            <h5>Tổng tiền</h5>
            <span>{totalAmount ? totalAmount.toLocaleString() : ""} đ</span>
          </ListGroupItem>
        </ListGroup>

        <Button className='btn primary__btn w-100 mt-4' onClick={handleClick} disable={tour.Occupany === 0}>Đặt Ngay</Button>
      </div>
    </div>
  )
}

export default Booking