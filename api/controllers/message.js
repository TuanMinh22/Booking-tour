import { db } from "../database/index.js";

export const createMessage = (req, res) => {
  const q = "INSERT INTO message(`Admin_ID`,`Customer_ID`,`text`,`sender`) VALUES (?)";
  const values = [req.body.Admin_ID, req.body.Customer_ID, req.body.text, req.body.sender];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

//GET message Customer
export const getMessageByCustomer = (req, res) => {
  const q = `SELECT message.Customer_ID, customers.firstName, customers.lastName FROM message join customers on message.Customer_ID = customers.Customer_ID group by message.Customer_ID`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

export const getMessByCus = (req, res) => {
  const q = `select * from message join customers on message.Customer_ID = customers.Customer_ID where message.Customer_ID = ?`;

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

// GET ALL post
export const getMessages = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  const q = `SELECT * FROM message`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({
      data: data.slice(start, end),
      count_page: Math.ceil(data.length / limit)
    });
  });
}