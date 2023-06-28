import { db } from "../database/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//UPDATE 
export const updateUser = (req, res) => {
  //check user
  const q = "SELECT * FROM Customers WHERE Customer_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows == 0) {
      console.log(`Không có id user để cập nhật: ${req.params.id}`);
    }
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);
    const q = "UPDATE Customers SET firstName=?,lastName=?,Email=?,Phone=?,Password=?,Image=?  WHERE Customer_ID=?";
    const values = [req.body.firstName, req.body.lastName, req.body.Email, req.body.Phone, hash, req.body.Image, req.params.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      const updatedUser = {
        id: req.params.id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        Email: req.body.Email,
        Phone: req.body.Phone,
        Password: req.body.Password,
        Image: req.body.Image
      };
      return res.status(200).json(updatedUser);
    });
  });
}

// DELETE USER
export const deleteUser = (req, res) => {
  const q = "SELECT * FROM Customers WHERE Customer_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");
    const q = `DELETE FROM Customers where Customer_ID = (?)`;

    db.query(q, req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been deleted.");
    });
  });
}

//GET USER
export const getUser = (req, res) => {
  const q = "SELECT * FROM Customers WHERE Customer_ID = (?)";

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

// GET ALL USER
export const getUsers = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  // const q = `SELECT * FROM Customers LIMIT ${limit} OFFSET ${start}`;
  const q = `SELECT * FROM Customers`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({
      data: data.slice(start, end),
      count_page: Math.ceil(data.length / limit)
    });
  });
}

// get count user
export const getCount = (req, res) => {
  const q = `SELECT count(Customer_ID) as count FROM Customers`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}