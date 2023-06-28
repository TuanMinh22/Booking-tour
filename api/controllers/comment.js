import { db } from "../database/index.js";

//CREATE A comment
export const createComment = (req, res) => {
  const q = "INSERT INTO comment(`Customer_ID`,`Post_ID`,`text`) VALUES (?)";
  const values = [req.body.Customer_ID, req.body.Post_ID, req.body.text];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Comment has been created.");
  });
}

//UPDATE A comment
export const updateComment = (req, res) => {
  //check user
  const q = "SELECT * FROM comment WHERE Comment_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows == 0) {
      console.log(`Không có id Comment để cập nhật: ${req.params.id}`);
    }
    const q = "UPDATE comment SET Customer_ID=?,Post_ID=?,text=? WHERE Comment_ID=?";
    const values = [req.body.Customer_ID, req.body.Post_ID, req.body.text, req.params.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been update.");
    });
  });
}

//DELETE A post
export const deleteComment = (req, res) => {
  const q = "SELECT * FROM comment WHERE Comment_ID = ?";

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json("comment not found!");
    const q = `DELETE FROM comment where Comment_ID = ?`;

    db.query(q, req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Comment has been delete.");
    });
  });
}

// GET A comment
export const getCommentByCusId = (req, res) => {
  const q = "SELECT * FROM comment WHERE Customer_ID = (?)";

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

// Get a 
export const getCommentByPostId = (req, res) => {
  const q = "SELECT * FROM comment join Customers on comment.Customer_ID=Customers.Customer_ID WHERE comment.Post_ID = (?)";

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}
// GET ALL post
export const getComments = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  // const q = `SELECT * FROM post LIMIT ${limit} OFFSET ${offset}`;
  const q = `SELECT * FROM comment join Customers on comment.Customer_ID=Customers.Customer_ID`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({
      data: data.slice(start, end),
      count_page: Math.ceil(data.length / limit)
    });
  });
}