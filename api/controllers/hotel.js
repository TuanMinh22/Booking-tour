import { db } from "../database/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//CREATE A post
export const createHotel = (req, res) => {
  const q = "INSERT INTO Hotels(`HotelName`,`Phone`,`img`,`Address`) VALUES (?)";
  const values = [req.body.HotelName, req.body.Phone, req.body.img, req.body.Address];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Hotel has been created.");
  });
}

//UPDATE A post
export const updateHotel = (req, res) => {
  //check user
  const q = "SELECT * FROM hotels WHERE Hotel_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows == 0) {
      console.log(`Không có id post để cập nhật: ${req.params.id}`);
    }
    const q = "UPDATE Hotels SET HotelName=?,Phone=?,img=?,Address=? WHERE Hotel_ID=?";
    const values = [req.body.HotelName, req.body.Phone, req.body.img, req.body.Address, req.params.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Hotel has been update.");
    });
  });
}

//DELETE A post
export const deleteHotel = (req, res) => {
  const q = "SELECT * FROM hotels WHERE Hotel_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("Hotel not found!");
    const q = `DELETE FROM hotels where Hotel_ID = ?`;

    db.query(q, req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Hotel has been delete.");
    });
  });
}

// GET A post
export const getHotel = (req, res) => {
  const q = "SELECT * FROM Hotels join address on hotels.addressId = address.addressId WHERE Hotel_ID = (?)";

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) {
      return res.status(404).json({ message: 'Hotel not found.' });
    }
    return res.status(200).json(data[0]);
  });
}

// GET ALL post
export const getHotels = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  // const q = `SELECT * FROM hotels LIMIT ${limit} OFFSET ${start}`;
  const q = `SELECT * FROM hotels join address on hotels.addressId = address.addressId`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({
      data: data.slice(start, end),
      count_page: Math.ceil(data.length / limit)
    });
  });
}