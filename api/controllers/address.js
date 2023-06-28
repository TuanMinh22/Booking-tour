import { db } from "../database/index.js";

// GET ALL post
export const getAddress = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  const q = `SELECT * FROM address`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({
      data: data.slice(start, end),
      count_page: Math.ceil(data.length / limit)
    });
  });
}