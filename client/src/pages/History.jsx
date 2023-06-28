import React, { useContext, useEffect, useState } from 'react';
import './OrderHistory.css'; // Import file CSS
import axios from 'axios';
import CommonSection from '../shared/CommonSection';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const { user } = useContext(AuthContext)

  const [info, setInfo] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    // Gọi API hoặc truy vấn cơ sở dữ liệu để lấy danh sách đơn đặt
    const fetchData = async () => {
      try {
        const res = await axios.get(`/booking/${user.Customer_ID}`);
        setInfo(res.data.data);
        console.log(res.data.data);
      } catch (err) {
        console.log(err)
      }
    };

    fetchData();
  }, []);

  const amountTotal = info.reduce((acc, item) => (item.Status === 2 ? acc + item.amount : acc + 0), 0);
  console.log(amountTotal)
  const handleClick = async () => {
    try {
      const res = await axios.post('/booking/momo1', {
        amount: 10000,
      });

      res && window.location.replace(res.data.payUrl);
    } catch (err) {
      console.log(err)
    }
  }

  const handleClick1 = async (id, tourId, amount) => {
    console.log(id);
    try {
      const res = await axios.put('/booking/updateStatus', {
        status: 1,
        id: id,
        tourId: tourId,
        amount: amount
      });

      res && window.location.reload();
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="order-history-container">
      <CommonSection title={"Lịch sử đơn đặt"} index={1} />
      {/* <h1 className="order-history-title">Lịch sử đơn đặt</h1> */}
      <table className="order-history-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>Tên Tour</th>
            <th>Thông tin Tour</th>
            <th>Giá tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {info.map((order, index = 0) => (
            <tr key={order.id}>
              <td>{index + 1}</td>
              <td>{order.nameTour}</td>
              <td>
                <p>Thời gian: {order.time} ngày {order.time - 1} đêm</p>
                <p>Địa điểm: {order.address}</p>
                <p>Thời gian dự kiến: {(new Date(order.Date_start)).toDateString()}</p>
                <p>Số người: {order.numPerson}</p>
              </td>
              <td>{order.amount.toLocaleString()} đ</td>
              <td style={{ width: '50px' }}>
                <button style={{ borderRadius: '10px' }} onClick={() => handleClick1(order.Booking_ID, order.Tour_ID, order.numPerson)}>{order.Status === 1 ? 'Đã hủy' : (order.Status === 2 ? 'Hủy' : 'Đã thanh toán')}</button>
                {/* {order.Status === 2 ? (
                  <button style={{ borderRadius: '10px', marginLeft: '10px' }} onClick={handleClick}>Thanh toán</button>
                ) : ("")} */}
              </td>
            </tr>
          ))}
        </tbody>
        <tbody>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td>{amountTotal.toLocaleString()} đ</td>
            <td>
              <button style={{ borderRadius: '10px' }} onClick={handleClick}>Thanh toán</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;
