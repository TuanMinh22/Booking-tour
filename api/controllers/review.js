import { db } from "../database/index.js";

//CREATE A post
export const createReview = (req, res) => {
  const q = "INSERT INTO feedback_system(`Customer_ID`,`Tour_ID`,`serviceRating`,`Comments`) VALUES (?)";
  const values = [req.body.Customer_ID, req.body.Tour_ID, req.body.serviceRating, req.body.Comments];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Review has been created.");
  });
}

//UPDATE A post
export const updateReview = (req, res) => {
  //check user
  const q = "SELECT * FROM feedback_system WHERE Feedback_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows == 0) {
      console.log(`Không có id Review để cập nhật: ${req.params.id}`);
    }
    const q = "UPDATE post SET Customer_ID=?,Tour_ID=?,serviceRating=?,Comments=? WHERE Feedback_ID=?";
    const values = [req.body.Customer_ID, req.body.Tour_ID, req.body.serviceRating, req.body.Comments, req.params.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Review has been update.");
    });
  });
}

//DELETE A post
export const deleteReview = (req, res) => {
  const q = "SELECT * FROM feedback_system WHERE Feedback_ID = ?";

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json("post not found!");
    const q = `DELETE FROM feedback_system where Feedback_ID = ?`;

    db.query(q, req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been delete.");
    });
  });
}

// GET A post
export const getReviewByCusId = (req, res) => {
  const q = "SELECT * FROM feedback_system WHERE Customer_ID = (?)";

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

// Get a 
export const getReviewByTourId = (req, res) => {
  const q = "SELECT * FROM feedback_system join Customers on feedback_system.Customer_ID=Customers.Customer_ID WHERE feedback_system.Tour_ID = (?)";

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}
// GET ALL post
export const getReviews = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  // const q = `SELECT * FROM post LIMIT ${limit} OFFSET ${offset}`;
  const q = `SELECT * FROM feedback_system join Customers on feedback_system.Customer_ID=Customers.Customer_ID`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({
      data: data.slice(start, end),
      count_page: Math.ceil(data.length / limit)
    });
  });
}