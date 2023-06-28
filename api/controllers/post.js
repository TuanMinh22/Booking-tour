import { db } from "../database/index.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//CREATE A post
export const createPost = (req, res) => {
  //check user
  if (err) return res.status(500).json(err);
  if (data.length) return res.status(409).json("Post already exists!");

  const q = "INSERT INTO post(`Admin_ID`,`title`,`des`,`img`) VALUES (?)";
  const values = [req.body.Admin_ID, req.body.title, req.body.des, req.body.img];

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Post has been created.");
  });
}

//UPDATE A post
export const updatePost = (req, res) => {
  //check user
  const q = "SELECT * FROM post WHERE post_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows == 0) {
      console.log(`Không có id post để cập nhật: ${req.params.id}`);
    }
    const q = "UPDATE post SET Admin_ID=?,title=?,des=?,img=? WHERE post_ID=?";
    const values = [req.body.Admin_ID, req.body.title, req.body.des, req.body.img, req.params.id];

    db.query(q, values, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been update.");
    });
  });
}

//DELETE A post
export const deletePost = (req, res) => {
  const q = "SELECT * FROM post WHERE post_ID = ?";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("post not found!");
    const q = `DELETE FROM post where post_ID = ?`;

    db.query(q, req.params.id, (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("Post has been delete.");
    });
  });
}

// GET A post
export const getPost = (req, res) => {
  const q = "SELECT * FROM post join admin on post.Admin_ID = admin.Admin_ID WHERE post_ID = (?)";

  db.query(q, req.params.id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(data);
  });
}

// GET ALL post
export const getPosts = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = page * limit;
  // const q = `SELECT * FROM post LIMIT ${limit} OFFSET ${start}`;
  const q = `SELECT * FROM post`;

  db.query(q, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json({
      data: data.slice(start, end),
      count_page: Math.ceil(data.length / limit)
    });
  });
}