import { db } from "../database/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from 'joi';

const registerSchema = Joi.object({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30).required(),
  Email: Joi.string().email().required(),
  Password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9@#$%^&*()!]{6,30}$')).required(),
  Phone: Joi.string().pattern(/^\d{10,12}$/).required(),
});

const validateRegister = (data) => {
  return registerSchema.validate(data);
};

export const register = (req, res) => {
  const { error } = validateRegister(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  //CHECK EXISTING USER
  const q = "SELECT * FROM Customers WHERE Email = ? OR Phone = ?";

  db.query(q, [req.body.Email, req.body.Phone], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    //Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.Password, salt);

    const q = "INSERT INTO Customers(`firstName`,`lastName`,`Email`,`Phone`,`Password`,`Image`) VALUES (?)";
    const values = [req.body.firstName, req.body.lastName, req.body.Email, req.body.Phone, hash, req.body.Image];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
}

export const login = (req, res) => {
  //CHECK USER
  const q = "SELECT * FROM Customers WHERE Email = ?";

  db.query(q, [req.body.Email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.Password,
      data[0].Password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].Customer_ID }, "jwtkey");
    const { Password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
}

//LOGIN WITH ADMIN
export const loginAdmin = (req, res) => {
  //CHECK USER

  const q = "SELECT * FROM Admin WHERE Email = ?";

  db.query(q, [req.body.Email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    //Check password
    const isPasswordCorrect = bcrypt.compareSync(
      req.body.Password,
      data[0].Password
    );

    if (!isPasswordCorrect)
      return res.status(400).json("Wrong username or password!");

    const token = jwt.sign({ id: data[0].Admin_ID }, "jwtkey");
    const { Password, ...other } = data[0];

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
}

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: "none",
    secure: true
  }).status(200).json("User has been logged out.")
}