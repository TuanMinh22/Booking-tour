import express from 'express';
import dotenv from 'dotenv'
import cors from "cors";
import cookieParser from "cookie-parser";
import axios from 'axios';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import tourRoutes from "./routes/tour.js";
import blogRoutes from "./routes/post.js";
import hotelRoutes from "./routes/hotel.js";
import roomRoutes from "./routes/room.js";
import reviewRoutes from "./routes/review.js";
import addressRoutes from "./routes/address.js";
import bookingRoutes from "./routes/booking.js";
import messageRoutes from "./routes/message.js";
import commentRoutes from "./routes/comment.js";
import bodyParser from 'body-parser';

const app = express();
// const corsOptions = {
//   origin: 'http://localhost:3000', // Replace with the actual origin of your frontend application
// };

const apiKey = 'HhsoKPTQ5kgXqvfcJIroQymMz2oemTlA';
const apiSecret = 'oZ1NJ45LTKaYHewd';
const uniqueReferenceId = Date.now().toString() + Math.random().toString().substr(2, 5);

const baseURL = 'https://sandbox.momodeveloper.mtn.com';

const momoClient = axios.create({
  baseURL,
  headers: {
    'X-Reference-Id': uniqueReferenceId,
    'X-Target-Environment': 'sandbox',
    'Ocp-Apim-Subscription-Key': apiKey,
    'Ocp-Apim-Trace': 'true',
  },
  auth: {
    username: apiKey,
    password: apiSecret,
  },
});

async function initiatePayment(amount, phoneNumber) {
  const uniqueId = Date.now().toString();
  const body = {
    amount,
    currency: 'EUR',
    externalId: uniqueId,
    payer: {
      partyIdType: 'MSISDN',
      partyId: phoneNumber,
    },
    payerMessage: 'Payment for XYZ',
    payeeNote: 'Thank you for your purchase!',
  };

  try {
    const response = await momoClient.post('/collection/v1_0/requesttopay', body);
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
}

dotenv.config();
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('', (req, res) => {
  res.json("hello");
})

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/posts", blogRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/booking", bookingRoutes);
app.use("/api/comment", commentRoutes);
app.post('/api/booking/momo', async (req, res) => {
  const uniqueId = Date.now().toString();
  const body = {
    amount: req.body.amount,
    currency: 'EUR',
    externalId: uniqueId,
    payer: {
      partyIdType: 'MSISDN',
      partyId: req.body.phoneNumber,
    },
    payerMessage: 'Payment for XYZ',
    payeeNote: 'Thank you for your purchase!',
  };

  try {
    const response = await momoClient.post('/collection/v1_0/requesttopay', body);
    console.log(response.data);
  } catch (error) {
    console.error(error.response.data);
  }
})

app.get('/api/booking/momo/1', (req, res) => {
  axios.get('https://api.example.com/momo/endpoint')
    .then(response => {
      // Handle the API response
      console.log(response.data);
    })
    .catch(error => {
      // Handle errors
      console.error(error);
    });
})

app.listen(process.env.PORT, () => {
  console.log(`Backend started on ${process.env.PORT}`)
})