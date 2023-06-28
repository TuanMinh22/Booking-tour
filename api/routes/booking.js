import express from "express"
import { createBooking, deleteBooking, getBooking, getBookingByCustomerId, getBookings, getCount, getCountQuater, getCountTem, getCountYear, getRevenue, updatePay, updateStatus, vnpay } from "../controllers/booking.js";
import { OnePayDomestic } from 'vn-payments';
import { OnePayInternational } from 'vn-payments';
import { VNPay } from 'vn-payments';
import { SohaPay } from 'vn-payments';
import { NganLuong } from 'vn-payments';
import { AdditionData, Consumer, Currency, Provider, Transaction, VNBankQR } from "vnbankqr";
import QRCode from 'qrcode';
import crypto from 'crypto';
import https from 'https'
const router = express.Router()

router.post("/create", createBooking);

const paymomo = (amount, id) => {
  var partnerCode = 'MOMO';
  var accessKey = 'F8BBA842ECF85';
  var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
  var requestId = partnerCode + new Date().getTime();
  var orderId = requestId;
  var orderInfo = 'pay with MoMo';
  var redirectUrl = 'http://localhost:3000/thank-you';
  var ipnUrl = 'http://localhost:3000/thank-you';
  var amount = String(amount);
  var requestType = 'payWithMethod';
  var extraData = '';

  var rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=${requestType}`;

  var signature = crypto
    .createHmac('sha256', secretKey)
    .update(rawSignature)
    .digest('hex');

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    accessKey: accessKey,
    requestId: requestId,
    amount: amount,
    orderId: orderId,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    extraData: extraData,
    requestType: requestType,
    signature: signature,
    lang: 'en',
  });
  console.log(requestBody)
  const options = {
    hostname: 'test-payment.momo.vn',
    port: 443,
    path: '/v2/gateway/api/create',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(requestBody),
    },
  };
  return new Promise((resolve, reject) => {
    const req = https.request(options, (response) => {
      let responseData = '';
      response.on('data', (chunk) => {
        responseData += chunk;
      });

      response.on('end', () => {
        const responseBody = JSON.parse(responseData);
        const payUrl = responseBody.payUrl;
        resolve(payUrl);
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    console.log('Sending....');
    req.write(requestBody);
    req.end();
  });
}

router.post('/momo1', async (req, res) => {
  try {
    const payment = await paymomo(req.body.amount, req.body.id);
    res.json({ payUrl: payment });
  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ error: 'An error occurred during payment' });
  }
})
router.get('/', getBookings);
router.put('/updateStatus', updateStatus);
router.put('/updatePay', updatePay);
router.delete(':id', deleteBooking);
router.get('/getCount', getCount);
router.get('/getRevenue', getRevenue);
router.get('/getRevenue', getRevenue);
router.get('/getCountTem', getCountTem)
router.get('/getCountQuarter', getCountQuater)
router.get('/getCountYear', getCountYear)
router.get('/getBookingByCusATou/:customerId/:tourId', getBookingByCustomerId);
router.get('/:id', getBooking);

export default router