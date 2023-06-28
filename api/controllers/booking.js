import { db } from "../database/index.js";
import axios from 'axios';
import querystring from 'qs'
import crypto from 'crypto';
import sha256 from 'sha256';
import dateFormat from 'dateformat'

//CREATE A Booking
export const createBooking = (req, res) => {
  const q = "INSERT INTO Booking(`Customer_ID`,`Tour_ID`,`numPerson`,`DateOfBooking`,`amount`,`Methodology`,`Status`) VALUES (?)";
  const values = [req.body.Customer_ID, req.body.Tour_ID, req.body.numPerson, req.body.DateOfBooking, req.body.amount, req.body.Methodology, req.body.Status];

  db.beginTransaction((err) => {
    if (err) {
      throw err;
    }

    db.query(q, [values], (err, data) => {
      if (err) {
        return db.rollback(() => {
          throw err;
        });
      }

      db.query('UPDATE tour SET Occupany = ? WHERE Tour_ID = ?', [req.body.Occupany, req.body.Tour_ID], (error, results, fields) => {
        if (error) {
          return db.rollback(() => {
            throw error;
          });
        }

        db.commit((error) => {
          if (error) {
            return db.rollback(() => {
              throw error;
            });
          }

          res.status(201).json({ message: 'Tour updated successfully' });
        });
      });
    });
  });
}

function sortObject(o) {
  var sorted = {},
    key, a = [];

  for (key in o) {
    if (o.hasOwnProperty(key)) {
      a.push(key);
    }
  }

  a.sort();

  for (key = 0; key < a.length; key++) {
    sorted[a[key]] = o[a[key]];
  }
  return sorted;
}

export const vnpay = (req, res) => {
  var ipAddr = req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;

  var tmnCode = 'ZKCD1R5B';
  var secretKey = 'LILBOCMSYXLZWTXIZVWVETFGAFZWTOUA';
  var vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
  var returnUrl = 'http://localhost:3000/thank-you';

  var date = new Date();

  var createDate = dateFormat(date, 'yyyymmddHHmmss');
  var orderId = dateFormat(date, 'HHmmss');
  var amount = req.body.amount;
  var bankCode = 'NCB';

  console.log(amount)
  var orderInfo = 'Noi dung thanh toan';
  var orderType = 110000;
  var locale = 'vn';
  if (locale === null || locale === '') {
    locale = 'vn';
  }
  var currCode = 'VND';
  var vnp_Params = {};
  vnp_Params['vnp_Version'] = '2.1.0';
  vnp_Params['vnp_Command'] = 'pay';
  vnp_Params['vnp_TmnCode'] = tmnCode;
  vnp_Params['vnp_Merchant'] = '2QXUI4J4'
  vnp_Params['vnp_Locale'] = locale;
  vnp_Params['vnp_CurrCode'] = currCode;
  vnp_Params['vnp_TxnRef'] = orderId;
  vnp_Params['vnp_OrderInfo'] = orderInfo + orderId;
  vnp_Params['vnp_OrderType'] = orderType;
  vnp_Params['vnp_Amount'] = amount * 100;
  vnp_Params['vnp_ReturnUrl'] = returnUrl;
  vnp_Params['vnp_IpAddr'] = ipAddr;
  vnp_Params['vnp_CreateDate'] = createDate;
  if (bankCode !== null && bankCode !== '') {
    vnp_Params['vnp_BankCode'] = bankCode;
  }

  vnp_Params = sortObject(vnp_Params);
  var signData = querystring.stringify(vnp_Params, { encode: false });
  var hmac = crypto.createHmac("sha512", secretKey);
  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest("hex");
  vnp_Params['vnp_SecureHash'] = signed;
  vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

  res.redirect(vnpUrl);
};

//UPDATE A Booking
export const updateBooking = (req, res) => {
  //check user
  const q = "SELECT * FROM Booking WHERE Booking_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows == 0) {
      console.log(`Không có id Booking để cập nhật: ${req.params.id}`);
    }
    const q = "UPDATE Booking SET Admin_ID=?,title=?,des=?,img=? WHERE Booking_ID=?";
    const values = [req.body.Admin_ID, req.body.title, req.body.des, req.body.img, req.params.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Booking has been update.");
    });
  });
}

//DELETE A Booking
export const deleteBooking = (req, res) => {
  const q = "SELECT * FROM Booking WHERE Booking_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Booking not found!");
    const q = `DELETE FROM Booking where Booking_ID = ?`;

    db.query(q, req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Booking has been delete.");
    });
  });
}

// GET A Booking
export const getBooking = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  // const q = `SELECT * FROM Booking LIMIT ${limit} OFFSET ${offset}`;
  const q = `SELECT * FROM Booking join Customers on Customers.Customer_ID = Booking.Customer_ID join Tour on Tour.Tour_ID = Booking.Tour_ID where Booking.Customer_ID = ?`;

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({
      data: data.slice(start, end),
      count_page: Math.ceil(data.length / limit)
    });
  });
}

// GET ALL Booking
export const getBookings = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  // const q = `SELECT * FROM Booking LIMIT ${limit} OFFSET ${offset}`;
  const q = `SELECT * FROM Booking join Customers on Customers.Customer_ID = Booking.Customer_ID join Tour on Tour.Tour_ID = Booking.Tour_ID`;

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({
      data: data.slice(start, end),
      count_page: Math.ceil(data.length / limit)
    });
  });
}

export const updateStatus = (req, res) => {
  const q = 'update booking set Status = ? where Booking_ID = ?';

  db.beginTransaction((err) => {
    if (err) {
      throw err;
    }

    db.query(q, [req.body.status, req.body.id], (err, data) => {
      if (err) {
        return db.rollback(() => {
          throw err;
        });
      }
      db.query('select Occupany from tour where Tour_ID = ?', [req.body.tourId], (error, results, fields) => {
        if (error) {
          return db.rollback(() => {
            throw error;
          });
        }
        const data = Number(results[0].Occupany) + Number(req.body.amount);
        db.query('UPDATE tour SET Occupany = ? WHERE Tour_ID = ?', [data, req.body.tourId], (error, results, fields) => {
          if (error) {
            return db.rollback(() => {
              throw error;
            });
          }

          db.commit((error) => {
            if (error) {
              return db.rollback(() => {
                throw error;
              });
            }

            res.status(201).json({ message: 'Tour updated successfully' });
          });
        });
      });
    });
  });
}

export const getCount = (req, res) => {
  const q = `SELECT count(Booking_ID) as count FROM booking where Status = 3`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

export const getRevenue = (req, res) => {
  const q = `SELECT sum(amount) as sumRevenue FROM booking where Status = 3`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

export const updatePay = (req, res) => {
  const q = `UPDATE booking SET Status = 3 where Status = 2`

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json('updated has been successfull');
  });
}

export const getBookingByCustomerId = (req, res) => {
  const q = 'select * from booking where Customer_ID = ? and Tour_ID = ? and Status = 3'

  db.query(q, [req.params.customerId, req.params.tourId], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

export const getCountTem = (req, res) => {
  const q = 'select month(DateOfBooking) as month, count(*) as count from booking group by month'

  db.query(q, [req.query.qr], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

export const getCountQuater = (req, res) => {
  const q = 'select QUARTER(DateOfBooking) as quarter, count(*) as count from booking group by quarter'

  db.query(q, [req.query.qr], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

export const getCountYear = (req, res) => {
  const q = 'select YEAR(DateOfBooking) as year, count(*) as count from booking group by year'

  db.query(q, [req.query.qr], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}